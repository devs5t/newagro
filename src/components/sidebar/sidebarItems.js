import Home from "@mui/icons-material/Home";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { BLOCK_LAUNCH } from "src/config";

const disableSection = (blockNumber) => {
  const isEnabledIf =
    window.location.host === "localhost:3000" ||
    window.location.host === "prod.url" ||
    blockNumber > BLOCK_LAUNCH; //launch block

  return !isEnabledIf;
};

const pagesSection = [
  {
    href: "/home",
    icon: Home,
    title: "Home",
  },
  {
    href: "/page1",
    icon: AssessmentIcon,
    title: (blockNumber) =>
      `Page 1 ${disableSection(blockNumber) ? "(After presale)" : ""}`, //how to disable before presale
    disabled: (blockNumber) => disableSection(blockNumber),
  },
  {
    href: "/page2",
    icon: AgricultureIcon,
    title: "Page 2",
    disabled: false
  },
  {
    href: "/page3",
    icon: MenuBookIcon,
    title: "Page 3 (disabled)",
    disabled: true
  }
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
