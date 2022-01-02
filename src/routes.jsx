import async from "./components/Async";
import HomePage from "src/pages/Home/HomePage";

const Investment = async(() => import("src/pages/Investment/Investment"));
const Page2 = async(() => import("src/pages/Page2/Page2"));
const Page3 = async(() => import("src/pages/Page3/Page3"));

const routes = [
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "investment",
    element: <Investment />,
  },
  {
    path: "page2",
    element: <Page2 />,
  },
  {
    path: "page3",
    element: <Page3 />,
  },
];

export default routes;
