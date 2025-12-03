# The Qode Assignment

Portfolio Management Application ASSIGNMENT.

## 🎯 The Challenge

Goal: build a React application for a portfolio management company that serves two distinct purposes:
1.  **A Home Page**: To display a curated collection of blogs.
2.  **A Portfolio Page**: A data-heavy dashboard showcasing trading returns, equity curves, and drawdown charts.

Constraints:
-   Use a provided Excel sheet as the single source of truth for data.
-   Replicate a specific UI design (referenced from attached images).
-   Ensure the application is responsive and performant.

## 🛠️ The Approach

To tackle this, I chose a modern, robust stack:
-   **React 19**: For a component-based, reactive UI.
-   **Vite**: For lightning-fast development and optimized builds.
-   **Tailwind CSS**: For rapid, utility-first styling that matches the design specs pixel-perfectly.
-   **Recharts**: To render the complex financial charts (Equity Curve, Drawdowns) with interactivity.
-   **Zustand**: For lightweight, manageable global state.
-   **Lucide React**: For clean, modern iconography.

## 🚀 The development process followed

- extracted the data from the excel file with nodejs.
- transformed the data into usable statistics.
- setup a routing system with `react-router`.
- created the UI with `tailwindcss`.
- created the charts with `recharts`.
- created the state management with `zustand`.
- created the icons with `lucide-react`.

### Visualizing Success
For the **Portfolio Page**, we built:
-   **The Equity Curve**: A line chart showing the growth of an investment over time.
-   **Drawdown Chart**: A visual representation of risk, showing the decline from peaks.
-   **Monthly Returns Table**: A heatmap-style table (replicating the Excel look) to show performance at a glance.

For the **Home Page**, we created a clean grid layout to showcase blog posts, ensuring the content is easily digestible.

## ✨ Optimizations

- **Suspense & Lazy Loading**: Implemented for route-based code splitting to reduce initial load time.
- **Code Splitting**: Automatic and manual chunking to separate vendor code from application logic.
- **Compression**: Dual-strategy using **Brotli** and **Gzip** for smallest possible asset sizes.
- **Manual Chunks**: Configured in Vite to bundle heavy libraries (React, Recharts) separately for better caching.
- **Memoization**: Used `useMemo` for expensive data calculations to prevent unnecessary re-renders.
- **Minification**: Aggressive production build settings to strip unused code.

## 🏃‍♂️ How to Run This Story

Want to see it in action?

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production** (to see the optimizations):
    ```bash
    npm run build
    ```
    *Check the `dist` folder to see the `.br` and `.gz` compressed files!*

---
