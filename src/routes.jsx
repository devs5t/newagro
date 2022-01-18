import HomePage from "src/pages/Home";
import Investment from "src/pages/Investment";
import Exchange from "src/pages/Exchange";
import Documentation from "src/pages/Documentation";

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
  {
    path: "docs",
    element: <Documentation />,
  },
];

export default routes;
