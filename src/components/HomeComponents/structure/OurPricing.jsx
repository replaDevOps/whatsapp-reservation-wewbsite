import { useState, useEffect } from "react";
import { Row, Col, Flex, Typography, Segmented } from "antd";
import { useTranslation } from "react-i18next";
import { pricingData } from "../../../data";
import { CheckoutModal, SubscriptionPlanCard } from "../../UI";
import { useLazyQuery } from "@apollo/client/react";
import { GET_SUBSCRIPTION_PLANS } from "../../../graphql/query";

const { Text, Title } = Typography;
const OurPricing = () => {

    const { t, i18n } = useTranslation();
    const [view, setView] = useState("");
    const [visibleCheckoutModal, setVisibleCheckoutModal] = useState(false)
    const [subscriptionPlans, setSubscriptionPlans]= useState(null)
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan]= useState(null)
    const [getSubscriptionPlans, { data, loading }] = useLazyQuery(GET_SUBSCRIPTION_PLANS, {
        fetchPolicy: "network-only",
    })

    useEffect(() => {
        // Set default view after i18n is ready
        setView(i18n.language === "ar" ? "شهري" : "Monthly");
    }, [i18n.language])
    
    useEffect(()=>{
        if(getSubscriptionPlans)
            getSubscriptionPlans()
    }, [getSubscriptionPlans])

    useEffect(()=>{
        if(data?.getSubscriptions?.length)
            setSubscriptionPlans(data?.getSubscriptions)
    }, [data])
    useEffect(()=>{
        if(selectedSubscriptionPlan)
            setVisibleCheckoutModal(true)
    }, [selectedSubscriptionPlan])
    console.log("subscriptionPlan:", subscriptionPlans)
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
                    {subscriptionPlans?.map((subscriptionPlan, index) => (
                        <Col key={'subscription-plan-'+index} xs={24} sm={24} md={12} lg={12} xl={6}>
                            <SubscriptionPlanCard
                                subscriptionPlan={subscriptionPlan}
                                setSelectedSubscriptionPlan={setSelectedSubscriptionPlan}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        <CheckoutModal
            visible={visibleCheckoutModal}
            selectedSubscriptionPlan={selectedSubscriptionPlan}
            setSelectedSubscriptionPlan={setSelectedSubscriptionPlan}
            onClose={() => {
                setVisibleCheckoutModal(false); 
                setSelectedSubscriptionPlan(null)
            }}
        />
      </>
    );
};

export { OurPricing };
