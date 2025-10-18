import React, { useState } from 'react'
import { Modal, Space, Typography, Button, Flex, Image, Divider } from 'antd'
const { Title, Text } = Typography
import { useTranslation } from 'react-i18next'
const ConfirmationModal = ({visible,onClose,}) => {
    const {t} = useTranslation();
    return (
        <div>
            <Modal width={500}  
                open={visible} 
                onOk={onClose} 
                onCancel={onClose} 
                centered 
                footer={false}
            >
                <Flex vertical gap={15} align='center'>
                    <Image src='/assets/icons/confirm-icon.png' width={100} height={80} preview={false}/>
                    <Title level={4} className='m-0'>
                    {t('Thank you for Registering!')}
                    </Title>
                    <Text className='fs-16 text-center'>
                    {t('We’ve sent a confirmation email to your inbox. Your login credentials will be shared with you via email shortly.')}
                    </Text>
                </Flex>
                <Divider/>
                <Flex justify='center' gap={10}>
                    <Button className='btn'>{t('Go To Login Page')}</Button>
                    <Button className='btn bg-brand text-white'>{t('Done')}</Button>
                </Flex>
            </Modal>
        </div>
    )
}

export {ConfirmationModal}