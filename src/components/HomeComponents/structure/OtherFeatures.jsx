import React from 'react'
import { Row, Col, Flex, Typography, Image, Card} from 'antd'
const {Text, Title} = Typography;
const { Meta } = Card;
import { useTranslation } from 'react-i18next';
const OtherFeatures = () => {
  const {t} = useTranslation()
  const features = [
  {
    key:1,
    title: "Manage Multiple Roles",
    desc: "Control access for staff and providers.",
    image: "assets/images/manage-multiple-role.png"
  },
  {
    key:2,
    title: "Promotions",
    desc: "Create and manage discounts easily.",
    image:"assets/images/promotion.png"
  },
  {
    key:3,
    title: "Dashboard & Reports",
    desc: "Track performance with smart insights.",
    image: "assets/images/dashboard.png"
  },
  {
    key:4,
    title: "RTL Support",
    desc: "Seamless interface for Arabic layouts.",
    image: "assets/images/rtl-support.png"
  },
  {
    key:5,
    title: "Google Review System",
    desc: "Collect and display trusted customer reviews.",
    image:"assets/images/google-review.png"
  },
];
  return (
    <div className='common-padding'>
      <div className="container">
        <Row gutter={[24,90]} justify={'center'}>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Flex vertical gap={20} align='center' justify='center'>
                <Text className='custom-text'>{t('Other Features')}</Text>
                <Title className='m-0 fw-600'>{t('There’s More to Explore')}</Title>
                <Text className='text-center fs-16'>{t('Unlock advanced tools like reminders, scheduling, and seamless integrations.')}</Text>
            </Flex>
            </Col>
        </Row>
        <Row gutter={[16, 16]} className='mt-3'>
        {features.map((item, index) => (
          <Col xs={24} sm={12} md={8}  lg={index === 1 ? 16 : 8} xl={index === 1 ? 16 : 8} key={index}>
            <Card
              className='h-100 p-0'
            >
              <Image src={item?.image} preview={false} className='w-100' style={{height:'300px'}}/>
              <Meta title={t(item.title)} description={t(item.desc)} className='mt-1' />
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  )
}

export {OtherFeatures} 
