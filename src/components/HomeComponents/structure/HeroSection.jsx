import React from 'react'
import { Flex, Typography, Image, Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Text, Title } = Typography;
const HeroSection = () => {
  const {t}= useTranslation()
  const navigate = useNavigate();
  return (
 <>
    <section className='hero-section'>
      <div className='container'>
        <Flex vertical gap={20} justify='center' align='center' className='main-flex'>
          <Flex vertical gap={20} className='w-700' align='center'>
            <Text className='custom-text'>{t('Qloop – Powering Appointments for Clinics, Spas, Salons & General Businesses')}</Text>
            <Title level={1} className='m-0 text-center main-heading'>{t('Smart WhatsApp Booking for')}<span className='text-brand'>{t('Modern Businesses')}</span></Title>
            <Text className='fs-16'>{t('Manage bookings, reduce no-shows, and engage clients — all from one powerful platform integrated with WhatsApp.')}</Text>
            <Button className='btn bg-brand text-white' onClick={()=>navigate('/bookdemo')}>{t('Book A Demo')}</Button>
          </Flex>
          <Image src='/assets/images/hero-image.png' preview={false}/>
        </Flex>
      </div>
    </section>
 </>
  )
}

export { HeroSection } 
