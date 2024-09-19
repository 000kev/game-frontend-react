import Layout from "./Layout";
import RegistrationPage, {AuthAction} from "./Registration";
import TeamCreator, {CreatorAction} from "./components/TeamCreator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModeLayout from "./ModeLayout";
import TeamViewer, {ViewerLoader, ViewerAction} from "./components/TeamViewer";
import TeamSelector, {TeamLoader} from "./components/TeamSelector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <RegistrationPage />,
        action: AuthAction,
      },
      {
        path: "navigation",
        element: <ModeLayout />,
        action: ViewerAction,
        children: [
          {
            path: "",
            element: <TeamViewer />,
            loader: ViewerLoader
          },
          {
            path: "create",
            element: <TeamCreator />,
            action: CreatorAction
          },
          {
            path: "manage",
            element: <TeamSelector />,
            loader: TeamLoader

          }
        ]
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
