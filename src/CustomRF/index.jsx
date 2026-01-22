import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, data, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { BookDemo, Login, MaintenancePage, PricePage, PrivacyPage, Signup, TermsPage } from '../pages'
import { Footer, Navbar } from '../components'
import ScrollTop from '../components/ScrollTop'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actionsApi, TableLoader } from '../shared'
import { useQuery } from '@apollo/client/react'
import { Flex, Spin } from 'antd'
import { GET_MAINTENANCE_STATUS } from '../graphql/query'

const AppRoutes = () => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation();
  const location = useLocation();
  const featuresRef = useRef(null);
  const faqsRef = useRef(null);
  const reviewsRef = useRef(null);
  const priceRef = useRef(null);
  const hideNavbarFooterOn = ['/signin', '/signup', '/book-demo','/maintenance'];
  const shouldHideNavbarFooter = hideNavbarFooterOn.includes(location.pathname);
  useEffect(() => {
    let lang = localStorage.getItem("lang")
    i18n.changeLanguage(lang || 'en')
    dispatch(actionsApi?.changeLanguage(lang || 'ar'))
    document.body.dir = i18n.dir();
  }, [])


  useEffect(() => {
      switch (location.pathname) {
        case "/":
          document.title = "Home | Whatsapp reservation Website";
          break;
        case "/signup":
          document.title = "Registration | Whatsapp reservation Website";
          break;
        case "/signin":
          document.title = "Login | Whatsapp reservation Website";
          break;
          case "/book-demo":
          document.title = "Book Demo | Whatsapp reservation Website";
          break;
        case "/features":
          document.title = "Features | Whatsapp reservation Website";
          break;
        case "/subscription-plans":
          document.title = "Price | Whatsapp reservation Website";
          break;
        case "/prices":
          document.title = "Price | Whatsapp reservation Website";
          break;
        case "/faqs":
          document.title = "FAQs | Whatsapp reservation Website";
          break;
        case "/privacypolicy":
          document.title = "Privacy Policy | Whatsapp reservation Website";
          break;
        case "/termsofuse":
          document.title = "Terms Of Use | Whatsapp reservation Website";
          break;
        case "/maintenance":
          document.title = "Maintenance | Whatsapp reservation Website";
          break;
        default:
          document.title = "Whatsapp reservation Website";
      }
    }, [location.pathname]);
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <ScrollTop />
      {
        !shouldHideNavbarFooter && 
        <Navbar 
          scrollToFeatures={() => scrollToRef(featuresRef)}
          scrollToFaqs={() => scrollToRef(faqsRef)}
          scrollToReviews={() => scrollToRef(reviewsRef)}
          scrollToPrice = {()=> scrollToRef(priceRef)}
        />
      }
      <Routes>
        <Route path='/' element={<HomePage 
          featuresRef={featuresRef}
          faqsRef={faqsRef}
          reviewsRef={reviewsRef}
          priceRef={priceRef}
        />} />
        <Route path='/subscription-plans' element={<PricePage />} />
        <Route path='/termsofuse' element={<TermsPage />} />
        <Route path='/privacypolicy' element={<PrivacyPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/book-demo' element={<BookDemo />} />
        <Route path='/maintenance' element={<MaintenancePage />} />
      </Routes>
      {
        !shouldHideNavbarFooter && <Footer />
      }
    </>
  )
}
const CustomRF = () => {
  const { data,loading } = useQuery(GET_MAINTENANCE_STATUS,{
    fetchPolicy:'cache-and-network',
  })
  const isUnderMaintenance = data?.getMaintenanceStatus?.isEnabled
  return (
    <BrowserRouter>
      {
        isUnderMaintenance ? 
          <MaintenancePage />
        :
          <AppRoutes />
      }
    </BrowserRouter>
  )
}

export { CustomRF }
