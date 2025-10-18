# 🏠 Homiq - Intelligent Housing Research Assistant

> A hackathon project powered by the Perplexity API for real-time housing intelligence.

An intelligent housing research platform that transforms complex location queries into beautifully visualized, actionable insights on an infinite canvas.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Perplexity](https://img.shields.io/badge/Perplexity-API-purple)](https://www.perplexity.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🔍 **AI-Powered Research**
- **Initial Multi-Faceted Search**: A single query generates a comprehensive dashboard covering Safety, Amenities, Lifestyle, Properties, and Weather.
- **Intelligent Follow-up Queries**: The chat interface remembers the conversation context, allowing for detailed follow-up questions that add new widgets to the canvas.
- **Content Moderation**: Politely refuses to answer off-topic or inappropriate questions.

### 📊 **Dynamic Widget System**
- **Interactive Canvas**: A zoomable, pannable infinite canvas to organize your research.
- **Draggable & Resizable Widgets**: Arrange your workspace exactly how you like it.
- **Expandable Widgets**: View a quick summary or expand any widget to see the full details.
- **Smart Icons**: Icons are automatically assigned to widgets based on their content.

### 💾 **Session & Widget Persistence**
- **Conversation Persistence**: Your current conversation, including all widgets and chat messages, is preserved as you navigate between pages.
- **Save to Collection**: Save your favorite or most important widgets to a personal "My Collection" page.
- **Browser-Based Storage**: Uses your browser's Local Storage to remember your saved widgets and current session, no account required.

### 🎨 **Modern User Experience**
- **Gemini-Inspired Animations**: Subtle "Thinking" animations provide feedback without being intrusive.
- **Clickable Citations**: Source links `[1]` in the text and footer are hyperlinked for easy verification.
- **Full Markdown Rendering**: Widget content is beautifully formatted with headers, lists, and bold text.

---

## 🚀 Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lnv-louis/perplexity-hackathon.git
    cd perplexity-hackathon
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment:**
    Create a new file named `.env.local` in the root of the project and add your Perplexity API key:
    ```env
    PERPLEXITY_API_KEY=your_key_here
    ```
    You can get an API key from [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Perplexity API Integration

This project leverages the **Perplexity API** as its core intelligence engine for the hackathon. Here's how:

### **API Implementation**
-   **SDK**: Uses the official `@perplexity-ai/perplexity_ai` TypeScript SDK
-   **Model**: Powered by `sonar-pro` for high-quality, citation-backed responses
-   **Streaming**: Implements server-side streaming for real-time response generation
-   **Context Awareness**: Maintains conversation history (RAG-like memory) to enable intelligent follow-up queries

### **Key Features Enabled by Perplexity**
1.  **Multi-Widget Generation**: A single query generates multiple contextual widgets (Safety, Transport, Reviews, etc.)
2.  **Citation-Rich Content**: All widget content includes verifiable sources with clickable citations `[1]`
3.  **Structured Data Extraction**: The API returns both markdown content and structured data (scores, metrics, locations)
4.  **Conversational Intelligence**: Follow-up questions understand previous context, creating a seamless research experience

### **API Flow**
```
User Query → Next.js API Route (/api/search) → Perplexity API (sonar-pro) → 
Structured Response → Widget Renderer → Interactive Canvas Display
```

The Perplexity API's ability to provide real-time, cited, and contextually-aware responses is what makes Homiq's intelligent housing research possible.

---

## 🛠️ Technical Architecture

This project is a modern, full-stack TypeScript application built with Next.js.

-   **Frontend**: Built with **React 19** and styled with **Tailwind CSS**. It features a dynamic, interactive canvas using `react-grid-layout` and `react-zoom-pan-pinch`.
-   **Backend**: A **Next.js API Route** (`/api/search`) serves as the backend. It receives requests from the frontend, orchestrates calls to the Perplexity API, and formats the data for display.
-   **Perplexity Integration**: The official `@perplexity-ai/perplexity_ai` SDK is used. The `sonar-pro` model powers all the research and content generation.
-   **State Management**: The application uses a combination of **React Context** and a custom **`useLocalStorage` hook** to manage state. The React Context preserves the user's session during navigation, while Local Storage is used to persist the user's saved widget collection.

---

## 📦 Key Dependencies

-   `next`: The React framework.
-   `react`: For building the user interface.
-   `@perplexity-ai/perplexity_ai`: The official Perplexity API SDK.
-   `react-grid-layout`: For the draggable and resizable widget grid.
-   `react-zoom-pan-pinch`: For the infinite canvas functionality.
-   `react-markdown`: To render AI-generated markdown content.
-   `tailwindcss`: For styling.
-   `lucide-react`: For icons.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.