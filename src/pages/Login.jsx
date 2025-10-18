import React from 'react'
import { Row, Col, Flex, Image, Typography, Form, Checkbox, Button } from 'antd';
import { MyInput } from '../components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Text, Title, Paragraph } = Typography;
const Login = () => {
  const [form] = Form.useForm();
  const {t} = useTranslation();
  return (
    <>
      <Row gutter={[12, 12]} style={{ width: '100%', padding: '0px' }}>
        <Col xs={24} sm={24} md={24} lg={12} className='login-left-side'>
          <div className='form-inner'>
            <div className='logo'>
              <img src='/assets/images/logo.png' style={{ height: '70px' }} />
            </div>
            <Title level={3}>{t('Welcome Back')}</Title>
            <Paragraph className='text-grey fs-16'>{t('Please Sign in to access your system and manage platform activities.')}</Paragraph>
            <Form
              layout='vertical'
              form={form}
              requiredMark={false}
              className='mt-3'
            >
              <MyInput
                label={t('Email Address')}
                name='email'
                required
                message={t('Please Enter Email Address')}
                placeholder={t('Enter Email Address')}
              />
              <MyInput
                label={t('Password')}
                type='password'
                name='password'
                required
                message={t('Please Enter Password')}
                placeholder={t('Enter Password')}
              />
              <Flex justify="space-between" className="mb-3">
                <Checkbox>{t('Remember Me')}</Checkbox>
                <NavLink to={'/'} className="fs-13 text-brand">
                  {t('Forget Password?')}
                </NavLink>
              </Flex>
              <Button
                htmlType="submit"
                type="primary"
                className="btn bg-brand fs-16 mt-2"
                block
              >
              {t('Sign In')}
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} className='login-right-side'>
          <Flex vertical gap={50} align='center' className='h-100'>
            <Flex vertical align='center' gap={5}>
              <Title className='m-0'>{t('Simplify Your Bookings')}</Title>
              <Title className='m-0 text-brand'>{t('Streamline')}  <span className='bg-text'>{t('Your Day')}</span></Title>
            </Flex>
            <Image src='/assets/images/login-img.png' preview={false} />
          </Flex>
        </Col>
      </Row>
    </>
  )
}

export { Login } 
