import React from 'react'
import { CustomerReviews, Faqs, HeroSection, LeftImageSection, OtherFeatures, OurFeatures, OurPricing, RightImageSection } from '../components'
import { useTranslation } from 'react-i18next'
const HomePage = () => {
  const { t } = useTranslation()
  return (
    <>
      <HeroSection />
      <OurFeatures />
      <RightImageSection
        subtitle={t('Messaging')}
        title={t('WhatsApp Interactive Booking')}
        desc={t('Easily Book Appointments Instantly through an Interactive WhatsApp Chat.')}
        imageUrl={'/assets/images/whatsapp-interactive-booking.png'}
      />
      <LeftImageSection
        subtitle={t('Kiosk')}
        title={t('Self-Service Tablet Kiosk')}
        desc={t('Quickly reserve services on in-store tablets with a simple touch interface.')}
        imageUrl={'/assets/images/self-service.png'}
      />
      <RightImageSection
        subtitle={t('Scheduling')}
        title={t('Smart & Seamless Booking Calendar')}
        desc={t('View available slots, manage schedules, and book with confidence.')}
        imageUrl={'/assets/images/smart-seamless.png'}
      />
      <LeftImageSection
        subtitle={t('Automation')}
        title={t('Automated WhatsApp Bot')}
        desc={t('Get instant replies, confirmations, and reminders through AI-powered chat.')}
         imageUrl={'/assets/images/autoamted-whatsapp-bot.png'}
      />
      <OtherFeatures />
      <OurPricing />
      <Faqs />
      <CustomerReviews />
    </>
  )
}

export { HomePage } 
