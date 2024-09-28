import useStore from "@/config/store";
import NodeTypeSelector from "./NodeTypeSelector";

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
                {selectedNode && selectedNode.id === id && (
                  <NodeTypeSelector />
                )}
                <button>Edit</button>
              </div>
            ) : (
              <div className="non-initial-node-ui">
                <h3>{data.label}</h3>
                <p>This is a non-initial node.</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default NodeRenderer;
