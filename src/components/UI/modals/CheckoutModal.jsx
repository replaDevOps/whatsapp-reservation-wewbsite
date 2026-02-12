import { useEffect, useState } from 'react'
import { data, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CloseOutlined } from '@ant-design/icons'
import { Modal, Typography, Button, Flex, Card, Form, Col, Row, Image, Radio, Tag, Spin, notification } from 'antd'
import { ConfirmationModal, MyDatepicker, MyInput, MySelect } from '../../../components'
import { creditData } from '../../../data';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_BUSINESS } from '../../../graphql/mutation/business';
import { ChangePlan } from './ChangePlan';
import { businessTypeLookup, capitalizeTranslated, notifyError, notifySuccess, SmLoader } from '../../../shared';
import { VERIFY_DISCOUNT } from '../../../graphql/query'

const { Title, Text, Paragraph } = Typography
const CheckoutModal = ({visible, onClose, subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity, setSubscriptionValidity,discountData, setDiscountData}) => {
    
    const [form] = Form.useForm()
    const {t} = useTranslation()
    const [selectedPlan, setSelectedPlan] = useState(creditData[0])
    const [isChangePlan, setIsChangePlan]= useState(false)
    const [confirm, setConfirm] = useState(false);
    const [discountStatus, setDiscountStatus] = useState(null);
    const [expanded, setExpanded] = useState(false);    
    const subscriberId= localStorage.getItem("userId")
    const [ api, contextHolder ] = notification.useNotification()
    const [ getVerifyDiscount, { loading:verifyingDiscount } ] = useLazyQuery(VERIFY_DISCOUNT,{
        fetchPolicy:'network-only',
    });
    const [_createBusiness, { loading }] = useMutation(CREATE_BUSINESS, {
        onCompleted: () => {
           notifySuccess(api,'Business Create','Business has been created successfully',()=>{setConfirm(true);onClose()})
        },onError:(error) => {notifyError(api,error)}
    })

    useEffect(()=>{
        if(!visible)
            form.resetFields()
            setDiscountStatus(null)
    }, [visible])

    // Clear discount when subscription validity or plan changes
    useEffect(() => {
        setDiscountStatus(null);
        setDiscountData(null);
        form.setFields([{ name: 'code', errors: [], value: '' }]);
    }, [subscriptionValidity, selectedSubscriptionPlan?.id])
    
    const handleChange = (e) => {
        const selectedkey = e.target.value;
        const planobj = creditData?.find((item) => item?.id === selectedkey)
        setSelectedPlan(planobj)
    }
    const createBusiness= async ()=>{
        let data = form.getFieldsValue()
        const subscriptionPrice = subscriptionValidity === 'YEARLY' ?  selectedSubscriptionPlan?.yearlyPrice : selectedSubscriptionPlan?.price
        data= {
            ...data,
            discountCode: discountData?.discount.id,
            subscriberId,
            subscriptionId: selectedSubscriptionPlan?.id,
            subscriptionType: selectedSubscriptionPlan?.type,
            subscriptionPrice: discountData?.finalPrice ? discountData?.finalPrice : subscriptionPrice,
            subscriptionValidity
        }
        delete data?.customPrice
        console.log('business data',data)
        return;
        await _createBusiness({ variables: { input: {...data} } })
    }

    const checkDiscountCode = async () => {
        const code = form.getFieldValue('code')?.trim();
        if (!code) {
            setDiscountStatus(null);
            setDiscountData(null);
            form.setFields([{ name: 'code', errors: [] }]);
            return;
        }
        try {
            setDiscountData(null);
            const res = await getVerifyDiscount({ variables: { code, subscriberId, subscriptionId:selectedSubscriptionPlan?.id } });
            setDiscountStatus(res?.data?.checkDiscountCode?.isValid === true);
            setDiscountData(res?.data?.checkDiscountCode);
            if (res?.data?.checkDiscountCode?.isValid === false) {
                notifyError(api,res?.data?.checkDiscountCode?.message);
            }
        } catch (error) {
            setDiscountStatus(false);
            setDiscountData(null);
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal 
                width={900}  
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
                    {
                        isChangePlan ?
                        <ChangePlan {...{subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity, setSubscriptionValidity, setIsChangePlan}}/>
                        :
                        <>
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
                                        <Row gutter={[12,12]} align='center' justify='space-between'>
                                            <Col span={24} md={16} lg={17}>
                                                <Flex vertical gap={0}>
                                                    <Title level={3} className='m-0 text-brand'>
                                                        {t(selectedSubscriptionPlan?.type)}
                                                    </Title>
                                                    <Paragraph
                                                        className={`fs-13 subtitle-color`}
                                                        ellipsis={{
                                                            rows: 1,
                                                            expandable:'collapsible',
                                                            symbol: expanded ? <Text className="text-brand">less</Text> : <Text className="text-brand">more</Text>,
                                                            onExpand: (_, info) => setExpanded(info.expanded),
                                                        }}
                                                    >
                                                        {t(selectedSubscriptionPlan?.description)}
                                                    </Paragraph>
                                                </Flex>
                                            </Col>
                                            <Col span={24} md={8} lg={7}>
                                                <Flex vertical gap={5}>
                                                    <Title level={2} className='m-0'>
                                                        <sup className='fs-12'>{t('SAR')}</sup> 
                                                        {
                                                            subscriptionValidity === 'YEARLY' ? (
                                                                discountData?.finalPrice ?  discountData?.finalPrice : selectedSubscriptionPlan?.yearlyPrice
                                                            ) : (
                                                                discountData?.finalPrice ?  discountData?.finalPrice : selectedSubscriptionPlan?.price
                                                            )  
                                                        }
                                                        <sub className='fs-12 subtitle-color'>/{t(capitalizeTranslated(subscriptionValidity))}</sub>
                                                    </Title>
                                                    <Button className='btn bg-brand text-white' onClick={()=> setIsChangePlan(true)}>
                                                        {t('Change Plan')}
                                                    </Button>
                                                </Flex>      
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Form 
                                        layout="vertical" 
                                        form={form} 
                                        className="mt-3"
                                        onFinish={createBusiness}
                                    >
                                        <Row gutter={16} justify={'center'}>
                                            <Col span={12}>
                                                <MyInput
                                                    label={t('Business Name')}
                                                    name='name'
                                                    required
                                                    message={t('Please enter business name')}
                                                    placeholder={t('Enter business name')}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <MySelect
                                                    label={t('Business Type')}
                                                    name='businessType'
                                                    required
                                                    message={t('Please enter business type')}
                                                    placeholder={t('Choose type')}
                                                    options={businessTypeLookup}
                                                />
                                            </Col>
                                            <Col span={24}>
                                                <MyInput
                                                    label={t('Discount Code')}
                                                    name='code'
                                                    placeholder={t('Enter discount code if any')}
                                                    onChange={() => setDiscountStatus(null)}
                                                    suffix={
                                                        <Flex align='center' gap={2}>
                                                            {verifyingDiscount && <Spin {...SmLoader} size="small" />}

                                                            {discountStatus !== null && !verifyingDiscount && (
                                                            discountStatus ? (
                                                                <Text className="text-green fs-12">{t("Valid")}</Text>
                                                            ) : (
                                                                <Text className="text-red fs-12">{t("Invalid")}</Text>
                                                            )
                                                            )}
                                                            <Tag onClick={checkDiscountCode} className='cursor'>{t('Check')}</Tag>
                                                        </Flex>
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Flex>
                            </Card>
                            <Form
                                layout='vertical'
                                // form={form}
                                requiredMark={false}
                            >
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                            form.submit()
                                                        }}
                                                        loading={loading}
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
                            </Form>
                        </>
                    }
                </Flex>
        </Modal>
        <ConfirmationModal visible={confirm} onClose={() => setConfirm(false)} />
        </>
    )
}

export {CheckoutModal}