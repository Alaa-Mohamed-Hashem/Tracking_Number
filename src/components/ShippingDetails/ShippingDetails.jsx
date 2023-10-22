import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ShippingDetails.css";

import askImg from "../../assets/imgs/services-image.png";

import { Button, Table } from "antd";
import { useShipping } from "../../context/ShippingContext";
import { useTranslation } from "react-i18next";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    hour: "numeric",
  }).format(new Date(date));

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

  const data1 = shipping?.TransitEvents?.map((ship) => ({
    key: Math.random() * 3,
    branch: "London",
    date: new Date(ship?.timestamp).toLocaleDateString(),
    time: formatDate(ship?.timestamp),
    details: ship?.state,
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
