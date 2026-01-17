import React from 'react'
import { Card, Row, Col, Flex, Typography, Spin } from 'antd'
import { MainSection } from '../components'
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { GET_PRIVACY_CONTENT } from '../graphql/query';
import { TableLoader } from '../shared';
const {Text, Title} = Typography;

const PrivacyPage = () => {
    const {t}= useTranslation()
    const { data,loading } = useQuery(GET_PRIVACY_CONTENT)
    const privacy_content = data?.getPrivacyPolicy?.content
    return (
        <>
            <MainSection title={t('Terms')} heading={t('Privacy Policy')} desc= {t('Manage bookings, reduce no-shows, and engage clients — all from one powerful platform integrated with WhatsApp.')}/>
            <div className='common-padding'>
                <div className="container">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Card className='bg-grey border-grey'>
                                {
                                    loading ? 
                                    <Flex align='center' justify='center'>
                                        <Spin {...TableLoader} size='small' />
                                    </Flex>
                                    :
                                    <div
                                        dangerouslySetInnerHTML={{
                                        __html: privacy_content,
                                        }}
                                    ></div>
                                }
                            </Card>
                        </Col>
                    </Row>    
                </div>    
            </div>  
        </>
    )
}

export {PrivacyPage} 
