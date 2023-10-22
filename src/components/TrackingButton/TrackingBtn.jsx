import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsChevronDown, BsSearch } from "react-icons/bs";

import classes from "./TrackingBtn.module.css";
import { useShipping } from "../../context/ShippingContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const TrackingBtn = () => {
  const [t, i18n] = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const [searchTracking, setSearchTracking] = useState("");

  const { fetchShipping } = useShipping();

  const getTracingNumberHandler = (e) => {
    e.preventDefault();
    fetchShipping(searchTracking);
    setSearchTracking("");
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`${
        isHovered && classes.trackShadow
      } xs:mt-1 xs:ml-1 lg:mt-0 lg:ml-0`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="lg:visible xs:py-1 xs:px-2 lg:p-5 hover:rounded-t-xl text-red-500 d-flex items-center relative">
        <span className="text-red-500 font-bold mr-1">
          {t("shippingTracking")}
        </span>
        {!isHovered && i18next.language === "en" && <BsChevronDown />}
        {isHovered && i18next.language === "en" && <AiOutlineRight />}
        {!isHovered && i18next.language === "ar" && <BsChevronDown />}
        {isHovered && i18next.language === "ar" && <AiOutlineLeft />}
      </div>
      <div
        className={`${classes.trackShadowHidden} ${
          isHovered && classes.trackShadowVisible
        } absolute rounded-xl border-1 bg-white shadow drop-shadow-sm xs:left-5 lg:left-auto xs:mt-3 lg:mt-0`}
      >
        <p className="text-sm tracking-wide">{t("TrackYourShipment")}</p>
        <div className="d-flex items-center">
          <form
            onSubmit={getTracingNumberHandler}
            className="d-flex items-center"
          >
            <input
              type="text"
              placeholder={`${t("shippingNumber")}`}
              className={`${
                i18next.language === "en"
                  ? "rounded-l-lg"
                  : " rounded-r-lg rounded-l-none"
              } outline-none	py-2 px-3 border-1 rounded-l-lg`}
              onChange={(e) => {
                setSearchTracking(e.target.value);
              }}
              value={searchTracking}
            />
            <button
              className={`${
                i18next.language === "en"
                  ? "rounded-r-lg"
                  : " rounded-l-lg rounded-r-none"
              } outline-none py-2 px-3 border-1 rounded-r-lg text-2xl cursor-pointer bg-red-600 hover:bg-red-500 text-white`}
            >
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrackingBtn;
