import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import { Modal, Typography, Button, Flex, Card, Form, Col, Row, Select, Image } from 'antd'
import { MyDatepicker, MyInput } from '../../../components';
import { NavLink } from 'react-router-dom';
import { ChangePlanModal } from './ChangePlanModal';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography
const CheckoutModal = ({visible,onClose,}) => {
    const [form] = Form.useForm();
    const [change, setChange] = useState(false)
    const {t} = useTranslation();
    return (
        <>
           <Modal 
                width={750}  
                title={null}
                open={visible}
                onCancel={onClose}
                closeIcon={false} 
                centered 
                className='modal-cs'
                footer={null}
            >
                <Flex vertical gap={10}>
                    <Flex vertical gap={0} className='mb-2'>
                        <Flex justify='space-between' gap={6}>
                            <Title level={4} className='m-0'>
                                {t('Complete Your Subscription')}
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex>                
                        <Text className='fs-13 subtitle-color'>
                            {t('Review your plan, select payment, and confirm to start instantly.')}
                        </Text>
                    </Flex>
                    <Card className='shadow'>
                        <Flex vertical gap={10}>
                            <Flex vertical gap={0}>
                                <Text className='fs-14 fw-600'>
                                    {t('Selected Package')}
                                </Text>
                                <Text className='fs-13 subtitle-color'>
                                    {t('Review the package you have chosen before proceeding')}
                                </Text>
                            </Flex>
                            <Card className='shadow border-brand'>
                                <Flex align='center' justify='space-between' gap={5}>
                                    <Flex vertical gap={0}>
                                        <Title level={2} className='m-0 text-brand'>
                                            {t('Basic')}
                                        </Title>
                                        <Text className='fs-13 subtitle-color'>
                                            {t('Simple start for small setups')}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={5}>
                                        <Title level={2} className='m-0'>
                                            <sup className='fs-12'>{t('SAR')}</sup> 
                                            {t('200')}<sub className='fs-12 subtitle-color'>/mo</sub>
                                        </Title>
                                        <Button className='btn bg-brand text-white' onClick={()=>{setChange(true); onClose();}}>
                                           {t('Change Plan')}
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Card>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark={false}
                    >
                        <Flex vertical gap={10}>
                            <Card className='shadow'>
                                <Flex vertical gap={0}>
                                    <Text className='fs-14 fw-600'>
                                        {t('Customer Information')}
                                    </Text>
                                    <Text className='fs-13 subtitle-color'>
                                        {t('Please provide your details to complete the subscription.')}
                                    </Text>
                                </Flex>
                                <Row gutter={16} className='mt-1'>
                                    <Col md={{span: 12}} span={24}>
                                        <MyInput
                                            label={t('First Name')}
                                            name='firstName'
                                            required
                                            message={'Please Enter First Name'}
                                            placeholder={t('Enter First Name')}
                                        />
                                    </Col>
                                    <Col md={{span: 12}} span={24}>
                                        <MyInput
                                            label={t('Last Name')}
                                            name='lastName'
                                            required
                                            message={t('Please Enter Last Name')}
                                            placeholder={t('Enter Last Name')}
                                        />
                                    </Col>
                                    <Col md={{span: 12}} span={24}>
                                        <MyInput
                                            name="phoneNo"
                                            label={t('Phone Number')}
                                            required
                                            message={t('Please enter a valid phone number')}
                                            addonBefore={
                                                <Select
                                                    defaultValue="+966"
                                                    style={{ width: 80 }}
                                                    onChange={(value) => form.setFieldsValue({ countryCode: value })}
                                                >
                                                    <Select.Option value="sa">+966</Select.Option>
                                                    <Select.Option value="ae">+954</Select.Option>
                                                </Select>
                                            }
                                            placeholder="3445592382"
                                            value={form.getFieldValue("phoneNo") || ""}
                                        />
                                    </Col>
                                    <Col md={{span: 12}} span={24}>
                                        <MyInput
                                            label={t('Email Address')}
                                            name='email'
                                            required
                                            message={t('Please Enter Email Address')}
                                            placeholder={t('Enter Email Address')}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className='shadow'>
                                <Flex vertical gap={0}>
                                    <Text className='fs-14 fw-600'>
                                        {t('Select Payment Method')}
                                    </Text>
                                    <Text className='fs-13 subtitle-color'>
                                        {t('Select a secure payment option to continue.')}
                                    </Text>
                                </Flex>
                                <Row gutter={16} className='mt-1' justify={'center'}>
                                    <Col span={24}>
                                        <MyInput
                                            label={t('Cardholder Name')}
                                            name='cardholderName'
                                            required
                                            message={t('Please enter cardholder name')}
                                            placeholder={t('Enter Cardholder Name')}
                                        />
                                    </Col>
                                    <Col md={{span: 12}} span={24}>
                                        <MyInput
                                            type='number'
                                            label={t('Card Number')}
                                            name='cardNo'
                                            required
                                            message={t('Please enter card number')}
                                            placeholder={t('Enter Card Number')}
                                        />
                                    </Col>
                                    <Col md={{span: 6}} span={24}>
                                        <MyDatepicker
                                            datePicker
                                            label={t('Expiry Date')}
                                            name='expiryDate'
                                            required
                                            message={t('Please enter expiry date')}
                                            placeholder={t('Enter expiry date')}
                                        />
                                    </Col>
                                    <Col md={{span: 6}} span={24}>
                                        <MyInput
                                            type='number'
                                            label={t('CVV')}
                                            name='cvv'
                                            required
                                            message={t('Please enter cvv')}
                                            placeholder={t('Enter CVV')}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Flex justify='center' gap={10} className='mt-3'>
                                            <Button type='button' onClick={onClose} className='btn' block>
                                               {t('Cancel')}
                                            </Button>
                                            <Button
                                                className='btn bg-brand text-white'
                                                block
                                            >
                                                {t('Complete Payment')}
                                            </Button>
                                        </Flex>
                                    </Col>
                                    <Col span={24}>
                                        <Flex justify='center'>
                                            <Flex className='pill-square mt-2' gap={8} align='center' justify='center'>
                                                <img src="/assets/icons/shield.png" width={16} alt="" />
                                                <Text className='fs-12 text-sky'>
                                                    {t('Your payment method is secured with end-to-end encryption')}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                    <Col span={24}>
                                        <Flex justify='center' className='mt-1'> 
                                            <Text className='fs-13'>
                                                {t('Need help? Contact Us on')} <NavLink className='text-sky' to={'tel:+966432543654'}>+966 432 543 654</NavLink>
                                            </Text>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Card>
                        </Flex>
                    </Form>
                </Flex>
            </Modal>
            <ChangePlanModal visible={change} onClose={()=>setChange(false)}/> 
        </>
    )
}

export {CheckoutModal}