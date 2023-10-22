import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ShippingDetails.css";

import askImg from "../../assets/imgs/services-image.png";

import { Button, Table } from "antd";
import { useShipping } from "../../context/ShippingContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const formatDate = (date) =>
  new Intl.DateTimeFormat(
    `${i18next.language === "en" ? "en" : "ar-EG-u-nu-latn"}`,
    {
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

const ShippingDetails = () => {
  const [t, i18n] = useTranslation();
  const { shipping } = useShipping();

  const columns = [
    {
      title: `${t("branch")}`,
      dataIndex: "branch",
      key: "branch",
      render: (text) => <a>{text}</a>,
    },
    {
      title: `${t("date")}`,
      dataIndex: "date",
      key: "date",
    },
    {
      title: `${t("time")}`,
      dataIndex: "time",
      key: "time",
    },
    {
      title: `${t("details")}`,
      dataIndex: "details",
      key: "details",
    },
  ];

  const intoArabic = {
    TICKET_CREATED: "تم انشاء الشحنة",
    PACKAGE_RECEIVED: "تم استلام الشحنة",
    IN_TRANSIT: "الشحنة خرجت للتسليم",
    NOT_YET_SHIPPED: "لم تصل بعد",
    OUT_FOR_DELIVERY: "خرجت للتوصيل",
    WAITING_FOR_CUSTOMER_ACTION: "انتظار رد العميل",
    "Cairo Sorting Facility": "منشأة الفرز بالقاهرة",
    "Haram Hub": "الهرم",
    "FM & Reverse Hub": "اف ام",
    "Tanta Hub": "طنطا",
  };

  const intoEnglish = {
    TICKET_CREATED: "The shipment is created",
    PACKAGE_RECEIVED: "Package received",
    IN_TRANSIT: "In Transit",
    NOT_YET_SHIPPED: "Not Yet Shipped",
    OUT_FOR_DELIVERY: "Out For Delivery",
    WAITING_FOR_CUSTOMER_ACTION: "Waiting For Customer Action",
    "Cairo Sorting Facility": "Cairo Sorting Facility",
    "Haram Hub": "Haram",
    "FM & Reverse Hub": "FM",
    "Tanta Hub": "Tanta",
  };

  const data1 = shipping?.TransitEvents?.map((ship) => ({
    key: Math.random() * 3,
    branch: ship.hub
      ? i18next.language === "ar"
        ? intoArabic[ship?.hub]
        : intoEnglish[ship?.hub]
      : "------",
    date: formatDate2(ship?.timestamp),
    time: formatDate(ship?.timestamp),
    details:
      i18next.language === "ar"
        ? intoArabic[ship?.state]
        : intoEnglish[ship?.state],
  }));

  return (
    <div className="my-12">
      <Container>
        <Row>
          <Col lg={4}>
            <div>
              <h5> {t("DeliveryAddress")} </h5>
              <div className="p-4 bg-zinc-50 rounded-lg mb-2">
                <p className="text-md text-slate-600 mb-0">{t("Address")}</p>
              </div>
              <div className="p-4 border-1 rounded-lg flex flex-row justify-between">
                <div>
                  <p className="mb-0">{t("problem")}</p>
                  <Button className="mt-2 bg-red-500 text-white outline-none hover:outline-none">
                    {t("report")}
                  </Button>
                </div>
                <div>
                  <img src={askImg} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="lg:mt-0 xs:mt-10">
              <h5>{t("ShippingDetails")}</h5>
              <Table
                className="lg:border-1 xs:border-0 md:overflow-visible xs:overflow-scroll"
                columns={columns}
                dataSource={data1}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingDetails;
