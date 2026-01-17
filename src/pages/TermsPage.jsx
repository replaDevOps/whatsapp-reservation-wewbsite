import { Card, Row, Col, Flex, Typography, Spin } from 'antd'
import { MainSection } from '../components'
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { GET_TERMS } from '../graphql/query';
import { TableLoader } from '../shared';

const {Text, Title} = Typography;
const TermsPage = () => {
    const {t}= useTranslation()
    const { data,loading } = useQuery(GET_TERMS)
    const terms = data?.getTermsCondition?.content
    return (
        <>
            <MainSection title={t('Terms')} heading={t('Terms of Use')} desc= {t('Manage bookings, reduce no-shows, and engage clients — all from one powerful platform integrated with WhatsApp.')}/>
            <div className='common-padding'>
                <div className="container">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Card className='bg-grey border-grey'>
                                {/* <Flex gap={20} className='w-100 mb-2'>
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
                                </Flex> */}
                                {
                                    loading ? 
                                    <Flex align='center' justify='center'>
                                        <Spin {...TableLoader} size='small' />
                                    </Flex>
                                    :
                                    <div
                                        dangerouslySetInnerHTML={{
                                        __html: terms,
                                        }}
                                    ></div>
                                }
                            </Card>
                        </Col>
                    </Row>    
                </div>    
            </div>  
        </>
    )
}

export {TermsPage} 
