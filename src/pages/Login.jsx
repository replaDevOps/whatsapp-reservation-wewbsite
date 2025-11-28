import { Row, Col, Flex, Image, Typography, Form, Checkbox, Button, message } from "antd";
import { MyInput } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client/react";
import { LOGIN_SUBSCRIBER } from "../graphql/mutation";

const { Title, Paragraph } = Typography;
const Login = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [messageApi] = message.useMessage();
    const [_loginSubscriber, { loading }] = useMutation(LOGIN_SUBSCRIBER);
    const loginSubscriber = async () => {
            const values = form.getFieldsValue()
             try {
              const { email, password } = values;
              const { data } = await _loginSubscriber({ variables: { email, password } });
              if (data) {
                localStorage.setItem("accessToken", data.loginUser.token)
                localStorage.setItem("userId", data.loginUser.user.id)
                localStorage.setItem("user", JSON.stringify(data?.loginUser?.user))
                localStorage.setItem("email", email)
                navigate("/subscription-plans")
              } else {
                messageApi.error("Login failed: Invalid credentials")
                localStorage.clear()
              }
            } catch (error) {
                messageApi.error("Login failed: Something went wrong")
                localStorage.removeItem("accessToken")
                localStorage.removeItem("userId")
                localStorage.removeItem("email")
                localStorage.removeItem("user")
            }
       
      };
    return (
        <>
            <Row gutter={[12, 12]} className="w-100 m-0 h-100dvh">
                <Col xs={24} sm={24} md={24} lg={12} className="login-left-side">
                    <div className="form-inner">
                        <Button aria-labelledby="Arrow left" shape="circle" onClick={() => navigate("/")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <NavLink to={"/"}>
                            <div className="logo">
                                <img
                                    src="/assets/images/logo.webp"
                                    className="h-70"
                                    alt="logo whatsapp reservation"
                                    fetchPriority="high"
                                />
                            </div>
                        </NavLink>
                        <Title level={3}>{t("Welcome Back")}</Title>
                        <Paragraph className="text-grey fs-16">
                            {t("Please Sign in to access your system and manage platform activities.")}
                        </Paragraph>
                        <Form 
                            layout="vertical" 
                            form={form} 
                            requiredMark={false} 
                            className="mt-3"
                            onFinish={loginSubscriber}
                        >
                            <MyInput
                                label={t("Email Address")}
                                name="email"
                                required
                                message={t("Please Enter Email Address")}
                                placeholder={t("Enter Email Address")}
                            />
                            <MyInput
                                label={t("Password")}
                                type="password"
                                name="password"
                                required
                                message={t("Please Enter Password")}
                                placeholder={t("Enter Password")}
                            />
                            <Flex justify="space-between" className="mb-3">
                                <Checkbox>{t("Remember Me")}</Checkbox>
                                <NavLink to={"/"} className="fs-13 text-brand">
                                    {t("Forget Password?")}
                                </NavLink>
                            </Flex>
                            <Button 
                                htmlType="submit" 
                                type="primary" 
                                className="btn bg-brand fs-16 mt-2" 
                                block
                                loading={loading}
                            >
                                {t("Sign In")}
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={24} lg={12} className="login-right-side">
                    <Flex vertical gap={50} align="center" className="h-100">
                        <Flex vertical align="center" gap={5}>
                            <Title className="m-0">{t("Simplify Your Bookings")}</Title>
                            <Title className="m-0 text-brand">
                                {t("Streamline")} <span className="bg-text">{t("Your Day")}</span>
                            </Title>
                        </Flex>
                        <Image src="/assets/images/login-img.png" alt="login banner image" fetchPriority="high" preview={false} />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export { Login };
