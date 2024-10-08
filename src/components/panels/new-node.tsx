import { NodeTypes } from "@/config/store";
import {
  BarChartOutlined,
  FileImageOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
export const AddNodePanel = () => {
  // using HTML Drag and Drop API
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeTypes
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      <aside>
        <div className="p-2 font-semibold">
          <h2>Add Template</h2>
        </div>
        <hr />
        <div style={{ padding: "10px" }}>
          <Row justify="center" align="middle" gutter={[12, 12]}>
            <Col md={12}>
              <div
                className="bg-gradient-to-r from-[#F9D4D4] to-[#F5EDED] text-primary-foreground border border-transparent hover:border-[#DAA0A0] hover:shadow-lg py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                onDragStart={(event) => onDragStart(event, "textNode")}
                draggable
              >
                <FileTextOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Text</span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="bg-gradient-to-r from-[#D6D8F7] to-[#DCDEF6] text-primary-foreground border border-transparent hover:border-[#9aa0e5] hover:shadow-lg py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                onDragStart={(event) =>
                  onDragStart(event, "textWithButtonNode")
                }
                draggable
              >
                <PlusOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">
                  Text with Button
                </span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="bg-gradient-to-r from-[#CEDFCC] to-[#DFE6DC] text-primary-foreground border border-transparent hover:border-[#bbcab4] hover:shadow-lg py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                onDragStart={(event) => onDragStart(event, "richcard")}
                draggable
              >
                <BarChartOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Rich Card</span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="bg-gradient-to-r from-[#EED2FA] to-[#F5E5FC] text-primary-foreground border border-transparent hover:border-[#d38df2] hover:shadow-lg py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                onDragStart={(event) => onDragStart(event, "richcardcarousel")}
                draggable
              >
                <BarChartOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">
                  RichCardCarousel
                </span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="bg-gradient-to-r from-[#CACACA] to-[#E0DDDD] text-primary-foreground border border-transparent hover:border-[#bbbbbb] hover:shadow-lg py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                onDragStart={(event) => onDragStart(event, "textWithmedia")}
                draggable
              >
                <FileImageOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">
                  Text with Media
                </span>
              </div>
            </Col>
            <Col md={12}></Col>
          </Row>
        </div>
        <br />
        <br />
      </aside>
    </>
  );
};
