import { CloseOutlined } from "@ant-design/icons";
import { Col, Popconfirm, Row, Space, Tag } from "antd";
import React, { useState } from "react";
import { shallow } from "zustand/shallow";
import useStore from "@/config/store";



interface customSegmentProps {
  options: string[];
  value: number;
  onChange: (option: number) => void;
  setOptions: (options: string[]) => void;
  setPreviewImage: (images: string[]) => void;
  setRichCardCarousels: (carousels: any[]) => void; // Update the type if you have a specific type for carousels
  richCardCarousels: any[]; // Update the type if you have a specific type for carousels
  previewImage: string[];
}

const customSegment: React.FC<customSegmentProps> = ({
  options,
  onChange,
  setOptions,
  setPreviewImage,
  setRichCardCarousels,
  richCardCarousels,
  previewImage,
  cardIndex,
  setCardIndex
}) => {
  const selector = (state: {
    selectedNode: Node | null;
    updateNodeLabel: (
      nodeId: string,
      nodeVal: { richCardCarousels: RichCardButtonsState[] }
    ) => void;
    setSelectedNode: (node: Node | null) => void;
  }) => ({
    selectedNode: state.selectedNode,
    updateNodeLabel: state.updateNodeLabel,
    setSelectedNode: state.setSelectedNode,
  });
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );
  console.log("selectedNode456-->",selectedNode);
  
  // const [selectedValue, setSelectedValue] = useState<number>(0);
  const [close, setClose] = useState<boolean>(false);
console.log("segment-->",cardIndex);

  const handleSelect = (option: number) => {
    console.log("option-->",option);
    
    if (!close) {
      setCardIndex(option);
      onChange(option);
    }
  };

  const handleClose = (index: number) => {
    if (options?.length > 2) {
      const cards = options.filter((_, i) => i !== index);
      const filteredCards = richCardCarousels.filter((_, i) => i !== index);
      const images = previewImage.filter((_, i) => i !== index);

      setRichCardCarousels(filteredCards);
      setPreviewImage(images);
      setOptions(cards.map((_, i) => `Card ${i + 1}`));

      if (index === 0 && cardIndex === index) {
        setCardIndex(index);
      } else if (cardIndex < index) {
        setCardIndex(cardIndex);
      } else if (index < cardIndex) {
        setCardIndex(cardIndex - 1);
      } else if (cardIndex === index && options.length - 1 === index) {
        setCardIndex(cardIndex - 1);
      } else if (cardIndex === index) {
        setCardIndex(cardIndex);
      }
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <div>
      <Row gutter={[16, 24]}>
        {options.map((option, index) => (
          // <Flex gap={"large"}>
          <Col md={6} key={option}>
            <Space size={"large"}>
              <Tag
                onClick={() => {
                  setClose(false);
                  handleSelect(index);
                }}
                onClose={(e) => {
                  e.preventDefault();
                  setClose(true);
                }}
                closeIcon={
                  options.length === 2 ? null : (
                    <Popconfirm
                      icon=""
                      description="Are you sure to delete this Card?"
                      onConfirm={() => handleClose(index)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <CloseOutlined style={{ fontSize: "14px" }} />
                    </Popconfirm>
                  )
                }
                style={{
                  border: cardIndex === index ? "2px solid #91caff" : "",
                  cursor: "pointer",
                  fontSize: 14,
                  margin: "0",
                  backgroundColor: cardIndex === index ? "#fff" : "#fff",
                  color: "#000",
                  zIndex: 1,
                  borderRadius: 5,
                }}
              >
                {option}
              </Tag>
            </Space>
          </Col>
          // </Flex>
        ))}
      </Row>
    </div>
  );
};

export default customSegment;
