import i18next from "i18next";
import React from "react";

const ButtonLanguage = () => {
  const changeLanguageHandler = () => {
    if (i18next.language === "ar") {
      i18next.changeLanguage("en");
    } else {
      i18next.changeLanguage("ar");
    }
  };

  return (
    <button
      className="d-block md:w-0 xs:w-full text-center"
      onClick={changeLanguageHandler}
    >
      {i18next.language === "ar" ? "EN" : "AR"}
    </button>
  );
};

export default ButtonLanguage;
