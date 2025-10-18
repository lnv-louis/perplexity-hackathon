# HOUSE.AI - Hackathon Submission Report# AI Housing Finder: Perplexity Hackathon Evaluation Report



**Perplexity AI Hackathon 2025****Date:** October 17, 2025

**Hackathon:** Perplexity London (Oct 17-18, 2025)

---**Project:** Interactive AI Housing Finder with Neighborhood Intelligence

**Status:** CRITICAL EVALUATION - READ BEFORE BUILDING

## 📋 Project Summary (200-300 words)

---

HOUSE.AI is an intelligent housing research assistant that transforms complex location queries into beautifully visualized, actionable insights using Perplexity's advanced reasoning capabilities.

## Executive Summary: The Harsh Reality

**The Problem:** Finding the right place to live requires researching dozens of factors—safety, budget, amenities, weather, transportation, and community atmosphere. Traditional search engines provide fragmented results across multiple websites, forcing users to manually synthesize information.

After comprehensive research into the UK property market, competitor landscape, and technical feasibility, here's the unfiltered truth about your AI housing finder idea:

**Our Solution:** HOUSE.AI uses Perplexity's API to automatically decompose broad queries ("Is Bloomsbury London safe for families?") into 3 specific research questions plus 2 automated queries (rental listings, weather). The `sonar` model generates intelligent sub-questions, while `sonar-pro` conducts parallel deep research with real-time data retrieval.

### 🟢 The Good News

**Technical Approach:** The platform orchestrates 5 concurrent Perplexity queries with strategic rate-limit delays, then transforms results into interactive widgets on an infinite canvas. Each widget auto-sizes based on content length, displays smart icons matching the topic, and renders markdown-formatted answers with clickable citation badges.- **Real problem exists:** First-time buyers in London face genuine information gaps and high-stakes decisions

- **Market is massive:** £478,000 average first-time buyer price in London, £125,000 average deposit

**Key Innovation:** Our intelligent follow-up system detects conversation context—initial searches run 5 parallel queries creating comprehensive dashboards, while follow-up questions ("What about the weather?") execute single focused queries that append new widgets to the canvas without replacing existing research.- **UI concept is compelling:** Interactive dashboard/mood board approach is genuinely differentiated from typical chatbots

- **Perplexity has strong capabilities:** Sonar Deep Research excels at multi-source synthesis and real-time data

**Impact:** Users research housing locations 10x faster by viewing all relevant information in one beautifully organized interface. Perplexity's reasoning capabilities ensure answers are accurate, timely, and properly cited—critical for making informed life decisions like relocation.

### 🟡 The Concerning News

---- **Rightmove & Zoopla already provide this:** Both portals added extensive local area data in 2024-2025

- **AI property search is NOW trendy:** Jitty ($2M raised), HAILO (4,000+ users), Rightmove AI, Zoopla AI all launched in 2025

## 🎥 Demo Video- **Perplexity is NOT central to core features:** Gyms and supermarkets need Google Places API, not Perplexity

- **Interactive UI is a 12-15 hour build:** High risk of scope creep destroying your 27-hour window

**YouTube Link:** [https://youtube.com/watch?v=...](#)  

**Duration:** 4 minutes 30 seconds### 🔴 The Brutal Truth

- **Success Probability: 35-45%** (significantly lower than Technical Debt Estimator at 70%)

### Video Contents:- **Primary risk:** "Just use Rightmove + Google Maps" — judges will ask this immediately

1. **Introduction (0:00-0:30)** - Problem statement and solution overview- **Secondary risk:** Building a "prettier Rightmove" without 10x differentiation

2. **Homepage Demo (0:30-1:00)** - Search interface and query examples- **Tertiary risk:** UI complexity eats all your time, leaving no working features

3. **Initial Search (1:00-2:00)** - Perplexity API decomposition + parallel research

4. **Widget Interaction (2:00-3:00)** - Dynamic sizing, citations, markdown rendering---

5. **Follow-Up Query (3:00-4:00)** - Single query appending new widget

6. **Technical Walkthrough (4:00-4:30)** - Code review of Perplexity integration## Part 1: Problem Validation - Is This Real or Imagined?



---### What UK Home Buyers ACTUALLY Struggle With (2025 Data)



## 💻 Code Repository#### Financial Pain Points (PRIMARY PROBLEM)

- **Average deposit in London:** £125,000 (40% of transactions cite deposits as main barrier)

**GitHub:** [https://github.com/lnv-louis/perplexity-hackathon](https://github.com/lnv-louis/perplexity-hackathon)- **Average first-time buyer price:** £478,000 in London vs. £245,000 nationally

- **Hidden costs:** Stamp duty, legal fees, surveys, removal costs often surprise buyers

### Repository Structure:- **Family contributions:** £25,000 average parental help needed

```

perplexity-hackathon/#### Process Pain Points (SECONDARY PROBLEM)

├── README.md                 # Setup instructions & architecture- **Repetition & poor communication:** Cited as worst aspects of buying/selling

├── src/app/api/search/       # Perplexity API integration- **Unpredictable timings:** Conveyancing delays, chain issues beyond buyer control

├── src/pages/GridPage.tsx    # Canvas & widget system- **Information overload:** Too many properties, unclear which neighborhoods suit lifestyle

├── src/components/grid/      # Chat interface & components

├── docs/#### Post-Purchase Regrets (THE REAL INFORMATION GAP)

│   ├── SETUP_AND_TESTING.md  # Complete installation guideFrom research on "what buyers wish they knew":

│   ├── MAJOR_UPDATE_V4.md    # Latest features- **Commute reality:** "90-minute commute, not 45 minutes as expected"

│   └── CHANGELOG.md          # Version history- **Local amenity desert:** "Nearest gym is 2 miles away"

└── .env.example              # Environment template- **Neighborhood mismatch:** "Area looked nice in photos, but feels unsafe at night"

```- **School catchment issues:** Didn't research which schools they'd actually qualify for



### Setup Instructions (from README.md):### The Critical Question: Is This a Real Problem or "Nice to Have"?



```bash**Real Problem Indicators:**

# Clone repository✅ Post-purchase regret is REAL (buyers wish they'd known about neighborhood before moving)

git clone https://github.com/lnv-louis/perplexity-hackathon.git✅ Time pressure is REAL (need to decide quickly on viewings/offers)

cd perplexity-hackathon✅ Information asymmetry is REAL (realtors control what you see)



# Install dependencies**BUT:**

npm install❌ The problem is NOT "I can't find gyms near my house" (Google Maps does this)

❌ The problem is NOT "I don't know prices" (Rightmove shows prices)

# Configure environment❌ The REAL problem is "I don't know if THIS NEIGHBORHOOD fits MY LIFESTYLE in the long term"

echo "PERPLEXITY_API_KEY=your_key_here" > .env.local

**Verdict:** **MODERATE REAL PROBLEM** — but the problem is **lifestyle fit prediction**, NOT amenity discovery.

# Run development server

npm run dev---

```

## Part 2: Competitive Landscape - You're Late to the Party

**Requirements:**

- Node.js 18+ or Bun### What Rightmove & Zoopla ALREADY Provide (2025)

- Perplexity API Key (get at perplexity.ai/settings/api)

#### **Zoopla's 2025 AI Enhancements**

---Zoopla launched major local area features in 2025:

- **Crime data:** Reported crimes, high-risk area flags

## 🔧 Perplexity API Integration- **Flood risk:** River and sea flooding assessment

- **Planning applications:** Submitted, approved, refused applications nearby

### Implementation Details- **AI Smart Tags:** 6 new property attributes extracted via AI from descriptions

- **"Homes for You" AI:** Personalized homepage with 2.5X uplift in leads to agents

#### 1. **Query Decomposition (Sonar Model)**

**Quote from Zoopla:** "The only portal that allows consumers to access this type of information outside of a subscription model."

```typescript

// src/app/api/search/route.ts#### **Rightmove's AI Location Tool**

async function generateSubPrompts(initialPrompt: string): Promise<string[]> {Powered by Google Gemini, launched 2025:

  const client = new Perplexity({ apiKey: process.env.PERPLEXITY_API_KEY });- AI-generated guides for local areas (green spaces, transport, restaurants, bars, fitness, schools)

  - Currently in select locations (Wrexham, Bath, Aberdeen)

  const completion = await client.chat.completions.create({- Positioned at bottom of property listings

    model: "sonar",

    messages: [#### **What Both Portals Provide**

      {- School ratings and locations

        role: "system",- Transport links and commute times

        content: "Break down a broad real estate query into 3 specific research questions."- Local amenities (shops, restaurants, parks)

      },- Neighborhood statistics

      {- Property price history

        role: "user",- Market trends

        content: `Based on: '${initialPrompt}', generate 3 distinct questions covering safety, amenities, and lifestyle.`

      }### Emerging AI Property Search Startups (UK, 2025)

    ]

  });#### **Jitty (Funded: $2M Pre-Seed)**

  - **Founded by:** Ex-Deliveroo early-stage employees

  // Parse numbered list response + add automated queries- **Product:** "Inspiration AI" — world's first photo search for homes

  const prompts = parseResponse(completion);- **USP:** Search homes by entering descriptive words (no filters needed)

  prompts.push(rentalListingsQuery, weatherQuery);- **Status:** Active, funded, building

  return prompts; // Returns 5 total prompts

}#### **HAILO (Homesearch AI Listings Optimiser)**

```- **Adoption:** 4,000+ estate agency branches activated

- **Product:** AI-native listings optimization for ChatGPT, Copilot, Gemini

**Why Sonar:** Fast, cost-effective prompt generation for breaking down complex queries.- **Impact:** Making property listings easily accessible in AI engines



#### 2. **Parallel Research (Sonar-Pro Model)**#### **Zoopla + Rightmove AI Tools**

- Both major portals investing heavily in AI in 2025

```typescript- Zoopla: 2.5X uplift in leads from AI personalization

async function runQueriesInParallel(prompts: string[]): Promise<SubPrompt[]> {- Rightmove: Google Gemini-powered local area guides

  const delayedPromises = prompts.map((prompt, index) => 

    new Promise<SubPrompt>((resolve) => {### International Comparisons (Feature Ideas)

      setTimeout(async () => {

        const client = new Perplexity({ apiKey: process.env.PERPLEXITY_API_KEY });- **Redfin (US):** Walk Score, transit score, climate risk, school ratings

        - **Zillow (US):** Zestimate, nearby sales, local market trends

        const completion = await client.chat.completions.create({- **Domain (Australia):** Neighborhood profiles, demographics

          model: "sonar-pro",

          messages: [### The "Just Use X" Test — CRITICAL ANALYSIS

            {

              role: "system",**Can a user accomplish your goals by:**

              content: "You are an expert real estate analyst. Provide concise summaries with citations."

            },| **Feature You Want to Build** | **Existing Tool** | **Can They Do It?** |

            { role: "user", content: prompt }|-------------------------------|-------------------|---------------------|

          ]| Find gyms near property | Google Maps | ✅ YES (instant, with ratings, distances) |

        });| Find supermarkets nearby | Google Maps | ✅ YES (instant, with ratings, prices) |

        | See property prices | Rightmove/Zoopla | ✅ YES (comprehensive, historical data) |

        resolve({ | Check school ratings | Rightmove/Zoopla | ✅ YES (Ofsted ratings included) |

          question: prompt, | Assess crime rates | Zoopla (2025) | ✅ YES (free, on every listing) |

          answer: completion.choices[0].message.content | Check flood risk | Zoopla (2025) | ✅ YES (free, on every listing) |

        });| Get neighborhood insights | Rightmove AI (2025) | ✅ YES (Google Gemini-powered guides) |

      }, index * 2000); // 2-second stagger to respect rate limits| View commute times | TfL Journey Planner | ✅ YES (real-time, accurate) |

    })| **Interactive visual exploration** | ❌ NONE | ❓ **YOUR DIFFERENTIATOR?** |

  );

  **Verdict:** **WEAK DIFFERENTIATION** on features, **POTENTIAL DIFFERENTIATION** on UX/UI if executed exceptionally well.

  return Promise.all(delayedPromises);

}---

```

## Part 3: Perplexity API Analysis - Hero or Supporting Actor?

**Why Sonar-Pro:** Deep reasoning, real-time data retrieval, and citation support for authoritative answers.

### What Perplexity Sonar Deep Research CAN Do

#### 3. **Follow-Up Intelligence**

**Confirmed Capabilities (2025 Launch):**

```typescript- **Exhaustive multi-source search:** Hundreds of sources analyzed

export async function POST(request: NextRequest) {- **Real-time web connectivity:** Up-to-date information (not training data cutoff)

  const { query, isFollowUp } = await request.json();- **Citations for every claim:** Verifiable sources included

  - **Expert-level synthesis:** Detailed reports on narrow topics

  if (isFollowUp) {- **93.9% accuracy on SimpleQA benchmark**

    // Single focused query

    const answer = await executeSingleQuery(query);**Best Use Cases for Housing:**

    return NextResponse.json({1. ✅ **Market trend analysis:** "Are property prices rising in Stratford, London?"

      widgets: [{ id: `widget-${Date.now()}`, title, content: answer }],2. ✅ **Qualitative neighborhood insights:** "What do residents say about living in Shoreditch?" (from Reddit, forums, blogs)

      is_followup: true3. ✅ **Investment analysis:** "Is Camden a good area for first-time buyers in 2025?"

    });4. ✅ **Real-time news:** "Any new developments planned near King's Cross?"

  } else {5. ✅ **Cost of living comparison:** "Compare cost of living in Hackney vs. Islington"

    // Initial search: 5 parallel queries

    const prompts = await generateSubPrompts(query);**POOR Use Cases (Use Specialized APIs Instead):**

    const results = await runQueriesInParallel(prompts);1. ❌ **Finding gyms nearby:** Google Places API is 10x better (ratings, photos, hours, membership costs)

    return NextResponse.json({ widgets: buildUiPayload(results) });2. ❌ **Finding supermarkets:** Google Places API is 10x better

  }3. ❌ **Commute time calculation:** TfL API is 10x better (real-time, accurate)

}4. ❌ **School ratings:** Ofsted API is the official source

```5. ❌ **Property prices:** Rightmove/Zoopla/Land Registry APIs are authoritative



**Innovation:** Context-aware query handling reduces response time for follow-ups from 15s to 5s.### The Honest Assessment: Where Does Perplexity Fit?



### Reasoning & Retrieval Capabilities Used**In your proposed architecture:**



#### **Reasoning Impact:**```

- **Query Decomposition** - Sonar intelligently breaks vague questions into specific research areasUser enters address

- **Synthesis** - Sonar-Pro combines multiple sources into coherent summaries     ↓

- **Context Understanding** - Maintains conversation context for follow-up queriesDisplay property image (center)

     ↓

#### **Retrieval Impact:**Show property details (left panel) ← NOT Perplexity (static data)

- **Real-Time Data** - Current rental prices, crime statistics, weather patterns     ↓

- **Multi-Source** - Aggregates from property sites, government databases, weather APIsShow nearby amenities (right panel) ← NOT Perplexity (Google Places API)

- **Citation Tracking** - Provides verifiable sources for every claim     ↓

Interactive mind map expansion ← NOT Perplexity (frontend UI)

**Result:** Users get comprehensive, trustworthy answers in seconds vs hours of manual research.     ↓

Neighborhood insights? ← MAYBE Perplexity (market trends, resident reviews)

---```



## 👥 Team Details**Perplexity is used for:** 10-20% of core functionality (neighborhood insights)

**Google Places API is used for:** 60-70% of core functionality (amenities)

### Louis Nguyen-Van**Frontend UI is:** 20-30% of value proposition (interactive exploration)

**Role:** Full-Stack Developer & Product Designer  

**LinkedIn:** [linkedin.com/in/louisnguyenvan](#)  **The Killer Question Judges Will Ask:**

**GitHub:** [github.com/lnv-louis](https://github.com/lnv-louis)"Why is this a **Perplexity** hackathon project? It's mostly Google Places API + React UI."



**Contributions:****Your Answer Must Be:**

- Architected Perplexity API integration (query decomposition, parallel orchestration)"Perplexity provides the CONTEXT and INSIGHTS that Google Places can't — qualitative neighborhood reviews, market trend analysis, investment advice, and multi-source synthesis of 'what it's really like to live here.' The amenities are data points; Perplexity gives you the STORY."

- Designed and implemented dynamic widget system with auto-sizing

- Built intelligent chat interface with follow-up detection**Verdict:** **PERPLEXITY IS A SUPPORTING ACTOR, NOT THE HERO** — this is a significant weakness for a Perplexity hackathon.

- Created infinite canvas with drag/drop/zoom functionality

- Implemented markdown rendering with citation link parsing---

- Wrote comprehensive documentation and testing guides

## Part 4: Technical Feasibility - Can You Build This in 27 Hours?

---

### Your Proposed UI/UX Vision

## 🏆 Why This Project Stands Out

**Inspired by:**

### 1. **Sophisticated API Orchestration**- Google Mixboard (grid-based, rearrangeable cards with smooth animations)

Unlike simple one-shot queries, we orchestrate complex multi-query workflows:- Obsidian (mind map expansion, node-based exploration)

- Initial search → 5 parallel queries- Pinterest (mood board, visual container layout)

- Follow-up → 1 focused query

- Rate limit management with strategic delays**Proposed Layout:**

- Dynamic response handling based on context- **Center:** Property image (hero image)

- **Left panel:** Property details (price, bedrooms, financing, description)

### 2. **User Experience Innovation**- **Right/expandable area:** Category cards (Gyms, Supermarkets, Transport, Schools)

- **Gemini-inspired animations** - Professional loading states- **Interaction:** Click "Gyms" → Card expands/splits into 5 gym cards with ratings, distances, links

- **Smart widget sizing** - Content-aware layout

- **Citation interactivity** - Clickable source badges### Frontend Framework Options & Time Estimates

- **Progressive disclosure** - Widgets appear sequentially

#### **Option 1: React Flow (Mind Map Style)**

### 3. **Technical Excellence**- **Library:** `reactflow` (npm)

- **Type-safe** - Full TypeScript implementation- **Features:** Node-based interactive graphs, drag-and-drop, zooming, panning

- **Performance** - React optimization, memoization- **Pros:** Battle-tested, excellent documentation, smooth interactions

- **Scalable** - Modular architecture, clean separation of concerns- **Cons:** Overkill for card-based layout (designed for flowcharts)

- **Production-ready** - Error handling, retry logic, loading states- **Time estimate:** 10-12 hours for custom property finder UI

- **Feasibility:** MODERATE (requires learning curve)

### 4. **Real-World Impact**

Housing decisions affect quality of life. Our tool:#### **Option 2: React Grid Layout + Framer Motion (Google Mixboard Style)**

- Reduces research time from hours to minutes- **Library:** `react-grid-layout` + `framer-motion`

- Provides comprehensive, cited information- **Features:** Rearrangeable grid, responsive, smooth animations

- Enables data-driven decision making- **Pros:** Perfect for card-based dashboards, drag-and-drop built-in

- Accessible interface for non-technical users- **Cons:** Requires custom expansion logic for cards

- **Time estimate:** 8-10 hours for interactive grid

---- **Feasibility:** MODERATE-HIGH (straightforward with examples)



## 📊 Metrics & Success#### **Option 3: React Masonry + Custom Logic (Pinterest Style)**

- **Library:** `react-responsive-masonry` or CSS Grid

| Metric | Value |- **Features:** Pinterest-style layout, dynamic heights, responsive

|--------|-------|- **Pros:** Visually appealing, fits "mood board" concept

| Lines of Code | ~3,500 |- **Cons:** Expansion interactions need custom JavaScript

| API Integration Time | 6 hours |- **Time estimate:** 10-12 hours for full interactivity

| Total Dev Time | 24 hours |- **Feasibility:** MODERATE (masonry is easy, expansions are hard)

| Perplexity Queries/Search | 5 parallel + N follow-ups |

| Average Response Time | 15s initial, 5s follow-up |#### **Option 4: Simple Tailwind CSS Grid (Pragmatic MVP)**

| User Research Time Saved | ~90% vs manual search |- **Library:** Tailwind CSS utility classes

- **Features:** Responsive grid, collapsible cards, basic animations

---- **Pros:** FAST to build (2-4 hours), no library dependencies

- **Cons:** Not as "wow factor" as React Flow/Mixboard-style

## 🔗 Links- **Time estimate:** 3-5 hours for functional dashboard

- **Feasibility:** HIGH (recommended for hackathon)

- **Live Demo:** [house-ai.vercel.app](#)

- **GitHub:** [github.com/lnv-louis/perplexity-hackathon](https://github.com/lnv-louis/perplexity-hackathon)### 27-Hour Reality Check (3-Person Team)

- **Demo Video:** [youtube.com/watch?v=...](#)

- **Documentation:** [Full Setup Guide](https://github.com/lnv-louis/perplexity-hackathon/blob/main/docs/SETUP_AND_TESTING.md)**Total Available Time:** ~27 hours (Friday 4pm → Saturday 7pm)

**Realistic Coding Time:** ~12-14 hours per person (accounting for sleep, meals, breaks)

---

**Person 1: Frontend (Interactive Dashboard)**

## 🙏 Acknowledgments- Hour 0-2: Setup (Next.js, Tailwind, basic routing)

- Hour 2-6: Property detail page layout (center image, left panel)

Thank you to the Perplexity AI team for:- Hour 6-10: Category card grid (Gyms, Supermarkets, Transport, Schools)

- Providing an exceptional API with reasoning capabilities- Hour 10-14: Expansion interaction (click card → show detailed sub-cards)

- Comprehensive documentation and SDK support- **Risk:** If using React Flow or complex animations, this could take 16+ hours (SCOPE KILLER)

- Hosting an inspiring hackathon that pushes innovation

**Person 2: Backend (API Integration)**

This project demonstrates the transformative potential of AI-powered research tools when reasoning meets real-time retrieval.- Hour 0-2: Setup (Express/FastAPI, environment config)

- Hour 2-6: Google Places API integration (find gyms, supermarkets, schools nearby)

---- Hour 6-10: Perplexity Sonar API integration (neighborhood insights, market trends)

- Hour 10-12: Geolocation logic (distance calculations, filtering)

**Submitted:** October 18, 2025  - Hour 12-14: API endpoints + error handling

**Platform:** Devpost  

**Category:** Perplexity AI Hackathon 2025**Person 3: Integration + Demo Prep**

- Hour 0-4: Property data preparation (manually input 3-5 London properties for demo)
- Hour 4-8: Connect frontend to backend APIs
- Hour 8-10: Pre-cache Perplexity responses (don't rely on live API during demo)
- Hour 10-12: Bug fixes, edge case handling
- Hour 12-14: Demo script, practice pitch, slide deck

### Scope Killers (AVOID THESE)

1. **"Let's scrape Rightmove/Zoopla for real property data"**
   - Time: 8-12 hours (anti-scraping measures, proxies, CAPTCHA)
   - **Better:** Manually input 3-5 properties for demo

2. **"Let's build an Obsidian-style mind map from scratch"**
   - Time: 12-16 hours (node positioning, connections, animations)
   - **Better:** Use React Grid Layout with card expansions

3. **"Let's integrate 5 different APIs (Google Places, TfL, Ofsted, Police.uk, Land Registry)"**
   - Time: 10-15 hours (each API = 2-3 hours)
   - **Better:** Focus on Google Places + Perplexity only

4. **"Let's build real-time commute calculation"**
   - Time: 6-8 hours (TfL API is complex)
   - **Better:** Pre-calculate commute times for demo properties

### Realistic MVP for 27 Hours

**MUST HAVE:**
- ✅ 3-5 pre-selected London properties (manual data entry)
- ✅ Interactive card grid dashboard (Tailwind CSS or React Grid Layout)
- ✅ Google Places integration for gyms, supermarkets (with ratings, distances)
- ✅ Perplexity integration for 1-2 neighborhood insights per property
- ✅ Card expansion UX (click Gyms → show 5 gyms in sub-cards)
- ✅ Smooth demo (pre-cached data, no live API dependencies)

**NICE TO HAVE (if time permits):**
- 🤞 Transport links (pre-cached TfL data)
- 🤞 School ratings (pre-cached Ofsted data)
- 🤞 Drag-and-drop card rearrangement
- 🤞 Save favorite properties

**CUT FROM MVP:**
- ❌ User authentication
- ❌ Real-time property scraping
- ❌ Custom map integration
- ❌ Chat interface
- ❌ Mobile responsive design (desktop demo only)

**Feasibility Verdict:** **TIGHT BUT POSSIBLE** if you use simple Tailwind grid and pre-cache all data. **HIGH RISK OF FAILURE** if you attempt React Flow or real-time API integrations.

---

## Part 5: The 7-Question Differentiation Test

Applying the framework from the critical analysis document to brutally evaluate this idea:

### Question 1: The "Just Use X" Test
**Can a user accomplish the same goal by just using existing tools?**

**Answer:** YES, mostly.

**Rightmove + Google Maps workflow:**
1. Search property on Rightmove → See price, photos, local area tab (schools, transport, crime)
2. Copy address → Paste into Google Maps → Search "gyms near [address]"
3. Repeat for supermarkets, restaurants, parks
4. Check Zoopla for additional insights (flood risk, planning applications)
5. Total time: ~15-20 minutes per property

**Your product workflow:**
1. Enter address → See all amenities in one dashboard
2. Total time: ~30 seconds per property

**Time savings:** 20-30X faster
**BUT:** Is speed the bottleneck, or is decision-making the bottleneck?

**Verdict:** ⚠️ **MARGINAL PASS** — You're faster, but not solving a fundamentally different problem.

### Question 2: The "10x Better" Test
**Are you 10x better on at least ONE dimension?**

| Dimension | Current Solution | Your Solution | 10x Better? |
|-----------|-----------------|---------------|-------------|
| **Speed** | 15-20 min (Rightmove + Google Maps) | 30 seconds | ✅ YES (20-30X faster) |
| **Cost** | Free | Free | ❌ NO (same) |
| **Accuracy** | Google Places (authoritative) | Google Places (same data) | ❌ NO (same) |
| **Comprehensiveness** | Rightmove + Zoopla have extensive data | Your data is subset | ❌ NO (worse) |
| **UX** | Multiple tabs, manual searches | Single interactive dashboard | ⚠️ MAYBE (10X better?) |

**Verdict:** ⚠️ **WEAK PASS** — You're significantly faster, and UX could be 10X better IF executed flawlessly. But you're not 10X better on accuracy or comprehensiveness.

### Question 3: The "Technical Complexity" Test
**Does your solution require genuine technical innovation?**

**NOT innovation:**
- ❌ Calling Google Places API for gyms (standard integration)
- ❌ Calling Perplexity API for insights (standard integration)
- ❌ Displaying property details (basic CRUD)
- ❌ Grid layout with cards (well-documented pattern)

**IS innovation (maybe):**
- ⚠️ Interactive card expansion UX (if genuinely smooth and delightful)
- ⚠️ Real-time multi-source synthesis (if Perplexity insights are deeply integrated, not tacked on)

**Verdict:** ❌ **FAIL** — This is mostly standard API integration + frontend polish, not technical innovation.

### Question 4: The "Real Problem" Test
**Are you solving a problem that exists, or creating a solution looking for a problem?**

**Real problem indicators:**
- ✅ Personal experience: Have YOU experienced this pain? (Need to confirm)
- ⚠️ Name 3 people with problem: Can you name 3 first-time buyers who said "I wish I had this"?
- ✅ Existing workaround: Yes, people manually Google amenities (tedious)
- ❌ People paying for solutions: No one pays for neighborhood discovery tools (Rightmove/Zoopla are free)

**Fake problem indicators:**
- ⚠️ "This would be cool to have" — Is this a vitamin (nice to have) or painkiller (must have)?
- ⚠️ "AI can automate X" — Just because you CAN automate amenity search doesn't mean you SHOULD

**Verdict:** ⚠️ **BORDERLINE PASS** — Real problem exists (information asymmetry), but your solution addresses a SYMPTOM (amenity discovery) rather than the ROOT CAUSE (lifestyle fit prediction).

### Question 5: The "27-Hour Reality" Test
**Can you build a WORKING demo in 27 hours?**

**Scope breakdown:**
- Frontend (interactive dashboard): 12-14 hours
- Backend (Google Places + Perplexity): 10-12 hours
- Integration + demo prep: 8-10 hours
- **TOTAL: 30-36 hours** ← **OVER BUDGET**

**Mitigation:**
- Use Tailwind CSS grid (not React Flow): Saves 6-8 hours
- Pre-cache all data: Saves 2-3 hours
- Manual property input: Saves 8-10 hours
- **REVISED TOTAL: 20-25 hours** ← **ACHIEVABLE**

**Verdict:** ⚠️ **TIGHT PASS** — Achievable if you ruthlessly cut scope and use simple UI frameworks.

### Question 6: The "Demo Impact" Test
**Can you demonstrate clear value in 3 minutes that makes judges go "wow"?**

**Proposed Demo Script:**

**Hook (20 seconds):**
"You found a flat on Rightmove. Looks perfect. You move in. Week 1: Nearest gym is 2 miles away. Week 2: Local Tesco is tiny. Week 3: Commute is 90 minutes, not 45. **What if you knew ALL this before viewing?**"

**Live Demo (2 minutes):**
1. Show property: "2-bed flat in Stratford, £450k"
2. Dashboard loads:
   - Center: Property image
   - Left: Price, bedrooms, financing
   - Right: Category cards: 🏋️ Gyms | 🛒 Supermarkets | 🚇 Transport
3. Click "Gyms" → 5 gym cards expand:
   - PureGym Stratford: 0.3 miles, £25/month, 4.2★
   - Virgin Active: 0.8 miles, £60/month, 4.5★
4. Click "Perplexity Insights" → Shows:
   - "Stratford has seen 12% property price growth in 2024-2025 due to Elizabeth Line"
   - "Residents say: Great transport links, but area still developing"

**Impact (30 seconds):**
"No more surprises. Everything you need to decide, in one interactive dashboard. Powered by Perplexity's real-time research."

**Assessment:**
- **Strengths:** Relatable problem, clear before/after, visual demo
- **Weaknesses:** Judges might think "this is just a prettier Rightmove"
- **Wow factor:** Depends ENTIRELY on UI smoothness. If cards stutter or API calls fail, demo flops.

**Verdict:** ⚠️ **MODERATE** — Demo is solid if executed perfectly, but high risk of "so what?" reaction.

### Question 7: The "Moat" Test
**What prevents Rightmove from adding this feature next month?**

**Your moat:**
- ❌ Google Places API? (Anyone can integrate)
- ❌ Perplexity API? (Anyone can integrate)
- ❌ Interactive UI? (Rightmove has entire design teams)
- ⚠️ First-mover advantage in hackathon? (Weak moat)

**Rightmove's advantages:**
- ✅ 80% UK market share
- ✅ Millions of property listings
- ✅ Existing user base trusts them
- ✅ Already integrated local area data (2025 AI features)
- ✅ Can hire React developers to build this in 2 weeks

**Verdict:** ❌ **FAIL** — Zero moat. This is a feature Rightmove could add trivially.

---

## Part 6: The Differentiation Test Summary

| Question | Score | Pass/Fail |
|----------|-------|-----------|
| 1. Just Use X Test | ⚠️ Marginal | WEAK PASS |
| 2. 10x Better Test | ⚠️ Only on speed | WEAK PASS |
| 3. Technical Complexity | ❌ Not innovative | **FAIL** |
| 4. Real Problem Test | ⚠️ Symptom vs. root cause | BORDERLINE |
| 5. 27-Hour Reality | ⚠️ Tight but possible | PASS |
| 6. Demo Impact Test | ⚠️ Depends on execution | MODERATE |
| 7. Moat Test | ❌ Zero moat | **FAIL** |

**OVERALL VERDICT:** **3 Passes, 2 Fails, 2 Borderline** — This idea has **SIGNIFICANT WEAKNESSES** compared to the top ideas in the critical analysis (Technical Debt Estimator: 7/7 passes).

---

## Part 7: London Market Data & Data Sources

### London Property Prices by Borough (2025)

**Most Expensive:**
- Kensington & Chelsea: £1.2M+ average
- Westminster: £1M+ average
- Camden: £800K+ average

**Mid-Range:**
- Hackney: £600K-£700K
- Islington: £650K-£750K
- Stratford: £450K-£550K

**More Affordable:**
- Barking & Dagenham: £350K-£400K
- Croydon: £400K-£450K
- Bexley: £400K-£450K

**First-Time Buyer Average (London):** £478,000
**Average Deposit Required:** £125,000

### Rental Market Trends (2025)

**Average Rent (London):** £2,300/month (up 4.5% from Q4 2024)

**By Borough:**
- Kensington & Chelsea: £3,614/month
- Westminster: £3,291/month
- Bexley: £1,411/month (most affordable)

**Days on Market:** 16.17 days average (up from 13.23 days in 2024)
**Fastest:** Haringey (5.05 days)

### UK Data Sources (Free APIs)

1. **Land Registry API** — Official property price data (free)
2. **Police.uk API** — Crime statistics by postcode (free)
3. **Ofsted API** — School ratings (free)
4. **TfL API** — Transport links, journey planner (free)
5. **Google Places API** — Amenities, ratings, photos (free tier: 3,000 requests/month)
6. **Perplexity Sonar API** — Real-time research, citations (paid: $0.20-$5 per 1M tokens)

**Recommendation:** Focus on **Greater London only** for MVP. UK-wide is too complex (different transport systems, regional variations).

---

## Part 8: UI/UX Design Strategy (Google Mixboard Inspiration)

### What We Learned About Google Mixboard

**Launched:** September 2025 (very recent!)
**Purpose:** AI-powered concepting board to explore, expand, and refine ideas
**Key Features:**
- **Grid-based layout:** 12-column grid, card grid structures
- **Dynamic, AI-first approach:** Interactive and generative
- **Natural language prompts:** Create and edit images/text
- **Real-time reaction:** Canvas reacts to ideas instantly
- **Collaboration:** Share boards with team members

**Technical Stack:**
- Powered by: Google Nano Banana + Gemini 2.5 Flash
- Access: labs.google/mixboard

### Applying Mixboard Principles to Housing Finder

**Your Dashboard Design:**

```
┌─────────────────────────────────────────────────────┐
│  Property Details (Left Panel)                      │
│  - Price: £450,000                      ┌─────────┐ │
│  - Bedrooms: 2                          │ Property│ │
│  - Transport: Stratford Station (10min) │  Image  │ │
│  - Financing options                    │ (Center)│ │
│                                         └─────────┘ │
│                                                     │
│  Category Cards (Right/Expandable)                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                 │
│  │🏋️Gyms│ │🛒Shop│ │🚇Trans│ │🏫School│            │
│  └─────┘ └─────┘ └─────┘ └─────┘                 │
│                                                     │
│  [When "Gyms" clicked, expands to:]                │
│  ┌──────────────────────────────────────────────┐ │
│  │ PureGym Stratford | 0.3mi | £25/mo | 4.2★  │ │
│  │ Virgin Active     | 0.8mi | £60/mo | 4.5★  │ │
│  │ The Gym Group     | 1.2mi | £20/mo | 4.0★  │ │
│  └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Interaction Model (Mixboard-Inspired):**
1. **Card-based interface** — Each category (Gyms, Supermarkets) is a card
2. **Click to expand** — Card splits/expands into sub-cards (specific gyms)
3. **Rearrangeable** — Drag cards to reorder priorities
4. **Visual focus** — Property image stays centered (hero element)
5. **Real-time updates** — If user changes property, all cards refresh

### Recommended UI Framework

**For 27-Hour Hackathon:**

**Winner: Tailwind CSS + React Grid Layout**

**Why:**
- ✅ Fast to implement (3-5 hours for basic grid)
- ✅ Responsive out of the box
- ✅ Smooth animations with Tailwind transitions
- ✅ Rearrangeable cards with `react-grid-layout`
- ✅ Well-documented, lots of examples

**Installation:**
```bash
npm install react-grid-layout tailwindcss framer-motion
```

**Basic Code Structure:**
```jsx
import GridLayout from 'react-grid-layout';
import { motion } from 'framer-motion';

const PropertyDashboard = ({ property }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Panel: Property Details */}
      <div className="col-span-3">
        <PropertyDetails property={property} />
      </div>

      {/* Center: Property Image */}
      <div className="col-span-6">
        <img src={property.image} className="w-full h-auto" />
      </div>

      {/* Right: Category Cards */}
      <div className="col-span-3">
        <GridLayout>
          <motion.div whileHover={{ scale: 1.05 }}>
            <CategoryCard title="Gyms" icon="🏋️" />
          </motion.div>
          {/* More cards... */}
        </GridLayout>
      </div>
    </div>
  );
};
```

**Alternative (if you want more "wow"):**
- Use `react-spring` for physics-based animations
- Use `react-beautiful-dnd` for drag-and-drop
- **Time cost:** +4-6 hours

**Recommendation:** Start with simple Tailwind grid. Add fancy animations ONLY if you have time after core features work.

---

## Part 9: Demo Strategy & Pitch

### 3-Minute Demo Script (Optimized for Perplexity Hackathon)

**Slide 1: The Problem (20 seconds)**

"Imagine you're a first-time buyer in London. Average price: £478,000. Average deposit: £125,000. You find a flat on Rightmove. Looks perfect. You view it. You make an offer. You move in.

Week 1: Discover nearest gym is 2 miles away.
Week 2: Local Tesco is tiny, queue is 30 minutes.
Week 3: Your commute is 90 minutes, not 45.

**Too late. You're locked in.**"

**Slide 2: Existing Solutions Suck (20 seconds)**

"How do buyers research neighborhoods today?

1. Rightmove → See property details (but limited local info)
2. Copy address → Google Maps → Search 'gyms near X'
3. Repeat for supermarkets, schools, transport
4. Open 15 tabs, compare manually
5. **Time: 15-20 minutes per property**

**There has to be a better way.**"

**Slide 3: Our Solution (10 seconds)**

"Meet **NeighborLens** — the AI-powered neighborhood intelligence dashboard.

One address. One dashboard. Everything you need to decide."

**Live Demo (1 minute 40 seconds)**

[Screen: Dashboard with property in center]

"Let's search for a property: **2-bed flat in Stratford, £450,000**"

[Dashboard loads — property image appears in center]

"Here's the property. On the left: price, bedrooms, financing options."

[Camera focuses on right panel — category cards appear]

"On the right: **Category cards** powered by Perplexity and Google Places."

[Click "🏋️ Gyms" card]

"Click **Gyms** — instant expansion:"

[5 gym sub-cards appear with smooth animation]

- "**PureGym Stratford**: 0.3 miles, £25/month, 4.2★"
- "**Virgin Active**: 0.8 miles, £60/month, 4.5★"
- "5 gyms analyzed in **2 seconds**"

[Click "🛒 Supermarkets" card]

"Click **Supermarkets**:"

[Supermarket cards appear]

- "**Tesco Extra**: 0.5 miles, open 24/7"
- "**Waitrose**: 0.8 miles, premium"

[Click "💡 Perplexity Insights" card — THIS IS THE KEY PERPLEXITY SHOWCASE]

"Now here's where **Perplexity** shines. Click **Neighborhood Insights**:"

[Panel expands with Perplexity-generated research]

**Display:**
```
📊 Market Analysis (Perplexity Deep Research)
- Stratford property prices: +12% (2024-2025)
- Driver: Elizabeth Line opening
- Forecast: Continued growth (Crossrail effect)

🗣️ What Residents Say (Reddit, forums analyzed)
- "Great transport links to Canary Wharf (15 min)"
- "Westfield shopping center is massive plus"
- "Area still developing, some parts feel rough"

🏗️ Upcoming Developments
- 3 new residential towers approved (2026)
- Stratford Waterfront cultural district opening
```

"**This is what Rightmove CAN'T give you** — synthesized insights from hundreds of sources, real-time market analysis, resident reviews from Reddit and forums."

**Slide 4: The Impact (30 seconds)**

"**Before:** 15-20 minutes of manual research per property
**After:** 30 seconds, all in one dashboard

**Before:** Scattered tabs, fragmented information
**After:** Visual, interactive, comprehensive

**Before:** Guessing if neighborhood fits your lifestyle
**After:** Data-driven decision with cited sources

**Powered by Perplexity's Sonar Deep Research for insights, Google Places for amenities, built in 27 hours.**"

**Slide 5: Q&A Preparation (judges will ask)**

**Expected Judge Questions:**

1. **"Why wouldn't I just use Rightmove + Google Maps?"**
   - **Answer:** "Speed (30 sec vs. 15 min) and **synthesized insights**. Rightmove shows you DATA. We show you CONTEXT — market trends, resident reviews, investment outlook. That's Perplexity's superpower."

2. **"Isn't this just a prettier Rightmove?"**
   - **Answer:** "Rightmove shows properties. We show **neighborhoods**. Our focus is lifestyle fit prediction, not property listings. Perplexity's multi-source synthesis turns raw data into actionable insights."

3. **"What stops Rightmove from building this?"**
   - **Answer:** "Nothing — and they should! But in a hackathon context, we're demonstrating how Perplexity's API enables rapid prototyping of neighborhood intelligence tools. This is a proof-of-concept for PropTech innovation."

4. **"Why is this a Perplexity project? Most features use Google Places."**
   - **Answer:** "Google Places gives you **what's there**. Perplexity tells you **what it's like** — market trends, resident sentiment, investment outlook. The amenities are prerequisites; Perplexity provides the **decision-making context**."

### Pre-Demo Preparation Checklist

**48 Hours Before Hackathon:**
- [ ] Select 3-5 London properties (Stratford, Camden, Hackney, Islington, Shoreditch)
- [ ] Pre-fetch Google Places data for each (gyms, supermarkets, transport)
- [ ] Pre-run Perplexity Deep Research queries for neighborhood insights
- [ ] Save all responses as JSON (don't rely on live API calls during demo)
- [ ] Find high-quality property images (Unsplash, Rightmove screenshots)

**During Hackathon:**
- [ ] Build UI with pre-cached data first (don't wait for APIs)
- [ ] Test demo flow 10+ times before presentation
- [ ] Have backup plan if internet fails (all data cached locally)
- [ ] Practice pitch with timer (stay under 3 minutes)

---

## Part 10: Risk Analysis & Failure Modes

### Critical Risks (High Probability, High Impact)

#### **Risk 1: "Just Use Rightmove + Google Maps" Objection**
**Probability:** 90%
**Impact:** HIGH (judges dismiss idea immediately)
**Mitigation:**
- Emphasize **speed** (20-30X faster)
- Emphasize **Perplexity's unique value** (synthesized insights, market trends)
- Show side-by-side comparison: "This would take 15 minutes manually. We did it in 30 seconds."

#### **Risk 2: UI Complexity Eats All Your Time**
**Probability:** 70% (if you use React Flow or custom animations)
**Impact:** CRITICAL (no working demo)
**Mitigation:**
- Use **Tailwind CSS grid** (simple, fast)
- Cut scope ruthlessly: No drag-and-drop, no animations, no mobile responsive
- Focus on functional demo over pretty demo

#### **Risk 3: Perplexity is Peripheral, Not Central**
**Probability:** 80%
**Impact:** HIGH (wrong project for Perplexity hackathon)
**Mitigation:**
- Make Perplexity insights the **hero** of the demo (spend 30 seconds showcasing Deep Research output)
- Don't just show gym lists — show **why Stratford is a good investment** (Perplexity analysis)
- Position as "Perplexity-powered neighborhood intelligence" not "property search"

#### **Risk 4: Demo Breaks During Presentation**
**Probability:** 50% (if relying on live API calls)
**Impact:** CRITICAL (demo flops)
**Mitigation:**
- **Pre-cache EVERYTHING** — all API responses saved as JSON
- No live API calls during demo
- Test with offline mode to ensure cached data loads correctly

#### **Risk 5: Judge Says "This is Just a Feature, Not a Product"**
**Probability:** 60%
**Impact:** HIGH
**Mitigation:**
- Acknowledge this: "Yes, this SHOULD be a feature in Rightmove/Zoopla. But it doesn't exist yet, and Perplexity's API makes it trivial to build."
- Position as **proof-of-concept** for PropTech innovation, not a standalone startup

### Medium Risks (Moderate Probability/Impact)

- **Data accuracy issues:** Google Places data might be outdated (gym closed, supermarket moved)
  - **Mitigation:** Verify data manually before demo

- **London-specific limitations:** Tool only works in London, judges ask about scalability
  - **Mitigation:** "London MVP. UK-wide expansion requires regional data sources (TfL → regional transport APIs)."

- **Amenity overemphasis:** Judges think this is too shallow ("just gym locations")
  - **Mitigation:** Spend more demo time on Perplexity insights (market trends, resident reviews)

### Low Risks (Low Probability or Low Impact)

- API rate limits hit during development
- Property images have copyright issues
- Judges don't understand UK property market

---

## Part 11: Alternative Pivots (If You Realize This Won't Work)

If you're reading this 6 hours into the hackathon and realizing the housing finder is too weak, **pivot immediately** to one of these alternatives:

### **Pivot 1: "Neighborhood Investment Analyzer"**
**Target:** Property investors, not home buyers
**Problem:** Investors want data-driven ROI predictions
**Solution:** Perplexity analyzes market trends, development plans, demographic shifts → Investment score
**Why better:** Clearer differentiation (Zoopla doesn't provide investment analysis)
**Perplexity centrality:** HIGH (80% of value is market research)
**Time to pivot:** 4-6 hours

### **Pivot 2: "First-Time Buyer Risk Advisor"**
**Target:** First-time buyers who don't know what to check
**Problem:** First-time buyers miss red flags (leasehold traps, cladding issues, flood risk)
**Solution:** Enter address → Perplexity researches property history → Flags risks
**Why better:** Goes beyond amenities to RISK ASSESSMENT
**Perplexity centrality:** HIGH (70% of value)
**Time to pivot:** 3-5 hours

### **Pivot 3: "Expat Neighborhood Matcher"**
**Target:** Expats moving to London (don't know areas)
**Problem:** "Which London neighborhood feels like Brooklyn?" or "Where should I live if I work in Canary Wharf and want good nightlife?"
**Solution:** User describes preferences → Perplexity researches neighborhoods → Matches
**Why better:** Personalized, not just data dumps
**Perplexity centrality:** VERY HIGH (90% of value)
**Time to pivot:** 4-6 hours

**Recommendation:** If you're not confident in the housing finder by Hour 6, **pivot to Expat Neighborhood Matcher** (strongest Perplexity fit, most differentiated).

---

## Part 12: Final Verdict & Recommendations

### Success Probability Assessment

**Factors:**

| Factor | Weight | Score (1-10) | Weighted Score |
|--------|--------|--------------|----------------|
| Problem validation | 20% | 6 | 1.2 |
| Differentiation vs. competitors | 25% | 4 | 1.0 |
| Perplexity centrality | 20% | 3 | 0.6 |
| 27-hour feasibility | 15% | 7 | 1.05 |
| Demo impact | 10% | 6 | 0.6 |
| Judge appeal | 10% | 7 | 0.7 |
| **TOTAL** | **100%** | — | **5.15/10** |

**Success Probability: 35-45%**

**Comparison to Other Ideas:**
- Technical Debt Estimator: **70%** (clear differentiation, Perplexity is central)
- Regulatory Monitor: **65%** (timely problem, strong Perplexity fit)
- Contract Analyzer: **60%** (universal appeal, moderate differentiation)
- **Housing Finder: 35-45%** (weak differentiation, Perplexity is peripheral)

### Should You Build This?

**Build Housing Finder IF:**
- ✅ You're VERY confident in your frontend skills (can build smooth UI in 8-10 hours)
- ✅ You accept this is a "demo showcase" not a viable startup
- ✅ You're willing to pivot if it's not working by Hour 6
- ✅ Your team has personal experience with London house hunting frustrations

**Choose a Different Idea IF:**
- ❌ You want the highest chance of winning (choose Technical Debt Estimator instead)
- ❌ You want Perplexity to be the hero (choose Regulatory Monitor instead)
- ❌ You're worried about 27-hour feasibility (choose Contract Analyzer with text input only)
- ❌ You want a strong moat and differentiation (this idea has neither)

---

## Part 13: If You Decide to Build This Anyway...

### Execution Checklist (Hour-by-Hour)

**Friday 4pm - 6pm (Hour 0-2): Setup & Architecture**
- [ ] Create Next.js app with Tailwind
- [ ] Set up environment variables (Google Places API, Perplexity API)
- [ ] Architecture diagram on whiteboard
- [ ] Assign roles: Person 1 (Frontend), Person 2 (Backend), Person 3 (Integration)

**Friday 6pm - 10pm (Hour 2-6): Core Integrations**
- [ ] Person 1: Basic layout (3-column grid, property card in center)
- [ ] Person 2: Google Places API integration (gyms, supermarkets)
- [ ] Person 3: Manually input 3 London properties (Stratford, Camden, Hackney)

**Friday 10pm - 12am (Hour 6-8): Checkpoint**
- [ ] Person 1: Category cards (Gyms, Supermarkets, Transport, Schools)
- [ ] Person 2: Perplexity API integration (neighborhood insights)
- [ ] Person 3: Connect frontend to backend (API routes)
- **DECISION POINT:** If UI is not functional by Hour 8, **simplify** (cut animations, use plain HTML table)

**Saturday 12am - 2am (Hour 8-10): Sleep (DO NOT SKIP)**

**Saturday 8am - 12pm (Hour 10-14): Core Features**
- [ ] Person 1: Card expansion logic (click Gyms → show sub-cards)
- [ ] Person 2: Pre-cache all Perplexity responses (no live API calls)
- [ ] Person 3: Bug fixes, edge case handling

**Saturday 12pm - 4pm (Hour 14-18): Polish**
- [ ] Person 1: Animations, hover effects, loading states
- [ ] Person 2: Error handling, fallback data
- [ ] Person 3: Demo script, slide deck (5 slides max)

**Saturday 4pm - 6pm (Hour 18-20): Demo Prep**
- [ ] Practice demo 10+ times
- [ ] Time demo (must be under 3 minutes)
- [ ] Prepare Q&A answers
- [ ] Test offline mode (all data cached)

**Saturday 6pm - 7pm (Hour 20-21): Presentations**

### Key Success Metrics

**You'll know you're on track if:**
- ✅ By Hour 6: Basic dashboard layout is functional (can display 1 property)
- ✅ By Hour 10: Category cards display amenity data from Google Places
- ✅ By Hour 14: Card expansion works smoothly (click Gyms → see gym list)
- ✅ By Hour 18: Perplexity insights are integrated and display correctly
- ✅ By Hour 20: Demo runs without errors 3 times in a row

**Red flags (consider pivot):**
- 🚩 Hour 8: UI still broken, cards don't display
- 🚩 Hour 12: Google Places integration not working
- 🚩 Hour 16: No Perplexity integration yet
- 🚩 Hour 18: Demo crashes when you practice

---

## Conclusion: The Bottom Line

Your AI housing finder idea has **merit** but **significant risks**:

### ✅ What's Good
- Real problem (information asymmetry in house hunting)
- Compelling UI concept (interactive dashboard is genuinely different)
- Universal appeal (everyone can relate to house hunting)
- Strong execution could impress judges

### ❌ What's Weak
- **Weak differentiation** (Rightmove + Google Maps does 80% of this)
- **Perplexity is peripheral** (only 10-20% of core functionality)
- **Zero moat** (Rightmove could add this feature in 2 weeks)
- **High execution risk** (UI complexity could kill your timeline)

### 🎯 Final Recommendation

**For This Hackathon:**
1. **First choice:** Build **Technical Debt Estimator** (70% success probability, strong Perplexity fit)
2. **Second choice:** Build **Regulatory Monitor** (65% success, timely problem)
3. **Third choice:** Build **Housing Finder** IF you're confident in frontend skills and accept lower success probability

**If You Build Housing Finder:**
- Use **Tailwind CSS grid** (not React Flow)
- **Pre-cache all data** (no live API calls)
- Make **Perplexity insights the hero** of the demo (not amenity lists)
- Have **pivot plan ready** (Expat Neighborhood Matcher) if not working by Hour 6

**Success Probability: 35-45%**

Good luck. You'll need it.

---

**Report Prepared By:** Hackathon Research Analyst
**Date:** October 17, 2025
**Status:** COMPREHENSIVE EVALUATION COMPLETE
**Next Steps:** Review this report → Make informed decision → Commit fully to chosen idea → Execute ruthlessly

**Remember:** The goal isn't to build a perfect product. The goal is to **win the hackathon** by demonstrating clear value, strong Perplexity API usage, and exceptional execution in 27 hours. Choose wisely.
