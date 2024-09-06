# Hackathon Dashboard Application

This project is a hackathon management application that allows organizers to create, edit, delete, and view hackathons. Organizers can filter and sort hackathons based on various criteria, and participants can view details of the hackathons. The project is built using **React** with **TypeScript** and **Tailwind CSS**.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Walkthrough Video](#walkthrough-video)
- [Code Snippets](#code-snippets)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Hackathons**: Organizers can create hackathons with details like name, start date, end date, description, image, and level (easy, medium, hard).
- **Edit and Delete Hackathons**: Organizers can edit existing hackathons or delete them.
- **Hackathon Status**: Hackathons are categorized as upcoming, active, or past based on the start and end dates.
- **Filter and Sort**: Organizers can sort by newest and oldest hackathons, and filter hackathons by level (easy, medium, hard) and status (active, upcoming, past).
- **Search**: Organizers can search hackathons by name.
- **Hackathon Details Page**: Detailed view of each hackathon, with options to edit or delete.
- **Responsive Design**: The application is fully responsive, making it usable on desktop and mobile devices.

## Technology Stack

- **React** (with TypeScript)
- **Tailwind CSS** for styling
- **React Router** for routing
- **Vite** for project setup and building
- **Material UI / Bootstrap** (optional, if used for components)
  
## Walkthrough Video

A complete walkthrough of the application is available here:

[![Watch the video](./screenshots/video-thumbnail.png)](https://www.youtube.com/watch?v=your-video-link)

## Code Snippets

Here are some code snippets used in the project:

### Hackathon Status Determination

```typescript
function determineStatus(event: Hackathon) {
  const now = new Date();
  if (event.startDate && event.endDate) {
    if (now < event.startDate) return "Upcoming";
    if (now >= event.startDate && now <= event.endDate) return "Active";
    if (now > event.endDate) return "Past";
  } else if (event.endDate && now > event.endDate) {
    return "Past";
  }
  return "Upcoming"; // Fallback status if dates are missing
}
```

### Routes Configuration

```typescript
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import {
  CreateHackathonPage,
  DetailHackathonPage,
  EditHackathonPage,
  HomePage,
} from "../pages";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "hackathon",
          children: [
            { path: "", element: <Navigate to="/" replace /> },
            { path: ":id/details", element: <DetailHackathonPage /> },
            { path: "create", element: <CreateHackathonPage /> },
            { path: ":id/edit", element: <EditHackathonPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Divyanshu1020/hackathon-app.git
   cd hackathon app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

5. Build for production:

   ```bash
   npm run build
   ```


## Contributing

If you would like to contribute to this project, please submit a pull request with your changes. Make sure to follow the project's coding style and conventions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.