# 🇯🇵 Kanji Kousa - Learn Kanji the Smart Way

Kanji Kousa is a full-featured web application built to help users master essential and JLPT-level kanji through flashcards, AI chat assistance, dynamic quizzes, and detailed user analytics.

---

### 🔗 Live Link  
```
https://kanji-kousa-1.onrender.com/
```
---

## 💻 Tech Stack

- **Frontend**: React.js, React Router, React Charts, Auth0  
- **Backend**: Node.js / Express (API endpoints), PostgreSQL  
- **External APIs**: KanjiAPI.dev, Google Gemini (AI chatbot)  
- **Authentication**: Auth0  
- **Styling**: CSS Modules / Styled Components / Tailwind CSS (as used)

---

## ✨ Key Features

### 1. 🏠 Home Page - Daily Kanji Cards

- Flashcards of must-know kanji are dynamically fetched from the backend database.
- Additional flashcards are fetched from **KanjiAPI.dev** to display JLPT-level kanji (N5–N1).
- Cards are displayed with structured kanji information for quick review.

---

### 2. 🈶 Kanji Flashcards Page

- Choose JLPT level (N5 to N1) and revise kanji with detailed meanings, readings, and stroke info.
- Real-time API-based fetching for characters and their metadata.
- Paginated view (12 cards per page) for an organized experience.

#### ⚙️ Pseudo-code Overview:
```
// On level change:
- Fetch JLPT-level kanji list from KanjiAPI
- Fetch full kanji details in parallel using Promise.all
- Display with pagination (12 per page)
```

### 3. 🎯 Random Quiz Generator (N5 to N1)

- Quizzes are dynamically generated from a custom JSON file of over **700+ curated kanji questions**.
- User selects JLPT level, and a **new random quiz** appears on every attempt.
- Designed for **focused level-wise practice** — no mixed-level quizzes.

---

### 4. 📊 Dashboard Page (User Analytics)

- Displays the **logged-in user's email** and **quiz score history** grouped by JLPT level.
- Data is securely fetched from the backend using **Auth0-authenticated email** on page load.
- Interactive visualizations powered by **React Charts** show:
  - 📈 Highest Score  
  - 📊 Average Score  
  - 📅 Score Trend by Date

#### ⚙️ Component Logic Summary:
```
// Dashboard logic flow:
- On login, fetch user results from backend using email.
- Provide dropdown to filter results by JLPT level.
- Render results in clean, styled React charts.
```
5. 🤖 Kanji AI Assistant (Chatbot Page)
Built using Google Gemini API to serve as an intelligent Kanji tutor.

Users can ask about:

Kanji meanings

Stroke orders

Word usage

Example sentences

To clean AI responses for display, a markdown-stripper function is used.

🧼 AI Response Cleaning Function:
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
✨ UI includes a glowing animated background with falling snow for an immersive learning experience.

## Authentication

Integrated Auth0 for secure user authentication.
All user-specific data like quiz history is fetched and visualized only if the user is logged in.
Ensures secure and personalized user experience.
---

# Backend Server (Express + PostgreSQL)

The backend is built using Express.js and serves as the core logic hub to:

Handle Kanji and quiz data

Store/retrieve user information

Enable frontend interaction through RESTful APIs

| Endpoint                              | Description                                 | Connected To       |
| ------------------------------------- | ------------------------------------------- | ------------------ |
| `GET /api/kanji/...`                  | Serve kanji data from database              | Flashcard page     |
| `POST /api/auth/save`                 | Save new Auth0 user (if not already exists) | Dashboard on login |
| `GET /api/quiz/get-results?email=...` | Get user's quiz results using email         | Dashboard          |
| `POST /api/quiz/store-result`         | Store new quiz result submission            | Quiz page          |

Express Server Setup
Server created using express()

Body parsing enabled using:

```
app.use(express.json());
CORS enabled for frontend-backend communication:

```

```
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```
Environment variables loaded using dotenv.

| Route File          | Purpose                                |
| ------------------- | -------------------------------------- |
| `AuthRoutes.js`     | Handles Auth0 user registration        |
| `kanjiRoutes.js`    | Serves kanji data (expandable)         |
| `quizStoreRoute.js` | Stores and fetches quiz scores from DB |

## Frontend ↔ Backend Communication Map

| Frontend Page       | Backend Route Called                  | Purpose               |
| ------------------- | ------------------------------------- | --------------------- |
| Home / Flashcards   | `GET /api/kanji/...`                  | Fetch kanji from DB   |
| KanjiFlashcards.jsx | *(Uses KanjiAPI.dev directly)*        | No backend use here   |
| Quiz.jsx            | `POST /api/quiz/store-result`         | Save quiz result      |
| Dashboard.jsx       | `GET /api/quiz/get-results?email=...` | Fetch score analytics |
| On Login (Auth0)    | `POST /api/auth/save`                 | Store new user to DB  |

---

© 2025 Kanji Kousa. All rights reserved.



