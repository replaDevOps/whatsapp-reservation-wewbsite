import React, { useState, useEffect} from 'react';
import { Row, Col, Flex, Typography, Segmented, Card, Divider, Image } from 'antd';
import { useTranslation } from 'react-i18next';
const { Text, Title } = Typography;
import { pricingData } from '../../../data';
const OurPricing = () => {
  const { t, i18n } = useTranslation();
    const [view, setView] = useState('');
      useEffect(() => {
    // Set default view after i18n is ready
    setView(i18n.language === 'ar' ? 'شهري' : 'Monthly');
  }, [i18n.language]);
  return (
    <div className='common-padding bg-skyblue'>
      <div className='container'>
        <Row gutter={[24, 24]} justify={'center'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Flex vertical gap={20} justify='center' align='center'>
                <Text className='custom-text'>{t('Dynamic Packages')}</Text>
                <Title level={2} className='m-0'>{t('Our Pricing Will Surprise You')}</Title>
                <Text className='fs-16 text-center'>
                  {t('Affordable, transparent plans packed with premium features for every business.')}
                </Text>
                <Segmented
                  options={[
                    { label: t('Monthly'), value: i18n.language === 'ar' ? 'شهري' : 'Monthly' },
                    { label: t('Yearly'), value: i18n.language === 'ar' ? 'سنوي' : 'Yearly' },
                  ]}
                  value={view}
                  className='segment'
                  onChange={(value) => setView(value)}
                />
              </Flex>
          </Col>

          <Col span={24}>
            <Row gutter={[8, 12]}>
              {pricingData?.map((plan) => (
                <Col key={plan.key} xs={24} sm={24} md={12} lg={8} xl={6}>
                  <Card className={`h-100 border-radius-12 position-relative ${plan.key === 2 ? 'bg-pricing' : ''}`}>
                    {
                      plan.key === 2 && (
                        <span className='pricingcard-badge'>{t('Most Popular')}</span>
                      )
                    }
                    <Flex vertical gap={25} className='mt-1'>
                      <Flex vertical gap={10}>
                        <Title level={4} className={`text-brand m-0 ${plan.key === 2 ? 'text-white' : ''}`}>{t(plan?.plan)}</Title>
                        <Text className={`fs-14 ${plan.key === 2 ? 'text-white' : ''}`}>{t(plan?.desc)}</Text>
                      </Flex>
                      <Title className={`m-0 ${plan.key === 2 ? 'text-white' : ''}`}>
                        <sup className={`fs-16`}>{t('SAR')}</sup>
                        {view === 'Monthly' || view === 'شهري' ? t(plan.monthlyPrice) : t(plan.yearlyPrice)}
                        <sub className='fs-16'>/{view.toLowerCase()}</sub>
                      </Title>

                      <Divider className='m-0' />
                      <Text className={`fs-16 ${plan.key === 2 ? 'text-white' : ''}`}>{t('Included Features:')}</Text>
                      <div>
                        {plan?.features.map((feature) => (
                          <Flex key={feature.key} gap={10} align='middle' className='mb-2'>
                            <Image src='/assets/icons/tick.png' width={18} height={13} preview={false} />
                            <Text className={`p-0 ${plan.key === 2 ? 'text-white' : ''}`}>{t(feature?.title)}</Text>
                          </Flex>
                        ))}
                      </div>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { OurPricing };
