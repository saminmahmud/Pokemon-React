import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Favorites from './../pages/Favorites';
import Details from "../pages/Details";

const router = createBrowserRouter([
    { path: '/', element: <Root />, children: [
        { path: '/', element: <Home /> }, 
        { path: '/favorites', element: <Favorites /> }, 
        { path: '/pokemon/:name', element: <Details /> }, 
    ]}
])

export default router