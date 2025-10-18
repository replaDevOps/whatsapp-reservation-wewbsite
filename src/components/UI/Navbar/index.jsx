import React, { useState, useEffect } from "react";
import { Dropdown, Button, Drawer, Space, Flex, Typography } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import './index.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { CheckoutModal } from "../modals/CheckoutModal";
import { actionsApi } from "../../../shared";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const { Text, Title } = Typography;
const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [isFixed, setIsFixed] = useState(false);
    const [checkoutvisible, setCheckoutVisible] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [language, setLanguage] = useState()
    const [selected, setSelected] = useState({
        key: "1",
        label: "English",
        flag: "https://flagcdn.com/w20/us.png",
    });
     useEffect(()=>{
    let lang= localStorage.getItem("lang")
    setLanguage(lang  || 'ar')
    i18n.changeLanguage(lang  || 'ar')
    dispatch(actionsApi?.changeLanguage(lang  || 'ar'))
    document.body.dir = i18n.dir();
  }, []) 

  const handleChnage= (value)=>{
    setLanguage(value)
    localStorage.setItem("lang", value)
    i18n?.changeLanguage(value)
    // window.location.href='/'
    document.body.dir = i18n.dir(value);
    dispatch(actionsApi?.changeLanguage(value))
  }

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
                        style={{ width: 20, marginRight: 8 }}
                    />
                    English
                </span>
            ),
            onClick: () => handleChnage('en')
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
                        style={{ width: 20, marginRight: 8 }}
                    />
                    Arabic
                </span>
            ),
            onClick: () => handleChnage('ar')
        },
    ];
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <div className={`navbar-container ${isFixed ? "navbar-fixed" : ""}`} id="navbar">
                <div className="navbar-sm">
                    <div className="navbar-sm-inner">
                        <Link>
                            <div className="navbar-logo">
                                <img src="/assets/images/logo.png" />
                            </div>
                        </Link>
                        <div className="sp-cover" onClick={() => setVisible(true)}>
                            <span className="sp sp-1 sp-1-click"></span>
                            <span className="sp sp-2 sp-2-click"></span>
                            <span className="sp sp-3 sp-3-click"></span>
                        </div>
                    </div>
                </div>
                <div className="navbar-lg">
                    <div className="navbar-lg-inner">
                        <Flex gap={20} align="center">
                            <Link>
                                <div className="navbar-logo">
                                    <img src="/assets/images/logo.png" />
                                </div>
                            </Link>
                            <ul className="nav-list">
                                <li>
                                    <NavLink to={'/'}>
                                        <Text className="nav-item">{t('Home')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}>
                                        <Text className="nav-item">{t('Features')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}>
                                        <Text className="nav-item">{t('Price')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}>
                                        <Text className="nav-item">{t('FAQs')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}>
                                        <Text className="nav-item">{t('Reviews')}</Text>
                                    </NavLink>
                                </li>
                            </ul>
                        </Flex>
                        <div>
                            <Flex gap={5}>
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <Button className="btn">
                                        <img src={selected.flag} alt={selected.label} style={{ width: 20 }} />
                                        <span>{selected.label}</span>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Button className="btn" onClick={() => navigate('/signup')}>{t('Signup/Login')}</Button>
                                <Button className="btn bg-brand text-white" onClick={() => setCheckoutVisible(true)}>{t('Purchase A Plan')}</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNavbar
                visible={visible}
                onClose={() => setVisible(false)}
            />
            <CheckoutModal
                visible={checkoutvisible}
                onClose={() => setCheckoutVisible(false)}
            />
        </>
    );
};

export { Navbar };
