import React from 'react'
import { Row, Col, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next';
const {Text, Title} = Typography;
const OurFeatures = () => {
  const {t}= useTranslation()
  return (
    <div className='common-padding'>
      <div className="container">
        <Row justify={'center'}>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Flex vertical gap={20} align='center' justify='center'>
              <Title className='m-0 fw-600'>{t('What Makes Us Stand Out')}</Title>
              <Text className='text-center fs-16'>{t('Smart, simple, and flexible booking solutions designed to make your business run smoother.')}</Text>
              <Text className='custom-text'>{t('Our Features')}</Text>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export {OurFeatures} 
