// import React, { useEffect, useState } from "react";
// import useStore from "@/config/store";
// import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Col,
//   Flex,
//   Form,
//   Input,
//   message,
//   Radio,
//   Row,
//   Space,
//   Typography,
//   Upload,
// } from "antd";
// import { ArrowLeft } from "lucide-react";
// import { Node } from "reactflow";
// import { shallow } from "zustand/shallow";
// import CustomSegment from "./customSegment";
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
//   description: string;
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

// const selector = (state: {
//   selectedNode: Node | null;
//   updateNodeLabel: (
//     nodeId: string,
//     nodeVal: { richCardCarousels: RichCardButtonsState[] }
//   ) => void;
//   setSelectedNode: (node: Node | null) => void;
// }) => ({
//   selectedNode: state.selectedNode,
//   updateNodeLabel: state.updateNodeLabel,
//   setSelectedNode: state.setSelectedNode,
// });

// export const richcardcarousel = ({ isEdit, data }: RichCardProps) => {
//   const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
//     selector,
//     shallow
//   );
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [value1, setValue1] = useState("");
//   const [previewImage, setPreviewImage] = useState([]);

//   const [options, setOptions] = useState(["Card 1", "Card 2"]);
//   const [cardIndex, setCardIndex] = useState(0);
//   const [value, setValue] = useState(data?.richCardCarousel?.width || "small");
//   const [mediaModal, setMediaModal] = useState(false);

//   const [media, setMedia] = useState(null);
//   const [templateName, setTemplateName] = useState<string>("");
//   const [discription, setDiscription] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [button, setButton] = useState<{ actions: ActionData[] }>({
//     actions: [
//       {
//         id: 0,
//         type: "quick", // Quick Reply as default
//         title: "",
//         payload: "",
//       },
//     ],
//   });

//   const handleSetRichCardCarousels = (newCarousels: RichCardCarouselType[]) => {
//     setRichCardCarousels(newCarousels);
//   };

//   const [data2, setData2] = useState<{ actions: ActionData[] }>({
//     actions: [
//       {
//         id: 0,
//         type: "quick",
//         title: "",
//         payload: "",
//       },
//     ],
//   });
//   const [richCardCarousels, setRichCardCarousels] = useState<ActionData[]>([
//     {
//       width: value,
//       title: selectedNode?.data?.label,
//       description: "",
//       media: media || "",
//       mediaHeight: value1,
//       actions: [],
//       button: button?.actions,
//     },
//   ]);

//   const handleCardChange = (newValue: React.SetStateAction<number>) => {
//     setCardIndex(newValue);
//   };

//   const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setValue1(newValue);
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         mediaHeight: newValue,
//       };
//       if (selectedNode) {
//         updateNodeLabel(selectedNode.id, {
//           richCardCarousels: updated,
//         });
//       }

//       return updated;
//     });
//   };

//   useEffect(() => {
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         mediaHeight: value1,
//       };
//       return updated;
//     });
//   }, [value1, cardIndex]);

//   const handleAddCardsTemplate = () => {
//     if (options.length < 10) {
//       const newCard = {
//         width: value,
//         title: "",
//         description: "",
//         media: media,
//         mediaHeight: value1,
//         actions: [
//           {
//             id: 0,
//             type: "quick",
//             title: selectedNode?.data?.label,
//             payload: "",
//           },
//         ],
//       };
//       setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);
//       setRichCardCarousels((prev) => [...prev, newCard]);
//     } else {
//       message.warning("Cannot add more than 10 cards");
//     }
//   };
//   useEffect(() => {
//     if (selectedNode) {
//       setTitle(selectedNode.data.label || "");

//       // Check if richCardCarousels is defined and has at least one item
//       if (selectedNode.data?.richCardCarousels && selectedNode.data.richCardCarousels.length > cardIndex) {
//         const selectedCarousel = selectedNode.data.richCardCarousels[cardIndex];
//         setMedia(selectedCarousel.media || null); // Set media for the current card index
//         setRichCardCarousels((prev) => {
//           const updated = [...prev];
//           updated[cardIndex] = { ...updated[cardIndex], media: selectedCarousel.media || null };
//           return updated; // Update the specific card's media
//         });
//       } else {
//         setMedia(null);
//         setRichCardCarousels((prev) => {
//           const updated = [...prev];
//           updated[cardIndex] = { ...updated[cardIndex], media: null }; // Clear media if no data
//           return updated;
//         });
//       }
//     }
//   }, [selectedNode, cardIndex]); // Include cardIndex in the dependency array

//   useEffect(() => {
//     console.log("setRichCardCarousels:", setRichCardCarousels);
//   }, [setRichCardCarousels]);

//   const customRequest = ({ file, onSuccess }: any) => {
//     setTimeout(() => {
//       onSuccess({}, file);
//     }, 1000);
//   };

//   const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     if (fileList.length > 0) {
//       const file = fileList[0];
//       if (file.status === "done" || file.status === "uploading") {
//         const originFileObj = file.originFileObj as Blob;

//         if (originFileObj) {
//           const mediaURL = URL.createObjectURL(originFileObj);
//           setMedia(mediaURL)
//           // Update the media URL in the selected card
//           setRichCardCarousels((prev) => {
//             const updated = [...prev];
//             updated[cardIndex] = {
//               ...updated[cardIndex],
//               media: mediaURL,
//             };

//             // Persist the change to the selected node
//             if (selectedNode) {
//               updateNodeLabel(selectedNode.id, {
//                 richCardCarousels: updated, // Update the richCardCarousels with the media
//                 name: templateName,
//               });
//             }
//             return updated;
//           });
//         }
//       }
//     } else {
//       // Handle case where no media is uploaded or user removes it
//       setRichCardCarousels((prev) => {
//         const updated = [...prev];
//         updated[cardIndex].media = ""; // Reset the media

//         if (selectedNode) {
//           updateNodeLabel(selectedNode.id, {
//             richCardCarousels: updated,
//             name: templateName,
//           });
//         }

//         return updated;
//       });
//     }
//   };

//   const handleTemplateNameChange = (value: string) => {
//     setTemplateName(value);

//     if (selectedNode) {
//       // Update both the template name and the richCardCarousels in the node
//       updateNodeLabel(selectedNode.id, {
//         name: value,
//         richCardCarousels: richCardCarousels,
//       });
//     }
//   };

//   const handleDescriptionChange = (value: string) => {
//     setDiscription(value);
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         description: value,
//       };
//       return updated;
//     });
//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         name: templateName,
//         richCardCarousels,
//       });
//     }
//   };

//   const handleChange2 = (value: string) => {
//     setTitle(value);

//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         title: value,
//       };
//       return updated;
//     });

//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         name: templateName,
//         richCardCarousels: richCardCarousels,
//       });
//     }
//   };

//   console.log("richCardCarousels", richCardCarousels);
//   console.log("cardIndex", richCardCarousels[cardIndex]);

//   return (
//     <>
//       <div className="p-2 font-semibold flex">
//         <button onClick={() => setSelectedNode(null)}>
//           <ArrowLeft />
//         </button>
//         <h2 className="flex-grow text-center">
//           {selectedNode.type === "textWithButtonNode"
//             ? "Text with Button"
//             : "Richcard Carousel"}
//         </h2>
//       </div>
//       <hr />
//       <div className="p-2 mt-3">
//         <Form layout="vertical">
//           <Form.Item
//             name={`templatename${cardIndex}`}
//             label="Template Name"
//             style={{ marginBottom: "10px" }}
//           >
//             <Input
//               placeholder="Template Name"
//               defaultValue={selectedNode?.data.name || ""}
//               onChange={(e) => {
//                 handleTemplateNameChange(e.target.value);
//               }}
//             />
//           </Form.Item>
//           <Form.Item
//             name={`title${cardIndex}`}
//             label="Title"
//             style={{ marginBottom: "10px" }}
//           >
//             <Input
//               placeholder="Title"
//               defaultValue={selectedNode?.data.label || ""}
//               onChange={(e) => handleChange2(e.target.value)}
//               key={selectedNode?.id}
//               id="message"
//             />
//           </Form.Item>
//           <Form.Item
//             name={`description${cardIndex}`}
//             label="Description"
//             style={{ marginBottom: "10px" }}
//           >
//             <TextArea
//               placeholder="Description"
//               rows={4}
//               onChange={(e) => handleDescriptionChange(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//         <Row>
//           <Col md={24}>
//             <Flex
//               align="center"
//               justify="space-between"
//               style={{ marginTop: 10, marginBottom: 10 }}
//             >
//               <Typography
//                 style={{
//                   alignSelf: "center",
//                   fontSize: 16,
//                   fontWeight: "600",
//                 }}
//               >
//                 Cards
//               </Typography>
//               <Button
//                 onClick={handleAddCardsTemplate}
//                 style={{
//                   backgroundColor: "#0F3B48",
//                 }}
//                 type="primary"
//               >
//                 <PlusOutlined /> Add Cards
//               </Button>
//             </Flex>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={24}>
//             {/* <Flex
//               // justify="space-between"
//               align="center"
//               style={{ marginBottom: 10 }}
//             > */}
//             <Col>
//               <CustomSegment
//                 onChange={handleCardChange}
//                 options={options}
//                 value={cardIndex}
//                 setOptions={setOptions}
//                 setRichCardCarousels={setRichCardCarousels}
//                 setPreviewImage={setPreviewImage}
//                 previewImage={previewImage}
//                 richCardCarousels={richCardCarousels}
//               />
//             </Col>
//             {/* <Typography style={{ textAlign: "end" }}>
//                 {options.length}/10
//               </Typography> */}
//             {/* </Flex> */}
//           </Col>
//         </Row>
//         <Row>
//           <Col md={24}>
//             <Form.Item
//               layout="vertical"
//               name={`media${cardIndex}`}
//               label={"Media"}
//               rules={[{ required: true, message: "Please select media" }]}
//               initialValue={richCardCarousels[cardIndex]?.media} // Set initial value to the media of the current card
//             >
//               <div
//                 style={{
//                   backgroundColor: "#eee",
//                   borderRadius: "5px",
//                   border: "1px dashed",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginTop: 10,
//                   cursor: "pointer",
//                   padding: richCardCarousels[cardIndex]?.media
//                     ? "15px 0px"
//                     : "50px 0px",
//                 }}
//                 onClick={() => {
//                   setMediaModal(true);
//                 }}>
//                 {richCardCarousels[cardIndex]?.media ? (
//                   <div
//                     style={{
//                       position: "relative",
//                       alignItems: "center",
//                       height: "120px",
//                     }}
//                   >
//                     <img
//                       src={richCardCarousels[cardIndex]?.media}
//                       alt="avatar"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <Button
//                       icon={<CloseOutlined />}
//                       onClick={() => {
//                         const updatedCards = [...richCardCarousels];
//                         updatedCards[cardIndex].media = "";
//                         setRichCardCarousels(updatedCards);
//                       }}
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
//                       display: richCardCarousels[cardIndex]?.media
//                         ? "none"
//                         : "flex",
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
//           <Col md={24}>
//             <Form.Item
//               // name={`size${cardIndex}`}
//               layout="vertical"
//               label={"Size"}
//               rules={[{ required: true, message: "Please select size" }]}
//               initialValue={
//                 isEdit
//                   ? data?.richCardCarousel?.cards[cardIndex]?.mediaHeight
//                   : value1
//               }
//             >
//               <Radio.Group
//                 style={{ marginTop: "10px", width: "100%", textAlign: "left" }}
//                 onChange={onChange1}
//                 value={value1}
//                 defaultValue={
//                   isEdit
//                     ? data?.richCardCarousel?.cards[cardIndex]?.mediaHeight
//                     : value1
//                 }
//               >
//                 <Space direction="vertical" style={{ width: "100%" }}>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"short"}>Short: 112 DP</Radio>
//                   </div>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"medium"}>Medium: 168 DP</Radio>
//                   </div>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"tall"}>Tall: 264 DP</Radio>
//                   </div>
//                 </Space>
//               </Radio.Group>
//             </Form.Item>
//           </Col>
//           {/* <Addbutton
//             title={title}
//             templateName={templateName}
//             media={media}
//             discription={discription}
//             richCardCarousels={richCardCarousels}
//             cardIndex={cardIndex}
//             button={button.actions}
//             setButton={setButton}
//             setRichCardCarousels={setRichCardCarousels}
//           /> */}

//           <Addbutton
//             templateName={templateName}
//             discription={discription}
//             title={title}
//             button={button.actions}
//             setButton={setButton}
//             richCardCarousels={richCardCarousels}
//             cardIndex={cardIndex}
//             setRichCardCarousels={setRichCardCarousels}
//             media={media}
//           />
//         </Row>
//       </div>
//     </>
//   );
// };

// import React, { useEffect, useState } from "react";
// import useStore from "@/config/store";
// import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Col,
//   Flex,
//   Form,
//   Input,
//   message,
//   Radio,
//   Row,
//   Space,
//   Typography,
//   Upload,
// } from "antd";
// import { ArrowLeft } from "lucide-react";
// import { Node } from "reactflow";
// import { shallow } from "zustand/shallow";
// import CustomSegment from "./customSegment";
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
//   description: string;
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

// const selector = (state: {
//   selectedNode: Node | null;
//   updateNodeLabel: (
//     nodeId: string,
//     nodeVal: { richCardCarousels: RichCardButtonsState[] }
//   ) => void;
//   setSelectedNode: (node: Node | null) => void;
// }) => ({
//   selectedNode: state.selectedNode,
//   updateNodeLabel: state.updateNodeLabel,
//   setSelectedNode: state.setSelectedNode,
// });

// export const richcardcarousel = ({ isEdit, data }: RichCardProps) => {
//   const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
//     selector,
//     shallow
//   );

//   console.log("selectedNode-->", selectedNode);

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [value1, setValue1] = useState("short");
//   const [previewImage, setPreviewImage] = useState([]);

//   const [options, setOptions] = useState(["Card 1", "Card 2"]);
//   const [cardIndex, setCardIndex] = useState(0);
//   // const [value, setValue] = useState(data?.richCardCarousel?.width || "small");
//   const [mediaModal, setMediaModal] = useState(false);

//   const [media, setMedia] = useState(null);
//   const [templateName, setTemplateName] = useState<string>("");
//   const [discription, setDiscription] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
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

//   const [richCardCarousels, setRichCardCarousels] = useState<ActionData[]>([
//     {
//       // width: value,
//       title: selectedNode?.data?.label,
//       description: "",
//       media: media || "",
//       mediaHeight: value1,
//       actions: [],
//       button: button?.actions,
//     },
//     {
//       // width: value,
//       title: selectedNode?.data?.label,
//       description: "",
//       media: media || "",
//       mediaHeight: value1,
//       actions: [],
//       button: button?.actions,
//     },
//   ]);

//   const handleCardChange = (newValue: React.SetStateAction<number>) => {
//     setCardIndex(newValue);
//   };

//   const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setValue1(newValue);
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         mediaHeight: newValue,
//       };
//       if (selectedNode) {
//         updateNodeLabel(selectedNode.id, {
//           richCardCarousels: updated,
//         });
//       }

//       return updated;
//     });
//   };

//   useEffect(() => {
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         mediaHeight: value1,
//       };
//       return updated;
//     });
//   }, [value1, cardIndex]);

//   const handleAddCardsTemplate = () => {
//     if (options.length < 10) {
//       const newCard = {
//         // width: value,
//         title: "123",
//         description: "",
//         media: media,
//         mediaHeight: value1,
//         actions: [
//           {
//             id: 0,
//             type: "quick",
//             title: selectedNode?.data?.label,
//             payload: "",
//           },
//         ],
//       };
//       setOptions((prev) => [...prev, Card ${prev.length + 1}]);
//       setRichCardCarousels((prev) => [...prev, newCard]);
//     } else {
//       message.warning("Cannot add more than 10 cards");
//     }
//   };

//   useEffect(() => {
//     if (selectedNode) {
//       setTitle(selectedNode?.data?.name);
//       if (
//         selectedNode.data?.richCardCarousels &&
//         selectedNode.data.richCardCarousels.length > cardIndex
//       ) {
//         const selectedCarousel = selectedNode.data.richCardCarousels[cardIndex];
//         setMedia(selectedCarousel.media || null);
//         setRichCardCarousels((prev) => {
//           const updated = [...prev];
//           updated[cardIndex] = {
//             ...updated[cardIndex],
//             media: selectedCarousel.media || null,
//           };
//           return updated;
//         });
//       }
//     }
//   }, [selectedNode, cardIndex, value1]);

//   useEffect(() => {
//     console.log("value1:", value1);
//   }, [value1]);

//   useEffect(() => {
//     console.log("setRichCardCarousels:", setRichCardCarousels);
//   }, [setRichCardCarousels]);

//   const customRequest = ({ file, onSuccess }: any) => {
//     setTimeout(() => {
//       onSuccess({}, file);
//     }, 1000);
//   };

//   const handleMediaChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     if (fileList.length > 0) {
//       const file = fileList[0];
//       if (file.status === "done" || file.status === "uploading") {
//         const originFileObj = file.originFileObj as Blob;

//         if (originFileObj) {
//           const mediaURL = URL.createObjectURL(originFileObj);
//           setMedia(mediaURL);
//           setRichCardCarousels((prev) => {
//             const updated = [...prev];
//             updated[cardIndex] = {
//               ...updated[cardIndex],
//               media: mediaURL,
//             };
//             if (selectedNode) {
//               updateNodeLabel(selectedNode.id, {
//                 richCardCarousels: updated,
//                 name: templateName,
//               });
//             }
//             return updated;
//           });
//         }
//       }
//     } else {
//       setRichCardCarousels((prev) => {
//         const updated = [...prev];
//         updated[cardIndex].media = "";
//         if (selectedNode) {
//           updateNodeLabel(selectedNode.id, {
//             richCardCarousels: updated,
//             name: templateName,
//           });
//         }
//         return updated;
//       });
//     }
//   };

//   const handleTemplateNameChange = (value: string) => {
//     setTemplateName(value);
//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         name: value,
//         richCardCarousels: richCardCarousels,
//       });
//     }
//   };

//   const handleDescriptionChange = (value: string) => {
//     setDiscription(value);
//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         description: value,
//       };
//       return updated;
//     });
//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         name: templateName,
//         richCardCarousels,
//       });
//     }
//   };

//   const handleChange2 = (value: string) => {
//     setTitle(value);

//     setRichCardCarousels((prev) => {
//       const updated = [...prev];
//       updated[cardIndex] = {
//         ...updated[cardIndex],
//         title: value,
//       };
//       return updated;
//     });

//     if (selectedNode) {
//       updateNodeLabel(selectedNode.id, {
//         name: templateName,
//         richCardCarousels: richCardCarousels,
//       });
//     }
//   };

//   console.log("richCardCarousels", richCardCarousels);
//   console.log("cardIndex", richCardCarousels[cardIndex]);

//   return (
//     <>
//       <div className="p-2 font-semibold flex">
//         <button onClick={() => setSelectedNode(null)}>
//           <ArrowLeft />
//         </button>
//         <h2 className="flex-grow text-center">
//           {selectedNode.type === "textWithButtonNode"
//             ? "Text with Button"
//             : "Richcard Carousel"}
//         </h2>
//       </div>
//       <hr />
//       <div className="p-2 mt-3">
//         <Form layout="vertical">
//           <Form.Item
//             name={templatename${cardIndex}}
//             label="Template Name"
//             style={{ marginBottom: "10px" }}
//           >
//             <Input
//               placeholder="Template Name"
//               // value={selectedNode?.data?.name}

//               defaultValue={selectedNode?.data?.name || ""}
//               onChange={(e) => {
//                 handleTemplateNameChange(e.target.value);
//               }}
//             />
//           </Form.Item>
//         </Form>
//         <Row>
//           <Col md={24}>
//             <Flex
//               align="center"
//               justify="space-between"
//               style={{ marginTop: 10, marginBottom: 10 }}
//             >
//               <Typography
//                 style={{
//                   alignSelf: "center",
//                   fontSize: 16,
//                   fontWeight: "600",
//                 }}
//               >
//                 Cards
//               </Typography>
//               <Button
//                 onClick={handleAddCardsTemplate}
//                 style={{
//                   backgroundColor: "#0F3B48",
//                 }}
//                 type="primary"
//               >
//                 <PlusOutlined /> Add Cards
//               </Button>
//             </Flex>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={24}>
//             <Col>
//               <CustomSegment
//                 onChange={handleCardChange}
//                 options={options}
//                 value={cardIndex}
//                 setOptions={setOptions}
//                 setRichCardCarousels={setRichCardCarousels}
//                 setPreviewImage={setPreviewImage}
//                 previewImage={previewImage}
//                 richCardCarousels={richCardCarousels}
//               />
//             </Col>
//             {/* <Typography style={{ textAlign: "end" }}>
//                 {options.length}/10
//               </Typography> */}
//             {/* </Flex> */}
//           </Col>
//         </Row>
//         <br />
//         <Row>
//           <Col md={24}>
//             <Form
//               layout="vertical"
//               initialValues={{
//                 title:
//                   selectedNode?.data?.richCardCarousels?.[cardIndex]?.title ||
//                   "",
//                 description:
//                   selectedNode?.data?.richCardCarousels?.[cardIndex]
//                     ?.description || "",
//               }}
//             >
//               <Form.Item
//                 name={title${cardIndex}}
//                 label="Title"
//                 style={{ marginBottom: "10px" }}>
//                 <Input
//                   placeholder="Title"
//                   defaultValue={
//                     selectedNode?.data?.richCardCarousels?.[cardIndex]?.title ||
//                     ""
//                   }
//                   onChange={(e) => handleChange2(e.target.value)}
//                   key={selectedNode?.id}
//                   id="message"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name={description${cardIndex}}
//                 label="Description"
//                 style={{ marginBottom: "10px" }}
//               >
//                 <TextArea
//                   placeholder="Description"
//                   defaultValue={
//                     selectedNode?.data?.richCardCarousels?.[cardIndex]
//                       ?.description || ""
//                   }
//                   rows={4}
//                   onChange={(e) => handleDescriptionChange(e.target.value)}
//                 />
//               </Form.Item>
//             </Form>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={24}>
//             <Form.Item
//               layout="vertical"
//               name={media${cardIndex}}
//               label={"Media"}
//               rules={[{ required: true, message: "Please select media" }]}
//               initialValue={
//                 selectedNode?.data?.richCardCarousels?.[cardIndex]?.media
//               }
//             >
//               <div
//                 style={{
//                   backgroundColor: "#eee",
//                   borderRadius: "5px",
//                   border: "1px dashed",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginTop: 10,
//                   cursor: "pointer",
//                   padding: richCardCarousels[cardIndex]?.media
//                     ? "15px 0px"
//                     : "50px 0px",
//                 }}
//                 // onClick={() => {
//                 //   setMediaModal(true);
//                 // }}
//               >
//                 {richCardCarousels[cardIndex]?.media ? (
//                   <div
//                     style={{
//                       position: "relative",
//                       alignItems: "center",
//                       height: "120px",
//                     }}
//                   >
//                     <img
//                       src={
//                         selectedNode?.data?.richCardCarousels?.[cardIndex]
//                           ?.media || richCardCarousels[cardIndex]?.media
//                       }
//                       alt="avatar"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <Button
//                       icon={<CloseOutlined />}
//                       onClick={() => {
//                         const updatedCards = [...richCardCarousels];
//                         updatedCards[cardIndex].media = "";
//                         setRichCardCarousels(updatedCards);
//                       }}
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
//                       display: richCardCarousels[cardIndex]?.media
//                         ? "none"
//                         : "flex",
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
//           <Col md={24}>
//             <Form.Item
//               layout="vertical"
//               label={"Size"}
//               rules={[{ required: true, message: "Please select size" }]}
//               initialValue={
//                 selectedNode?.data?.richCardCarousels?.[cardIndex]?.mediaHeight
//               }
//             >
//               <Radio.Group
//                 style={{ marginTop: "10px", width: "100%", textAlign: "left" }}
//                 onChange={(e) => onChange1(e)}
//                 // value={
//                 //   selectedNode?.data?.richCardCarousels?.[cardIndex]
//                 //     ?.mediaHeight
//                 //     || " "

//                 // }
//               >
//                 <Space direction="vertical" style={{ width: "100%" }}>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"short"}>Short: 112 DP</Radio>
//                   </div>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"medium"}>Medium: 168 DP</Radio>
//                   </div>
//                   <div
//                     style={{
//                       border: "1px solid #D9D9D9",
//                       padding: "10px 15px",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <Radio value={"tall"}>Tall: 264 DP</Radio>
//                   </div>
//                 </Space>
//               </Radio.Group>
//             </Form.Item>
//           </Col>

//           {/* <Addbutton
//             title={title}
//             templateName={templateName}
//             media={media}
//             discription={discription}
//             richCardCarousels={richCardCarousels}
//             cardIndex={cardIndex}
//             button={button.actions}
//             setButton={setButton}
//             setRichCardCarousels={setRichCardCarousels}
//           /> */}

//           <Addbutton
//             templateName={templateName}
//             discription={discription}
//             title={title}
//             button={button.actions}
//             setButton={setButton}
//             richCardCarousels={richCardCarousels}
//             cardIndex={cardIndex}
//             setRichCardCarousels={setRichCardCarousels}
//             media={media}
//           />
//         </Row>
//       </div>
//     </>
//   );
// };

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
} from "antd";
import { ArrowLeft } from "lucide-react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import CustomSegment from "./customSegment";
import TextArea from "antd/es/input/TextArea";
import Addbutton from "./Addbutton";

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

export const richcardcarousel = ({ isEdit, data }: RichCardProps) => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );

  console.log("selectedNode-->", selectedNode);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value1, setValue1] = useState("short");
  const [previewImage, setPreviewImage] = useState([]);

  const [options, setOptions] = useState(["Card 1", "Card 2"]);
  const [cardIndex, setCardIndex] = useState(0);
  // const [value, setValue] = useState(data?.richCardCarousel?.width || "small");
  const [mediaModal, setMediaModal] = useState(false);

  const [media, setMedia] = useState(null);
  const [templateName, setTemplateName] = useState<string>("");
  const [discription, setDiscription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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

  const [richCardCarousels, setRichCardCarousels] = useState<ActionData[]>([
    {
      // width: value,
      title: selectedNode?.data?.label,
      description: "",
      media: media || "",
      mediaHeight: value1,
      actions: [],
      button: button?.actions,
    },
    {
      // width: value,
      title: selectedNode?.data?.label,
      description: "",
      media: media || "",
      mediaHeight: value1,
      actions: [],
      button: button?.actions,
    },
  ]);

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

  useEffect(() => {
    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex] = {
        ...updated[cardIndex],
        mediaHeight: value1,
      };
      return updated;
    });
  }, [value1, cardIndex]);

  const handleAddCardsTemplate = () => {
    if (options.length < 10) {
      const newCard = {
        // width: value,
        title: "123",
        description: "",
        media: media,
        mediaHeight: value1,
        actions: [
          {
            id: 0,
            type: "quick",
            title: selectedNode?.data?.label,
            payload: "",
          },
        ],
      };
      setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);
      setRichCardCarousels((prev) => [...prev, newCard]);
    } else {
      message.warning("Cannot add more than 10 cards");
    }
  };

  useEffect(() => {
    if (selectedNode) {
      setTitle(selectedNode?.data?.name);
      if (
        selectedNode.data?.richCardCarousels &&
        selectedNode.data.richCardCarousels.length > cardIndex
      ) {
        const selectedCarousel = selectedNode.data.richCardCarousels[cardIndex];
        setMedia(selectedCarousel.media || null);
        setRichCardCarousels((prev) => {
          const updated = [...prev];
          updated[cardIndex] = {
            ...updated[cardIndex],
            media: selectedCarousel.media || null,
          };
          return updated;
        });
      }
    }
  }, [selectedNode, cardIndex, value1]);

  useEffect(() => {
    console.log("value1:", value1);
  }, [value1]);

  useEffect(() => {
    console.log("setRichCardCarousels:", setRichCardCarousels);
  }, [setRichCardCarousels]);

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
        name: value,
        richCardCarousels: richCardCarousels,
      });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDiscription(value);
    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex] = {
        ...updated[cardIndex],
        description: value,
      };
      return updated;
    });
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        name: templateName,
        richCardCarousels,
      });
    }
  };

  const handleChange2 = (value: string) => {
    setTitle(value);

    setRichCardCarousels((prev) => {
      const updated = [...prev];
      updated[cardIndex] = {
        ...updated[cardIndex],
        title: value,
      };
      return updated;
    });

    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        name: templateName,
        richCardCarousels: richCardCarousels,
      });
    }
  };

  console.log("richCardCarousels", richCardCarousels);
  console.log("cardIndex", richCardCarousels[cardIndex]);

  return (
    <>
      <div className="p-2 font-semibold flex">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode.type === "textWithButtonNode"
            ? "Text with Button"
            : "Richcard Carousel"}
        </h2>
      </div>
      <hr />
      <div className="p-2 mt-3">
        <Form layout="vertical">
          <Form.Item
            name={`templatename${cardIndex}`}
            label="Template Name"
            style={{ marginBottom: "10px" }}
          >
            <Input
              placeholder="Template Name"
              // value={selectedNode?.data?.name}

              defaultValue={selectedNode?.data?.name || ""}
              onChange={(e) => {
                handleTemplateNameChange(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
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
            {/* <Typography style={{ textAlign: "end" }}>
                {options.length}/10
              </Typography> */}
            {/* </Flex> */}
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={24}>
            <Form
              layout="vertical"
              initialValues={{
                title:
                  selectedNode?.data?.richCardCarousels?.[cardIndex]?.title ||
                  "",
                description:
                  selectedNode?.data?.richCardCarousels?.[cardIndex]
                    ?.description || "",
              }}
            >
              <Form.Item
                name={`title${cardIndex}`}
                label="Title"
                style={{ marginBottom: "10px" }}
              >
                <Input
                  placeholder="Title"
                  defaultValue={
                    selectedNode?.data?.richCardCarousels?.[cardIndex]?.title ||
                    ""
                  }
                  onChange={(e) => handleChange2(e.target.value)}
                  key={selectedNode?.id}
                  id="message"
                />
              </Form.Item>
              <Form.Item
                name={`description${cardIndex}`}
                label="Description"
                style={{ marginBottom: "10px" }}
              >
                <TextArea
                  placeholder="Description"
                  defaultValue={
                    selectedNode?.data?.richCardCarousels?.[cardIndex]
                      ?.description || ""
                  }
                  rows={4}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>

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
                  padding: richCardCarousels[cardIndex]?.media
                    ? "15px 0px"
                    : "50px 0px",
                }}
                // onClick={() => {
                //   setMediaModal(true);
                // }}
              >
                {richCardCarousels[cardIndex]?.media ? (
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
                          ?.media || richCardCarousels[cardIndex]?.media
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
                        updatedCards[cardIndex].media = ""; // Remove media from the local state

                        // Set the state with updated cards
                        setRichCardCarousels(updatedCards);

                        // Also update the selectedNode's richCardCarousels state
                        if (selectedNode) {
                          updateNodeLabel(selectedNode.id, {
                            richCardCarousels: updatedCards, // Update the node's label
                            name: templateName, // Retain the template name
                          });
                        }

                        // Optionally, clear the media URL for immediate UI feedback
                        setMedia(null);
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
                      display: richCardCarousels[cardIndex]?.media
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
              label={"Size"}
              rules={[{ required: true, message: "Please select size" }]}
              initialValue={
                selectedNode?.data?.richCardCarousels?.[cardIndex]?.mediaHeight
              }
            >
              <Radio.Group
                style={{ marginTop: "10px", width: "100%", textAlign: "left" }}
                onChange={(e) => onChange1(e)}
                value={
                  selectedNode?.data?.richCardCarousels?.[cardIndex]
                    ?.mediaHeight || " "
                }
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"short"}>Short: 112 DP</Radio>
                  </div>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"medium"}>Medium: 168 DP</Radio>
                  </div>
                  <div
                    style={{
                      border: "1px solid #D9D9D9",
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <Radio value={"tall"}>Tall: 264 DP</Radio>
                  </div>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>

          {/* <Addbutton
            title={title}
            templateName={templateName}
            media={media}
            discription={discription}
            richCardCarousels={richCardCarousels}
            cardIndex={cardIndex}
            button={button.actions}
            setButton={setButton}
            setRichCardCarousels={setRichCardCarousels}
          /> */}

          <Addbutton
            templateName={templateName}
            discription={discription}
            title={title}
            button={button.actions}
            setButton={setButton}
            richCardCarousels={richCardCarousels}
            cardIndex={cardIndex}
            setRichCardCarousels={setRichCardCarousels}
            media={media}
          />
        </Row>
      </div>
    </>
  );
};
