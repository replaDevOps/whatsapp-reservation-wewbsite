import { Card, Flex, Divider, Button, Typography} from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { capitalizeTranslated, extractPlanFeatures } from "../../shared"
import { PlanFeature } from ".."
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const {Title, Text, Paragraph} = Typography
const SubscriptionPlanCard= ({subscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity})=>{

    const { t } = useTranslation()
    const [features, setFeatures]= useState([])
    const [expanded, setExpanded] = useState(false);
    const [featureexpand, setFeatureExpand] = useState(9)
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    useEffect(()=>{
        if(subscriptionPlan){
            setFeatures(extractPlanFeatures(subscriptionPlan))
        }
    }, [subscriptionPlan])

    console.log('features',features)

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
                    <Paragraph
                        className={`fs-14 hover-white `}
                        ellipsis={{
                            rows: 1,
                            expandable:'collapsible',
                            symbol: expanded ? <Text className="text-brand">less</Text> : <Text className="text-brand">more</Text>,
                            onExpand: (_, info) => setExpanded(info.expanded),
                        }}
                    >
                        {t(subscriptionPlan?.description)}
                    </Paragraph>
                </Flex>
                <Title level={2} className={`m-0 hover-white`}>
                    <sup className={`fs-16`}>{t("SAR")}</sup>
                    {
                        subscriptionValidity === 'YEARLY' ? (
                            (subscriptionPlan?.discountYearlyPrice > 0) && (subscriptionPlan?.discountYearlyPrice !== subscriptionPlan?.yearlyPrice) ? (
                                <>
                                    <Text className="fs-16 hover-gray" delete>{subscriptionPlan?.yearlyPrice}</Text> {subscriptionPlan?.discountYearlyPrice}
                                </>
                            ) : (
                                subscriptionPlan?.yearlyPrice
                            )
                        ) : (
                            (subscriptionPlan?.discountPrice > 0) && (subscriptionPlan?.discountPrice !== subscriptionPlan?.price) ? (
                                <>
                                    <Text className="fs-16 hover-gray" delete>{subscriptionPlan?.price}</Text> {subscriptionPlan?.discountPrice}
                                </>
                            ):(
                                subscriptionPlan?.price
                            )
                        )  
                    }
                    <sub className="fs-16">/{capitalizeTranslated(subscriptionValidity)}</sub>
                </Title>
                <Divider className="m-0" />
                <div>
                    <Text className={`fs-16 hover-white`}>
                        {t("Included Features:")}
                    </Text>
                    <div>
                        {
                            features?.slice(0, featureexpand)?.map((feature, index) => (
                                <div key={'feature-'+ index}>
                                    <PlanFeature title={feature?.title}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    features?.length > 9 &&
                    <Button type="link"  
                            onClick={() => {
                                if (featureexpand === 9) {
                                    setFeatureExpand(features.length);
                                } else {
                                    setFeatureExpand(9);
                                }
                            }} className="text-brand fs-14 fw-600">
                        {
                            featureexpand === 9 ?  <>View all features <ArrowDownOutlined /></>  : <>View less features <ArrowUpOutlined /></>  
                        }
                    </Button>
                }
                <Flex vertical gap={10} justify="center" className="hide-content">
                    <Divider className="m-0 bg-white" />
                    {
                        subscriptionPlan?.type === 'ENTERPRISE' ?
                        <Button 
                            className='btn bg-white text-black border-0' 
                            onClick={()=>navigate('/book-demo')}
                        >
                            {t('Contact Us')}
                        </Button>
                        :
                        <Button 
                            className='btn bg-white text-black border-0'
                            onClick={()=> {
                                token ?
                                setSelectedSubscriptionPlan({ 
                                    id: subscriptionPlan?.id, 
                                    description: subscriptionPlan?.description, 
                                    type: subscriptionPlan?.type, 
                                    price: subscriptionPlan?.price,
                                    yearlyPrice: subscriptionPlan?.yearlyPrice,
                                    discountPrice:subscriptionPlan?.discountPrice,
                                    discountYearlyPrice:subscriptionPlan?.discountYearlyPrice,
                                })
                                :
                                navigate('/signup')
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