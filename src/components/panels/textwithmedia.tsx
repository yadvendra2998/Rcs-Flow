// import React, { useEffect, useState } from "react";
// import useStore from "@/config/store";
// import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
// import { Button, Col, Form, message, Row, Upload, UploadFile } from "antd";
// import { Node } from "reactflow";
// import { shallow } from "zustand/shallow";
// import { ArrowLeft } from "lucide-react";

// interface RichCardButton {
//   id: number;
//   type: string;
//   title: string;
//   payload: string;
// }

// interface RichCardButtonsState {
//   orientation: string;
//   title: string;
//   description: string;
//   media: string;
//   mediaHeight: string;
//   actions: RichCardButton[];
// }

// interface RichCardProps {
//   isEdit: boolean;
//   data?: any; // Adjust type based on your actual data structure
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

// export const TextWithMedia = ({ isEdit, data }: RichCardProps) => {
//   const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
//     selector,
//     shallow
//   );
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [value1] = useState<string>(
//     isEdit ? data?.rcsRichCard?.mediaHeight ?? "short" : "short" // Set a default fallback if needed
//   );
//   const [mediaModal, setMediaModal] = useState(false);
//   const [media, setMedia] = useState(null);
//   const [richCardButtons, setRichCardButtons] = useState<RichCardButtonsState>({
//     orientation: "horizontal", // Default value, adjust based on your logic
//     title: isEdit ? data?.rcsRichCard?.title ?? "" : "",
//     description: isEdit ? data?.rcsRichCard?.description ?? "" : "",
//     media: isEdit ? data?.rcsRichCard?.media ?? "" : "",
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



//   useEffect(() => {
//     if (selectedNode) {
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




//   const customRequest = ({ file, onSuccess }: any) => {
//     setTimeout(() => {
//       onSuccess({}, file);
//     }, 1000);
//   };

//   const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     if (fileList.length > 0) {
//       const file = fileList[0];
//       if (file.status === "done" || file.status === "uploading") {
//         const mediaURL = URL.createObjectURL(file.originFileObj as Blob);
//         setMedia(mediaURL);
//         if (selectedNode) {
//           // useStore.getState().updateNodeMedia(selectedNode.id, [file]);
//           updateNodeLabel(selectedNode.id, {
//             media: mediaURL,
//             mediaHeight: value1,
//             label: "",
//             buttonTitles: "",
//           });
//         }
//         setRichCardButtons((prev) => ({ ...prev, media: mediaURL }));
//       } else if (file.status === "error") {
//         message.error("Failed to upload media. Please try again.");
//       }
//     } else {
//       setRichCardButtons((prev) => ({ ...prev, media: "" }));
//     }
//   };

//   return (
//     <>
//     <div className="p-2 font-semibold flex">
//         <button onClick={() => setSelectedNode(null)}>
//           <ArrowLeft />
//         </button>
//         <h2 className="flex-grow text-center">
//           {selectedNode.type === "textWithButtonNode"
//             ? "Text with Button"
//             : "Media"}
//         </h2>
//       </div>
//       <div className="p-2 mt-3">
//         <Row>
//           <Col md={24}>
//             <Form.Item
//               name={"media"}
//               label={"Media"}
//               layout="vertical"
//               rules={[{ required: true, message: "Please select media" }]}
//               // initialValue={richCardButtons?.media}
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   backgroundColor: "#eee",
//                   borderRadius: "5px",
//                   border: "1px dashed",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   padding: media ? " 0px" : "50px 0px",
//                 }}
//                 onClick={() => setMediaModal(true)}
//               >
//                 {media ? (
//                   <div
//                     style={{
//                       position: "relative",
//                       alignItems: "center",
//                       height: "120px",
//                     }}
//                   >
//                     <img
//                       src={media}
//                       alt="media"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <Button
//                       icon={<CloseOutlined />}
//                       onClick={() =>
//                         setRichCardButtons((prev) => ({ ...prev, media: "" }))
//                       }
//                       size="small"
//                       style={{
//                         position: "absolute",
//                         top: 5,
//                         right: 5,
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <Upload
//                     name="media"
//                     customRequest={customRequest}
//                     onChange={handleMediaChange}
//                     showUploadList={false}
//                     accept="image/*"
//                     multiple={false}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Button icon={<UploadOutlined />}>Upload Image</Button>
//                   </Upload>
//                 )}
//               </div>
//             </Form.Item>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };



import React, { useEffect, useState } from "react";
import useStore from "@/config/store";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, message, Row, Upload, UploadFile } from "antd";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import { ArrowLeft } from "lucide-react";

interface RichCardProps {
  isEdit: boolean;
  data?: any; // Adjust type based on your actual data structure
}

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const TextWithMedia = ({ isEdit, data }: RichCardProps) => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );
  const [media, setMedia] = useState<string | null>(null);
  const [mediaModal, setMediaModal] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      if (selectedNode.data?.media) {
        setMedia(selectedNode.data.media);
      } else {
        setMedia(null);
      }
    }
  }, [selectedNode]);

  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess({}, file);
    }, 1000);
  };

  const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done" || file.status === "uploading") {
        const mediaURL = URL.createObjectURL(file.originFileObj as Blob);
        setMedia(mediaURL);
        if (selectedNode) {
          updateNodeLabel(selectedNode.id, {
            media: mediaURL,
            label: "", // Adjust the label if needed
          });
        }
      } else if (file.status === "error") {
        message.error("Failed to upload media. Please try again.");
      }
    } else {
      setMedia(null);
      if (selectedNode) {
        updateNodeLabel(selectedNode.id, { media: "" });
      }
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, { media: "" });
    }
  };

  return (
    <>
      <div className="p-2 font-semibold flex">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode?.type === "textWithButtonNode" ? "Text with Button" : "Media"}
        </h2>
      </div>
      <div className="p-2 mt-3">
        <Row>
          <Col md={24}>
            <Form.Item
              name={"media"}
              label={"Media"}
              layout="vertical"
              rules={[{ required: true, message: "Please select media" }]}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#eee",
                  borderRadius: "5px",
                  border: "1px dashed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: media ? "0px" : "50px 0px",
                }}
                onClick={() => setMediaModal(true)}
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
                      alt="media"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      icon={<CloseOutlined />}
                      onClick={handleRemoveMedia}
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
                      display: "flex",
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
        </Row>
      </div>
    </>
  );
};
