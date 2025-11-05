# MERN Image Search & Multi-Select App

This is a full-stack MERN (MongoDB, Express, React, Node) application that allows authenticated users to search for images using the Unsplash API, view top searches, and maintain a personal search history.



## Features

* **Authentication:** Secure OAuth 2.0 login with Google, GitHub, and Facebook using Passport.js.
* **Image Search:** Authenticated users can search for images via the Unsplash API.
* **Top Searches Banner:** Displays the top 5 most frequent search terms across all users.
* **Multi-Select Grid:** Search results are displayed in a 4-column grid with a checkbox overlay for multi-selection.
* **Selection Counter:** A dynamic counter shows how many images are currently selected.
* **Search History:** A sidebar displays the logged-in user's personal search history with timestamps.

## Project Structure

```
/mern-image-search
|
├── /client           # React Frontend
|   ├── /public
|   └── /src
|       ├── /api
|       ├── /components
|       ├── /context
|       ├── /pages
|       ├── App.jsx
|       ├── main.jsx
|       └── index.css
|
└── /server           # Express Backend
    ├── /config
    ├── /controllers
    ├── /middleware
    ├── /models
    ├── /routes
    ├── .env          # (You must create this)
    ├── package.json
    └── server.js
```

## 🛠️ Setup & Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v16+)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB instance)
* [Unsplash API](https://unsplash.com/developers) Access Key
* [Google Cloud](https://console.cloud.google.com/) OAuth Credentials
* [GitHub](https://github.com/settings/developers) OAuth App Credentials
* [Facebook](https://developers.facebook.com/) App Credentials

### 1. Environment Variables (Backend)

Navigate to the `/server` directory and create a `.env` file. Fill it with your credentials.

**/server/.env**
```env
# MongoDB
MONGO_URI=YOUR_MONGO_DB_CONNECTION_STRING

# Unsplash API
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY

# Server & Client URLs
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

# Express Session
SESSION_SECRET=your_strong_session_secret

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# GitHub OAuth
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET

# Facebook OAuth
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET
```

**Important OAuth Note:** When setting up your OAuth apps (Google, GitHub, Facebook), you **must** add the following as an authorized callback/redirect URI:
`http://localhost:5000/auth/[provider]/callback`
(e.g., `http://localhost:5000/auth/google/callback`)

### 2. Install Backend Dependencies

```bash
# Navigate to server
cd server

# Install packages
npm install
```

### 3. Install Frontend Dependencies

```bash
# Navigate to client from root
cd client

# Install packages
npm install
```

### 4. Run the Application

You will need two separate terminals.

**In Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
> Server will be running at `http://localhost:5000`

**In Terminal 2 (Frontend):**
```bash
cd client
npm start
```
> Client will be running at `http://localhost:3000`

## 📬 API Endpoints (Postman / cURL)

All API routes (except `/auth`) are protected and require an active session cookie.

### Authentication

* `GET /auth/google` - Initiates Google Login.
* `GET /auth/github` - Initiates GitHub Login.
* `GET /auth/facebook` - Initiates Facebook Login.
* `GET /auth/logout` - Logs out the user.
* `GET /auth/user` - Fetches the current session user.

### Image Search

**Search for Images**
```bash
# POST /api/search
curl -X POST http://localhost:5000/api/search \
-H "Content-Type: application/json" \
-d '{"term": "nature"}' \
--cookie "connect.sid=YOUR_SESSION_COOKIE"
```

**Get Top Searches**
```bash
# GET /api/top-searches
curl http://localhost:5000/api/top-searches \
--cookie "connect.sid=YOUR_SESSION_COOKIE"
```

**Get User History**
```bash
# GET /api/history
curl http://localhost:5000/api/history \
--cookie "connect.sid=YOUR_SESSION_COOKIE"
```