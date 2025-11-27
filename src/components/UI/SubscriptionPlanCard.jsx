import { Card, Flex, Image, Divider, Button, Typography} from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const {Title, Text}= Typography

const SubscriptionPlanCard= ({subscriptionPlan, setSelectedSubscriptionPlan})=>{

    const { t } = useTranslation()
    const [features, setFeatures]= useState([])
    useEffect(()=>{
        if(subscriptionPlan){
            setFeatures(extractPlanFeatures(subscriptionPlan))
        }
    }, [subscriptionPlan])
    function extractPlanFeatures(plan) {
        const ignoreKeys = ["price", "__typename", "id", "type", "description"]
        const labels = {
            noOfBranches: "Branch",
            noOfAdmins: "Admin",
            noOfStaffManagers: "Staff Manager",
            noOfServiceProviders: "Service Provider",
            noOfReceptionists: "Receptionist",
            whatsappBot: "WhatsApp Bot",
            manualReminder: "Manual Reminders",
            automatedReminder: "Automated Reminders",
            googleReviewLink: "Google Review Link",
            promotions: "Promotions",
            selfServiceTablet: "Self Service Tablet",
            basicDashboard: "Basic Dashboard",
            fullAccessDashboard: "Full Access Dashboard",
        }
        const features = [];
        for (let key in plan) {
            if (ignoreKeys.includes(key)) continue;

            const value = plan[key];
            const label = labels[key];

            if (!label) continue;

            // Number features
            if (typeof value === "number" && value > 0) {
            features.push({
                title: `${value} ${label}${value > 1 ? "s" : ""}`
            });
            }
            // Boolean features
            if (typeof value === "boolean" && value === true) {
            features.push({
                title: label
            });
            }
        }
        return features
    }
    return (
        <Card className={`h-100 price-card-hover border-radius-12 position-relative`}>
            <span className="pricingcard-badge">{t(subscriptionPlan?.morewanted)}</span>
            <Flex vertical gap={25} className="mt-1">
                <Flex vertical gap={10}>
                    <Title
                        level={4}
                        className={`text-plan m-0`}
                    >
                        {t(subscriptionPlan?.type)}
                    </Title>
                    <Text className={`fs-14 hover-white`}>
                        {t(subscriptionPlan?.description)}
                    </Text>
                </Flex>
                <Title level={2} className={`m-0 hover-white`}>
                    <sup className={`fs-16`}>{t("SAR")}</sup>
                    {'' === "Monthly" || "" === "شهري"
                        ? t(subscriptionPlan.price)
                        : t(subscriptionPlan.price)
                    }
                    <sub className="fs-16">/{'Yealry'}</sub>
                </Title>

                <Divider className="m-0" />
                <div className="h-feature">
                    <Text className={`fs-16 hover-white`}>
                        {t("Included Features:")}
                    </Text>
                    <div>
                        {
                            features?.map((feature) => (
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
                            ))
                        }
                    </div>
                </div>
                <Flex vertical gap={10} justify="center" className="hide-content">
                    <Divider className="m-0 bg-white" />
                    {
                        subscriptionPlan?.type === 'ENTERPRISE' ?
                        <Button 
                            className='btn bg-white text-black border-0' 
                            onClick={()=>Navigate('/bookdemo')}
                        >
                            {t('Contact Us')}
                        </Button>
                        :
                        <Button 
                            className='btn bg-white text-black border-0'
                            onClick={()=> {
                                 setSelectedSubscriptionPlan({ "id": subscriptionPlan?.id, description: subscriptionPlan?.description, "type": subscriptionPlan?.type, "price": subscriptionPlan?.price})
                            }}
                        >
                            {t('Get Started Today')}
                        </Button>
                    }
                </Flex>
            </Flex>
        </Card>
    )
}
export {SubscriptionPlanCard}