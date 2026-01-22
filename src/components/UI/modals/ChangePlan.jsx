import { useEffect, useState } from 'react';
import { Typography, Flex, Card, Col, Row, Divider, Segmented, Button } from 'antd'
import { useTranslation } from 'react-i18next';
import { BackButton, PlanFeature, SubscriptionPlanRectangularCard } from '../..'
import { extractPlanFeatures } from '../../../shared'

const { Title, Text } = Typography;

const ChangePlan = ({subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity, setSubscriptionValidity, setIsChangePlan}) => {
  const { t } = useTranslation()
  const [features, setFeatures]= useState([])

  useEffect(()=>{
    if(selectedSubscriptionPlan){
        setFeatures(extractPlanFeatures(subscriptionPlans?.find(plan => plan?.type === selectedSubscriptionPlan?.type)))
    }
  }, [selectedSubscriptionPlan])

  return (
    <>
     
        <Row gutter={[12, 12]}>
          {/* LEFT SIDE */}
          <Col xs={24} lg={15}>
            <Flex vertical gap={10}>
                <Flex vertical gap={2} className='mb-2'>
                    <Flex align='center' gap={8}>
                        <BackButton onClick={()=>setIsChangePlan(false)}/>
                        <Title level={4} className='m-0'>
                            {t('Change Your Package')}
                        </Title>
                    </Flex>
                    <Text className='fs-13 subtitle-color'>
                        {t('Choose a new package. Your current one is pre-selected, and its features appear on the right.')}
                    </Text>
                </Flex>
                <Flex justify='space-between' className='w-100'>
                <Flex vertical gap={0}>
                    <Text className='fs-14 fw-600'>{t('Selected Package')}</Text>
                    <Text className='fs-13 subtitle-color'>
                    {t('Pick your preferred package to continue')}
                    </Text>
                </Flex>
                <Segmented
                    options={[
                    { label: t('Monthly'), value: 'MONTHLY' },
                    { label: t('Yearly'), value: 'YEARLY' },
                    ]}
                    value={subscriptionValidity}
                    className='segment2 fs-13 p-0'
                    onChange={setSubscriptionValidity}
                />
                </Flex>
                {
                    subscriptionPlans?.map((plan, index) => (
                        <div key={'plan-'+index}>
                            {
                              plan?.type !== 'ENTERPRISE' &&
                              <SubscriptionPlanRectangularCard {...{plan, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity}}/>
                            }
                        </div>
                    ))
                }
              <Button
                className='btn bg-brand text-white'
                onClick={()=>setIsChangePlan(false)}
              >
                {t('Confirm')}
              </Button>
            </Flex>
          </Col>
          {/* RIGHT SIDE */}
          <Col xs={24} lg={9}>
            <Card className='h-100'>
              <Flex vertical gap={15}>
                <Flex vertical gap={5}>
                  <Title level={4} className='text-brand m-0'>{t(selectedSubscriptionPlan?.type)}</Title>
                  <Text className='fs-14'>{t(selectedSubscriptionPlan?.description)}</Text>
                </Flex>
                <Title className='m-0'>
                  <sup className='fs-16'>{t('SAR')}</sup>
                  {subscriptionValidity === 'YEARLY' ? selectedSubscriptionPlan?.price*12 : selectedSubscriptionPlan?.price}
                  <sub className='fs-16'>/{t(subscriptionValidity).toLowerCase()}</sub>
                </Title>
                <Divider className='m-0' />
                <Text className='fs-16'>{t('Included Features :')}</Text>
                <div>
                    {
                        features?.map((feature, index) => (
                            <div key={'feature-'+ index}>
                                <PlanFeature title={feature?.title}/>
                            </div>
                        ))
                    }
                </div>
              </Flex>
            </Card>
          </Col>
        </Row>
    </>
  );
};

export { ChangePlan }
