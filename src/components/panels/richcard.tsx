// import React, { useEffect, useState } from "react";
// import useStore from "@/config/store";
// import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Col,
//   Form,
//   Input,
//   message,
//   Radio,
//   Row,
//   Space,
//   Upload,
// } from "antd";
// import { ArrowLeft } from "lucide-react";
// import { Node } from "reactflow";
// import { shallow } from "zustand/shallow";
// import TextArea from "antd/es/input/TextArea";
// import Addbutton from "./Addbutton";

// interface RichCardButton {
//   id: number;
//   type: string;
//   title: string;
//   payload: string;
// }

// interface RichCardButtonsState {
//   orientation: string;
//   title: string;
//   discription: string;
//   media: string;
//   mediaHeight: string;
//   actions: RichCardButton[];
// }
// interface ActionData {
//   id: number;
//   type: string;
//   title: string;
//   payload: string;
//   phoneNumber?: string;
//   latitude?: number;
//   longitude?: number;
//   startDate?: any;
//   endDate?: any;
// }

// interface RichCardProps {
//   isEdit: boolean;
//   data?: any;
// }

// const selector = (state: {
//   selectedNode: Node | null;
//   updateNodeLabel: (nodeId: string, nodeVal: string) => void;
//   setSelectedNode: (node: Node | null) => void;
// }) => ({
//   selectedNode: state.selectedNode,
//   updateNodeLabel: state.updateNodeLabel,
//   setSelectedNode: state.setSelectedNode,
// });

// export const richcard = ({ isEdit, data }: RichCardProps) => {
//   const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
//     selector,
//     shallow
//   );
//   const [mediaModal, setMediaModal] = useState(false);
//   const [value1, setValue1] = useState<string>("medium");
//   const [media, setMedia] = useState<string | null>(
//     isEdit && data?.rcsRichCard?.media ? data.rcsRichCard.media : null
//   );
//   const [richCardButtons, setRichCardButtons] = useState<RichCardButtonsState>({
//     orientation: "horizontal",
//     title: isEdit ? data?.rcsRichCard?.title ?? "" : "",
//     description: isEdit ? data?.rcsRichCard?.description ?? "" : "",
//     media: media || "",
//     mediaHeight: isEdit ? data?.rcsRichCard?.mediaHeight ?? value1 : value1,
//     actions: [
//       {
//         id: 0,
//         type: "quick",
//         title: "",
//         payload: "",
//       },
//     ],
//   });
//   const [textareaValue, setTextareaValue] = useState<string>(
//     typeof selectedNode?.data.label === "string" ? selectedNode.data.label : ""
//   );
//   const [templateName, setTemplateName] = useState<string>("");
//   const [title, setTitle] = useState<string>("richcard ");
//   const [discription, setDiscription] = useState<string>("");
//   const [button, setButton] = useState<{ actions: ActionData[] }>({
//     actions: [
//       {
//         id: 0,
//         type: "quick",
//         title: "",
//         payload: "",
//       },
//     ],
//   });

//   useEffect(() => {
//     if (selectedNode) {
//       setTextareaValue(selectedNode.data.label || "");
//       if (selectedNode.data?.media) {
//         setMedia(selectedNode.data.media);
//         setRichCardButtons((prev) => ({
//           ...prev,
//           media: selectedNode.data.media,
//         }));
//       } else {
//         setMedia(null);
//       }
//     }
//   }, [selectedNode]);

//   useEffect(() => {
//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         media,
//         mediaHeight: value1,
//         label: title || textareaValue,
//         name: templateName,
//         discription: discription,
//         buttons: button.actions,
//       });
//     }
//   }, [selectedNode, media, value1, title, templateName, discription, button]);

//   const handleTemplateNameChange = (value: string) => {
//     setTemplateName(value);
//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         label: title,
//         name: value,
//         media: media,
//         mediaHeight: value1,
//         discription: discription,
//         buttons: button,
//       });
//     }
//   };

//   function handleChange2(value: string) {
//     setTitle(value);
//     if (selectedNode) {
//       updateNodeLabel(
//         (selectedNode.id,
//         {
//           label: value,
//           name: templateName,
//           mediaHeight: value1,
//           media: media,
//           discription: discription,
//           buttons: button?.actions,
//         })
//       );
//     }
//   }

//   const handleDescriptionChange = (value: string) => {
//     setDiscription(value);
//     if (selectedNode) {
//       updateNodeLabel(
//         (selectedNode.id,
//         {
//           label: title,
//           name: templateName,
//           mediaHeight: value1,
//           media: media,
//           discription: value,
//           buttons: button?.actions,
//         })
//       );
//     }
//     console.log("discription1234", discription);
//   };

//   const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     if (fileList.length > 0) {
//       const file = fileList[0];
//       if (file.status === "done" || file.status === "uploading") {
//         const mediaURL = URL.createObjectURL(file.originFileObj as Blob);
//         setMedia(mediaURL); // Update media state
//         setRichCardButtons((prev) => ({ ...prev, media: mediaURL }));

//         if (selectedNode) {
//           updateNodeLabel(selectedNode.id, {
//             media: mediaURL,
//             mediaHeight: value1,
//             label: richCardButtons.title,
//             name: selectedNode.data.name,
//             discription: richCardButtons.description,
//             buttons: richCardButtons.actions,
//           });
//         }
//       } else if (file.status === "error") {
//         message.error("Failed to upload media. Please try again.");
//       }
//     } else {
//       // Keep the media as it is if no new file is uploaded
//       setMedia(null);
//       setRichCardButtons((prev) => ({ ...prev, media: "" }));
//     }
//   };

//   const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     console.log("radio value-->", newValue);

//     setValue1(newValue);
//     setRichCardButtons((prev) => ({ ...prev, mediaHeight: newValue }));
//     updateNodeLabel(
//       (selectedNode.id,
//       {
//         media: media,
//         mediaHeight: newValue,
//         label: title,
//         name: templateName,
//         discription: discription,
//         buttons: button?.actions,
//       })
//     );
//   };

//   const customRequest = ({ file, onSuccess }: any) => {
//     setTimeout(() => {
//       onSuccess({}, file);
//     }, 1000);
//   };

//   return (
//     <>
//       <div className="p-2 font-semibold flex">
//         {" "}
//         <button onClick={() => setSelectedNode(null)}>
//           <ArrowLeft />
//         </button>
//         <h2 className="flex-grow text-center">
//           {selectedNode.type === "textWithButtonNode"
//             ? "Text with Button"
//             : "Rich Card"}
//         </h2>
//       </div>
//       <hr />
//       <div className="p-2 mt-3">
//         <Form layout="vertical">
//           <Form.Item
//             label="Template Name"
//             name={"Template Name"}
//             style={{ marginBottom: "10px" }}
//           >
//             <Input
//               placeholder="Template Name"
//               defaultValue={selectedNode?.data?.name}
//               onChange={(e) => {
//                 handleTemplateNameChange(e.target.value);
//               }}
//             />
//           </Form.Item>
//           <Form.Item label="Title" style={{ marginBottom: "10px" }}>
//             <Input
//               placeholder="Title"
//               defaultValue={selectedNode?.data.label || ""}
//               onChange={(e) => handleChange2(e.target.value)}
//               key={selectedNode?.id}
//               id="message"
//             />
//           </Form.Item>
//           <Form.Item label="Description" style={{ marginBottom: "10px" }}>
//             <TextArea
//               defaultValue={selectedNode?.data?.discription || ""} // Use value instead of defaultValue
//               placeholder="Description"
//               rows={4}
//               onChange={(e) => handleDescriptionChange(e.target.value)}
//             />
//           </Form.Item>
//           <Row>
//             <Col md={24}>
//               <Form.Item
//                 label="Media"
//                 rules={[{ required: true, message: "Please select media" }]}
//               >
//                 <div
//                   style={{
//                     backgroundColor: "#eee",
//                     borderRadius: "5px",
//                     border: "1px dashed",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginTop: 10,
//                     cursor: "pointer",
//                     padding: richCardButtons?.media ? "50px 0px" : "50px 0px",
//                   }}
//                   onClick={() => {
//                     setMediaModal(true);
//                   }}
//                 >
//                   {richCardButtons?.media ? (
//                     <div style={{ position: "relative" }}>
//                       <img
//                         src={richCardButtons?.media}
//                         alt="avatar"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                       <Button
//                         icon={<CloseOutlined />}
//                         onClick={() => {
//                           setMedia(null);
//                           setRichCardButtons((prev) => ({
//                             ...prev,
//                             media: "",
//                           }));
//                         }}
//                         size="small"
//                         style={{ position: "absolute", top: 5, right: 5 }}
//                       />
//                     </div>
//                   ) : (
//                     <Upload
//                       name="media"
//                       customRequest={customRequest}
//                       onChange={handleMediaChange}
//                       showUploadList={false}
//                       accept="image/*"
//                       multiple={false}
//                     >
//                       <Button icon={<UploadOutlined />}>Upload Image</Button>
//                     </Upload>
//                   )}
//                 </div>
//               </Form.Item>
//             </Col>
//             <Col md={24}>
//               <Form.Item
//                 label="Size"
//                 rules={[{ required: true, message: "Select media height" }]}
//               >
//                 <Radio.Group
//                   style={{ width: "100%" }}
//                   onChange={onChange1}
//                   value={value1}
//                 >
//                   <Space direction="vertical" style={{ width: "100%" }}>
//                     <div
//                       style={{
//                         border: "1px solid #D9D9D9",
//                         padding: "10px 15px",
//                         borderRadius: "8px",
//                         textAlign: "left",
//                       }}
//                     >
//                       <Radio value="short">Short: 112 DP</Radio>
//                     </div>
//                     <div
//                       style={{
//                         border: "1px solid #D9D9D9",
//                         padding: "10px 15px",
//                         borderRadius: "8px",
//                         textAlign: "left",
//                       }}
//                     >
//                       <Radio value="medium">Medium: 168 DP</Radio>
//                     </div>
//                     <div
//                       style={{
//                         border: "1px solid #D9D9D9",
//                         padding: "10px 15px",
//                         borderRadius: "8px",
//                         textAlign: "left",
//                       }}
//                     >
//                       <Radio value="tall">Tall: 264 DP</Radio>
//                     </div>
//                   </Space>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Addbutton
//             textareaValue={textareaValue}
//             templateName={templateName}
//             discription={discription}
//             media={media}
//             title={title}
//             button={button.actions}
//             setButton={setButton}
//           />
//         </Form>
//       </div>
//     </>
//   );
// };

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
  updateNodeLabel: (nodeId: string, nodeVal: any) => void;
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
  const [templateName, setTemplateName] = useState<string>("");
  const [title, setTitle] = useState<string>("richcard");
  // const [description, setDescription] = useState<string>("");
  const [discription, setDiscription] = useState<string>("");
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

  // Effect to sync the selectedNode data to component state
  useEffect(() => {
    if (selectedNode) {
      setTextareaValue(selectedNode.data.label || "");
      setTitle(selectedNode.data.title || "");
      setDiscription(selectedNode.data.description || "");
      setTemplateName(selectedNode.data.name || "");
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

  // Effect to update the node label whenever state changes
  useEffect(() => {
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        media,
        mediaHeight: value1,
        label: title || textareaValue,
        name: templateName,
        description: discription,
        buttons: button.actions,
      });
    }
  }, [selectedNode, media, value1, title, templateName, discription, button]);

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log("radio value-->", newValue);

    setValue1(newValue);
    setRichCardButtons((prev) => ({ ...prev, mediaHeight: newValue }));
    updateNodeLabel(
      (selectedNode.id,
      {
        media: media,
        mediaHeight: newValue,
        label: title,
        name: templateName,
        description: discription,
        buttons: button?.actions,
      })
    );
  };

  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: value,
        media,
        mediaHeight: value1,
        description: discription,
        buttons: button.actions,
      });
    }
  };

  // const handleDescriptionChange = (value: string) => {
  //   setDescription(value);
  //   if (selectedNode) {
  //     updateNodeLabel(selectedNode.id, {
  //       label: title,
  //       name: templateName,
  //       mediaHeight: value1,
  //       media,
  //       description: value,
  //       buttons: button.actions,
  //     });
  //   }
  // };

  const handleDescriptionChange = (value: string) => {
    setDiscription(value);
    if (selectedNode) {
      updateNodeLabel(
        (selectedNode.id,
        {
          label: title,
          name: templateName,
          mediaHeight: value1,
          media: media,
          description: value,
          buttons: button?.actions,
        })
      );
    }
    console.log("discription1234", discription);
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
            label: richCardButtons.title,
            name: selectedNode.data.name,
            description: richCardButtons.description,
            buttons: richCardButtons.actions,
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

  const onChangeMediaHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue1(newValue);
    setRichCardButtons((prev) => ({ ...prev, mediaHeight: newValue }));
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        media,
        mediaHeight: newValue,
        label: title,
        name: templateName,
        description,
        buttons: button.actions,
      });
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
      updateNodeLabel(
        (selectedNode.id,
        {
          label: value,
          name: templateName,
          mediaHeight: value1,
          media: media,
          description: discription,
          buttons: button?.actions,
        })
      );
    }
  }

  return (
    <>
      <div className="p-2 font-semibold flex">
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
              placeholder="Template Name"
              defaultValue={selectedNode?.data?.name}
              onChange={(e) => {
                handleTemplateNameChange(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Title" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="Title"
              defaultValue={selectedNode?.data.label || ""}
              onChange={(e) => handleChange2(e.target.value)}
              key={selectedNode?.id}
              id="message"
            />
          </Form.Item>
          <Form.Item label="Description" style={{ marginBottom: "10px" }}>
            <TextArea
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
                    padding: media ? "50px 0px" : "50px 0px",
                  }}
                  onClick={() => {
                    setMediaModal(true);
                  }}
                >
                  {media ? (
                    <div style={{ position: "relative" }}>
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
                        padding: "10px 15px",
                        borderRadius: "8px",
                        textAlign: "left",
                      }}
                    >
                      <Radio value="short">Short: 112 DP</Radio>
                    </div>
                    <div
                      style={{
                        border: "1px solid #D9D9D9",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        textAlign: "left",
                      }}
                    >
                      <Radio value="medium">Medium: 168 DP</Radio>
                    </div>
                    <div
                      style={{
                        border: "1px solid #D9D9D9",
                        padding: "10px 15px",
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
                discription={discription}
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
