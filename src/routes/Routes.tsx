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
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "hackathon",
          children: [
            {
              path: "",
              element: <Navigate to="/" replace />, 
            },
            {
              path: ":id/details",
              element: <DetailHackathonPage />,
            },
            {
              path: "create",
              element: <CreateHackathonPage />,
            },
            {
              path: ":id/edit",
              element: <EditHackathonPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
