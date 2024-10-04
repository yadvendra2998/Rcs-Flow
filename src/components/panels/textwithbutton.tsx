import useStore from "@/config/store";
import { Form, Input, Typography } from "antd";
import { useState, useEffect } from "react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import { ArrowLeft } from "lucide-react";
import Addbutton, { ActionData } from "./Addbutton";

const { TextArea } = Input;

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (
    nodeId: string,
    nodeData: { label: string; name: string; discription: string; buttons: ActionData[] }
  ) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const TextWithPanel: React.FC = () => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );

  const [textareaValue, setTextareaValue] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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

  useEffect(() => {
    if (selectedNode) {
      setTextareaValue(selectedNode.data.label || "");
      setTemplateName(selectedNode.data.name || "");
      setDiscription(selectedNode.data.discription || "");
      setTitle(selectedNode.data.label || "");
    }
  }, [selectedNode]);

  const handleChange = (value: string) => {
    setTextareaValue(value);
    setTitle(value); // Update title as well
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: value,
        name: templateName,
        discription,
        buttons: button.actions,
      });
    }
  };

  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: value,
        discription,
        buttons: button.actions,
      });
    }
  };

  if (!selectedNode) return null;

  return (
    <>
      <div className="p-2 font-semibold flex sticky top-0 bg-white z-10">
        <button onClick={() => setSelectedNode(null)}>
          <ArrowLeft />
        </button>
        <h2 className="flex-grow text-center">
          {selectedNode.type === "textWithButtonNode"
            ? "Text with Button"
            : "Text"}
        </h2>
      </div>
      <hr />
      <div className="p-2 mt-3">
        <Form layout="vertical">
          <Form.Item label="Template Name" style={{ marginBottom: "10px" }}>
            <Input
              value={templateName}
              variant="filled"
              placeholder="Template Name"
              onChange={(e) => handleTemplateNameChange(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Message" style={{ marginBottom: "10px" }}>
            <TextArea
              variant="filled"
            size="small"
              value={textareaValue} // Changed to value
              onChange={(e) => handleChange(e.target.value)}
              rows={4}
              placeholder="Enter your message here"
            />
          </Form.Item>
        </Form>
        <div className="mt-1">
          <Addbutton
            textareaValue={textareaValue}
            description={discription}
            title={title}
            templateName={templateName}
            button={button.actions}
            setButton={setButton}
          />
        </div>
      </div>
    </>
  );
};
