import { useState, useEffect } from "react";
import { Row, Col, Flex, Typography, Segmented, Card, Divider, Image, Button } from "antd";
import { useTranslation } from "react-i18next";
import { pricingData } from "../../../data";
import { CheckoutModal } from "../../UI";

const { Text, Title } = Typography;
const OurPricing = () => {
    const { t, i18n } = useTranslation();
    const [view, setView] = useState("");
    const [checkoutvisible, setCheckoutVisible] = useState(false);
    useEffect(() => {
        // Set default view after i18n is ready
        setView(i18n.language === "ar" ? "شهري" : "Monthly");
    }, [i18n.language]);
    return (
      <>
        <Row gutter={[24, 24]} justify={"center"}>
            <Col xs={24} sm={24} md={24} lg={10}>
                <Flex vertical gap={20} justify="center" align="center">
                    <Text className="custom-text">{t("Dynamic Packages")}</Text>
                    <Title level={2} className="m-0">
                        {t("Our Pricing Will Surprise You")}
                    </Title>
                    <Text className="fs-16 text-center">
                        {t("Affordable, transparent plans packed with premium features for every business.")}
                    </Text>
                    <Segmented
                        options={[
                            { label: t("Monthly"), value: i18n.language === "ar" ? "شهري" : "Monthly" },
                            { label: t("Yearly"), value: i18n.language === "ar" ? "سنوي" : "Yearly" },
                        ]}
                        value={view}
                        className="segment"
                        onChange={(value) => setView(value)}
                    />
                </Flex>
            </Col>

            <Col span={24}>
                <Row gutter={[8, 12]}>
                    {pricingData?.map((plan) => (
                        <Col key={plan.key} xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Card className={`h-100 price-card-hover border-radius-12 position-relative`}>
                                <span className="pricingcard-badge">{t(plan?.morewanted)}</span>
                                <Flex vertical gap={25} className="mt-1">
                                    <Flex vertical gap={10}>
                                        <Title
                                            level={4}
                                            className={`text-plan m-0`}
                                        >
                                            {t(plan?.plan)}
                                        </Title>
                                        <Text className={`fs-14 hover-white`}>
                                            {t(plan?.desc)}
                                        </Text>
                                    </Flex>
                                    <Title level={2} className={`m-0 hover-white`}>
                                        <sup className={`fs-16`}>{t("SAR")}</sup>
                                        {view === "Monthly" || view === "شهري"
                                            ? t(plan.monthlyPrice)
                                            : t(plan.yearlyPrice)}
                                        <sub className="fs-16">/{view.toLowerCase()}</sub>
                                    </Title>

                                    <Divider className="m-0" />
                                    <div className="h-feature">
                                      <Text className={`fs-16 hover-white`}>
                                          {t("Included Features:")}
                                      </Text>
                                      <div>
                                          {plan?.features.map((feature) => (
                                              <Flex key={feature.key} gap={10} align="middle" className="mb-2">
                                                  <Image
                                                      src="/assets/icons/tick.png"
                                                      width={18}
                                                      height={13}
                                                      preview={false}
                                                      alt="check icon"
                                                      fetchPriority="high"
                                                  />
                                                  <Text className={`p-0 hover-white`}>
                                                      {t(feature?.title)}
                                                  </Text>
                                              </Flex>
                                          ))}
                                      </div>
                                    </div>
                                    <Flex vertical gap={10} justify="center" className="hide-content">
                                      <Divider className="m-0 bg-white" />
                                      {
                                        plan?.btntext === 'Contact Us' ?
                                        <Button className='btn bg-white text-black border-0' onClick={()=>Navigate('/bookdemo')}>{t(plan?.btntext)}</Button>
                                        :
                                        <Button className='btn bg-white text-black border-0' onClick={()=>setCheckoutVisible(true)}>{t(plan?.btntext)}</Button>
                                      }
                                    </Flex>
                                </Flex>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        <CheckoutModal
          visible={checkoutvisible}
          setCheckoutVisible={setCheckoutVisible}
          onClose={() => setCheckoutVisible(false)}
        />
      </>
    );
};

export { OurPricing };
