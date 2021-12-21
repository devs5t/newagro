import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {get} from "lodash";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 30px;
    height: 20px;
  }
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
`;

type languageOptionsType = {
  [key: string]: {
    icon: string;
    name: string;
  };
};

const languageOptions: languageOptionsType = {
  en: {
    icon: "/images/flags/us.png",
    name: "English",
  },
  es: {
    icon: "/images/flags/es.png",
    name: "Español",
  },
};

function NavbarLanguagesDropdown() {
  const { i18n } = useTranslation();
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);

  const language: string = get(get(i18n, 'language').split('-'), '[0]', '');
  const selectedLanguage = languageOptions[language];

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    closeMenu();
  };

  return (
    <React.Fragment>
      <Tooltip title="Languages">
        <IconButton
          aria-owns={anchorMenu ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Flag
            src={get(selectedLanguage, 'icon', '/images/flags/es.png')}
            alt={get(selectedLanguage, 'name', 'Español')}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {Object.keys(languageOptions).map((language) => (
          <MenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
          >
            {languageOptions[language]?.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default NavbarLanguagesDropdown;
