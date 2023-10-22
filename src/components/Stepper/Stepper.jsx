import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "./stepper.css";
import { useShipping } from "../../context/ShippingContext";

import { TiTick } from "react-icons/ti";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidMemoryCard } from "react-icons/bi";

const Stepper = () => {
  const [t, i18n] = useTranslation();

  const steps = [
    { en: "The shipment is created", ar: "تم انشاء الشحنة" },
    { en: "Package received", ar: "تم استلام الشحنة من التاجر" },
    { en: "In transit", ar: "الشحنة خرجت للتسليم" },
    { en: "Delivered", ar: "تم التسليم" },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const { shipping } = useShipping();

  useEffect(() => {
    if (shipping.CurrentStatus.state === "DELIVERED") {
      setCurrentStep(5);
    }
    if (shipping.CurrentStatus.state === "CANCELLED") {
      setCurrentStep(3);
    }
    if (shipping.CurrentStatus.state === "DELIVERED_TO_SENDER") {
      setCurrentStep(3);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          shipping.CurrentStatus.state === "DELIVERED" && "DELIVERED"
        }
        ${shipping.CurrentStatus.state === "CANCELLED" && "CANCELLED"}
        ${
          shipping.CurrentStatus.state === "DELIVERED_TO_SENDER" &&
          "DELIVERED_TO_SENDER"
        }
        flex justify-between w-full text-center`}
      >
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`${
              i18next.language === "ar" ? "arabicStyle" : "step-item"
            } ${currentStep === i + 1 && "active "} ${
              i + 1 < currentStep && "complete"
            } `}
          >
            <div className="step ">
              {i + 1 < currentStep && <TiTick size={24} />}
              {i + 1 === currentStep && <FaTruckFast />}
              {i + 1 > currentStep && <BiSolidMemoryCard size={20} />}
            </div>
            <p className="relative stepPragraph lg:text-sm xs:text-xs mb-0 lg:w-60 xs:w-24 mt-1">
              {i18next.language === "ar" ? step.ar : step.en}
            </p>
            {i + 1 === currentStep &&
              shipping.CurrentStatus.state === "CANCELLED" && (
                <span className="text-red-600 text-xs md:block xs:hidden absolute top-100">
                  {t("cancelled")}
                </span>
              )}
            {i + 1 === currentStep &&
              shipping.CurrentStatus.state === "DELIVERED_TO_SENDER" && (
                <span className="text-yellow-500 text-xs md:block xs:hidden absolute top-100">
                  {t("DELIVERED_TO_SENDER_Failed")}
                </span>
              )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
