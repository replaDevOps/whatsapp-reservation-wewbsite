import React from 'react'
import { useRef } from 'react';
import Slider from 'react-slick';
import { Row, Col, Flex, Typography, Carousel, Card, Button, Image } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { reviewsData } from '../../../data';
const { Text, Title } = Typography;
const CustomerReviews = () => {
    const carouselRef = useRef();
    const {t} = useTranslation()
    
    return (
        <div className='common-padding bg-skyblue'>
            <div className='container'>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Flex vertical gap={35}>
                            <Flex vertical gap={15}>
                                <Text className='custom-text'>{t('Customer Reviews')}</Text>
                                <Title className='m-0 fw-600' level={2}>{t('What Our Users Say')}</Title>
                                <Text className='fs-16'>
                                    {t('Real feedback from clients showing how we simplify bookings and boost growth.')}
                                </Text>
                            </Flex>
                            <Flex justify='end' className='mt-1'>
                                <Flex gap={5}>
                                    <Button
                                        className='bg-transparent border-0 p-0'
                                        onClick={() => carouselRef.current.prev()}
                                    >
                                        <img src='/assets/icons/prev.webp' alt='prev icon' width={40} fetchPriority="high" />
                                    </Button>
                                    <Button
                                        className='bg-transparent border-0 p-0'
                                        onClick={() => carouselRef.current.next()}
                                    >
                                        <img src='/assets/icons/next.webp' alt='prev icon' width={40} fetchPriority="high" />
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <Carousel
                            dots={false}
                            autoplay
                            autoplaySpeed={3000}
                            slidesToShow={2}
                            slidesToScroll={1}
                            infinite
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                    },
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 1,
                                    },
                                },
                            ]}
                            ref={carouselRef}
                        >
                            {
                                reviewsData?.map((item, index) => (
                                    <div key={index} className='p-0-12'> {/* Gap yaha set hoga */}
                                        <Card className='mr-10'>
                                            <Flex vertical gap={40}>
                                                <Flex vertical gap={5}>
                                                    <Title level={4} className='fw-normal m-0'>
                                                        {t(item?.title)}
                                                    </Title>
                                                    <Text className='fs-14'>{t(item?.desc)}</Text>
                                                </Flex>
                                                <Flex vertical gap={8}>
                                                    <Text strong>{t(item?.username)}</Text>
                                                    <Flex gap={5}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Image key={i} src="/assets/icons/star.png" width={20} preview={false} fetchPriority="high" alt='star icon' />
                                                        ))}
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Card>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export { CustomerReviews } 
