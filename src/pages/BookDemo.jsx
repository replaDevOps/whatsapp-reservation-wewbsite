import { Row, Col, Flex, Typography, Form, Button, Select, Image, notification} from "antd";
import { LanguageChange, MyInput, MySelect } from "../components";
import { useTranslation } from "react-i18next";
import { BOOK_DEMO } from "../graphql/mutation";
import { useMutation } from "@apollo/client/react";
import { businessTypeLookup, notifyError, notifySuccess } from "../shared";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography

const BookDemo = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { t,i18n } = useTranslation();
    const isArabic  = i18n?.language === 'ar'
    const [toater, contextHolder] = notification.useNotification()
    const [_bookDemo, { loading, error }] = useMutation(BOOK_DEMO, {
      onCompleted: () => {
        notifySuccess(
          toater,
          t("Demo Booked"),t("Your demo has been booked successfully! Our team will contact you shortly."),
          ()=>{form.resetFields();navigate('/')}  
        )
      },onError:()=>{notifyError(toater,error)}
    })

    const bookDemo= async ()=>{
      try {
        const data= form.getFieldsValue()
        await _bookDemo({ variables: {input : {...data} } })
      }
      catch (error){
        console.log(error)
      }
    }
    return (
        <>
          {contextHolder}
          <Row gutter={[12, 12]} className="w-100 p-0 m-0">
              <Col xs={24} sm={24} md={24} lg={12} className="login-left-side">
                  <div className="form-inner">
                      <Flex align="center" gap={10} className="mb-2">
                        <Button aria-labelledby="Arrow left" shape="circle" onClick={() => navigate("/")}>
                          {
                            isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />
                          } 
                        </Button>
                        <Title level={3} className="m-0">{t("Book A Demo")}</Title>
                      </Flex>
                      <Paragraph className="text-grey fs-16">
                        {t(
                          "From barber shops to clinics, businesses save time and increase bookings with our system. Book a demo to see how it works for you."
                        )}
                      </Paragraph>
                      <Form 
                        layout="vertical" 
                        form={form} 
                        className="mt-3"
                        onFinish={bookDemo}
                      >
                        <Row>
                          <Col span={24}>
                            <MyInput
                              label={t("Full Name")}
                              name="name"
                              required
                              message={t("Please Enter Full Name")}
                              placeholder={t("Enter Full Name")}
                            />
                          </Col>
                          <Col span={24}>
                            <MyInput
                              label={t("Email Address")}
                              name="email"
                              required
                              message={t("Please Enter Email Address")}
                              placeholder={t("Enter Email Address")}
                            />
                          </Col>
                          <Col span={24}>
                            <MyInput
                                label={t("Phone Number")}
                                name="phone"
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
                                value={form.getFieldValue("phoneNo") || ""}
                                className="w-100"
                              />
                          </Col>
                          <Col span={24}>
                            <MySelect
                              label={t("Business Type")}
                              name="businessType"
                              required
                              message={t("Please enter business type")}
                              placeholder={t("Select Business Type")}
                              options={businessTypeLookup}
                            />
                          </Col>
                          <Col span={24}>
                            <MyInput
                              label={t("Message")}
                              name="message"
                              required
                              message={t("Please Enter Message")}
                              placeholder={t("Write your message")}
                              textArea
                            />
                          </Col>
                          <Col span={24}>
                            <Button 
                              type="primary" 
                              className="btn bg-brand fs-16 mt-2" 
                              block
                              onClick={()=> form.submit()}
                              loading={loading}
                            >
                              {t("Send")}
                            </Button>
                          </Col>
                        </Row>                            
                      </Form>
                  </div>
              </Col>
              <Col xs={0} sm={0} md={24} lg={12} className="login-right-side">
                  <Flex justify="end">
                        <LanguageChange languageClass='btn' />
                    </Flex>
                  <Flex vertical gap={50} align="center" className="h-100">
                      <Flex vertical align="center" gap={5}>
                          <div className="logo">
                              <img src="/assets/images/logo.webp" alt="logo whatsapp reservation" fetchPriority="high" className="h-70" />
                          </div>
                          <Title className="m-0">{t("See Why Businesses Love")}</Title>
                          <Title className="m-0 bg-text text-brand">{t("QLoop!")}</Title>
                      </Flex>
                      <Image src="/assets/images/login-img.png" alt="demo banner image" fetchPriority="high" preview={false} />
                  </Flex>
              </Col>
          </Row>              
        </>
    );
};

export { BookDemo };
