

import { Node, NodeProps, NodeResizer, useStore } from "@xyflow/react";
import { ComponentData } from "@/types";
import { zoomSelector } from "@/helpers";
import styles from "./styles.module.css";

type BoardNode = Node<ComponentData, "string">;

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
