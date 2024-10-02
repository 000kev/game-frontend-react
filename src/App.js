import Layout from "./Layout";
import RegistrationPage, {AuthAction} from "./Registration";
import TeamCreator, {CreatorAction} from "./components/TeamCreator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModeLayout from "./ModeLayout";
import TeamViewer, {ViewerLoader, ViewerAction} from "./components/TeamViewer";
import TeamSelector, {TeamLoader, TeamAction} from "./components/TeamSelector";
import TeamEditor, {EditorAction} from "./components/TeamEditor";
import {DetailsLoader} from "./components/TeamDetails"

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
        loader: TeamLoader,
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
            loader: TeamLoader,
            action: TeamAction
          },
          {
            path: "manage/:teamname",
            element: <TeamEditor />,
            loader: DetailsLoader,
            action: EditorAction
            
          }
        ]
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
