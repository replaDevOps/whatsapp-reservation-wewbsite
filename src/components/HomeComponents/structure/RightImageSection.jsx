import React from 'react'
import { Row, Col, Flex, Typography, Image } from 'antd'
const {Text, Title} = Typography;
import { useTranslation } from 'react-i18next';
const RightImageSection = ({subtitle,title, desc,imageUrl}) => {
  const {i18n} = useTranslation();
  return (
    <div className='common-padding bg-lightgray'>
      <div className="container">
        <Row gutter={[24,24]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex vertical gap={20} className='mt-3'>
                <Text className='custom-text'>{subtitle}</Text>
                <Title className='m-0 fw-600' level={1}>{title}</Title>
                <Text className='fs-16'>
                    {desc}
                </Text>
            </Flex>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex justify={i18n.language === 'ar' ? 'left' : 'right'}>
                <Image src={imageUrl} preview={false} width={400} fetchPriority="high" alt='image'/>
            </Flex>
            </Col>
        </Row>
      </div>
    </div>
  )
}

export {RightImageSection} 
