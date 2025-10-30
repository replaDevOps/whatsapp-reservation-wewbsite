import { Col, Flex, Image, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const MaintenancePage = () => {
    const { t } = useTranslation()
  return (
    <div className='h-100dvh sky-gradient'>
        <Row justify={'center'}  className='h-100'>
            <Col span={24} md={{span: 8}}>
                <Flex vertical gap={20} align='center' justify='center' className='h-100'>
                    <Image src='/assets/images/maintenance.webp' alt='maintenance image' fetchPriority="high" preview={false} width={200} />
                    <Title level={4} className='m-0'>{t('We’re just tuning up a few things')}</Title>
                    <Text className='fs-16 text-center'>
                        {t('We apologize for the inconvenience but system is currently undergoing planned maintenance.')}
                    </Text>
                </Flex>
            </Col>
        </Row>
    </div>
  )
}

export {MaintenancePage}