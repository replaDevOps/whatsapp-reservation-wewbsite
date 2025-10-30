import { Row, Col, Flex, Image, Typography, Form, Button, Select, notification } from "antd";
import { MyInput } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const Signup = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [toater, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const openActiveStatus = () => {
        toater.success({
            message: `Account created successfully!`,
            description: 'You will be redirected towards the packages page in a moment.',
            placement: 'topRight',
            showProgress: true,
        });
    };

    return (
      <>
        {contextHolder}
        <Row gutter={[12, 12]} className="w-100 m-0 h-100dvh">
            <Col xs={24} sm={24} md={24} lg={12} className="login-left-side ">
                <div className="form-inner">
                    <Button aria-labelledby='Arrow left' shape="circle" onClick={()=>navigate('/')}>
                        <ArrowLeftOutlined />
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
                    <Form layout="vertical" form={form} requiredMark={false} className="mt-3">
                        <MyInput
                            label={t("First Name")}
                            name="firstName"
                            message="Please Enter First Name"
                            placeholder={t("Enter First Name")}
                        />
                        <MyInput
                            label={t("Last Name")}
                            name="lastName"
                            message="Please Enter Last Name"
                            placeholder={t("Enter Last Name")}
                        />
                        <Col span={24}>
                            <MyInput
                                label="Phone Number"
                                name="phoneNo"
                                required
                                message="Please enter a valid phone number"
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
                                value={form.getFieldValue("phoneNo") || ""}
                                className="w-100"
                            />
                        </Col>
                        <MyInput
                            label={t("Email Address")}
                            name="email"
                            required
                            message="Please Enter Email Address"
                            placeholder={t("Enter Email Address")}
                        />
                        <MyInput
                            label={t("Password")}
                            type="password"
                            name="password"
                            required
                            message="Please Enter Password"
                            placeholder={t("Enter Password")}
                        />
                        <MyInput
                            label={t("Re-type Password")}
                            type="password"
                            name="password"
                            required
                            message="Please Enter Password Again"
                            placeholder={t("Enter Password")}
                        />
                        <Button htmlType="submit" onClick={openActiveStatus} type="primary" className="btn bg-brand fs-16 mt-2" block>
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
            <Col xs={0} sm={0} md={24} lg={12} className="login-right-side">
                <Flex vertical gap={50} align="center" justify="space-between" className="h-100">
                    <Flex vertical align="center" gap={5}>
                        <Title className="m-0">{t("Simplify Your Bookings")}</Title>
                        <Title className="m-0 text-brand">
                            {t("Streamline")} <span className="bg-text">{t("Your Day")}</span>
                        </Title>
                    </Flex>
                    <Image src="/assets/images/login-img.png" alt="signup banner image" fetchPriority="high" preview={false} />
                </Flex>
            </Col>
        </Row>
      </>
    );
};

export { Signup };
