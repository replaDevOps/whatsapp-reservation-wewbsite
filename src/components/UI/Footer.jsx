import React from 'react'
import { Row, Col, Flex, Typography, Space, Image, Divider } from 'antd'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const {Text} = Typography;
const Footer = () => {
    const {t} = useTranslation()
  return (
    <div className='footer'>
      <div className="container">
        <Row gutter={[24,24]} justify={'center'}>
            <Col xs={24} sm={24} md={12} lg={8}>
            <Flex vertical gap={20} align='center' className='w-100'>
                <Image src='/assets/images/logo.png' width={70} preview={false}/>
                <Text className='fs-16 text-white text-center'>{t('Qloop is a modern reservation system designed to simplify bookings, manage staff, and improve customer experience all from one platform.')}</Text>
                <Flex gap={20}>
                    <NavLink to={'/'}>
                        <Image src='/assets/icons/facebook.png' preview={false} width={20} height={20}/>
                    </NavLink>
                    <NavLink to={'/'}>
                    <Image src='/assets/icons/instagram.png' preview={false} width={20} height={20}/>
                    </NavLink>
                    <NavLink to={'/'}>
                    <Image src='/assets/icons/whatsapp.png' preview={false} width={20} height={20}/>
                    </NavLink>
                </Flex>
            </Flex>
            </Col>
            <Col span={24}>
            <Divider className='bg-white m-0'/>
            </Col>
             <Col lg={{span: 12}} md={{span:24}} sm={{span: 24}} xs={{span: 24}}>
                    <Flex align='items-center' className='w-100 quote' gap={20}>
                        <Typography.Text className='fs-12 text-white'>
                            {t('Copyright ©')} {new Date().getFullYear()}
                        </Typography.Text>
                        <span className='text-brand'> | </span>
                        <NavLink to={''} className='fs-12 text-white'>
                            {t('Design by Repla Technologies')}
                        </NavLink>
                    </Flex>
                </Col>
                <Col lg={{span: 12}} md={{span:24}} sm={{span: 24}} xs={{span: 24}}>
                    <Flex  align='items-center' className='w-100 lastlink' gap={20}>
                        <NavLink to={'/termsofuse'} className='fs-12 text-white'>
                            {t('Terms of Use')}
                        </NavLink>
                        <span className='text-white'> | </span>
                        <NavLink to={'/privacypolicy'} className='fs-12 text-white'>
                            {t('Privacy Policy')}
                        </NavLink>
                    </Flex>
                </Col>
        </Row>
      </div>
    </div>
  )
}

export {Footer}
