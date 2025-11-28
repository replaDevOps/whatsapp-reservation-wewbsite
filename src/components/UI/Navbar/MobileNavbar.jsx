import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Drawer, Dropdown, Flex, Image, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { UserProfileDropDown } from '../UserProfileDropDown';

const { Text } = Typography

const MobileNavbar = ({ visible, onClose, selected, items, accessToken}) => {

    const {t}= useTranslation()
    const navigate = useNavigate()
    const [isDesktop, setIsDesktop] = useState(false)
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 1199);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isDesktop) return null;
  
    return (
        <>
            <Drawer
                onClose={onClose}
                open={visible}
                title={null}
                closeIcon={false}
                className={`bg-dark-blue`}
                placement='left'
            >
                <Flex justify='space-between' align='center'>
                    <NavLink to={'/'} onClick={onClose}>
                        <Image src='/assets/images/logo.webp' alt='logo whatsapp reservation' fetchPriority="high" width={60} preview={false} />
                    </NavLink>
                    <Button className='bg-transparent border-0 p-0' onClick={onClose}>
                        <CloseOutlined className='text-black fs-18' />
                    </Button>
                </Flex>
                <div className='mt-3'>
                    <ul className="nav-list">
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">{t("Home")}</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">{t("Features")}</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/price'}>
                                <Text className="nav-item">{t("Price")}</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">{t("FAQs")}</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">{t("Reviews")}</Text>
                            </NavLink>
                        </li>
                    </ul>
                    <Flex vertical gap={10} align='center' justify='center' className='mt-3'>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Button className="btn w-100">
                                <img src={selected?.flag} alt={selected?.label} className='w-20' fetchPriority="high" />
                                <span>{selected?.label}</span>
                                <DownOutlined className='pl-2' />
                            </Button>
                        </Dropdown>
                        {
                            accessToken ? 
                            <UserProfileDropDown/> :
                            <Button className='btn w-100' onClick={() => navigate('/signup')}>
                                {t("Signup/Login")}
                            </Button>
                        }
                        <Button className='btn bg-brand text-white w-100' onClick={()=> navigate('/subscription-plans')}>
                            {t("Purchase A Plan")}
                        </Button>
                    </Flex>
                </div>
            </Drawer>
        </>
    )
}

export { MobileNavbar }
