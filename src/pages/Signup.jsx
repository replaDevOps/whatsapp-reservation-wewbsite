import { Row, Col, Flex, Image, Typography, Form, Button, Select, notification } from "antd";
import { LanguageChange, MyInput } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client/react";
import { REGISTER_SUBSCRIBER } from "../graphql/mutation";
import { useEffect } from "react";
import { notifyError, notifySuccess } from "../shared";

const { Title, Paragraph } = Typography

const Signup = () => {

    const [form] = Form.useForm();
    const { t,i18n } = useTranslation();
    const isArabic  = i18n?.language === 'ar'
    const [toater, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const [_registerSubscriber, {loading, error}] = useMutation(REGISTER_SUBSCRIBER, {
        onCompleted: () => {
        notifySuccess(
          toater,
          t("Account Create"),t("Account has been created successfully! You will be redirected towards the login page in a moment."),
          ()=> navigate("/signin")  
        )
      },onError:(error)=>{notifyError(toater,error)}
    })
    const registerSubscriber= async ()=>{
        try {
            const data= form.getFieldsValue()
            delete data?.confirmPassword
            await _registerSubscriber({ variables: { input: {...data} } })
        }
        catch (error){
            console.log(error)
        }
    }
    return (
      <>
        {contextHolder}
        <Row gutter={[12, 12]} className="w-100 m-0 h-100dvh">
            <Col xs={24} sm={24} md={24} lg={10} className="login-left-side ">
                <div className="form-inner">
                    <Button aria-labelledby='Arrow left' shape="circle" onClick={()=>navigate('/')}>
                        {
                            isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />
                        } 
                    </Button>
                    <NavLink to={'/'}>
                      <div className="logo">
                        <img src="/assets/images/logo.webp" className="h-70" alt='logo whatsapp reservation' fetchPriority="high" />
                      </div>
                    </NavLink>
                    <Title level={3}>{t("Welcome!")}</Title>
                    <Paragraph className="text-grey fs-16">
                        {t("Please Signup to access your system and manage platform activities.")}
                    </Paragraph>
                    <Form 
                        layout="vertical" 
                        form={form} 
                        requiredMark={false} 
                        className="mt-3"
                        onFinish={registerSubscriber}
                    >
                        <MyInput
                            label={t("First Name")}
                            name="firstName"
                            required
                            message="Please Enter First Name"
                            placeholder={t("Enter First Name")}
                        />
                        <MyInput
                            label={t("Last Name")}
                            name="lastName"
                            required
                            message={t("Please Enter Last Name")}
                            placeholder={t("Enter Last Name")}
                        />
                        <MyInput
                            label={t("Phone Number")}
                            name="phone"
                            type={'number'}
                            required
                            message={t("Please enter a valid phone number")}
                            addonBefore={
                                <Select
                                    defaultValue="+966"
                                    className="w-80"
                                    onChange={(value) => form.setFieldsValue({ countryCode: value })}
                                >
                                    <Select.Option value="sa">+966</Select.Option>
                                    <Select.Option value="ae">+955</Select.Option>
                                </Select>
                            }
                            placeholder=""
                            className="w-100"
                            maxLength={20}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
                            }}
                            validator={
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        const phoneLength = value.toString().length;
                                        if (phoneLength < 9 || phoneLength > 20) {
                                            return Promise.reject(new Error(t("Phone number must be between 9 and 20 digits")));
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            }
                        />
                        <MyInput
                            label={t("Email Address")}
                            name="email"
                            required
                            message={t("Please Enter Email Address")}
                            placeholder={t("Enter Email Address")}
                            validator={
                                {
                                    type: 'email',
                                    message: t("Please enter a valid email address"),
                                }
                            }
                        />
                        <MyInput
                            label={t("Password")}
                            type="password"
                            name="password"
                            required
                            message={()=>{}}
                            placeholder={t("Enter Password")}
                            validator={({ getFieldValue }) => ({
                                validator: (_, value) => {
                                    const reg = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
                                    if (!reg.test(value)) {
                                        return Promise.reject(new Error(t('Password should contain at least 8 characters, one uppercase letter, one number, one special character')));
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })}
                        />
                        <MyInput
                            label={t("Re-type Password")}
                            type="password"
                            name="confirmPassword"
                            required
                            message={t("Please Enter Password Again")}
                            placeholder={t("Enter Password")}
                            validator={
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Passwords do not match!"));
                                    }
                                })
                            }
                        />
                        <Button 
                            htmlType="submit" 
                            type="primary" 
                            className="btn bg-brand fs-16 mt-2" 
                            loading={loading}
                            block
                        >
                            {t("Sign Up")}
                        </Button>
                        <Flex justify="center" className="mt-1">
                            <Paragraph className="fs-14">
                                {t("Already have account?")}{" "}
                                <NavLink to={"/signin"} className={"text-brand"}>
                                    {t("Sign In")}
                                </NavLink>
                            </Paragraph>
                        </Flex>
                    </Form>
                </div>
            </Col>
            <Col xs={0} md={12} lg={14} className="login-right-side">
                <Flex justify="end">
                    <LanguageChange languageClass="btn" />
                </Flex>
                <Flex vertical justify="space-between" align="center" gap={40} className="logo-sp">
                    <Flex vertical align="center" gap={20}>
                        <Title level={2} className="m-0">
                            {t("Simplify Your Bookings,")}
                        </Title>
                        <Title level={2} className="m-0 text-dark-brand">
                            {t("Streamline")} <span className="px-2 border-radius-12 py-2 bg-white">{t("Your Day")}.</span>
                        </Title>
                    </Flex>
                    <Image src="/assets/images/login-frame.svg" alt='dashboard image' fetchPriority="high" preview={false} />
                </Flex>
            </Col>
        </Row>
      </>
    );
};

export { Signup };
