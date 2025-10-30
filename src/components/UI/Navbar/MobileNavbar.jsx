import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Drawer, Dropdown, Flex, Image, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckoutModal } from '../modals/CheckoutModal';

const { Text } = Typography

const MobileNavbar = ({ visible, onClose }) => {
    const navigate = useNavigate()
    const [isDesktop, setIsDesktop] = useState(false);
    const [ checkoutvisible,setCheckoutVisible ] = useState(false);
    const [selected, setSelected] = useState({
        key: "1",
        label: "English",
        flag: "https://flagcdn.com/w20/us.png",
    });
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 1199);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isDesktop) return null;
    const items = [
        {
            key: "1",
            label: (
                <span
                    onClick={() =>
                        setSelected({
                            key: "1",
                            label: "English",
                            flag: "https://flagcdn.com/w20/us.png",
                        })
                    }
                >
                    <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="English"
                        className='w-20 mx-8'
                        fetchPriority="high"
                    />
                    English
                </span>
            ),
        },
        {
            key: "2",
            label: (
                <span
                    onClick={() =>
                        setSelected({
                            key: "2",
                            label: "Arabic",
                            flag: "https://flagcdn.com/w20/sa.png",
                        })
                    }
                >
                    <img
                        src="https://flagcdn.com/w20/sa.png"
                        alt="Arabic"
                        className='w-20 mx-8'
                        fetchPriority="high"
                    />
                    Arabic
                </span>
            ),
        },
    ];
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
                                <Text className="nav-item">Home</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">Features</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/price'}>
                                <Text className="nav-item">Price</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">FAQs</Text>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'}>
                                <Text className="nav-item">Reviews</Text>
                            </NavLink>
                        </li>
                    </ul>
                    <Flex vertical gap={10} align='center' justify='center' className='mt-3'>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Button className="btn w-100">
                                <img src={selected.flag} alt={selected.label} className='w-20' fetchPriority="high" />
                                <span>{selected.label}</span>
                                <DownOutlined className='pl-2' />
                            </Button>
                        </Dropdown>
                        <Button className='btn w-100' onClick={() => navigate('/signup')}>
                            Signup/Login
                        </Button>
                        <Button className='btn bg-brand text-white w-100' onClick={()=>setCheckoutVisible(true)}>
                            Purchase A Plan
                        </Button>
                    </Flex>
                </div>
            </Drawer>
            <CheckoutModal
                visible={checkoutvisible}
                onClose={() => setCheckoutVisible(false)}
            />
        </>
    )
}

export { MobileNavbar }
