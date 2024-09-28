import { TextNode } from "@/components/nodes";
import { Edge, Node } from "reactflow";

export const nodesConfig = {
  initialNodes: [
    {
      id: "1",
      type: "textNode",
      data: {
        label: "wow, that was a great video",
        isInitial: true,
        button: {
          label: "Start",
        },
      },
      position: { x: 300, y: 400 },
    },
    //  {
    //   id: "2",
    //   type: "textNode",
    //   data: {
    //     label: "This is the right-side node",
    //     isInitial: false, // Not an initial node
    //   },
    //   position: { x: 500, y: 400 },
    // },
  ] as Node[],
  initialEdges: [{ id: "e1-1", source: "1", target: "2" }] as Edge[],
  nodeTypes: {
    textNode: TextNode,
    textWithButtonNode: TextNode,
    textWithmedia: TextNode,
    list: TextNode,
    menu: TextNode,
    poll: TextNode,
    richcard: TextNode,
    richcardcarousel: TextNode,
  } as any,
};
