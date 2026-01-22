import { useState, useEffect } from "react";
import { Dropdown, Button, Flex, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import './index.css'
import { NavLink, useNavigate } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { actionsApi } from "../../../shared";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { UserProfileDropDown } from "../..";
import { LanguageChange } from "../LanguageChange";

const { Text } = Typography;

const Navbar = ({scrollToFeatures,scrollToFaqs,scrollToReviews,scrollToPrice}) => {

    const navigate = useNavigate()
    const [accessToken, setAccessToken]= useState(null)
    const [visible, setVisible] = useState(false)
    const [isFixed, setIsFixed] = useState(false)
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const location = useLocation()

    // useEffect(()=>{
    //     let lang= localStorage.getItem("lang") || 'ar'
    //     i18n.changeLanguage(lang)
    //     dispatch(actionsApi?.changeLanguage(lang))
    //     document.body.dir = i18n.dir()
    //     setSelected(
    //         lang === 'ar' ?
    //         {key: "2", label: "Arabic", flag: "https://flagcdn.com/w20/sa.png" }:
    //         {key: "1", label: "English", flag: "https://flagcdn.com/w20/us.png" }
    //     )
    // }, []) 

    // const handleChnage= (value)=>{
    //     localStorage.setItem("lang", value)
    //     i18n?.changeLanguage(value)
    //     document.body.dir = i18n.dir(value);
    //     dispatch(actionsApi?.changeLanguage(value))
    //     setSelected(
    //         value === 'ar' ?
    //         {key: "2", label: "Arabic", flag: "https://flagcdn.com/w20/sa.png" }:
    //         {key: "1", label: "English", flag: "https://flagcdn.com/w20/us.png" }
    //     )
    // }


    // const items = [
    //     {
    //         key: "1",
    //         label: (
    //             <span>
    //                 <img
    //                     src="https://flagcdn.com/w20/us.png"
    //                     alt="English"
    //                     className="w-20 mx-8"
    //                     fetchPriority="high"
    //                 />
    //                 English
    //             </span>
    //         ),
    //         onClick: () => handleChnage('en')
    //     },
    //     {
    //         key: "2",
    //         label: (
    //             <span>
    //                 <img
    //                     src="https://flagcdn.com/w20/sa.png"
    //                     alt="Arabic"
    //                     className="w-20 mx-8"
    //                     fetchPriority="high"
    //                 />
    //                 Arabic
    //             </span>
    //         ),
    //         onClick: () => handleChnage('ar')
    //     },
    // ];
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
    }, [])
    useEffect(() => {
        const token= localStorage.getItem("accessToken")
        setAccessToken(token)
    }, [location]);

    const handleScrollOrNavigate = (section) => {
        if (location.pathname === '/') {
            switch (section) {
            case 'features':
                scrollToFeatures();
                break;
            case 'faqs':
                scrollToFaqs();
                break;
            case 'reviews':
                scrollToReviews();
                break;
            case 'prices':
                scrollToPrice();
                break;
            case 'home':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            }
        } 
        else {
            navigate('/', { state: { scrollTo: section } });
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    };


    return (
        <>
            <div className={`navbar-container ${isFixed ? "navbar-fixed" : ""}`} id="navbar">
                <div className="navbar-sm">
                    <div className="navbar-sm-inner">
                        <div 
                            onClick={() => handleScrollOrNavigate('home')}
                            className="navbar-logo" 
                        >
                            <img src="/assets/images/logo.webp" alt="logo whatsapp reservation" fetchPriority="high" />
                        </div>
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
                            <div 
                                onClick={() => handleScrollOrNavigate('home')}
                                className="navbar-logo" 
                            >
                                <img src="/assets/images/logo.webp" alt="logo whatsapp reservation" fetchPriority="high" />
                            </div>
                            <ul className="nav-list">
                                <li>
                                    <NavLink onClick={(e) => { e.preventDefault(); handleScrollOrNavigate('home'); }}>
                                        <Text className="nav-item">{t('Home')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={(e) => { e.preventDefault(); handleScrollOrNavigate('features'); }}>
                                        <Text className="nav-item">{t('Features')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={(e) => { e.preventDefault(); handleScrollOrNavigate('prices'); }}>
                                        <Text className="nav-item">{t('Price')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={(e) => { e.preventDefault(); handleScrollOrNavigate('faqs'); }}>
                                        <Text className="nav-item">{t('FAQs')}</Text>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={(e) => { e.preventDefault(); handleScrollOrNavigate('reviews'); }}>
                                        <Text className="nav-item">{t('Reviews')}</Text>
                                    </NavLink>
                                </li>
                            </ul>
                        </Flex>
                        <div>
                            <Flex gap={5} align="center">
                                {/* <Dropdown menu={{ items }} trigger={['click']}>
                                    <Button className="btn">
                                        <img src={selected?.flag} alt={selected?.label} fetchPriority="high" className="w-20" />
                                        <span>{selected?.label}</span>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown> */}
                                <LanguageChange languageClass='btn' />
                                <Button 
                                    className="btn bg-brand text-white" 
                                    onClick={() => navigate('/subscription-plans')}
                                >
                                    {t('Purchase A Plan')}
                                </Button>
                                {
                                    accessToken ?
                                    <UserProfileDropDown/>
                                    :
                                    <Button className="btn" onClick={() => navigate('/signup')}>{t('Signup/Login')}</Button>
                                }
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNavbar
                visible={visible}
                onClose={() => setVisible(false)}
                selected={selected}
                // items={items}
                accessToken={accessToken}
                handleScrollOrNavigate={handleScrollOrNavigate}
            />
        </>
    );
};

export { Navbar };
