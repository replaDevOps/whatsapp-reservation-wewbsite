import { MainSection, OurPricing } from '../components'
import { useTranslation } from 'react-i18next';

const PricePage = () => {
    const {t}= useTranslation()
    return (
        <>
            {/* <MainSection title={t('Price')} heading={t('Dynamice Packages')} desc= {t('Affordable, transparent plans packed with premium features for every business.')}/> */}
            <div className='common-padding sky-gradient pt-150'>
                <div className="container">   
                    <OurPricing />
                </div>    
            </div>  
        </>
    )
}

export {PricePage} 
