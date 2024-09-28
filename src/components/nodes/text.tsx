import useStore from "@/config/store";
import { CopyOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  List,
  Radio,
  Slider,
  ConfigProvider,
  Switch,
  Popconfirm,
  PopconfirmProps,
  message,
  Space,
  Typography,
  Popover,
  Flex,
  Card,
} from "antd";
import React, { memo, useState } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import { ActionData } from "../panels/Addbutton";
const selector = (state: {
  removeNode: (id: string) => void;
  setSelectedNode: (node: Node | null) => void;
  selectedNode: Node | null;
  edges: Edge[];
  addNode: (node: Node) => void;
}) => ({
  removeNode: state.removeNode,
  edges: state.edges,
  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
  addNode: state.addNode,
});

const confirm: PopconfirmProps["onConfirm"] = (id: string) => {
  // Call the handleDelete function with the id
  useStore.getState().removeNode(id);
  message.success("Node deleted successfully");
};

const cancel: PopconfirmProps["onCancel"] = () => {
  message.error("Deletion cancelled");
};

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const getTitleByType = (type: any) => {
  switch (type) {
    case "textWithButtonNode":
      return {
        title: "Send Button Message",
        backgroundColor: "#ADB3E8",
        color: " #222222",
      };
    case "textWithmedia":
      return {
        title: "Send Media",
        backgroundColor: "#C6BBBB",
        color: " #222222",
      };
    case "list":
      return {
        title: "Display List",
        backgroundColor: "rgb(254, 153, 50)",
        color: " #222222",
      };
    case "richcard":
      return { title: "Richcard", backgroundColor: "#ADC0A7", color: "black" };
    case "richcardcarousel":
      return {
        title: "Richcard Carousel",
        backgroundColor: "#F5E5FC",
        color: " #222222",
      };
    default:
      return {
        title: "Send Message",
        backgroundColor: "#D1AFAF",
        color: " #222222",
      };
  }
};

export const TextNode = memo((node: Node) => {
  const { edges, addNode } = useStore(selector, shallow);
  const { removeNode, setSelectedNode, selectedNode } = useStore(
    selector,
    shallow
  );
  const [isEnabled, setIsEnabled] = useState(true);

  const [sourceConnectable, setSourceConnectable] = React.useState(true);
  const { data, selected, id, type } = node;
  console.log("123", data);
  const [arrow] = useState<"Show" | "Hide" | "Center">("Show");
  const [value, setValue] = useState(data?.richCardCarousel?.width || "small");
  const [media, setMedia] = useState(null);
  const [value1, setValue1] = useState("");
  const [button, setButton] = useState<{ actions: ActionData[] }>({
    actions: [
      {
        id: 0,
        type: "quick", // Quick Reply as default
        title: "",
        payload: "",
      },
    ],
  });

  const alledges = getConnectedEdges([node], edges);

  React.useEffect(() => {
    const isSourceConnected = alledges.some((edge) => edge.source === id);
    setSourceConnectable(!isSourceConnected);
  }, [alledges, id]);

  const handleCopy = () => {
    if (data.isInitial) {
      message.error("Initial node cannot be copied.");
      return;
    }

    const newNode = {
      ...node,
      id: `${id}-copy`,
      position: {
        x: (node.position?.x || 0) + 100,
        y: (node.position?.y || 0) + 100,
      },
      data: {
        ...data,
      },
    };

    addNode(newNode);
    setSelectedNode(null);
    message.success("Node copied successfully.");
  };

  const getImageWidth = () => {
    if (data.mediaHeight === "small") {
      return 100;
    } else if (data.mediaHeight === "medium") {
      return 150;
    } else if (data.mediaHeight === "tall") {
      return 200;
    } else {
      return 100;
    }
  };

  console.log("getImageWidth", data.richCardCarousels);
  const handleSwitchChange = (checked) => {
    setIsEnabled(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  const renderNodeContent = () => {
    const defaultButton = {
      id: 0,
      type: "quick",
      title: "Default Button",
      payload: "",
    };

    switch (type) {
      case "textWithButtonNode":
        const buttonsToRender =
          data.buttons && data.buttons.length > 0
            ? data.buttons
            : [defaultButton];
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <div>
              <Typography.Text>{data.label}</Typography.Text>
              <Typography.Text>{data.discription}</Typography.Text>
              <div className="text-xs whitespace-pre-wrap">
                {buttonsToRender.map((button: any, index: any) => (
                  <React.Fragment key={index}>
                    <Flex justify="space-around">
                      {button.type === "quick" ? (
                        <Button
                          size="small"
                          block
                          style={{ background: "#adafce", color: "black" }}
                        >
                          <Handle
                            type="source"
                            id={`button-${index}`}
                            position={Position.Right}
                            isConnectable={true}
                          />
                          {button.title || "Untitled"}
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          block
                          style={{ background: "##adafce", color: "black" }}
                        >
                          {button.title || "Untitled"}
                        </Button>
                      )}
                    </Flex>
                    {index < buttonsToRender.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );

      // case "richcard":
      //   const richcardButtons =
      //     data.buttons && data.buttons.length > 0
      //       ? data.buttons
      //       : [defaultButton];
      //   return (
      //     <div className="py-2 px-3 min-h-[32px]">
      //         <Typography.Text style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>{data.discription}</Typography.Text>
      //         <div style={{ textAlign: "center",  }}>
      //         {data?.media ? (
      //           <Image
      //             src={data.media}
      //             preview={false}
      //             width={getImageWidth()}
      //             alt="Richcard media"
      //           />
      //         ) : (
      //           <Image
      //             width={100}
      //             preview={false}
      //             src="https://www.trschools.com/templates/imgs/default_placeholder.png"
      //           />
      //         )}
      //       </div>
      //       <Typography.Text strong>{data.label}</Typography.Text>
      //       <br />
      //       <Typography.Text>{data.title}</Typography.Text>
      //       <Typography.Text>{data.discription}</Typography.Text>
      //       <div className="mt-2">
      //         {richcardButtons.map((button: any, index: any) => (
      //           <React.Fragment key={index}>
      //             <Flex justify="space-around">
      //               {button.type === "quick" ? (
      //                 <Button size="small"
      //                   block
      //                   style={{ background: "#adafce", color: "black" }}
      //                 >
      //                   <Handle
      //                     type="source"
      //                     id={`button-${index}`}
      //                     position={Position.Right}
      //                     isConnectable={true}
      //                   />
      //                   {button.title || "Untitled"}
      //                 </Button>
      //               ) : (
      //                 <Button size="small"
      //                   block
      //                   style={{ background: "##adafce", color: "black" }}
      //                 >
      //                   {button.title || "Untitled"}
      //                 </Button>
      //               )}
      //             </Flex>
      //             {index < richcardButtons.length - 1 && <br />}
      //           </React.Fragment>
      //         ))}
      //       </div>
      //     </div>
      //   );

      case "richcard":
        return (
          <>
            <div className="py-2 px-3 min-h-[32px]">
              <Card>
                <div style={{ textAlign: "center" }}>
                  {data?.media ? (
                    <Image
                      src={data.media}
                      preview={false}
                      width={getImageWidth()}
                      // alt="Richcard media"
                    />
                  ) : (
                    <Image
                      width={100}
                      preview={false}
                      src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                    />
                  )}
                </div>
                <Typography.Text strong>{data.label}</Typography.Text>
                <br />
                <Typography.Text>{data.title}</Typography.Text>
                <Typography.Text>{data.description}</Typography.Text>
                <div className="mt-2">
                  {data.buttons && data.buttons.length > 0 ? (
                    data.buttons.map((button: any, index: any) => (
                      <React.Fragment key={index}>
                        <Flex justify="space-around">
                          {button.type === "quick" ? (
                            <Button
                              size="small"
                              block
                              style={{ background: "#adafce", color: "black" }}
                            >
                              <Handle
                                type="source"
                                id={`button-${index}`}
                                position={Position.Right}
                                isConnectable={true}
                              />
                              {button.title || "Untitled"}
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              block
                              style={{ background: "##adafce", color: "black" }}
                            >
                              {button.title || "Untitled"}
                            </Button>
                          )}
                        </Flex>
                        {index < data.buttons.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </Card>
            </div>
          </>
        );

      case "richcardcarousel":
        const richCardCarouselButtons =
          data.buttons && data.buttons.length > 0
            ? data.buttons
            : [defaultButton];

        return (
          <>
            {Array.isArray(data?.richCardCarousels) &&
            data.richCardCarousels.length > 0 ? (
              <Flex direction="column" align="center">
                {data.richCardCarousels.map((card: any, index: any) => {
                  const imageWidth =
                    card?.mediaHeight === "short"
                      ? 100
                      : card.mediaHeight === "medium"
                      ? 155
                      : 200;

                  return (
                    <div key={index} className="py-2 px-3 min-h-[32px] w-full">
                      <Card>
                        <div style={{ textAlign: "center" }}>
                          {card?.media ? (
                            <Image
                              src={card.media}
                              preview={false}
                              width={imageWidth} // Apply dynamic width here
                              alt="Richcard media"
                            />
                          ) : (
                            <Image
                              width={100}
                              preview={false}
                              src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                            />
                          )}
                        </div>
                        <Typography.Text strong>{card.title}</Typography.Text>
                        <br />
                        <Typography.Text>{card.description}</Typography.Text>
                        <div className="text-xs whitespace-pre-wrap">
                          {Array.isArray(card.buttons) &&
                          card.buttons.length > 0
                            ? card.buttons.map((button: any, btnIndex: any) => (
                                <React.Fragment key={btnIndex}>
                                  <Flex justify="space-around">
                                    {button.type === "quick" ? (
                                      <Button
                                        size="small"
                                        block
                                        style={{
                                          background: "#adafce",
                                          color: "black",
                                        }}
                                      >
                                        <Handle
                                          type="source"
                                          id={`button-${index}-${btnIndex}`} // Unique ID for each button
                                          position={Position.Right}
                                          isConnectable={true}
                                        />
                                        {button.title || "Untitled"}
                                      </Button>
                                    ) : (
                                      <Button
                                        size="small"
                                        block
                                        style={{
                                          background: "#adafce",
                                          color: "black",
                                        }}
                                      >
                                        {button.title || "Untitled"}
                                      </Button>
                                    )}
                                  </Flex>
                                  {btnIndex < card.buttons.length - 1 && <br />}
                                </React.Fragment>
                              ))
                            : null}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </Flex>
            ) : (
              <div className="py-2 px-3 min-h-[32px]">
                <Flex>
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        width={100}
                        preview={false}
                        src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                      />
                    </div>
                    <Typography.Text>No rich cards available</Typography.Text>
                  </Card>
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        width={100}
                        preview={false}
                        src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                      />
                    </div>
                    <Typography.Text>No rich cards available</Typography.Text>
                  </Card>
                </Flex>
              </div>
            )}
          </>
        );

      case "textWithmedia":
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <div style={{ textAlign: "center" }}>
              {data?.media ? (
                <Image
                  src={data.media}
                  preview={false}
                  width={100}
                  alt="Media"
                />
              ) : (
                <Image
                  width={100}
                  preview={false}
                  src="https://www.trschools.com/templates/imgs/default_placeholder.png"
                />
              )}
            </div>
          </div>
        );

      case "list":
        return (
          <div className="py-2 px-3 min-h-[32px]">
            <List
              bordered
              dataSource={data.items || []}
              renderItem={(item: any) => <List.Item>{item}</List.Item>}
            />
          </div>
        );

      default:
        return (
          <>
            <div className="py-2 px-3 min-h-[32px]">
              <div>
                <Typography.Text>{data.label}</Typography.Text>
              </div>
            </div>
          </>
        );
    }
  };
  const confirm: PopconfirmProps["onConfirm"] = (id: string) => {
    const { selectedNode, removeNode } = useStore.getState();
    if (selectedNode?.id === id && selectedNode?.data?.isInitial) {
      message.error("Start node cannot be deleted.");
      return;
    }
    removeNode(id);
    message.success("Node deleted successfully");
  };

  const { title, backgroundColor, color } = getTitleByType(type);
  const text = (
    <div>
      <Space>
        <CopyOutlined
          style={{ color: "#8C8C8C", fontSize: "18px" }}
          onClick={handleCopy}
        />
        <Popconfirm
          title="Delete the Node"
          description="Are you sure to delete this Node?"
          onConfirm={() => confirm(id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#8C8C8C", fontSize: "18px" }} />
        </Popconfirm>
        <MoreOutlined style={{ color: "#8C8C8C", fontSize: "18px" }} />
      </Space>
    </div>
  );
  return (
    <>
      {data.button && (
        <div className="flex justify-start m-2">
          <Button
            size="small"
            style={{ background: "rgba(163, 184, 250, 0.6)" }}
          >
            {data.button.label}
          </Button>
        </div>
      )}
      <div
        className={cn(
          "bg-white border-[1px] shadow-2xl border-transparent rounded-xl min-w-[200px] text-start",
          selected && "border-blue-500",
          !isEnabled && "opacity-50"
        )}
      >
        <Popover
          placement="topRight"
          title={text}
          arrow={arrow === "Hide" ? false : undefined}
          color={"#FFFFFF"}
        >
          <div
            className="py-1 rounded-t-xl px-3 text-xs font-semibold text-primary-foreground flex justify-between items-center"
            style={{ backgroundColor }}
          >
            <span style={{ color }}>{data?.name || title}</span>
            <Switch
              size="small"
              checked={isEnabled}
              onChange={handleSwitchChange}
            />
          </div>

          <div style={{ pointerEvents: isEnabled ? "auto" : "none" }}>
            {renderNodeContent()}
          </div>

          {isEnabled && (
            <>
              {data.isInitial ? (
                <Handle
                  style={{ marginTop: "25px" }}
                  type="source"
                  position={Position.Right}
                  isConnectable={true}
                  id="right"
                />
              ) : (
                <Handle
                  type="target"
                  position={Position.Left}
                  id="left"
                  isConnectable={true}
                />
              )}
            </>
          )}
        </Popover>
      </div>
    </>
  );
});

TextNode.displayName = "TextNode";
