import { CloseOutlined } from "@ant-design/icons";
import { Col, Flex, Popconfirm, Row, Space, Tag } from "antd";
import React, { useState } from "react";


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

const customSegment: React.FC<CustomSegmentProps> = ({
  options,
  onChange,
  setOptions,
  setPreviewImage,
  setRichCardCarousels,
  richCardCarousels,
  previewImage,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [close, setClose] = useState<boolean>(false);

  const handleSelect = (option: number) => {
    if (!close) {
      setSelectedValue(option);
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

      if (index === 0 && selectedValue === index) {
        setSelectedValue(index);
      } else if (selectedValue < index) {
        setSelectedValue(selectedValue);
      } else if (index < selectedValue) {
        setSelectedValue(selectedValue - 1);
      } else if (selectedValue === index && options.length - 1 === index) {
        setSelectedValue(selectedValue - 1);
      } else if (selectedValue === index) {
        setSelectedValue(selectedValue);
      }
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     gap: "10px",
    //   }}
    // >
    //   {options.map((option, index) => (
    //     <Tag
    //       key={option}
    //       onClick={() => {
    //         setClose(false);
    //         handleSelect(index);
    //       }}
    //       onClose={(e) => {
    //         e.preventDefault();
    //         setClose(true);
    //       }}
    //       closeIcon={
    //         options.length === 2 ? null : (
    //           <Popconfirm
    //             icon=""
    //             description="Are you sure to delete this Card?"
    //             onConfirm={() => handleClose(index)}
    //             onCancel={cancel}
    //             okText="Yes"
    //             cancelText="No"
    //           >
    //             <CloseOutlined style={{ fontSize: "14px" }} />
    //           </Popconfirm>
    //         )
    //       }
    //       style={{
    //         border: selectedValue === index ? "2px solid #91caff" : "",
    //         cursor: "pointer",
    //         fontSize: 14,
    //         margin: "0",
    //         padding: "5px 10px",
    //         backgroundColor: selectedValue === index ? "#fff" : "#fff",
    //         color: "#000",
    //         zIndex: 1,
    //         borderRadius: 5,
    //       }}
    //     >
    //       {option}
    //     </Tag>
    //   ))}
    // </div>
    <div>
  <Row gutter={[16,24]}>
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
            border: selectedValue === index ? "2px solid #91caff" : "",
            cursor: "pointer",
            fontSize: 14,
            margin: "0",
            // padding: "5px 5px",
            backgroundColor: selectedValue === index ? "#fff" : "#fff",
            color: "#000",
            zIndex: 1,
            borderRadius: 5,
            // width: "100%",
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
