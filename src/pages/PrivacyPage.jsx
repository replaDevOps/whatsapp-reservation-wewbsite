import { useEffect } from 'react'
import { Card, Row, Col, Flex, Spin } from 'antd'
import { MainSection } from '../components'
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { GET_PRIVACY_CONTENT } from '../graphql/query';
import { refetchOnFocus, TableLoader } from '../shared';

const PrivacyPage = () => {
    const {t}= useTranslation()
    const { data, loading, refetch } = useQuery(GET_PRIVACY_CONTENT);

    useEffect(() => {
        return refetchOnFocus(refetch);
    }, [refetch]);
    
    const privacy_content = data?.getPrivacyPolicy?.content
    const normalizeHtml = html =>html.replace(/&nbsp;/g, ' ')
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
                                    <Flex vertical wrap>
                                        <div
                                            dangerouslySetInnerHTML={{
                                            __html: normalizeHtml(privacy_content),
                                            }}
                                        ></div>
                                    </Flex>
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
