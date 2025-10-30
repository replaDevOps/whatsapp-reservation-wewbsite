import { Modal, Typography, Button, Flex, Image, Divider } from "antd";
const { Title, Text } = Typography;
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            centered
            footer={
                <Flex justify='center' gap={5}>
                    <Button type='button' className="btn" onClick={()=>navigate('/')}>
                        {t("Go To Login Page")}
                    </Button>
                    <Button onClick={onClose} className="btn bg-brand text-white">{t("Done")}</Button>
                </Flex>
            }
        > 

            <Flex vertical align='center' className='mt-3' gap={5}>
                <Image src='/assets/icons/confirm-icon.png' alt='confirm icon' fetchPriority="high" preview={false} width={70} />
                <Title level={5} className='m-0'>
                    {t("Thank you for Registering!")}
                </Title>
                <Text className='fs-14 text-center'>
                    {t(
                        "We’ve sent a confirmation email to your inbox. Your login credentials will be shared with you via email shortly."
                    )}
                </Text>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    );
};

export { ConfirmationModal };
