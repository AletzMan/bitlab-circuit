

import { Node, NodeProps, NodeResizer, useStore } from "@xyflow/react";
import { ElectricalComponentData } from "@/types";
import { zoomSelector } from "@/helpers";
import styles from "./styles.module.css";

type BoardNode = Node<ElectricalComponentData, "string">;

export function Board({ selected }: NodeProps<BoardNode>) {
    const showContent = useStore(zoomSelector);


    return (
        <div className={`${styles.board} ${selected && styles.board_selected}`}
        >
            {selected && <NodeResizer minWidth={200} minHeight={200} />}
            {!showContent && <span />}
        </div>
    );
}
