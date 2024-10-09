import React, { useEffect, useState } from "react";
import useStore from "@/config/store";
import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Row,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { ArrowLeft } from "lucide-react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import CustomSegment from "./customSegment";
import TextArea from "antd/es/input/TextArea";
import Addbutton from "./Addbutton";
import AddCarouselButtons from "./AddCarouselButtons";

interface RichCardButton {
  id: number;
  type: string;
  title: string;
  payload: string;
}

export type RichCardButtonsState = {
  title: string;
  description: string;
  media: string;
  mediaHeight: string;
  button: RichCardButton[];
};

interface ActionData {
  id: number;
  type: string;
  title: string;
  payload: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  startDate?: any;
  endDate?: any;
}

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

export const richcardcarousel = () => {
  const [form] = Form.useForm();
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value1, setValue1] = useState("medium");
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const [options, setOptions] = useState(["Card 1", "Card 2"]);
  const [cardIndex, setCardIndex] = useState(0);

  const [media, setMedia] = useState("");
  const [templateName, setTemplateName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  // const [button, setButton] = useState<{ actions: ActionData[] }>({
  //   actions: [
  //     {
  //       id: 0,
  //       type: "quick",
  //       title: "",
  //       payload: "",
  //     },
  //   ],
  // });

  const initialCards = [
    {
      title: "Card 1",
      description: "",
      media: "",
      mediaHeight: value1,
      button: [
        {
          id: 1,
          type: "quick",
          title: "Button 1",
          payload: "",
        },
      ],
    },
    {
      title: "Card 2",
      description: "",
      media: "",
      mediaHeight: value1,
      button: [
        {
          id: 1,
          type: "quick",
          title: "Button 1",
          payload: "",
        },
      ],
    },
  ];

  const [richCardCarousels, setRichCardCarousels] =
    useState<RichCardButtonsState[]>(initialCards);

  const handleCardChange = (newValue: React.SetStateAction<number>) => {
    setCardIndex(newValue);
  };

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue1(newValue);

    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex] = {
        ...updated[cardIndex],
        mediaHeight: newValue,
      };
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, {
          richCardCarousels: updated,
        });
      }
      return updated;
    });
  };

  const handleAddCardsTemplate = () => {
    if (options.length < 10) {
      const newButton: RichCardButton = {
        id: 0, // Set this dynamically if you have multiple buttons per card
        type: "quick",
        title: "",
        payload: "",
      };

      const newCard: RichCardButtonsState = {
        title: "",
        description: "",
        media: "",
        mediaHeight: value1, // Assuming value1 is defined
        button: [newButton],
      };
      setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);

      setRichCardCarousels((prev) => {
        const updatedCarousels = [...prev, newCard];

        // Call updateNodeLabel with the updated state
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            richCardCarousels: updatedCarousels,
          });
        }

        return updatedCarousels;
      });
    } else {
      message.warning("Cannot add more than 10 cards");
    }
  };

  useEffect(() => {
    if (selectedNode) {
      setTemplateName(selectedNode.data?.name);
      if (selectedNode.data?.richCardCarousels) {
        setRichCardCarousels(selectedNode.data?.richCardCarousels);
        setOptions(
          selectedNode?.data?.richCardCarousels?.map(
            (_: any, i: number) => `Card ${i + 1}`
          )
        );
      }
    }
  }, [selectedNode, cardIndex]);

  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess({}, file);
    }, 1000);
  };

  const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done" || file.status === "uploading") {
        const originFileObj = file.originFileObj as Blob;

        if (originFileObj) {
          const mediaURL = URL.createObjectURL(originFileObj);
          setMedia(mediaURL);
          setRichCardCarousels((prev) => {
            const updated = [...prev];
            updated[cardIndex] = {
              ...updated[cardIndex],
              media: mediaURL,
            };
            if (selectedNode) {
              updateNodeLabel(selectedNode.id, {
                richCardCarousels: updated,
                name: templateName,
              });
            }
            return updated;
          });
        }
      }
    } else {
      setRichCardCarousels((prev) => {
        const updated = [...prev];
        updated[cardIndex].media = "";
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            richCardCarousels: updated,
            name: templateName,
          });
        }
        return updated;
      });
    }
  };

  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        richCardCarousels: richCardCarousels,
        name: value,
      });
    }
  };

  // Function to handle updating title
  const handleChange2 = (value: string) => {
    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex].title = value; // Update only the current card
      console.log("updated", updated);
      console.log("selectedNode", selectedNode);
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, {
          name: templateName,
          richCardCarousels: updated,
        });
      }
      return updated;
    });
  };

  // Function to handle updating description
  const handleDescriptionChange = (value: string) => {
    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex].description = value; // Update only the current card
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, {
          name: templateName,
          richCardCarousels: updated,
        });
      }
      return updated;
    });
  };

  // const handleDescriptionChange = (value: string) => {
  //   setDescription(value);

  //   setRichCardCarousels((prev) => {
  //     const updated = [...prev];
  //     updated[cardIndex] = {
  //       ...updated[cardIndex],
  //       description: value, // Only update the description, keep other properties
  //     };
  //     if (selectedNode) {
  //       updateNodeLabel(selectedNode.id, {
  //         name: templateName,
  //         richCardCarousels: updated,
  //       });
  //     }
  //     return updated;
  //   });

  // };

  // const handleChange2 = (value: string) => {
  //   setTitle(value);

  //   setRichCardCarousels((prev) => {
  //     const updated = [...prev];
  //     updated[cardIndex] = {
  //       ...updated[cardIndex],
  //       title: value, // Only update the title, keep other properties
  //     };
  //     if (selectedNode) {
  //       updateNodeLabel(selectedNode.id, {
  //         name: templateName,
  //         richCardCarousels: richCardCarousels,
  //       });
  //     }
  //     return updated;
  //   });

  // };

  return (
    <>
      <div className="p-2 font-semibold flex sticky top-0 bg-white z-10">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode?.type === "textWithButtonNode"
            ? "Text with Button"
            : "Richcard Carousel"}
        </h2>
      </div>
      <hr />
      <div className="p-2 mt-3">
        <Input
          variant="filled"
          placeholder="Template Name"
          defaultValue={selectedNode?.data?.name || ""}
          onChange={(e) => {
            handleTemplateNameChange(e.target.value);
          }}
        />
        <Row>
          <Col md={24}>
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <Typography
                style={{
                  alignSelf: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Cards
              </Typography>
              <Button
                onClick={handleAddCardsTemplate}
                style={{
                  backgroundColor: "#0F3B48",
                }}
                type="primary"
              >
                <PlusOutlined /> Add Cards
              </Button>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Col>
              <CustomSegment
                onChange={handleCardChange}
                options={options}
                value={cardIndex}
                setOptions={setOptions}
                setRichCardCarousels={setRichCardCarousels}
                setPreviewImage={setPreviewImage}
                previewImage={previewImage}
                richCardCarousels={richCardCarousels}
              />
            </Col>
          </Col>
        </Row>
        <br />

        <Col md={24} style={{ marginBottom: 10 }}>
          <Typography style={{ textAlign: "start", marginBottom: 2 }}>
            Title
          </Typography>
          <Input
            variant="filled"
            placeholder="Title"
            value={richCardCarousels?.[cardIndex]?.title || ""}
            onChange={(e) => handleChange2(e.target.value)}
            key={selectedNode?.id}
            id="message"
          />
        </Col>
        <Col>
          <Typography style={{ textAlign: "start", marginBottom: 2 }}>
            Description
          </Typography>
          <TextArea
            variant="filled"
            placeholder="Description"
            value={richCardCarousels?.[cardIndex]?.description || ""}
            rows={4}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </Col>

        <Row>
          <Col md={24}>
            <Form.Item
              layout="vertical"
              name={`media${cardIndex}`}
              label={"Media"}
              rules={[{ required: true, message: "Please select media" }]}
              initialValue={
                selectedNode?.data?.richCardCarousels?.[cardIndex]?.media
              }
            >
              <div
                style={{
                  backgroundColor: "#eee",
                  borderRadius: "5px",
                  border: "1px dashed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  cursor: "pointer",
                  padding: richCardCarousels?.[cardIndex]?.media
                    ? "15px 0px"
                    : "50px 0px",
                }}
              >
                {richCardCarousels?.[cardIndex]?.media ? (
                  <div
                    style={{
                      position: "relative",
                      alignItems: "center",
                      height: "120px",
                    }}
                  >
                    <img
                      src={
                        selectedNode?.data?.richCardCarousels?.[cardIndex]
                          ?.media || richCardCarousels?.[cardIndex]?.media
                      }
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      icon={<CloseOutlined />}
                      onClick={() => {
                        const updatedCards = [...richCardCarousels];
                        updatedCards[cardIndex].media = "";

                        setRichCardCarousels(updatedCards);

                        if (selectedNode) {
                          updateNodeLabel(selectedNode.id, {
                            richCardCarousels: updatedCards,
                          });
                        }

                        setMedia("");
                      }}
                      size="small"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                    />
                  </div>
                ) : (
                  <Upload
                    name="media"
                    customRequest={customRequest}
                    onChange={handleMediaChange}
                    showUploadList={false}
                    accept="image/*"
                    multiple={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: richCardCarousels?.[cardIndex]?.media
                        ? "none"
                        : "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                )}
              </div>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              layout="vertical"
              name={`mediaHeight${cardIndex}`}
              label={"Size"}
              rules={[{ required: true, message: "Please select size" }]}
            >
              <Radio.Group
                style={{ marginTop: "10px", width: "100%", textAlign: "left" }}
                onChange={(e: any) => onChange1(e)}
                value={richCardCarousels?.[cardIndex]?.mediaHeight}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "7px 7px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"short"}>Short: 112 DP</Radio>
                  </div>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "7px 7px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"medium"}>Medium: 168 DP</Radio>
                  </div>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "7px 7px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"tall"}>Tall: 264 DP</Radio>
                  </div>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <AddCarouselButtons
            form={form}
            richCardCarousels={richCardCarousels}
            setRichCardCarousels={setRichCardCarousels}
            cardIndex={cardIndex}
          />
          {/* <Addbutton
            templateName={templateName}
            description={description}
            title={title}
            button={button.actions}
            setButton={setButton}
            richCardCarousels={richCardCarousels}
            cardIndex={cardIndex}
            setRichCardCarousels={setRichCardCarousels}
            media={media}
          /> */}
        </Row>
      </div>
    </>
  );
};
