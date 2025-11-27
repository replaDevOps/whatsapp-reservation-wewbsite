
import { OurPricing } from '../components'

const PricePage = () => {
       
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
