import React from 'react'
import { useState } from 'react';
import { Row, Col, Card, Flex, Typography, Collapse } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { faqsData } from '../../../data';
const { Title, Text } = Typography;
const { Panel } = Collapse;

const Faqs = () => {
    const {t} = useTranslation();
    const [currentPanel,setCurrentPanel]=useState(['0'])
  return (
    <div className='common-padding'>
      <div className='container'>
        <Row gutter={[24,24]} justify={'center'}>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Flex vertical gap={20} align='center'>
                <Text className='custom-text'>{t('FAQs')}</Text>
                <Title level={2} className='m-0'>{t('Got Questions? We’ve Got You.')}</Title>
                <Text className='fs-16 text-center'>
                    {t('Our team is available 24/7 to guide and support you.')}
                </Text>
                
            </Flex>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <Collapse
                            className='collapse-fq'
                            defaultActiveKey={['0']}
                            onChange={(keys)=>{setCurrentPanel(keys)}}
                            ghost
                        >
                            {
                                faqsData?.map((faq,f)=>
                                    <Panel className={currentPanel.includes(String(f)) ? 'panel-active panel' : 'panel'}  showArrow={false} 
                                        header={
                                            <Title level={5} className={`m-0 fw-500 fs-17 ${currentPanel.includes(String(f)) ? 'text-white':''}`}>
                                                <span style={{marginRight: 15}}></span>{t(faq?.title)}
                                            </Title>
                                        } key={f} 
                                        extra={((currentPanel?.findIndex(x=>x==f))>-1) ?
                                        <MinusOutlined 
                                            style={{transition: 'transform 0.2s ease-in-out', fontSize: 18}} />
                                        :
                                        <PlusOutlined
                                            style={{transition: 'transform 0.2s ease-in-out', fontSize: 18}}/>}
                                            
                                    >
                                        <div>
                                            <Text cclassName={`fs-16 faq-desc`}>
                                                {t(faq?.description)}
                                            </Text>
                                        </div>
                                    </Panel>
                                )
                            }
                        </Collapse>
            </Col>
        </Row>
      </div>
    </div>
  )
}
export {Faqs} 
