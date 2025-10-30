import Marquee from 'react-fast-marquee'
import { reviewsData } from '../../data'
import { Card, Col, Flex, Image, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const ReviewMarquee = () => {

    const { t } = useTranslation();
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Marquee
                    gradientWidth={300}
                    gradient={true}
                    gradientColor="rgba(23, 19, 19, 1), rgba(23, 19, 19, .2)"
                    className="marquee-cs"
                    direction='left'
                >
                    {
                        reviewsData?.map((item, index) => (
                            <div key={index} className='p-0-12'>
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
                                                {
                                                    [...Array(5)]?.map((_,i)=>
                                                        <Image src='/assets/icons/star.png' key={i} width={20} fetchPriority="high" alt='star icon' preview={false}/>
                                                    )
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </div>
                        ))
                    } 
                </Marquee>
            </Col>
            <Col span={24}>
                <Marquee
                    gradientWidth={300}
                    gradient={true}
                    gradientColor="rgba(23, 19, 19, 1), rgba(23, 19, 19, .2)"
                    className="marquee-cs"
                    direction='right'
                >
                    {
                        reviewsData?.map((item, index) => (
                            <div key={index} className='p-0-12'>
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
                                                {
                                                    [...Array(5)]?.map((_,i)=>
                                                        <Image src='/assets/icons/star.png' key={i} width={20} fetchPriority="high" alt='star icon' preview={false}/>
                                                    )
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </div>
                        ))
                    } 
                </Marquee>
            </Col>
        </Row>
    )
}

export {ReviewMarquee}