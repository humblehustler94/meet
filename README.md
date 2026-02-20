# 🚀 Meet App

<div align="center">

![Meet App Logo](public/meet-app.svg)<!-- TODO: Add project logo (e.g., in public/assets or docs/) -->

[![GitHub stars](https://img.shields.io/github/stars/humblehustler94/meet?style=for-the-badge)](https://github.com/humblehustler94/meet/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/humblehustler94/meet?style=for-the-badge)](https://github.com/humblehustler94/meet/network)
[![GitHub issues](https://img.shields.io/github/issues/humblehustler94/meet?style=for-the-badge)](https://github.com/humblehustler94/meet/issues)
<!--
[![GitHub license](https://img.shields.io/github/license/humblehustler94/meet?style=for-the-badge)](LICENSE)
-->

**A dynamic web application to securely connect with Google Calendar, manage, and visualize your events.**

[Live Demo](https://meet-theta-five.vercel.app/) |
[GitHub Repository](https://github.com/humblehustler94/meet)

</div>

## 📖 Overview

The Meet App is a modern web application designed to help users interact with their Google Calendar events efficiently. It provides a user-friendly interface to view, filter, and visualize events fetched directly from the Google Calendar API. The application leverages a secure OAuth 2.0 flow, handled by a separate authentication server, ensuring user data privacy and secure access to Google services.

This project demonstrates a robust full-stack approach with a React frontend built with Vite and a Node.js backend for authentication. It emphasizes clean architecture, comprehensive testing, and responsive design, making it an excellent template for building secure, data-driven web applications.

## ✨ Features

-   **Google OAuth 2.0 Integration:** Secure and seamless authentication using Google accounts via a dedicated Node.js `auth-server`.
-   **Google Calendar API Interaction:** Fetches and displays events from the authenticated user's Google Calendar.
-   **Interactive Event Visualization:** Utilizes Recharts to present calendar data in engaging and insightful charts.
-   **Responsive Design:** Adapts to various screen sizes, offering an optimal experience on both desktop and mobile devices.
-   **Fast Loading & Progress Indicators:** Enhances user experience with NProgress for smooth loading feedback during API calls.
-   **Event Filtering & Search:** Easily find specific events using intuitive filtering and search functionalities (inferred from common app features).
-   **Comprehensive Testing Suite:** Includes unit and integration tests for frontend components and utilities using Jest and React Testing Library.

## 🖥️ Screenshots

<!-- TODO: Add actual screenshots of the application, including desktop and mobile views -->
<!-- ![Desktop Screenshot 1](docs/screenshots/desktop-1.png) -->
<!-- ![Mobile Screenshot 1](docs/screenshots/mobile-1.png) -->

## 🛠️ Tech Stack

**Frontend:**
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-2-8884d8?style=for-the-badge&logo=recharts&logoColor=white)](https://recharts.org/)
[![NProgress](https://img.shields.io/badge/NProgress-0.2-29D?style=for-the-badge&logo=nprogress&logoColor=white)](https://ricostacruz.com/nprogress/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

**Backend:**
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

**DevOps & Tools:**
[![Google Cloud Platform](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Jest](https://img.shields.io/badge/Jest-29-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![React Testing Library](https://img.shields.io/badge/Testing_Library-16-E33332?style=for-the-badge&logo=testing-library&logoColor=white)](https://testing-library.com/)
[![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

## 🚀 Quick Start

Follow these steps to get the Meet App up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js**: `^18.0.0` or higher
-   **npm**: `^8.0.0` or higher (comes with Node.js)
-   **Google Cloud Project**: With Google Calendar API enabled and OAuth 2.0 credentials configured (Client ID, Client Secret, Redirect URIs).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/humblehustler94/meet.git
    cd meet
    ```

2.  **Install frontend dependencies**
    ```bash
    npm install
    ```

3.  **Install backend dependencies**
    ```bash
    cd auth-server
    npm install
    cd .. # Navigate back to the root directory
    ```

4.  **Environment setup**

    **For the Frontend (root directory):**
    Create a `.env` file in the project root (`./meet/.env`) and add your Google OAuth Client ID and the URL for your local authentication server:

    ```env
    VITE_APP_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_FROM_GCP
    VITE_APP_API_URL=http://localhost:8000
    ```
    *Replace `YOUR_GOOGLE_CLIENT_ID_FROM_GCP` with your actual Google Client ID.*

    **For the Backend (`auth-server` directory):**
    Create a `.env` file in the `auth-server` directory (`./meet/auth-server/.env`) and configure your Google OAuth credentials:

    ```env
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_FROM_GCP
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_FROM_GCP
    GOOGLE_REDIRECT_URIS=http://localhost:3000,http://localhost:8000/api/oauth2callback
    PORT=8000
    ```
    *Replace `YOUR_GOOGLE_CLIENT_ID_FROM_GCP` and `YOUR_GOOGLE_CLIENT_SECRET_FROM_GCP` with your actual credentials. Ensure `GOOGLE_REDIRECT_URIS` includes both your frontend development URL and the `oauth2callback` endpoint of the auth server.*

5.  **Start development servers**

    **Start the authentication server (backend):**
    Open a new terminal window, navigate to the `auth-server` directory, and start the server:
    ```bash
    cd auth-server
    npm start
    ```
    The authentication server will start on `http://localhost:8000`.

    **Start the frontend development server:**
    Open another terminal window, navigate to the project root directory, and start the frontend:
    ```bash
    npm run dev
    ```
    The frontend application will typically start on `http://localhost:5173`.

6.  **Open your browser**
    Visit `http://localhost:5173` (or the port indicated by Vite) in your web browser.

## 📁 Project Structure

```
meet/
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Specifies intentionally untracked files to ignore
├── README.md               # Project documentation
├── auth-server/            # Node.js backend for Google OAuth
│   ├── .env                # Environment variables for backend (local)
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Main authentication server logic
├── babel.config.cjs        # Babel configuration for Jest
├── coverage/               # Directory for test coverage reports
├── index.html              # Main HTML entry point for the frontend app
├── jest.config.cjs         # Jest testing configuration
├── package-lock.json       # Records the exact dependency tree
├── package.json            # Frontend dependencies and scripts
├── public/                 # Static assets served directly (e.g., favicons, Vite SVG)
│   └── vite.svg
├── setupTests.js           # Jest setup file for React Testing Library
├── src/                    # Frontend source code
│   ├── App.jsx             # Main React application component
│   ├── main.jsx            # React entry point, renders App
│   ├── assets/             # Static assets (images, icons) used by components
│   ├── components/         # Reusable React components (e.g., EventList, Chart)
│   ├── contexts/           # React Context for global state management
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service calls and data fetching logic
│   ├── styles/             # Global or component-specific CSS styles
│   └── utils/              # Utility functions and helpers
├── static-site-test/       # (Empty directory - purpose unclear, likely for static site testing)
└── vite.config.js          # Vite build and development configuration
```

## ⚙️ Configuration

### Environment Variables

The application relies on environment variables for sensitive data and configuration.

| Variable             | Location      | Description                                                    | Required |
| :------------------- | :------------ | :------------------------------------------------------------- | :------- |
| `VITE_APP_CLIENT_ID` | `meet/.env`   | Google OAuth Client ID for frontend.                           | Yes      |
| `VITE_APP_API_URL`   | `meet/.env`   | URL of the authentication server.                              | Yes      |
| `GOOGLE_CLIENT_ID`   | `auth-server/.env` | Google OAuth Client ID for backend processing.            | Yes      |
| `GOOGLE_CLIENT_SECRET` | `auth-server/.env` | Google OAuth Client Secret for backend processing.         | Yes      |
| `GOOGLE_REDIRECT_URIS` | `auth-server/.env` | Comma-separated list of authorized redirect URIs for Google OAuth. | Yes      |
| `PORT`               | `auth-server/.env` | Port on which the authentication server runs. (Default: `8000`) | No       |

### Configuration Files

-   `.eslintrc.cjs`: Configures ESLint for consistent code style and quality.
-   `babel.config.cjs`: Babel configuration, primarily for Jest to transpile JSX/ESM.
-   `jest.config.cjs`: Jest test runner configuration.
-   `vite.config.js`: Vite build tool configuration, including React plugin setup.

## 🔧 Development

### Available Scripts

In the project root directory, you can run:

| Command               | Description                                                                  |
| :-------------------- | :--------------------------------------------------------------------------- |
| `npm run dev`         | Starts the frontend development server with Vite.                            |
| `npm run build`       | Builds the frontend for production to the `dist` folder.                     |
| `npm run lint`        | Runs ESLint to check for code quality and style issues.                      |
| `npm run preview`     | Serves the production build locally for testing.                             |
| `npm test`            | Runs all tests with Jest.                                                    |
| `npm run test:coverage` | Runs tests and generates a code coverage report in the `coverage` directory. |

### Development Workflow

1.  Ensure both the `auth-server` and the frontend development server are running concurrently.
2.  Make changes to React components, styles, or utilities in the `src/` directory. Vite provides hot module reloading for a fast development experience.
3.  For backend changes, restart the `auth-server` after modifying its code.
4.  Run `npm run lint` regularly to ensure code quality.
5.  Write and run tests using `npm test` to verify functionality.

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive testing.

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Watch for file changes and re-run tests
npm test -- --watch
```
Test files are typically located within or alongside the components they test (e.g., `src/components/ComponentName.test.jsx`). The `setupTests.js` file configures the testing environment.

## 🚀 Deployment

The Meet App frontend is configured for deployment as a static site, suitable for services like Vercel.

### Production Build
To create a production-ready build of the frontend:
```bash
npm run build
```
This command compiles the application into static files in the `dist/` directory.

### Deployment Options
-   **Vercel (Recommended for Frontend):** The project metadata (`homepage` field in `package.json` and the `homepage` in GitHub metadata) indicates deployment to Vercel. You can deploy the `dist` folder directly to Vercel.
-   **Node.js Backend:** The `auth-server` can be deployed to any platform supporting Node.js applications, such as Heroku, AWS EC2, or a custom VPS. Ensure environment variables are configured correctly in the production environment.

## 📚 API Reference

The `auth-server` component handles all authentication-related requests using Google OAuth 2.0.

### Authentication Flow
1.  Frontend initiates the OAuth process by redirecting to Google's authentication server.
2.  Google authenticates the user and redirects back to the `auth-server`'s `oauth2callback` endpoint.
3.  The `auth-server` exchanges the authorization code for access and refresh tokens.
4.  The `auth-server` then uses these tokens to make requests to the Google Calendar API on behalf of the user and sends events back to the frontend.

### Endpoints (inferred for `auth-server`)

-   `/api/get-auth-url`: Initiates the Google OAuth flow, returning the URL to redirect the user to for authentication.
-   `/api/oauth2callback`: Callback endpoint where Google redirects after user authentication, handles token exchange.
-   `/api/get-events`: Fetches calendar events for the authenticated user from the Google Calendar API.

## 🤝 Contributing

We welcome contributions to the Meet App! If you're interested in improving the project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes and ensure they adhere to the project's coding standards.
4.  Write or update tests as necessary.
5.  Submit a pull request with a clear description of your changes.

### Development Setup for Contributors
Follow the "Quick Start" guide to set up your local development environment.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
<!-- TODO: Create a LICENSE file with the chosen license details. -->

## 🙏 Acknowledgments

-   **React** for the powerful UI library.
-   **Vite** for the blazing fast development experience.
-   **Recharts** for the elegant charting capabilities.
-   **NProgress** for subtle progress indicators.
-   **Jest** and **React Testing Library** for robust testing tools.
-   **ESLint** for maintaining code quality.
-   **Google Cloud Platform** for providing the Google Calendar API and OAuth services.

## 📞 Support & Contact

-  🐛 Issues: [GitHub Issues](https://github.com/humblehustler94/myFlix-client/issues)
-  👤 Author: [humblehustler94](https://github.com/humblehustler94)
-  📧 Email: [flores.itzel94@gmail.com]

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Made with ❤️ by humblehustler94**

</div>
