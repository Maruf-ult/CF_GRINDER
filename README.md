# Codeforces Progress Tracker

A sleek, interactive dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This tool allows competitive programmers to track their contest performance, see which problems they have solved, and identify gaps in their practice—all in real-time.

## 🚀 Features

* **Ultimate Data Accuracy**: Uses the `contest.standings` API for each row to ensure a 100% accurate problem list, even for regional or newly finished contests.
* **Live User Sync**: Enter your Codeforces handle to instantly see your progress. Solved problems turn green automatically.
* **Sticky Sessions**: Your handle is saved to `localStorage`, so your progress is right there when you return.
* **Advanced Filtering**: One-tap filters for Div. 1-4, Educational Rounds, Global Rounds, Kotlin, CodeTON, and more.
* **Deep Links**: Direct links to both the main contest dashboard and individual problem pages.
* **Technical Details at a Glance**: Each problem card displays its index, name, and difficulty rating.

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **API**: Codeforces API

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/cf-tracker.git](https://github.com/your-username/cf-tracker.git)
    cd cf-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:** Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```plaintext
├── app/
│   ├── page.tsx          # Main logic, state management, and persistence
│   └── layout.tsx        # Global styles and layout
├── components/
│   ├── Navbar.tsx        # Handle input and filter buttons
│   └── ContestRow.tsx    # Lazy-loading contest data and problem cards
├── types/
│   └── codeforces.ts     # TypeScript interfaces for API responses
└── public/               # Static assets

🧪 Key Implementation Logic
Lazy-Loading Problems
To avoid hitting Codeforces rate limits (5 requests/sec), this app uses a decentralized fetching strategy. Instead of downloading every problem on Codeforces at once, each ContestRow component fetches its own data independently when it mounts.

Debounced API Calls
The user status fetcher is debounced by 600ms. This prevents spamming the API while you type your username, ensuring a smooth UI and avoiding 403 Forbidden errors.
