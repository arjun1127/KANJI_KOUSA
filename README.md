# Kanji Kousa - Learn Kanji the Smart Way 
Kanji Kousa is a full-featured web application built to help users master essential and 
JLPT-level kanji through flashcards, AI chat assistance, dynamic quizzes, and detailed 
user analytics.
------------------------------------------------------------------------------------------
link
```
https://kanji-kousa-1.onrender.com/
```
------------------------------------------------------------------------------------------
## Tech Stack

* Frontend: React.js, React Router, React Charts, Auth0
* Backend: Node.js / Express (API endpoints),  PostgreSQL
* External APIs: KanjiAPI.dev, Google Gemini (AI chatbot)
* Auth: Auth0
* Styling: CSS Modules / Styled Components / Tailwind (whichever used)

------------------------------------------------------------------------------------------
## Key Features

1. Home Page - Daily Kanji Cards
   
Flashcards of must-know kanji are dynamically fetched from the backend database.
Additional flashcards are fetched from KanjiAPI.dev to display JLPT-level kanji (N5–N1).
Cards are displayed with structured kanji information for quick review.

2.  Kanji Flashcards Page

Choose JLPT level (N5 to N1) and revise kanji with detailed meanings, readings, and stroke info.
Real-time API-based fetching for characters and their metadata.
Paginated view (12 cards per page) for an organized experience.

Pseudo-code Overview:
```
- Fetch JLPT-level kanji on level selection from KanjiAPI.
- Then fetch full details of each kanji in parallel.
- Render them with pagination controls (12 per page).
```

3. Random Quiz Generator (N5 to N1)

Quizzes are dynamically generated from a custom JSON file of over 700+ curated kanji questions.
User selects level, and a new random quiz is shown on every submission.
Focused on level-wise practice; no mixed-level quizzes.

4. Dashboard Page (User Analytics)

Displays logged-in user's email and score history by level.
Data fetched using Auth0 + Backend API on page load.
Interactive charts (React Charts) show:
Highest Score
Average Score
Score Trend by Date
```
Component Logic Summary:
- On login, fetch user results via email from backend.
- Filter results by JLPT level using dropdown.
- Display data in styled charts showing performance trend.
```

5. Kanji AI Assistant (Chatbot Page)
Built with Google Gemini API to serve as a Kanji tutor.
Allows users to ask meanings, stroke order, usage, etc.
Uses cleanResponseText() to strip markdown/formatting from AI responses.

AI Response Cleaning Function:
```
function cleanResponseText(text) {
  if (!text) return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")  // bold
    .replace(/\*([^*]+)\*/g, "$1")      // italics
    .replace(/^\s*\* /gm, "- ")         // bullet
    .replace(/^(\d+)\.\s+/gm, (m, p1) => `${p1}. `)
    .trim();
}
```
UI: Glowing background with "falling snow" animation for an immersive learning environment.
------------------------------------------------------------------------------------------

## Authentication

Integrated Auth0 to handle user login/logout and secure data retrieval.
User data is only fetched and visualized if authenticated.



