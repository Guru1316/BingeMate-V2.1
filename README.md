# 🎬 BingeMate - Personal Series Tracker & Review App

**BingeMate** is a dynamic web application designed for TV series enthusiasts. It allows users to browse top series, manage a personal watchlist, log their viewing history with reviews/ratings, and maintain their own digital diary.

Built with **React.js (Vite)**, it features a custom local authentication system and persists all user data (watchlists, logs, sessions) using LocalStorage, offering a seamless "Letterboxd-like" experience for television shows.

🔗 **Live Demo:** [https://guru1316.github.io/BingeMate-V2.1/](https://guru1316.github.io/BingeMate-V2.1/)

---

## 🚀 Features

* **🏠 Dynamic Home Page**: Browse a curated list of top TV series fetched from local JSON data.
* **🔐 Custom Authentication**: 
    * Register and Login functionality.
    * Supports multiple users with isolated data (User A doesn't see User B's watchlist).
    * Session management using LocalStorage.
* **📝 Viewing Diary**: 
    * Log series you've watched.
    * Add personal ratings (1-5 stars), reviews, and "Watched On" dates.
    * View your history in a clean, list-style layout.
* **📺 Smart Watchlist**: Easily add or remove series from your "Plan to Watch" list.
* **➕ Add Series**: A comprehensive form to add new series to the database dynamically.
* **📱 Responsive UI**: A dark-themed, cinematic interface fully responsive across devices.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React.js](https://react.dev/) (v19)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Routing**: [React Router v6](https://reactrouter.com/) (HashRouter for GitHub Pages support)
* **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)
* **Data Persistence**: Browser LocalStorage
* **Styling**: CSS3 (Flexbox, Grid, Custom Properties)
* **Deployment**: GitHub Pages (`gh-pages`)

---

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (v14 or higher)
* npm (Node Package Manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Guru1316/BingeMate-V2.1.git](https://github.com/Guru1316/BingeMate-V2.1.git)
    cd BingeMate-V2.1
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the app.

---

## 📦 Deployment

This project is configured for deployment on **GitHub Pages**.

1.  **Update `vite.config.js`**:
    Ensure the base path matches your repository name:
    ```js
    base: "/BingeMate-V2.1/",
    ```

2.  **Build and Deploy**:
    ```bash
    npm run deploy
    ```
    *This script runs `vite build` followed by `gh-pages -d dist`.*

---

## 🤝 Acknowledgements

* **Mentor**: A special thanks to **Siddharth Sharma** sir for his guidance on structuring the project, understanding practical application design, and mentorship throughout the MERN internship.
* **Inspiration**: Designed with inspiration from Letterboxd and modern streaming platforms.

---

## 👤 Author

**GuruPrasad K**
* GitHub: [@Guru1316](https://github.com/Guru1316)
* LinkedIn: [Guruprasad K](https://www.linkedin.com/in/guruprasad-k-713994314/)

---

_Made during my MERN Stack Internship._