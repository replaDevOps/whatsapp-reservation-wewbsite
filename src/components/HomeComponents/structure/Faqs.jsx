import { useEffect, useState } from "react";
import { Row, Col, Flex, Typography, Collapse, Spin, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useLazyQuery } from "@apollo/client/react";
import { GET_FAQS } from "../../../graphql/query";
import { TableLoader } from "../../../shared";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const Faqs = () => {
    const { t } = useTranslation();
    const [currentPanel, setCurrentPanel] = useState(["0"]);
    const [ faqsData, setFaqsData ] = useState([])
    const [ getFaqs, {data, loading} ] = useLazyQuery(GET_FAQS)
    const [displayedCount, setDisplayedCount] = useState(5);

    useEffect(()=>{
        if(getFaqs){
            getFaqs({
                variables: {
                    limit: 100,
                    offset: 0,
                }
            });
        }
    },[getFaqs])

    useEffect(()=>{
        const faqs = data?.getFaqs?.faqs || [];
        const sortedFaqs = [...faqs].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
        });
        setFaqsData(sortedFaqs)
    },[data])
    return (
        <div className="common-padding">
            <div className="container">
                <Row gutter={[24, 24]} justify={"center"}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Flex vertical gap={20} align="center">
                            <Text className="custom-text">{t("FAQs")}</Text>
                            <Title level={2} className="m-0">
                                {t("Got Questions? We’ve Got You.")}
                            </Title>
                            <Text className="fs-16 text-center">
                                {t("Our team is available 24/7 to guide and support you.")}
                            </Text>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        {
                            loading ? 
                            <Flex align="center" justify="center">
                                <Spin {...TableLoader} size="small" />
                            </Flex>
                            :
                            <Collapse
                                className="collapse-fq"
                                defaultActiveKey={["0"]}
                                onChange={(keys) => {
                                    setCurrentPanel(keys);
                                }}
                                ghost
                            >
                                {faqsData?.slice(0, displayedCount).map((faq, f) => (
                                    <Panel
                                        className={currentPanel.includes(String(f)) ? "panel-active panel" : "panel"}
                                        showArrow={false}
                                        header={
                                            <Title
                                                level={5}
                                                className={`m-0 fw-500 fs-17 ${currentPanel.includes(String(f)) ? "text-white" : ""}`}
                                            >
                                                <span className="mr-15">
                                                    {
                                                        f + 1 <= 9 ? `0${f+1}` : f+1
                                                    }
                                                </span>
                                                {t(faq?.question)}
                                            </Title>
                                        }
                                        key={f}
                                        extra={
                                            currentPanel?.findIndex((x) => x == f) > -1 ? (
                                                <MinusOutlined
                                                    className="text-white fs-18"
                                                />
                                            ) : (
                                                <PlusOutlined
                                                    className="fs-18"
                                                />
                                            )
                                        }
                                    >
                                        <div>
                                            <Text className={`fs-16 faq-desc text-white`}>{t(faq?.answer)}</Text>
                                        </div>
                                    </Panel>
                                ))}
                            </Collapse>
                        }
                    </Col>
                    {faqsData?.length > 5 && (
                        <Col span={24}>
                            <Flex justify="center">
                                <Button 
                                    className="btn"
                                    onClick={() => {
                                        if (displayedCount === 5) {
                                            setDisplayedCount(faqsData.length);
                                        } else {
                                            setDisplayedCount(5);
                                        }
                                    }}
                                >
                                    {displayedCount === 5 ? t("Load More") : t("Load Less")}
                                </Button>
                            </Flex>
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    );
};
export { Faqs };
