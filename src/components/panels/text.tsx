import useStore from "@/config/store";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const TextPanel = () => {
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );
  const [templateName, setTemplateName] = useState<string>("");
  const [title, setTitle] = useState<string>(selectedNode?.data.label);

  function handleChange(value: string) {
    setTitle(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: value,
        name: templateName,
      });
    }
  }

  const handleTemplateNameChange = (value: string) => {
    setTemplateName(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, {
        label: title,
        name: value,
      });
    }
  };

  if (!selectedNode) return null;

  return (
    <>
      <div className="p-2 font-semibold flex sticky top-0 bg-white z-10">
        <button
          onClick={() => {
            setSelectedNode(null);
          }}
        >
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
        <label
          className="block text-sm font-medium text-start text-gray-700"
          htmlFor="message"
        >
          {selectedNode.type === "textWithButtonNode"
            ? "Text with Button"
            : "Message"}
        </label>
        <Form layout="vertical">
        <Form.Item label="Template Name" style={{ marginBottom: "10px" }}>
          <Input
            variant="filled"
            defaultValue={selectedNode?.data?.name}
            placeholder="Template Name"
            onChange={(e) => {
              handleTemplateNameChange(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Message" style={{ marginBottom: "10px" }}>
          <TextArea
            rows={4}
            size="small"
            key={selectedNode?.id}
            defaultValue={selectedNode?.data.label}
            placeholder="Template Name"
            name="message"
            id="message"
            onChange={(e) => handleChange(e.target.value)}
            className="border block w-full border-gray-300 rounded-md sm:text-sm p-2"
          />
        </Form.Item>
        </Form>
      </div>
    </>
  );
};
