import { useEffect } from 'react'
import { CustomerReviews, Faqs, HeroSection, LeftImageSection, OtherFeatures, OurFeatures, OurPricing, RightImageSection } from '../components'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const HomePage = ({featuresRef, faqsRef,reviewsRef}) => {
  const { t } = useTranslation()
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo === 'features') {
      featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (location.state?.scrollTo === 'faqs') {
      faqsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (location.state?.scrollTo === 'reviews') {
      reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <div ref={featuresRef}>
        <OurFeatures />
      </div>
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
      <div className="common-padding bg-skyblue">
        <div className="container">
          <OurPricing />
        </div>
      </div>
      <div ref={faqsRef}>
        <Faqs />
      </div>
      <div ref={reviewsRef}>
        <CustomerReviews />
      </div>
    </>
  )
}

export { HomePage } 
