import useStore from "@/config/store";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ArrowLeft } from "lucide-react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import type { MenuProps } from "antd";

const selector = (state: {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeLabel: state.updateNodeLabel,
  setSelectedNode: state.setSelectedNode,
});

export const menu = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectedNode, updateNodeLabel, setSelectedNode } = useStore(
    selector,
    shallow
  );

  type MenuItem = Required<MenuProps>["items"][number];

  function handleChange(value: string) {
    selectedNode && updateNodeLabel(selectedNode.id, value);
  }
  if (!selectedNode) return null;

  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <MailOutlined />,
      label: "Navigation One",
      children: [
        {
          key: "1-1",
          label: "Item 1",
          type: "group",
        },
        {
          key: "1-2",
          label: "Item 2",
          type: "group",
        },
      ],
    },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Navigation Two",
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />
    },
  ];

  return (
    <>
      <div className="p-2 font-semibold flex">
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
        <div className="mt-1">
          <textarea
            rows={4}
            key={selectedNode?.id}
            defaultValue={selectedNode?.data.label}
            name="message"
            id="message"
            onChange={(e) => handleChange(e.target.value)}
            className="border block w-full border-gray-300 rounded-md sm:text-sm p-2"
          />
        </div>
        <Menu style={{ width: 256 }} mode="vertical" items={items} />
      </div>
    </>
  );
};
