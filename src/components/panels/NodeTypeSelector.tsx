import React from "react";
import useStore from "@/config/store";
import NodeTypeSelector from "./NodeTypeSelector"; // Ensure correct import path

const NodeRenderer = () => {
  const nodes = useStore((state) => state.nodes);
  const selectedNode = useStore((state) => state.selectedNode);

  return (
    <>
      {nodes.map((node) => {
        const { id, data } = node;
        const isInitial = data.isInitial;

        return (
          <div key={id} className="node">
            {isInitial ? (
              <div className="initial-node-ui">
                <h3>{data.label}</h3>
                {/* Render NodeTypeSelector when an initial node is selected */}
                {selectedNode && selectedNode.id === id && (
                  <NodeTypeSelector />
                )}
                <button>Edit</button>
                {/* Other UI elements specific to the initial node */}
              </div>
            ) : (
              <div className="non-initial-node-ui">
                <h3>{data.label}</h3>
                <p>This is a non-initial node.</p>
                {/* Add UI for non-initial nodes */}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default NodeRenderer;
