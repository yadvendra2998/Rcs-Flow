import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect } from "react";
import { ActionData } from "./Addbutton";
import useStore from "@/config/store";
import { shallow } from "zustand/shallow";
import { Node } from "reactflow";

interface RichCardCaouselButton {
  id: number;
  type: string;
  title: string;
  payload: string;
}

export interface RichCardCarouselState {
  title: string;
  description: string;
  media: string;
  mediaHeight: string;
  button: RichCardCaouselButton[];
}

interface RichCarouselButtonProps {
  setRichCardCarousels: (state: any) => void;
  cardIndex: number;
  richCardCarousels: RichCardCarouselState[];
  form: FormInstance;
}

interface StoreState {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: any) => void;
  setSelectedNode: (node: Node | null) => void;
}

// Your store setup would go here

const selector = (state: StoreState) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
});

const AddCarouselButtons = ({
  cardIndex,
  setRichCardCarousels,
  richCardCarousels,
  form,
}: RichCarouselButtonProps) => {
  const { selectedNode, updateNodeLabel } = useStore(selector, shallow);

  
  useEffect(() => {
    const initValues = richCardCarousels?.[cardIndex]?.button?.reduce(
      (acc: { [x: string]: any }, button: ActionData, i: any) => {
        acc[`button-type-${cardIndex}-${i}`] = button.type;
        acc[`button-title-${cardIndex}-${i}`] = button.title;
        acc[`button-payload-${cardIndex}-${i}`] = button.payload;
        acc[`button-phoneNumber-${cardIndex}-${i}`] = button.phoneNumber;
        acc[`button-url-${cardIndex}-${i}`] = button.url;
        acc[`button-label-${cardIndex}-${i}`] = button.label;
        acc[`button-latitude-${cardIndex}-${i}`] = button.latitude;
        acc[`button-longitude-${cardIndex}-${i}`] = button.longitude;
        acc[`button-startDate-${cardIndex}-${i}`] = button.startDate;
        acc[`button-endDate-${cardIndex}-${i}`] = button.endDate;
        acc[`button-description-${cardIndex}-${i}`] = button.description;
        return acc;
      },
      {}
    );
    form.setFieldsValue(initValues);
  }, [richCardCarousels?.[cardIndex]?.button]);

  const handleChange = (i: number, key: string, value: any) => {
    setRichCardCarousels((prev: RichCardCarouselState[]) => {
      const newData = prev.map((card, ind) => {
        if (ind === cardIndex) {
          return {
            ...card,
            button: card.button.map((action, index) => {
              if (key === "type") {
                return index === i
                  ? {
                      ...action,
                      [key]: value,
                      title: "",
                      payload: "",
                    }
                  : action;
              } else {
                return index === i ? { ...action, [key]: value } : action;
              }
            }),
          };
        }
        return card;
      });

      // Update node label
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, {
          richCardCarousels: newData,
        });
      }

      return newData;
    });
  };

  const addNewCard = () => {
    const currentCard = richCardCarousels?.[cardIndex];
    if (currentCard && currentCard.button.length < 11) {
      const newButton: ActionData = {
        id: currentCard?.button?.length,
        type: "quick",
        title: "",
        payload: "",
      };

      setRichCardCarousels((prev: RichCardCarouselState[]) => {
        const newData = prev.map((card, ind) => {
          return ind === cardIndex
            ? { ...card, button: [...card.button, newButton] }
            : card;
        });

        // Update node label
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            richCardCarousels: newData,
          });
        }

        return newData;
      });
    } else {
      message.warning("Cannot add more than 11 buttons");
    }
  };

  console.log("state", selectedNode);


  const deleteCard = (index: number) => {
    if (richCardCarousels?.[cardIndex]?.button?.length > 1) {
      setRichCardCarousels((prev: RichCardCarouselState[]) => {
        return prev.map((card, ind) => {
          if (ind === cardIndex) {
            const filteredButtons = card.button.filter((_, i) => i !== index);
            return { ...card, button: filteredButtons };
          }
          return card;
        });
      });

      // Handle node update if selectedNode exists
      if (selectedNode) {
        const updatedButtonData = richCardCarousels?.[cardIndex]?.button.map(
          (action: ActionData) => ({
            title: action.title || "Untitled",
            type: action.type || "quick",
          })
        );

        updateNodeLabel(selectedNode.id, {
          richCardCarousels: updatedButtonData,
        });
      }
    } else {
      message.warning("At least one button is required");
    }
  };

  return (
    <div className=" mt-3">
      <Form form={form} layout="vertical">
        <Space
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={addNewCard}
            style={{ backgroundColor: "#0F3B48" }}
            type="primary"
          >
            <PlusOutlined /> Add
          </Button>
        </Space>
        {Array.isArray(richCardCarousels?.[cardIndex]?.button) &&
          richCardCarousels?.[cardIndex]?.button?.map(
            (btn: any, index: number) => (
              <Card
                key={index}
                style={{ marginTop: "10px", position: "relative" }}
              >
                <CloseOutlined
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 8,
                    fontSize: "18px",
                  }}
                  onClick={() => deleteCard(index)}
                />
                <Row gutter={[16, 0]}>
                  <Col md={24}>
                    <Form.Item
                      name={`button-type-${cardIndex}-${index}`}
                      label="Action"
                      style={{ marginBottom: "10px" }}
                    >
                      <Select
                        value={btn?.type}
                        onChange={(value) => handleChange(index, "type", value)}
                        style={{ width: "100%", textAlign: "left" }}
                        options={[
                          { value: "quick", label: "Quick Reply" },
                          { value: "call", label: "Call Button" },
                          { value: "url", label: "URL Button" },
                          { value: "location", label: "Location" },
                          { value: "calendar", label: "Calendar" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={24}>
                    <Form.Item
                      name={`button-title-${cardIndex}-${index}`}
                      label="Title"
                      style={{ marginBottom: "10px", textAlign: "left" }}
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please enter title",
                        },
                        {
                          max: 25,
                          message: "Title must be within 25 characters",
                        },
                      ]}
                    >
                      <Input
                        variant="filled"
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                        // defaultValue={btn.title}
                        placeholder="Enter Title"
                        value={btn?.title}
                        maxLength={25}
                        showCount={true}
                      />
                    </Form.Item>
                  </Col>
                  {btn?.type === "call" && (
                    <Col md={24}>
                      <Form.Item
                        name={`button-phoneNumber-${cardIndex}-${index}`}
                        label="Phone Number"
                      >
                        <Input
                          variant="filled"
                          value={btn?.phoneNumber}
                          onChange={(e) =>
                            handleChange(index, "phoneNumber", e.target.value)
                          }
                          size="large"
                          placeholder="Enter Phone Number"
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {btn?.type === "url" && (
                    <Col md={24}>
                      <Form.Item
                        name={`button-payload-${cardIndex}-${index}`}
                        label="URL"
                      >
                        <Input
                          variant="filled"
                          value={btn?.payload}
                          onChange={(e) =>
                            handleChange(index, "payload", e.target.value)
                          }
                          size="large"
                          placeholder="Enter URL"
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {btn?.type === "location" && (
                    <>
                      <Col md={24}>
                        <Form.Item
                          name={`button-payload-${cardIndex}-${index}`}
                          label="Label"
                        >
                          <Input
                            variant="filled"
                            value={btn?.payload}
                            onChange={(e) =>
                              handleChange(index, "payload", e.target.value)
                            }
                            size="large"
                            placeholder="Enter Label"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item
                          name={`button-latitude-${cardIndex}-${index}`}
                          label="Latitude"
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            value={btn?.latitude}
                            onChange={(value) =>
                              handleChange(index, "latitude", value)
                            }
                            size="large"
                            placeholder="Enter Latitude"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item
                          name={`button-longitude-${cardIndex}-${index}`}
                          label="Longitude"
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            value={btn?.longitude}
                            onChange={(value) =>
                              handleChange(index, "longitude", value)
                            }
                            size="large"
                            placeholder="Enter Longitude"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {btn?.type === "calendar" && (
                    <>
                      <Col md={24}>
                        <Form.Item
                          name={`button-payload-${cardIndex}-${index}`}
                          label="Label"
                        >
                          <Input
                            variant="filled"
                            value={btn?.payload}
                            onChange={(e) =>
                              handleChange(index, "payload", e.target.value)
                            }
                            size="large"
                            placeholder="Enter Label"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item
                          name={`button-startDate-${cardIndex}-${index}`}
                          label="Start Date"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            value={btn?.startDate}
                            onChange={(date) =>
                              handleChange(index, "startDate", date)
                            }
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item
                          name={`button-endDate-${cardIndex}-${index}`}
                          label="End Date"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            value={btn?.endDate}
                            onChange={(date) =>
                              handleChange(index, "endDate", date)
                            }
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            )
          )}
      </Form>
    </div>
  );
};

export default AddCarouselButtons;
