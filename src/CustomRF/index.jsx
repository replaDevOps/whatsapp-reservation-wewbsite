import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { BookDemo, Login, PrivacyPage, Signup, TermsPage } from '../pages'
import { Footer, Navbar } from '../components'
import ScrollTop from '../components/ScrollTop'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actionsApi } from '../shared'

const AppRoutes = () => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation();
  useEffect(() => {
    let lang = localStorage.getItem("lang")
    i18n.changeLanguage(lang || 'en')
    dispatch(actionsApi?.changeLanguage(lang || 'ar'))
    document.body.dir = i18n.dir();
  }, [])
  return (
    <>
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/termsofuse' element={<TermsPage />} />
        <Route path='/privacypolicy' element={<PrivacyPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/bookdemo' element={<BookDemo />} />
      </Routes>
      <Footer />
    </>
  )
}
const CustomRF = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export { CustomRF }
