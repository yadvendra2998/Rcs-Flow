import React, { useEffect, useState } from "react";
import useStore from "@/config/store";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Space,
  Upload,
} from "antd";
import { ArrowLeft } from "lucide-react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import TextArea from "antd/es/input/TextArea";
import Addbutton from "./Addbutton";
import { UploadFile } from "antd/es/upload/interface";

interface RichCardButton {
  id: number;
  type: string;
  title: string;
  payload: string;
}

interface RichCardButtonsState {
  orientation: string;
  title: string;
  description: string;
  media: string;
  mediaHeight: string;
  actions: RichCardButton[];
}

interface ActionData {
  id: number;
  type: string;
  title: string;
  payload: string;
}

interface RichCardProps {
  isEdit: boolean;
  data?: any;
}

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (
    nodeId: string,
    nodeData: {
      label: string;
      name: string;
      discription: string;
      buttons: ActionData[];
    }
  ) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const richcard = ({ isEdit, data }: RichCardProps) => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );

  const [mediaModal, setMediaModal] = useState(false);
  const [media, setMedia] = useState<string | null>(
    isEdit && data?.rcsRichCard?.media ? data.rcsRichCard.media : null
  );
  const [value1, setValue1] = useState<string>("medium");
  const [richCardButtons, setRichCardButtons] = useState<RichCardButtonsState>({
    orientation: "horizontal",
    title: isEdit ? data?.rcsRichCard?.title ?? "" : "",
    description: isEdit ? data?.rcsRichCard?.description ?? "" : "",
    media: media || "",
    mediaHeight: isEdit ? data?.rcsRichCard?.mediaHeight ?? value1 : value1,
    actions: [
      {
        id: 0,
        type: "quick",
        title: "",
        payload: "",
      },
    ],
  });

  const [textareaValue, setTextareaValue] = useState<string>(
    typeof selectedNode?.data?.label === "string" ? selectedNode.data.label : ""
  );
  const [templateName, setTemplateName] = useState<string>(selectedNode?.data?.name);
  const [title, setTitle] = useState<string>(selectedNode?.data?.title);
  const [description, setDescription] = useState<string>(selectedNode?.data?.description);
  const [button, setButton] = useState<{ actions: ActionData[] }>({
    actions: [
      {
        id: 0,
        type: "quick",
        title: "",
        payload: "",
      },
    ],
  });

  useEffect(() => {
    if (selectedNode) {
      setTextareaValue(selectedNode.data.label || "");
      setTitle(selectedNode.data.title || title);
      setDescription(selectedNode.data.description || description);
      setTemplateName(selectedNode.data.name || templateName);
      if (selectedNode.data?.media) {
        setMedia(selectedNode.data.media);
        setRichCardButtons((prev) => ({
          ...prev,
          media: selectedNode.data.media,
        }));
      } else {
        setMedia(null);
      }
    }
  }, [selectedNode]);

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log("radio value-->", newValue);

    setValue1(newValue);
    setRichCardButtons((prev) => ({ ...prev, mediaHeight: newValue }));
    updateNodeLabel(selectedNode.id, {
      media: media,
      mediaHeight: newValue,
      label: title,
      name: templateName,
      description: description,
      buttons: button?.actions,
    });
  };

  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: value,
        media,
        mediaHeight: value1,
        description: description,
        buttons: button.actions,
      });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: templateName,
        mediaHeight: value1,
        media: media,
        description: value,
        buttons: button?.actions,
      });
    }
    console.log("description", description);
  };

  const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done" || file.status === "uploading") {
        const mediaURL = URL.createObjectURL(file.originFileObj as Blob);
        setMedia(mediaURL);
        setRichCardButtons((prev) => ({ ...prev, media: mediaURL }));
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            media: mediaURL,
            mediaHeight: value1,
            label: title || selectedNode.data.label, // Ensure title is preserved
            name: templateName || selectedNode.data.name, // Preserve template name
            description: description || selectedNode.data.description, // Ensure description is preserved
            buttons: button.actions,
          });
        }
      } else if (file.status === "error") {
        message.error("Failed to upload media. Please try again.");
      }
    } else {
      setMedia(null);
      setRichCardButtons((prev) => ({ ...prev, media: "" }));
    }
  };

  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess({}, file);
    }, 1000);
  };

  function handleChange2(value: string) {
    setTitle(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: value,
        name: templateName,
        mediaHeight: value1,
        media: media,
        description: description,
        buttons: button?.actions,
      });
    }
  }

  return (
    <>
      <div className="p-2 font-semibold flex sticky top-0 bg-white z-10">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode?.type === "textWithButtonNode"
            ? "Text with Button"
            : "Rich Card"}
        </h2>
      </div>
      <hr />
      <div className="p-2 mt-3">
        <Form layout="vertical">
          <Form.Item
            label="Template Name"
            name={"Template Name"}
            style={{ marginBottom: "10px" }}
          >
            <Input
              variant="filled"
              placeholder="Template Name"
              defaultValue={selectedNode?.data?.name}
              onChange={(e) => {
                handleTemplateNameChange(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Title" style={{ marginBottom: "10px" }}>
            <Input
              variant="filled"
              placeholder="Title"
              defaultValue={selectedNode?.data.label || ""}
              onChange={(e) => handleChange2(e.target.value)}
              key={selectedNode?.id}
              id="message"
            />
          </Form.Item>
          <Form.Item label="Description" style={{ marginBottom: "10px" }}>
            <TextArea
              variant="filled"
              size="small"
              defaultValue={selectedNode?.data?.description || ""} // Use value instead of defaultValue
              placeholder="Description"
              rows={4}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Form.Item>
          <Row>
            <Col md={24}>
              <Form.Item
                label="Media"
                layout="vertical"
                rules={[{ required: true, message: "Please select media" }]}
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
                    padding: media ? "15px 0px" : "50px 0px",
                  }}
                  onClick={() => {
                    setMediaModal(true);
                  }}
                >
                  {media ? (
                    <div
                      style={{
                        position: "relative",
                        alignItems: "center",
                        height: "120px",
                      }}
                    >
                      <img
                        src={media}
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
                          setMedia(null);
                          if (selectedNode) {
                            updateNodeLabel(selectedNode.id, { media: "" });
                          }
                        }}
                        size="small"
                        style={{ position: "absolute", top: 5, right: 5 }}
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
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item
                label="Size"
                rules={[{ required: true, message: "Select media height" }]}
              >
                <Radio.Group
                  style={{ width: "100%" }}
                  onChange={onChange1}
                  value={value1}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div
                      style={{
                        border: "1px solid #D9D9D9",
                        padding: "7px 7px",
                        borderRadius: "8px",
                        textAlign: "left",
                      }}
                    >
                      <Radio value="short">Short: 112 DP</Radio>
                    </div>
                    <div
                      style={{
                        border: "1px solid #D9D9D9",
                        padding: "7px 7px",
                        borderRadius: "8px",
                        textAlign: "left",
                      }}
                    >
                      <Radio value="medium">Medium: 168 DP</Radio>
                    </div>
                    <div
                      style={{
                        border: "1px solid #D9D9D9",
                        padding: "7px 7px",
                        borderRadius: "8px",
                        textAlign: "left",
                      }}
                    >
                      <Radio value="tall">Tall: 264 DP</Radio>
                    </div>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Addbutton
                textareaValue={textareaValue}
                templateName={templateName}
                description={description}
                media={media}
                title={title}
                button={button.actions}
                setButton={setButton}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
