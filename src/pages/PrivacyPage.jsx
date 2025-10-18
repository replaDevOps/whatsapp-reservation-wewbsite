import React from 'react'
import { Card, Row, Col, Flex, Typography } from 'antd'
import { MainSection } from '../components'
import { useTranslation } from 'react-i18next';
const {Text, Title} = Typography;

const PrivacyPage = () => {
    const {t}= useTranslation()
  return (
    <>
     <MainSection title={t('Terms')} heading={t('Privacy Policy')} desc= {t('Manage bookings, reduce no-shows, and engage clients — all from one powerful platform integrated with WhatsApp.')}/>
    <div className='common-padding'>
    <div className="container">
    <Row>
    <Col xs={24} sm={24} md={24} lg={24}>
    <Card className='bg-grey border-grey'>
            <Flex gap={20} className='w-100 mb-2'>
                <Title level={4} className='m-0 nowrap'>01</Title>
                <Flex vertical gap={15}>
                    <Title level={4} className='m-0'>{t('Overview & Acceptance')}</Title>
                    <Text className='fs-16 text-justify'>{t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}</Text>
                    <Text className='fs-16 text-justify'>
                        {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                    <Text className='fs-16 text-justify'>
                        {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                </Flex>
            </Flex>
            <Flex gap={20} className='w-100'>
                <Title level={4} className='m-0 nowrap'>02</Title>
                <Flex vertical gap={15}>
                    <Title level={4} className='m-0'>{t('Account Creation & Eligibility')}</Title>
                    <Text className='fs-16 text-justify'>
                       {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                    <Text className='fs-16 text-justify'>
                        {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                    <Text className='fs-16 text-justify'>
                        {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                    <Text className='fs-16 text-justify'>
                     {t('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quos eos aspernatur facere voluptatem. Quisquam laudantium inventore in sequi eum porro id recusandae dolor doloremque tempora asperiores quia eaque officiis ad accusantium, totam velit? Ea sunt voluptates, iusto dolorem quis expedita asperiores optio dolores animi facere aut voluptate consequatur ex?')}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    </Col>
    </Row>    
    </div>    
    </div>  
    </>
  )
}

export {PrivacyPage} 
