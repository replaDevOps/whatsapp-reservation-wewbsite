import { Card, Flex, Radio, Typography} from "antd"
import { useTranslation } from "react-i18next"
const {Title, Text}= Typography

const SubscriptionPlanRectangularCard= ({plan, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity})=>{
    const {t}= useTranslation()
    return (
        <Card
            className={`shadow mb-1 cursor ${selectedSubscriptionPlan?.type === plan?.type ? 'border-brand' : ''}`}
            onClick={()=>{
                 setSelectedSubscriptionPlan(
                    { 
                        id: plan?.id, 
                        description: plan?.description, 
                        type: plan?.type, 
                        price: plan?.price
                    }
                )
            }}
        >
            <Flex justify="space-between" gap={5}>
                <Flex align="start">
                    <Radio value={plan?.id} checked={selectedSubscriptionPlan?.id === plan?.id} />
                    <Flex vertical gap={0}>
                        <Title level={4} className="m-0 fw-500">{t(plan?.type)}</Title>
                        <Text className="fs-13 subtitle-color">{t(plan?.description)}</Text>
                    </Flex>
                </Flex>
                <Title level={3} className="m-0">
                    <sup className="fs-12">{t('SAR')}</sup>
                    {(subscriptionValidity === 'YEARLY' ? plan?.price*12 : plan?.price)}
                    <sub className='fs-16'>/{t(subscriptionValidity)}</sub>
                </Title>
            </Flex>
        </Card>
    )
}
export {SubscriptionPlanRectangularCard}