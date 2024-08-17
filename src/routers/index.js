import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExplorePage from "../pages/ExplorePage";
import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: ":explore",
                element: <ExplorePage />,
            },
            {
                path: ":explore/:id",
                element: <DetailsPage />,
            },
            {
                path: ":tv",
                element: <ExplorePage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "/details",
                element: <DetailsPage />,
            },
        ]
    },

]);

export default router