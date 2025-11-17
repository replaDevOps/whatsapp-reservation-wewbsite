import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import { Modal, Typography, Button, Flex, Card, Form, Col, Row, Image, Radio } from 'antd'
import { ConfirmationModal, MyDatepicker, MyInput, MySelect, SingleFileUpload } from '../../../components';
import { NavLink } from 'react-router-dom';
import { ChangePlanModal } from './ChangePlanModal';
import { useTranslation } from 'react-i18next';
import { creditData } from '../../../data';
import { businessType } from '../../../shared';

const { Title, Text } = Typography
const CheckoutModal = ({visible,onClose,setCheckoutVisible}) => {
    const [form] = Form.useForm();
    const [change, setChange] = useState(false)
    const {t} = useTranslation();
    const [selectedPlan, setSelectedPlan] = useState(creditData[0]);
    const [confirm, setConfirm] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const handleChange = (e) => {
        const selectedkey = e.target.value;
        const planobj = creditData?.find((item) => item?.id === selectedkey)
        setSelectedPlan(planobj)
    }

    const handleSingleFileUpload = async (file) => {
        try {
        const fileInfo = await uploadFileToServer(file);
        const updatedDocs = [...data.documents];
        updatedDocs[0] = {
            title: 'Commercial Registration (CR)',
            ...fileInfo,
        };
        setData((prev) => {
            const updated = { ...prev, documents: updatedDocs };
            return JSON.stringify(updated) !== JSON.stringify(prev) ? updated : prev;
        });
        } catch {
        }
    };

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
                
                <Form
                    layout='vertical'
                    form={form}
                    requiredMark={false}
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
                                                {t('200')}<sub className='fs-12 subtitle-color'>/{t('Monthly')?.toLowerCase()}</sub>
                                            </Title>
                                            <Button className='btn bg-brand text-white' onClick={()=>{setChange(true); setCheckoutVisible(false)}}>
                                            {t('Change Plan')}
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Card>
                                <Row gutter={16} justify={'center'}>
                                    <Col span={24}>
                                        <SingleFileUpload
                                            form={form}
                                            name={'uploadcr'}
                                            title={t('Upload Logo')}
                                            onUpload={handleSingleFileUpload}
                                            uploading={uploading}
                                            multiple={false}
                                        />
                                    </Col>
                                    <Col md={{span: 12}} span={24} className='mt-1'>
                                        <MyInput
                                            label={t('Business Name')}
                                            name='businessName'
                                            required
                                            message={t('Please enter business name')}
                                            placeholder={t('Enter business name')}
                                        />
                                    </Col>
                                    <Col span={24} md={{span: 12}} className='mt-1'>
                                        <MySelect
                                            label={t("Business Type")}
                                            name="businessType"
                                            required
                                            message={t("Please enter business type")}
                                            placeholder={t("Select Business Type")}
                                            options={businessType}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <MyInput
                                            label={t('Discount Code')}
                                            name='discountCode'
                                            placeholder={t('Enter discount code if any')}
                                        />
                                    </Col>
                                </Row>
                            </Flex>
                        </Card>
                        <Flex vertical gap={10}>
                            <Card className='shadow'>
                                <Flex vertical gap={0}>
                                    <Title level={5} className='fw-600 m-0'>
                                        {t('Select Payment Method')}
                                    </Title>
                                    <Text className='fs-13 subtitle-color'>
                                        {t('Select a secure payment option to continue.')}
                                    </Text>
                                </Flex>
                                <Radio.Group
                                    value={selectedPlan?.id}
                                    onChange={handleChange}
                                    className='w-100 mt-2'
                                >
                                    {creditData?.map((packages, index) => (
                                        <Card className={`shadow mb-2 card-cs cursor ${selectedPlan?.id === packages.id ? 'border-brand' : ''}`} key={index}
                                            onClick={() =>
                                                handleChange({ target: { value: packages.id } })
                                            }
                                        >
                                            <Flex justify="space-between" gap={5}>
                                                <Radio value={packages.id}>
                                                    {t(packages?.title)}
                                                </Radio>
                                                <Flex>
                                                    {
                                                        Array.isArray(packages?.cards) ?
                                                        <Flex gap={5} align="center" wrap>
                                                            {
                                                                packages?.cards?.map((list,i)=>
                                                                    <Image src={list} preview={false} width={35} key={i} alt='cards icon' fetchPriority="high" />
                                                                )
                                                            }
                                                        </Flex>
                                                        :
                                                        <Image src={packages?.cards} preview={false} width={35} alt='cards icon' fetchPriority="high" />
                                                    }
                                                </Flex>
                                            </Flex>
                                        </Card>
                                    ))}
                                </Radio.Group>
                                <Row gutter={16} justify={'center'}>
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
                                                onClick={() => {
                                                    setConfirm(true);
                                                    onClose();
                                                }}
                                            >
                                                {t('Complete Payment')}
                                            </Button>
                                        </Flex>
                                    </Col>
                                    <Col span={24}>
                                        <Flex justify='center'>
                                            <Flex className='pill-square mt-2' gap={8} align='center' justify='center'>
                                                <img src="/assets/icons/shield.png" width={16} alt="shield icon" fetchPriority="high" />
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
                    </Flex>
                </Form>
            </Modal>
            <ChangePlanModal 
                visible={change} 
                onClose={()=>setChange(false)} 
                setCheckoutVisible={setCheckoutVisible}
            /> 
            <ConfirmationModal visible={confirm} onClose={() => setConfirm(false)} />
        </>
    )
}

export {CheckoutModal}