import React from 'react'
import { useRef } from 'react';
import Slider from 'react-slick';
import { Row, Col, Flex, Typography, Carousel, Card, Button, Image } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
const { Text, Title } = Typography;
const CustomerReviews = () => {
    const carouselRef = useRef();
    const {t} = useTranslation()
    const data = [
        {
            key: '1',
            title: 'Super Easy & Clean!',
            desc: 'This platform helped me launch my website in just a few hours. The UI is clean, responsive, and super easy to customize. Highly recommended!',
            username: 'Ayesha R.'
        },
        {
            key: '2',
            title: 'Super Easy & Clean!',
            desc: 'This platform helped me launch my website in just a few hours. The UI is clean, responsive, and super easy to customize. Highly recommended!',
            username: 'Ayesha R.'
        },
        {
            key: '3',
            title: 'Super Easy & Clean!',
            desc: 'This platform helped me launch my website in just a few hours. The UI is clean, responsive, and super easy to customize. Highly recommended!',
            username: 'Ayesha R.'
        },
        {
            key: '4',
            title: 'Super Easy & Clean!',
            desc: 'This platform helped me launch my website in just a few hours. The UI is clean, responsive, and super easy to customize. Highly recommended!',
            username: 'Ayesha R.'
        },
    ]
    return (
        <div className='common-padding bg-skyblue'>
            <div className='container'>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Flex vertical gap={10}>
                            <Text className='custom-text'>{t('Customer Reviews')}</Text>
                            <Title className='m-0 fw-600' level={2}>{t('What Our Users Say')}</Title>
                            <Text className='fs-16'>
                                {t('Real feedback from clients showing how we simplify bookings and boost growth.')}
                            </Text>
                            <Flex justify='end'>
                                <Flex gap={5}>
                                    <Button
                                        icon={<LeftOutlined />}
                                        onClick={() => carouselRef.current.prev()}
                                    />
                                    <Button
                                        icon={<RightOutlined />}
                                        onClick={() => carouselRef.current.next()}
                                    />
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
                                data?.map((item, index) => (
                                    <div key={index} style={{ padding: "0 12px" }}> {/* Gap yaha set hoga */}
                                        <Card style={{marginRight:'10px'}}>
                                            <Flex vertical gap={8}>
                                                <Flex vertical gap={10}>
                                                    <Title level={4} className='fw-normal'>
                                                        {t(item?.title)}
                                                    </Title>
                                                    <Text className='fs-14'>{t(item?.desc)}</Text>
                                                    <Text strong>{t(item?.username)}</Text>
                                                    <Flex gap={5}>
                                                        <Image src='/assets/icons/star.png' width={20} preview={false}/>
                                                        <Image src='/assets/icons/star.png' width={20} preview={false}/>
                                                        <Image src='/assets/icons/star.png' width={20} preview={false}/>
                                                        <Image src='/assets/icons/star.png' width={20} preview={false}/>
                                                        <Image src='/assets/icons/star.png' width={20} preview={false}/>
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
