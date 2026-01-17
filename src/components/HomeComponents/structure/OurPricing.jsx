import { useState, useEffect } from "react";
import { Row, Col, Flex, Typography, Segmented, Spin } from "antd";
import { useTranslation } from "react-i18next"
import { CheckoutModal, SubscriptionPlanCard } from "../../UI"
import { useLazyQuery } from "@apollo/client/react"
import { GET_SUBSCRIPTION_PLANS } from "../../../graphql/query"
import { subscriptionValidityLookup, TableLoader } from "../../../shared";

const { Text, Title } = Typography;
const OurPricing = () => {

    const { t } = useTranslation()
    const [visibleCheckoutModal, setVisibleCheckoutModal] = useState(false)
    const [subscriptionPlans, setSubscriptionPlans]= useState(null)
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan]= useState(null)
    const [subscriptionValidity, setSubscriptionValidity]= useState("MONTHLY")
    const [getSubscriptionPlans, { data, loading }] = useLazyQuery(GET_SUBSCRIPTION_PLANS, {
        fetchPolicy: "network-only",
    })
    
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
                        options={subscriptionValidityLookup}
                        value={subscriptionValidity}
                        className="segment"
                        onChange={setSubscriptionValidity}
                    />
                </Flex>
            </Col>
            <Col span={24}>
                <Row gutter={[8, 12]}>
                    {
                        loading ?
                        <Col span={24}>
                            <Flex justify="center" align="center" >
                                <Spin {...TableLoader} size="small" />
                            </Flex>
                        </Col>
                        :
                        subscriptionPlans?.map((subscriptionPlan, index) => (
                            <Col key={'subscription-plan-'+index} xs={24} sm={24} md={12} lg={12} xl={6}>
                                <SubscriptionPlanCard
                                    subscriptionPlan={subscriptionPlan}
                                    setSelectedSubscriptionPlan={setSelectedSubscriptionPlan}
                                    subscriptionValidity={subscriptionValidity}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </Col>
        </Row>
        <CheckoutModal
            visible={visibleCheckoutModal}
            subscriptionPlans={subscriptionPlans}
            selectedSubscriptionPlan={selectedSubscriptionPlan}
            setSelectedSubscriptionPlan={setSelectedSubscriptionPlan}
            subscriptionValidity={subscriptionValidity}
            setSubscriptionValidity={setSubscriptionValidity}
            onClose={() => {
                setVisibleCheckoutModal(false); 
                setSelectedSubscriptionPlan(null)
            }}
        />
      </>
    );
};

export { OurPricing };
