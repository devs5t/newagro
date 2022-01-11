import HomePage from "src/pages/Home";
import Investment from "src/pages/Investment";
import Exchange from "src/pages/Exchange";

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
    path: "exchange",
    element: <Exchange />,
  },
];

export default routes;
