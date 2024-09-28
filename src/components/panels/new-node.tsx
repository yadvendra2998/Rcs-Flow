import { NodeTypes } from "@/config/store";
import {
  BarChartOutlined,
  FileImageOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {  Col,  Row,  } from "antd";
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
        {/* <div className="p-2 mt-3 w-fit min-w-[200px]">
        <div
          className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
          onDragStart={(event) => onDragStart(event, 'textNode')}
          draggable
        >
          <MessagesSquare  color="hsl(222.2,47.4%,11.2%)" size="32" />
          <span className="font-semibold text-primary">Text</span>
        </div>
      </div> */}
        {/* <div
                className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, 'textWithButtonNode')}
                draggable
              >
                <MessagesSquare color="hsl(222.2,47.4%,11.2%)" size="32" />
                <span className="font-semibold text-primary">
                  Text with Button
                </span>
              </div> */}
        {/* <Space direction="vertical" style={{ width: "100%" }}> */}
        <div style={{padding:"10px"}}>
          <Row justify="center" align="middle" gutter={[12, 12]}>
            <Col md={12}>
              {/* <div className="p-2 mt-3 w-fit min-w-[200px]"> */}
              <div
                className="bg-[#F5EDED] text-primary-foreground border border-transparent hover:border-[#DAA0A0] py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"

                onDragStart={(event) => onDragStart(event, "textNode")}
                draggable
              >
                <FileTextOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Text</span>
              </div>
              {/* </div> */}
            </Col>
            <Col md={12}>
              {/* <div className="p-2 mt-3 w-fit min-w-[200px]"> */}
              <div
                className="bg-[#DCDEF6] text-primary-foreground border border-transparent hover:border-[#9aa0e5] py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"

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
              {/* </div> */}
            </Col>
            {/* </Row> */}
            {/* <Row gutter={[16, 24]}> */}
           
            {/* <Col md={12}>
              <div
                className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, "list")}
                draggable
              >
                <UnorderedListOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">List</span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, "menu")}
                draggable
              >
                <MenuFoldOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Menu</span>
              </div>
            </Col>
            <Col md={12}>
              <div
                className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, "poll")}
                draggable
              >
                <BarChartOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Poll</span>
              </div>
            </Col> */}
            <Col md={12}>
              <div
                className="bg-[#DFE6DC] text-primary-foreground border border-transparent hover:border-[#bbcab4] py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, "richcard")}
                draggable
              >
                <BarChartOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">Rich Card</span>
              </div>
              {/* </div> */}
            </Col>
            <Col md={12}>
              {/* <div className="p-2 mt-3 w-fit min-w-[200px]"> */}
              <div
                className="bg-[#F5E5FC] text-primary-foreground border border-transparent hover:border-[#d38df2] py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
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
              {/* </div> */}
            </Col>
            <Col md={12} >
              {/* <div className="p-2 mt-3 w-fit min-w-[200px]"> */}
              <div
                className="bg-[#E0DDDD] text-primary-foreground border border-transparent hover:border-[#bbbbbb] py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                onDragStart={(event) => onDragStart(event, "textWithmedia")}
                draggable
              >
                <FileImageOutlined
                  style={{ color: "hsl(222.2,47.4%,11.2%)", fontSize: "30px" }}
                />
                <span className="font-semibold text-primary">
                  {" "}
                  Text with Media
                </span>
              </div>
              {/* </div> */}
            </Col>
            <Col md={12}>
            </Col>
          </Row>
        </div>
        {/* </Space> */}
        {/* <Flex justify="flex-end" align="flex-end"> */}
        <br />
        <br />
        {/* </Flex> */}
      </aside>
    </>
  );
};
