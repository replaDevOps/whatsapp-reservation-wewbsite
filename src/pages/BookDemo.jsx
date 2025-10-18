import React from 'react'
import { Row, Col, Flex, Image, Typography, Form, Checkbox, Button } from 'antd';
import { MyInput } from '../components';
import { useTranslation } from 'react-i18next';
const { Text, Title, Paragraph } = Typography;
const BookDemo = () => {
  const [form] = Form.useForm();
  const {t} = useTranslation();
  return (
    <>
      <Row gutter={[12, 12]} style={{ width: '100%', padding: '0px' }}>
        <Col xs={24} sm={24} md={24} lg={12} className='login-left-side'>
          <div className='form-inner'>
            <Title level={3}>{t('Book A Demo')}</Title>
            <Paragraph className='text-grey fs-16'>{t('From barber shops to clinics, businesses save time and increase bookings with our system. Book a demo to see how it works for you.')}</Paragraph>
            <Form
            layout='vertical'
            form={form}
            requiredMark={false}
            className='mt-3'
            >
                <MyInput
                        label={t('Full Name')}
                        name='fullname'
                        required
                        message={t('Please Enter Full Name')}
                        placeholder={t('Enter Full Name')}
                      />
               <MyInput
                        label={t('Email Address')}
                        name='email'
                        required
                        message={t('Please Enter Email Address')}
                        placeholder={t('Enter Email Address')}
                      />
                      <MyInput
                        label={t('Message')}
                        name='message'
                        required
                        message={t('Please Enter Message')}
                        placeholder={t('Write your message')}
                        textArea
                      />
                       <Button
                        type="primary"
                        className="btn bg-brand fs-16 mt-2"
                        block
                      >
                        {t('Send')}
                      </Button>
            </Form>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} className='login-right-side'>
          <Flex vertical gap={50} align='center' className='h-100'>
            <Flex vertical align='center' gap={5}>
                <div className='logo'>
              <img src='/assets/images/logo.png' style={{ height: '70px' }} />
            </div>
              <Title className='m-0'>{t('See Why Businesses Love')}</Title>
              <Title className='m-0 bg-text text-brand'>{t('QLoop!')}</Title>
            </Flex>
            <Image src='/assets/images/login-img.png' preview={false} />
          </Flex>
        </Col>
      </Row>
    </>
  )
}

export { BookDemo } 
