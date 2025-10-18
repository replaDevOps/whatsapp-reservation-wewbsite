import { useState } from 'react';
import { Modal, Typography, Radio, Flex, Card, Form, Col, Row, Divider, Image, Segmented, Button } from 'antd'
import { ConfirmationModal } from './ConfirmationModal';
import { pricingData } from '../../../data';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography
const ChangePlanModal = ({ visible, onClose, }) => {
    const [form] = Form.useForm();
    const { t, i18n } = useTranslation();
    const [view, setView] = useState(i18n.language === 'ar' ? 'شهري' : 'Monthly');
    const [confirm, setConfirm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(pricingData[0]);
    const handleChange = (e) => {
        const selectedkey = e.target.value;
        const planobj = pricingData?.find((item) => item?.key === selectedkey)
        setSelectedPlan(planobj)
    }
    return (
        <div>
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
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Flex vertical gap={10}>
                            <Title level={4} className='m-0'>
                                {t('Complete Your Subscription')}
                            </Title>
                            <Text className='fs-13 subtitle-color'>
                                {t('Review your plan, select payment, and confirm to start instantly.')}
                            </Text>
                            <Flex justify='space-between' className='w-100'>
                                <Flex vertical gap={0}>
                                    <Text className='fs-14 fw-600'>
                                        {t('Selected Package')}
                                    </Text>
                                    <Text className='fs-13 subtitle-color'>
                                        {t('Pick your preferred package to continue')}
                                    </Text>
                                </Flex>
                                <Segmented
                                    options={[
                                        { label: t('Monthly'), value: i18n.language === 'ar' ? 'شهري' : 'Monthly' },
                                        { label: t('Yearly'), value: i18n.language === 'ar' ? 'سنوي' : 'Yearly' },
                                    ]}
                                    value={view}
                                    className='segment2 fs-13 p-0'
                                    onChange={(value) => setView(value)}
                                />
                            </Flex>
                            <Radio.Group
                                value={selectedPlan?.key}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            >
                                {pricingData?.map((packages, index) => (
                                    <Card className={`shadow mb-2 ${selectedPlan?.key === packages.key ? 'border-brand' : ''}`} key={index}>
                                        <Flex justify="space-between" gap={5}>
                                            <Flex align="start">
                                                <Radio value={packages.key} />
                                                <Flex vertical gap={0}>
                                                    <Title level={4} className="m-0 fw-500">
                                                        {t(packages?.plan)}
                                                    </Title>
                                                    <Text className="fs-13 subtitle-color">
                                                        {t(packages?.desc)}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Title level={3} className="m-0">
                                                <sup className="fs-12">{t('SAR')}</sup>
                                                {(view === 'Monthly' || view === 'شهري') ? t(packages?.monthlyPrice) : t(packages?.yearlyPrice)}
                                                <sub className='fs-16'>/{t(view)}</sub>
                                            </Title>
                                        </Flex>
                                    </Card>
                                ))}
                            </Radio.Group>
                            <Button className='btn bg-brand text-white' onClick={()=>{setConfirm(true);onClose()}}>Confirm</Button>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Card className='h-100'>
                            <Flex vertical gap={15}>
                                <Flex vertical gap={10}>
                                    <Title level={4} className='text-brand m-0'>{t(selectedPlan?.plan)}</Title>
                                    <Text className='fs-14'>{t(selectedPlan?.desc)}</Text>
                                </Flex>
                                <Title className='m-0'>
                                    <sup className='fs-16'>{t('SAR')}</sup>
                                    {(view === 'Monthly' || view === 'شهري') ? t(selectedPlan?.monthlyPrice) : t(selectedPlan?.yearlyPrice)}
                                    <sub className='fs-16'>/{view.toLowerCase()}</sub>
                                </Title>

                                <Divider className='m-0' />
                                <Text className='fs-16'>{t('Included Features :')}</Text>
                                <div>
                                    {
                                        selectedPlan?.features.map((feature, index) => (
                                            <Flex gap={10} align='middle' className='mb-2'>
                                                <Image src='/assets/icons/tick.png' width={18} height={13} preview={false} />
                                                <Text className='p-0'>{t(feature?.title)}</Text>
                                            </Flex>
                                        ))
                                    }

                                </div>
                            </Flex>
                        </Card>
                    </Col>
                </Row>
            </Modal>
            <ConfirmationModal visible={confirm} onClose={()=>setConfirm(false)}/>
        </div>
    )
}

export { ChangePlanModal }