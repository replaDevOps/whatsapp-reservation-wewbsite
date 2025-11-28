import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

const BackButton= ({onClick})=>{
    return (
        <Button 
            onClick={onClick} 
            className='border-0 p-0 bg-transparent'
        >
            <ArrowLeftOutlined />
        </Button>
    )
}
export {BackButton}