import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiCube } from "react-icons/bi";

import classes from "./navbar.module.css";

import TrackingBtn from "../TrackingButton/TrackingBtn";
import ButtonLanguage from "../ButtonLanguages/ButtonLanguage";

const languages = [
  {
    code: "en",
    name: "English",
    Country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    Country_code: "sa",
    dir: "rtl",
  },
];

const NavBar = () => {
  const currentLangsCode = cookies.get("i18next") || "en";
  const currentLangs = languages.find((l) => l.code === currentLangsCode);
  const [t, i18n] = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    document.body.dir = currentLangs.dir || "ltr";
    document.title = t("app-title");
  }, [currentLangs, t]);

  return (
    <div>
      <Navbar
        fixed="top"
        expand="lg"
        collapseOnSelect
        className={`bg-white lg:border-b-1 border-slate-200 ${classes.navbar}`}
      >
        <Navbar.Brand className="m-0 p-0">
          <div className="d-flex items-center">
            <BiCube className="text-red-600 text-5xl font-bold mr-1" />
            <span className="text-red-600 xs:text-2xl lg:text-3xl font-bold">
              {t("LogoName")}
            </span>
          </div>
        </Navbar.Brand>
        {isMobile && <TrackingBtn />}
        <Navbar.Toggle className={classes.navbarToggle} />
        <Navbar.Collapse className={classes.nav}>
          <Nav className="xs:ml-0 lg:ml-16 d-flex justify-between text-lg">
            <Nav.Link href="#">{t("home")}</Nav.Link>
            <Nav.Link href="#">{t("pirces")}</Nav.Link>
            <Nav.Link href="#">{t("callsSalers")}</Nav.Link>
            <Nav.Link href="#">
              <ButtonLanguage />
            </Nav.Link>
          </Nav>
          <Nav
            className={`${
              i18next.language === "en" ? "lg:ml-auto" : "lg:mr-auto"
            } d-flex justify-evenly lg:w-96`}
          >
            {!isMobile && <TrackingBtn />}
            <button className="xs:border-1 xs:p-3 xs:rounded-full lg:rounded-none lg:p-0 lg:border-0 xs:border-purple-400 xs:mb-5 lg:mb-0">
              {t("signin")}
            </button>
            {!isMobile && <ButtonLanguage />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
