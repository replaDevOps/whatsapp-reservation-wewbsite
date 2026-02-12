import { Card, Row, Col, Flex, Spin } from 'antd'
import { MainSection } from '../components'
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { GET_TERMS } from '../graphql/query';
import { refetchOnFocus, TableLoader } from '../shared';
import { useEffect } from 'react';

const TermsPage = () => {
    const {t}= useTranslation()
    const { data,loading,refetch } = useQuery(GET_TERMS)

    useEffect(() => {
        return refetchOnFocus(refetch);
    }, [refetch]);

    const terms = data?.getTermsCondition?.content
    const normalizeHtml = html =>html.replace(/&nbsp;/g, ' ')
    return (
        <>
            <MainSection title={t('Terms')} heading={t('Terms of Use')} desc= {t('Manage bookings, reduce no-shows, and engage clients — all from one powerful platform integrated with WhatsApp.')}/>
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
                                    <div dangerouslySetInnerHTML={{ __html: normalizeHtml(terms) }} />
                                }
                            </Card>
                        </Col>
                    </Row>    
                </div>    
            </div>  
        </>
    )
}

export {TermsPage} 
