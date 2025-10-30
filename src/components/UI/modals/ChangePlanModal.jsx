import { useState } from 'react';
import { Modal, Typography, Radio, Flex, Card, Col, Row, Divider, Image, Segmented, Button } from 'antd'
import { pricingData } from '../../../data';
import { useTranslation } from 'react-i18next';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ChangePlanModal = ({ visible, onClose, setCheckoutVisible }) => {
  const { t } = useTranslation();

  const [view, setView] = useState('Monthly');

  const [selectedPlan, setSelectedPlan] = useState(pricingData[0]);

  const handleChange = (e) => {
    const selectedKey = e.target.value;
    const planObj = pricingData.find((item) => item.key === selectedKey);
    setSelectedPlan(planObj);
  };

    const price = view === 'Monthly'
        ? selectedPlan?.monthlyPrice
        : selectedPlan?.yearlyPrice;

  return (
    <>
      <Modal
        width={950}
        title={null}
        open={visible}
        onCancel={onClose}
        closeIcon={false}
        centered
        className='modal-cs'
        footer={null}
      >
        <Row gutter={[12, 12]}>
          {/* LEFT SIDE */}
          <Col xs={24} lg={12}>
            <Flex vertical gap={10}>
                <Flex vertical gap={2} className='mb-2'>
                    <Flex align='center' gap={5}>
                        <Button onClick={()=>{onClose();setCheckoutVisible(true)}} className='border-0 p-0 bg-transparent'>
                            <ArrowLeftOutlined />
                        </Button>
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
                    { label: t('Monthly'), value: 'Monthly' },
                    { label: t('Yearly'), value: 'Yearly' },
                  ]}
                  value={view}
                  className='segment2 fs-13 p-0'
                  onChange={setView}
                />
              </Flex>

              <Radio.Group
                value={selectedPlan?.key}
                onChange={handleChange}
                className='w-100'
              >
                {pricingData?.map((pkg) => (
                  <Card
                    key={pkg.key}
                    className={`shadow mb-2 cursor ${selectedPlan?.key === pkg.key ? 'border-brand' : ''}`}
                    onClick={() =>
                        handleChange({ target: { value: pkg.key } })
                    }
                  >
                    <Flex justify="space-between" gap={5}>
                      <Flex align="start">
                        <Radio value={pkg.key} />
                        <Flex vertical gap={0}>
                          <Title level={4} className="m-0 fw-500">{t(pkg?.plan)}</Title>
                          <Text className="fs-13 subtitle-color">{t(pkg?.desc)}</Text>
                        </Flex>
                      </Flex>
                      <Title level={3} className="m-0">
                        <sup className="fs-12">{t('SAR')}</sup>
                        {t(view === 'Monthly' || view === 'شهري' ? pkg.monthlyPrice : pkg.yearlyPrice)}
                        <sub className='fs-16'>/{t(view)}</sub>
                      </Title>
                    </Flex>
                  </Card>
                ))}
              </Radio.Group>

              <Button
                className='btn bg-brand text-white'
              >
                {t('Confirm')}
              </Button>
            </Flex>
          </Col>

          {/* RIGHT SIDE */}
          <Col xs={24} lg={12}>
            <Card className='h-100'>
              <Flex vertical gap={15}>
                <Flex vertical gap={10}>
                  <Title level={4} className='text-brand m-0'>{t(selectedPlan?.plan)}</Title>
                  <Text className='fs-14'>{t(selectedPlan?.desc)}</Text>
                </Flex>

                <Title className='m-0'>
                  <sup className='fs-16'>{t('SAR')}</sup>
                  {t(price)}
                  <sub className='fs-16'>/{t(view).toLowerCase()}</sub>
                </Title>

                <Divider className='m-0' />
                <Text className='fs-16'>{t('Included Features :')}</Text>

                <div>
                  {selectedPlan?.features?.map((feature, index) => (
                    <Flex key={index} gap={10} align='middle' className='mb-2'>
                      <Image src='/assets/icons/tick.png' width={18} height={13} preview={false} alt='check icon' fetchPriority="high" />
                      <Text className='p-0'>{t(feature?.title)}</Text>
                    </Flex>
                  ))}
                </div>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export { ChangePlanModal };
