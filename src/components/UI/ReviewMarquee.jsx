import Marquee from 'react-fast-marquee'
import { reviewsData } from '../../data'
import { Card, Col, Flex, Image, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography

const ReviewMarquee = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <div dir="ltr"> 
                    <Marquee
                        gradientWidth={300}
                        gradient={true}
                        gradientColor="rgba(196, 237, 237, .7), rgba(255, 255, 255, 0.2)"
                        className="marquee-cs"
                        direction={isRtl ? 'right' : 'left'} 
                    >
                        {reviewsData?.map((item, index) => (
                            <div key={index} className='p-0-12' dir={isRtl ? 'rtl' : 'ltr'}>
                                <Card className='mr-10' style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                    <Flex vertical gap={40}>
                                        <Flex vertical gap={5}>
                                            <Title level={4} className='fw-normal m-0'>
                                                {t(item?.title)}
                                            </Title>
                                            <Text className='fs-14'>{t(item?.desc)}</Text>
                                        </Flex>
                                        <Flex vertical gap={8}>
                                            <Text strong>{t(item?.username)}</Text>
                                            <Flex gap={5} style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'flex-end' }}>
                                                {[...Array(5)]?.map((_, i) => (
                                                    <Image src='/assets/icons/star.png' key={i} width={20} alt='star icon' preview={false} />
                                                ))}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </Col>

            <Col span={24}>
                <div dir="ltr">
                    <Marquee
                        gradientWidth={300}
                        gradient={true}
                        gradientColor="rgba(196, 237, 237, .5), rgba(255, 255, 255, 0.2)"
                        className="marquee-cs"
                        direction={isRtl ? 'left' : 'right'}
                    >
                        {reviewsData?.map((item, index) => (
                            <div key={index} className='p-0-12' dir={isRtl ? 'rtl' : 'ltr'}>
                                <Card className='mr-10' style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                    <Flex vertical gap={40}>
                                        <Flex vertical gap={5}>
                                            <Title level={4} className='fw-normal m-0'>
                                                {t(item?.title)}
                                            </Title>
                                            <Text className='fs-14'>{t(item?.desc)}</Text>
                                        </Flex>
                                        <Flex vertical gap={8}>
                                            <Text strong>{t(item?.username)}</Text>
                                            <Flex gap={5} style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'flex-end' }}>
                                                {[...Array(5)]?.map((_, i) => (
                                                    <Image src='/assets/icons/star.png' key={i} width={20} alt='star icon' preview={false} />
                                                ))}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </Col>
        </Row>
    )
}

export { ReviewMarquee }