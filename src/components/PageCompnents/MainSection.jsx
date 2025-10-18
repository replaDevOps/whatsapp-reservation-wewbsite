import React from 'react'
import { Row, Col, Flex, Typography, Card, Image } from 'antd'
const { Text, Title } = Typography;
const MainSection = ({title,heading, desc,}) => {
  return (
    <section className='main-section'>
      <div className='container'>
        <Flex vertical gap={20} justify='center' align='center' className='main-flex'>
          <Flex vertical gap={20} className='w-700' align='center'>
            <Text className='custom-text'>{title}</Text>
            <Title level={1} className='m-0 text-center main-heading'>{heading}</Title>
           <Text className='fs-16'>{desc}</Text>
          </Flex>
        </Flex>
      </div>
    </section>
  )
}

export { MainSection } 
