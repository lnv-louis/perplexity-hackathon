// Simple test file to demonstrate Perplexity API usage
import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

async function testPerplexityAPI() {
  try {
    const search = await client.search.create({
      query: "latest AI developments 2024",
      max_results: 5,
      max_tokens_per_page: 1024
    });

    for (const result of search.results) {
      console.log(`${result.title}: ${result.url}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export for potential use in other parts of the app
export { testPerplexityAPI };