import { Flex, Typography, Image} from "antd"
import { useTranslation } from "react-i18next"

const PlanFeature= ({title})=>{
    const {t}= useTranslation()
    return (
        <Flex gap={10} align="middle" className="mb-2">
            <Image
                src="/assets/icons/tick.png"
                width={18}
                height={13}
                preview={false}
                alt="check icon"
                fetchPriority="high"
            />
            <Typography.Text className={`p-0 hover-white`}>
                {t(title)}
            </Typography.Text>
        </Flex>
    )
}
export {PlanFeature}