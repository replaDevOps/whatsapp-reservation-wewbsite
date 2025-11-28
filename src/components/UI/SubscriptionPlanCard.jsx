import { Card, Flex, Divider, Button, Typography} from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { extractPlanFeatures } from "../../shared"
import { PlanFeature } from ".."

const {Title, Text}= Typography

const SubscriptionPlanCard= ({subscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity})=>{

    const { t } = useTranslation()
    const [features, setFeatures]= useState([])
    useEffect(()=>{
        if(subscriptionPlan){
            setFeatures(extractPlanFeatures(subscriptionPlan))
        }
    }, [subscriptionPlan])

    return (
        <Card className={`h-100 price-card-hover border-radius-12 position-relative`}>
            {
                subscriptionPlan?.type==='STANDARD' &&
                <span className="pricingcard-badge">{t("Most Popular")}</span>
            }
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
                    {subscriptionValidity === 'YEARLY' ? subscriptionPlan?.price*12 : subscriptionPlan?.price}
                    <sub className="fs-16">/{subscriptionValidity}</sub>
                </Title>

                <Divider className="m-0" />
                <div className="h-feature">
                    <Text className={`fs-16 hover-white`}>
                        {t("Included Features:")}
                    </Text>
                    <div>
                        {
                            features?.map((feature, index) => (
                                <div key={'feature-'+ index}>
                                    <PlanFeature title={feature?.title}/>
                                </div>
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
                            onClick={()=>Navigate('/book-demo')}
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