import React, { useEffect } from "react";
import useStore from "@/config/store";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";

export interface ActionData {
  id: number;
  type: string;
  title: string;
  payload: string;
  url?: string;
  label?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  startDate?: any;
  endDate?: any;
  name?: any;
  description?: string;
}

interface AddButtonProps {
  textareaValue: string;
  templateName: string;
  description: string;
  title: string;
  button: ActionData[];
  setButton: (state: any) => void;
}

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: any) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

const Addbutton: React.FC<AddButtonProps> = ({
  textareaValue,
  templateName,
  description,
  title,
  setButton,
  button,
}) => {
  const [form] = Form.useForm();
  const { selectedNode, updateNodeLabel } = useStore(selector, shallow);

  useEffect(() => {
    if (selectedNode) {
      const updatedActions = selectedNode?.data?.buttons || [];
      if (updatedActions.length === 0) {
        setButton((prev: { actions: ActionData[] }) => ({
          ...prev,
          actions: [
            {
              id: 0,
              type: "quick",
              title: "",
              payload: "",
            },
          ],
        }));
      } else {
        setButton({ actions: updatedActions });
      }
    }
    console.log("Updated", selectedNode);
  }, [selectedNode, setButton]);

  useEffect(() => {
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title || textareaValue,
        name: templateName,
        description: description,
        buttons: button?.map((action) => ({
          title: action.title || "Untitled",
          type: action.type || "quick",
        })),
      });
    }
  }, [button, selectedNode, title, textareaValue, templateName, description]);

  const handleChange = (index: number, key: string, value: any) => {
    setButton((prev: { actions: ActionData[] }) => {
      const actions = [...prev.actions];
      actions[index] = { ...actions[index], [key]: value };

      if (key === "type") {
        actions[index] = {
          ...actions[index],
          [key]: value,
          title: "",
          payload: "",
        };
        return { actions };
      } else {
        if (selectedNode) {
          updateNodeLabel(selectedNode?.id, {
            label: title || textareaValue,
            name: templateName,
            description: description,
            buttons: actions.map((action) => ({
              title: action.title || "Untitled",
              type: action.type || "quick",
            })),
          });
        }
      }

      return { ...prev.actions, actions };
    });

    console.log("button? and description", button);
  };

  

  const addNewCard = () => {
    if (button.length < 11) {
      const newId = button.length;
      const newButton: ActionData = {
        id: newId,
        type: "quick",
        title: "",
        payload: "",
      };

      setButton((prev: { actions: ActionData[] }) => {
        const updatedActions = [...prev.actions, newButton];

        // Update the node if a selectedNode exists
        if (selectedNode) {
          const buttonData = updatedActions.map((action) => ({
            title: action.title || "Untitled",
            type: action.type || "quick",
          }));

          // Call the updateNodeLabel function to update the node
          updateNodeLabel(selectedNode.id, {
            label: title || textareaValue,
            name: templateName,
            description: description,
            buttons: buttonData,
          });
        }

        return { actions: updatedActions }; // Return the updated state
      });
    } else {
      message.warning("Cannot add more than 11 buttons");
    }
  };

  const deleteCard = (index: number) => {
    if (button?.length > 1) {
      const filteredData = button?.filter((_, i) => i !== index);
      setButton((prev: { actions: ActionData[] }) => ({
        ...prev,
        actions: filteredData,
      }));

      if (selectedNode) {
        const updatedButtonData = filteredData.map((action) => ({
          title: action.title || "Untitled",
          type: action.type || "quick",
        }));
        updateNodeLabel(selectedNode.id, {
          label: title,
          name: templateName,
          description: description,
          buttons: updatedButtonData,
        });
      }
    } else {
      message.warning("At least one button is required");
    }
  };


  useEffect(() => {
    const initValues = button.reduce((acc: { [x: string]: any }, button: ActionData, i: any) => {
      acc[`button-type-${i}`] = button.type;
      acc[`button-title-${i}`] = button.title;
      acc[`button-payload-${i}`] = button.payload;
      acc[`button-phoneNumber-${i}`] = button.phoneNumber;
      acc[`button-url-${i}`] = button.url;
      acc[`button-label-${i}`] = button.label;
      acc[`button-latitude-${i}`] = button.latitude;
      acc[`button-longitude-${i}`] = button.longitude;
      acc[`button-startDate-${i}`] = button.startDate;
      acc[`button-endDate-${i}`] = button.endDate;
      acc[`button-description-${i}`] = button.description;
      return acc;
    }, {});
    form.setFieldsValue(initValues);
  }, [button]);

  console.log("index", button);
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
        {Array.isArray(button) &&
          button?.map((btn, index) => (
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
                  <Form.Item name={`button-type-${index}`} label="Action" style={{ marginBottom: "10px" }}>
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
                    name={`button-title-${index}`}
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
                    <Form.Item name={`button-phoneNumber-${index}`} label="Phone Number">
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
                    <Form.Item name={`button-url-${index}`} label="URL">
                      <Input
                        variant="filled"
                        value={btn.payload}
                        onChange={(e) =>
                          handleChange(index, "url", e.target.value)
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
                      <Form.Item name={`button-label-${index}`} label="Label">
                        <Input
                          variant="filled"
                          value={btn?.payload}
                          onChange={(e) =>
                            handleChange(index, "label", e.target.value)
                          }
                          size="large"
                          placeholder="Enter Label"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item name={`button-latitude-${index}`} label="Latitude">
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
                      <Form.Item name={`button-longitude-${index}`} label="Longitude">
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
                      <Form.Item name={`button-label-${index}`} label="Label">
                        <Input
                          variant="filled"
                          value={btn?.payload}
                          onChange={(e) =>
                            handleChange(index, "label", e.target.value)
                          }
                          size="large"
                          placeholder="Enter Label"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item name={`button-startDate-${index}`} label="Start Date">
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
                      <Form.Item name={`button-endDate-${index}`} label="End Date">
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
          ))}
      </Form>
    </div>
  );
};

export default Addbutton;
