import React from "react";
import { useShipping } from "../../context/ShippingContext";
import Stepper from "../Stepper/Stepper";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const formatDate = (date) =>
  new Intl.DateTimeFormat(
    `${i18next.language === "en" ? "en" : "ar-EG-u-nu-latn"}`,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
      hour: "numeric",
    }
  ).format(new Date(date));

const formatDate2 = (date) =>
  new Intl.DateTimeFormat(
    `${i18next.language === "en" ? "en" : "ar-EG-u-nu-latn"}`,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(new Date(date));

const ShippingStatus = () => {
  const { shipping, error, isLoading } = useShipping();
  const [t, i18n] = useTranslation();

  if (error) return <h1 className="pt-36 text-center text-red-600">{error}</h1>;

  if (isLoading)
    return <h1 className="pt-36 text-center text-red-600">Loading...</h1>;

  if (shipping) {
    return (
      <div className="pt-36 lg:px-20 xs:px-4">
        <div className="rounded-t-lg border-2 p-4">
          <ul className="m-0 p-0 d-flex md:items-center justify-between xs:flex-col md:flex-row">
            <li className="text-md md:mb-0 xs:mb-4">
              <span className="opacity-60">
                {t("TrackingNumber")} {shipping.TrackingNumber}
              </span>
              <p
                className={`mb-0 ${
                  shipping.CurrentStatus.state === "DELIVERED" &&
                  "text-green-500"
                } ${
                  shipping.CurrentStatus.state === "CANCELLED" && "text-red-500"
                }
                ${
                  shipping.CurrentStatus.state === "DELIVERED_TO_SENDER" &&
                  "text-yellow-500"
                }
                `}
              >
                {shipping.CurrentStatus.state === "DELIVERED" && t("DELIVERED")}
                {shipping.CurrentStatus.state === "CANCELLED" &&
                  t("cancelled1")}
                {shipping.CurrentStatus.state === "DELIVERED_TO_SENDER" &&
                  t("DELIVERED_TO_SENDER")}
              </p>
            </li>
            <li className="text-md md:mb-0 xs:mb-4">
              <span className="opacity-60">{t("LastUdpate")}</span>
              <p className="mb-0">
                <time>{formatDate(shipping.CurrentStatus.timestamp)}</time>
              </p>
            </li>
            <li className="text-md md:mb-0 xs:mb-4">
              <span className="opacity-60">{t("Merchant")}</span>
              <p className="mb-0">SOUQ.COM</p>
            </li>
            <li className="text-md md:mb-0 xs:mb-4">
              <span className="opacity-60">{t("PromisedDate")}</span>
              <p className="mb-0">
                <time>{formatDate2(shipping.PromisedDate)}</time>
              </p>
            </li>
          </ul>
        </div>
        <div className=" flex flex-col items-center justify-center rounded-b-lg border-l-2 border-r-2 border-b-2 p-4">
          <Stepper />
        </div>
      </div>
    );
  }

  return (
    <h1 className="md:mt-40 xs:mt-28 text-center md:mb-20 xs:mb-16">
      {t("PleaseTrackYourShipment")}
    </h1>
  );
};

export default ShippingStatus;
