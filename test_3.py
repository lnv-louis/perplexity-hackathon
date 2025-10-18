import os
import concurrent.futures
import time
import json
import argparse
from datetime import datetime
from perplexity import Perplexity, PerplexityError

def generate_sub_prompts(initial_prompt, client):
    """
    Uses the Perplexity API to generate 3 specific sub-prompts, then adds 2 more
    for specific rental listings and weather.
    """
    # Check if we're running in quiet mode (API mode)
    is_quiet = False
    if 'args' in globals() and hasattr(args, 'out_json'):
        is_quiet = args.out_json == '-'
    # Only print debug info if not outputting to stdout
    is_quiet = args.out_json == '-' if 'args' in globals() else False
    
    if not is_quiet:
        print("Step 1: Generating specific research questions based on your prompt...")
    try:
        # This prompt now instructs the AI to generate exactly 3 questions.
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an AI assistant that breaks down a user's broad real estate query "
                    "into exactly 3 specific, researchable questions. Return them as a numbered list."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Based on the user's query: '{initial_prompt}', generate 3 distinct questions "
                    "a real estate analyst should investigate. Cover broad topics like safety/crime rates, "
                    "local amenities (schools, parks), and lifestyle/atmosphere."
                ),
            },
        ]

        completion = client.chat.completions.create(
            model="sonar",
            messages=messages,
            extra_body={"reasoning_effort": "low"}
        )
        
        response_text = completion.choices[0].message.content
        
        # --- DEBUGGING: See the raw AI response before parsing ---
        if not is_quiet:
            print(f"\n[DEBUG] Raw AI response for sub-questions:\n---\n{response_text}\n---\n")

        # Parse the numbered list response, capping at 3 AI-generated prompts.
        all_parsed_lines = [line.split(". ", 1)[1] for line in response_text.strip().split("\n") if ". " in line]
        prompts = all_parsed_lines[:3]

        # --- NEW: Manually add the specific rental and weather questions ---
        rental_prompt = (
            f"Find 2-3 specific houses or flats currently available for rent in the area mentioned in '{initial_prompt}'. "
            "IMPORTANT: For each property, start a new line with the full URL to the listing, then describe: "
            "1. Address and price\n"
            "2. Key features (bedrooms, bathrooms)\n"
            "3. Nearby amenities within 5-10 minutes walk\n"
            "Format each property as a separate paragraph with the URL on its own line."
        )
        weather_prompt = f"What are the current and typical weather conditions for the location mentioned in '{initial_prompt}'?"
        
        prompts.append(rental_prompt)
        prompts.append(weather_prompt)

        # --- DEBUGGING: See the list of prompts after parsing ---
        if not is_quiet:
            print(f"[DEBUG] Final list of prompts (3 AI-generated + 2 manual): {prompts}\n")

        if len(prompts) >= 1:
            if not is_quiet:
                print(f"Successfully generated {len(prompts)} research questions.")
            return prompts
        else:
            if not is_quiet:
                print("Warning: Could not parse any prompts from the AI response.")
            return []

    except Exception as e:
        print(f"[ERROR] An error occurred while generating sub-prompts: {e}")
        return []

def execute_single_query(prompt, client):
    """
    Executes a single, deep-research query against the Perplexity API.
    This function is designed to be run in parallel.
    """
    try:
        system_prompt = {
            "role": "system",
            "content": (
                "You are an expert AI real estate analyst. Your answer should be a concise summary, "
                "limited to a maximum of 3-4 sentences or a short bulleted list. "
                "Get straight to the point."
            )
        }
        
        messages = [system_prompt, {"role": "user", "content": prompt}]

        completion = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
            extra_body={"reasoning_effort": "low"}
        )
        return completion.choices[0].message.content
    except PerplexityError as e:
        # --- DEBUGGING: More specific error message ---
        error_message = f"An API error occurred for prompt '{prompt}': {e}"
        print(f"[ERROR] {error_message}")
        return error_message
    except Exception as e:
        # --- DEBUGGING: More specific error message ---
        error_message = f"An unexpected error occurred for prompt '{prompt}': {e}"
        print(f"[ERROR] {error_message}")
        return error_message

def run_queries_in_parallel(prompts, client, is_quiet=False):
    """
    Uses a ThreadPoolExecutor to run multiple queries concurrently with a delay to respect rate limits.
    """
    if not isinstance(is_quiet, bool):
        is_quiet = str(is_quiet) == '-'  # Convert to boolean based on command-line arg
    
    results = []
    if not prompts:
        return results
        results = []
    # Using a with statement ensures threads are cleaned up promptly.
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        future_to_prompt = {}
        
        if not is_quiet:
            print(f"\nStep 2: Submitting {len(prompts)} queries with delays to avoid rate limits...")
        
        # Submit jobs with a delay between them to respect API rate limits.
        for prompt in prompts:
            future = executor.submit(execute_single_query, prompt, client)
            future_to_prompt[future] = prompt
            time.sleep(2) # Wait 2 seconds before submitting the next job.

        if not is_quiet:
            print("All queries submitted. Waiting for completion...")
        
        for i, future in enumerate(concurrent.futures.as_completed(future_to_prompt)):
            prompt = future_to_prompt[future]
            try:
                answer = future.result()
                results.append({'question': prompt, 'answer': answer})
                if not is_quiet:
                    print(f"  - Query {i+1}/{len(prompts)} completed.")
            except Exception as exc:
                error_message = f'An error occurred during execution for prompt "{prompt}": {exc}'
                if not is_quiet:
                    print(f"[ERROR] {error_message}")
                results.append({'question': prompt, 'answer': error_message})
        
        return results
    
    return results


def extract_property_links(rental_answer):
    """Extract property links and descriptions from a rental answer."""
    if not rental_answer:
        return []
    
    properties = []
    # Simple heuristic: look for links in the text
    # This could be enhanced with regex or better parsing
    for line in rental_answer.split('\n'):
        if 'http' in line.lower() or 'www.' in line.lower() or '.com' in line.lower() or '.co.uk' in line.lower():
            properties.append({
                'description': line.strip(),
                'url': next((word for word in line.split() if word.startswith(('http', 'www'))), None)
            })
    return properties

def extract_title_from_question(question):
    """
    Extract a concise title from a question.
    Removes common prefixes and question words.
    """
    # Remove common question starters
    cleaners = [
        "what is", "what are", "how is", "how are", "tell me about",
        "describe", "explain", "find", "can you", "please",
        "the", "a", "an"
    ]
    text = question.lower()
    for cleaner in cleaners:
        text = text.replace(cleaner, "")
    
    # Clean up and capitalize
    title = text.strip().strip('?.,').title()
    
    # If it's the rental question, make it more concise
    if "available for rent" in question.lower():
        return "Available Properties"
    # If it's the weather question, make it more concise
    elif "weather conditions" in question.lower():
        return "Weather & Climate"
        
    # Limit length
    words = title.split()
    if len(words) > 4:
        title = " ".join(words[:4])
    
    return title

def build_ui_payload(results, widget_ids=None):
    """
    Build a JSON-serializable payload that maps results to widget ids.
    Now includes dynamic titles extracted from questions.
    """
    if widget_ids is None:
        widget_ids = ['safety', 'budget', 'student', 'transport', 'reviews', 'locations']
    
    # Extract rental answer from the 4th result (rental listings)
    rental_answer = results[3]['answer'] if len(results) > 3 else None
    
    # Map each result to a dynamic title
    question_mapping = {}

    # Extract property links if we found the rental answer
    properties = extract_property_links(rental_answer) if rental_answer else []
    
    # Map results to widgets, handling the special locations widget
    # Initialize the list for mapped widgets
    mapped = []
    
    # Map each result to a dynamic title and content
    for i, result in enumerate(results[:5]):  # First 5 results (3 AI + rental + weather)
        widget_id = widget_ids[i]
        title = extract_title_from_question(result['question'])
        question_mapping[widget_id] = {
            'index': i,
            'title': title
        }
    
    # Map results to widgets in the correct order
    for widget_id in widget_ids:
        if widget_id == 'locations':
            # Special handling for locations widget
            mapped.append({
                'id': 'locations',
                'title': 'Available Properties',
                'content': {
                    'properties': properties,
                    'last_updated': datetime.utcnow().isoformat() + 'Z'
                }
            })
        elif widget_id in question_mapping:
            # Map other widgets using the mapping with dynamic titles
            info = question_mapping[widget_id]
            if len(results) > info['index']:
                result = results[info['index']]
                mapped.append({
                    'id': widget_id,
                    'title': info['title'],
                    'content': result['answer']
                })

    payload = {
        'generated_at': datetime.utcnow().isoformat() + 'Z',
        'source': 'test_3.py',
        'widget_count': len(mapped),
        'widgets': mapped
    }

    return payload


def mock_generate_sub_prompts(initial_prompt):
    """Fallback prompt generator for --mock mode (no API calls).
    Produces 3 heuristic questions + rental + weather prompts.
    """
    base = [
        f"How safe is the area mentioned in '{initial_prompt}' compared to the city average?",
        f"What is the typical rental price range for 1-2 bedroom homes in '{initial_prompt}'?",
        f"What is the local student scene and nearby universities for '{initial_prompt}'?",
    ]
    rental = f"Find 2-3 specific houses or flats currently available for rent in '{initial_prompt}', with brief descriptions and links."
    weather = f"What are the current and typical weather conditions for '{initial_prompt}'?"
    return base + [rental, weather]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='HOUSAI content engine CLI')
    parser.add_argument('--mock', action='store_true', help='Run in mock mode (no API calls)')
    parser.add_argument('--query', type=str, help='Run a single non-interactive query')
    parser.add_argument('--out-json', type=str, help='Write UI JSON payload to given filename')
    args = parser.parse_args()

    if args.mock:
        # Run a single mock query and optionally write JSON
        prompt = args.query or 'bloomsbury family of 4'
        prompts = mock_generate_sub_prompts(prompt)
        payload = build_ui_payload(prompts)
        if args.out_json:
            with open(args.out_json, 'w', encoding='utf-8') as f:
                json.dump(payload, f, ensure_ascii=False, indent=2)
            print(f'Wrote mock UI payload to {args.out_json}')
        else:
            print(json.dumps(payload, indent=2))
        exit()

    # Non-mock mode requires API key
    api_key = os.environ.get('PERPLEXITY_API_KEY')
    if not api_key:
        print('Error: The PERPLEXITY_API_KEY environment variable is not set.')
        print("Please set it in your terminal, for example:")
        print("export PERPLEXITY_API_KEY='your_api_key_here'")
        exit(1)

    try:
        perplexity_client = Perplexity(api_key=api_key)
    except Exception as e:
        print(f'Failed to initialize the Perplexity client: {e}')
        exit(1)

    # If --query provided, run non-interactively and optionally write JSON
    if args.query:
        prompts = generate_sub_prompts(args.query, perplexity_client)
        if not prompts:
            print('Could not generate sub-prompts from API')
            exit(1)
        # Run the research queries
        results = run_queries_in_parallel(prompts, perplexity_client, args.out_json == '-')
        # Build the UI payload with the full results
        payload = build_ui_payload(results)
        if args.out_json == '-':
            # Print to stdout for API consumption
            print(json.dumps(payload, ensure_ascii=False))
        elif args.out_json:
            with open(args.out_json, 'w', encoding='utf-8') as f:
                json.dump(payload, f, ensure_ascii=False, indent=2)
            print(f'Wrote UI payload to {args.out_json}')
        else:
            print(json.dumps(payload, indent=2))
        exit(0)

    # Interactive fallback (original loop)
    print('--- HOUSAI Content Engine (interactive) ---')
    print("Enter a broad question about a location, and I'll perform a deep analysis.")
    print("Example: 'is bloomsbury a good place to live for a family of 4'")
    print("Type 'quit' or 'exit' to end.\n")

    while True:
        user_input = input('\nYou: ')
        if user_input.lower() in ['quit', 'exit']:
            print('\nGoodbye!')
            break

        sub_prompts = generate_sub_prompts(user_input, perplexity_client)
        if not sub_prompts:
            print('Could not generate sub-prompts. Please try another query.')
            continue

        print(f"\nCONFIRMED: The script will now run exactly {len(sub_prompts)} queries.")
        print('\nI will now research the following questions for you:')
        for i, p in enumerate(sub_prompts):
            print(f'  {i+1}. {p}')

        analysis_results = run_queries_in_parallel(sub_prompts, perplexity_client)

        print('\n--- Comprehensive Analysis ---')
        for result in analysis_results:
            print('\n' + '='*80)
            print(f"QUESTION: {result['question']}")
            print('='*80)
            print(f"ANALYSIS:\n{result['answer']}")
            print('='*80)

