import React from "react";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import { Button } from "antd";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

const DownloadButton: React.FC = () => {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    const reactFlowViewport = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement | null;

    if (reactFlowViewport) {
      toPng(reactFlowViewport, {
        backgroundColor: "#fff",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadImage);
    }
  };

  return (
    <Panel position="top-right">
      <Button type="primary" className="download-btn" onClick={onClick} style={{ position: 'static' }}>
        Download Image
      </Button>
    </Panel>
  );
};

export default DownloadButton;
