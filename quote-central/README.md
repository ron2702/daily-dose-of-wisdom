# 💡 Daily Dose of Wisdom: Thematic Quote Generator

This is a modern and robust quote generator built with **Next.js 15 (App Router)** and **TypeScript**. It allows users to select a category (such as "Shonen Philosophy" or "Wisdom of Legends") and instantly receive a daily dose of wisdom.

The primary focus of this project is to demonstrate **best practices in frontend architecture, efficient third-party API management, and core development concepts**.

---

## ✨ Key Features

* **Next.js App Router Architecture:** Utilizes Client Components (`'use client'`) for interactivity and Server-Side Components for structure.
* **Robust State Management:** Comprehensive control over data fetching, loading state (`isLoading`), and errors using `useState`, `useEffect`, and `useCallback` hooks.
* **Separation of Concerns (SoC):** API logic is isolated in `lib/`, pure presentational components are in `components/`, and configuration data is separated into `lib/config.ts`.
* **Professional Error Handling:** Implements specific logic to capture and notify the user about the **HTTP 429 (API Quota Limit)** error.
* **Rigorous TypeScript Typing:** Strong typing across the board, including custom interfaces for state, props, fetching parameters, and validation of external API payloads (`QuoteAPIPayload`).
* **Modern Design:** Responsive user interface with a dark theme, built using Tailwind CSS.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 | Performance, App Router, and file-based routing. |
| **Language** | TypeScript | Strict typing and code scalability. |
| **Styling** | Tailwind CSS | Rapid development and utility-first CSS classes. |
| **API Externa** | RapidAPI (Quotes API) | Data source for the quotes. |
| **Platform** | Node.js | Execution environment. |

---

## ⚙️ Local Setup and Execution

To run this project in your local environment, follow these steps:

### Requirements

* Node.js (LTS version)
* Access to the required API. **You can get your free API key here:** [Quotes API on RapidAPI](https://rapidapi.com/shreekant74sk/api/quotes-api12)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ron2702/daily-dose-of-wisdom.git](https://github.com/ron2702/daily-dose-of-wisdom.git)
    cd quote-central
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a file named **`.env.local`** in the project root and add your RapidAPI keys. These must be declared as public (`NEXT_PUBLIC_`) because data fetching is performed within a Client Component.

    ```env
    # .env.local
    NEXT_PUBLIC_RAPIDAPI_URL="[YOUR_API_BASE_URL]"
    NEXT_PUBLIC_RAPIDAPI_KEY="[YOUR_API_KEY]"
    NEXT_PUBLIC_RAPIDAPI_HOST="[YOUR_API_HOST]"
    ```

4.  **Run the Project:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Directory Structure

The structure adheres to App Router conventions, prioritizing the clean separation of network logic, UI, and application configuration.