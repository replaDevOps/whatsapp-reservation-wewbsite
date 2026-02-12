import { Card, Flex, Radio, Typography} from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { capitalizeTranslated } from "../../shared"

const {Title, Text, Paragraph}= Typography
const SubscriptionPlanRectangularCard= ({plan, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity})=>{
    const {t}= useTranslation()
    const [expanded, setExpanded] = useState(false);
    return (
        <Card
            className={`shadow mb-1 cursor ${selectedSubscriptionPlan?.type === plan?.type ? 'border-brand' : ''}`}
            onClick={()=>{
                 setSelectedSubscriptionPlan(
                    { 
                        id: plan?.id, 
                        description: plan?.description, 
                        type: plan?.type, 
                        price: plan?.price,
                        yearlyPrice: plan?.yearlyPrice,
                        discountPrice:plan?.discountPrice,
                        discountYearlyPrice:plan?.discountYearlyPrice,
                    }
                )
            }}
        >
            <Flex justify="space-between" gap={5}>
                <Flex align="start">
                    <Radio value={plan?.id} checked={selectedSubscriptionPlan?.id === plan?.id} />
                    <Flex vertical gap={0}>
                        <Title level={4} className="m-0 fw-500">{t(plan?.type)}</Title>
                        <Paragraph
                            className={`fs-13 subtitle-color`}
                            ellipsis={{
                                rows: 1,
                                expandable:'collapsible',
                                symbol: expanded ? <Text className="text-brand">less</Text> : <Text className="text-brand">more</Text>,
                                onExpand: (_, info) => setExpanded(info.expanded),
                            }}
                        >
                            {t(plan?.description)}
                        </Paragraph>
                    </Flex>
                </Flex>
                <Title level={3} className="m-0">
                    <sup className="fs-12">{t('SAR')}</sup>
                    {
                        subscriptionValidity === 'YEARLY' ? (
                            plan?.yearlyPrice
                        ) : (
                             plan?.price
                        )  
                    }
                    <sub className='fs-16'>/{t(capitalizeTranslated(subscriptionValidity))}</sub>
                </Title>
            </Flex>
        </Card>
    )
}
export {SubscriptionPlanRectangularCard}