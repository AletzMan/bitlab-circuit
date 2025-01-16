

import { Node, NodeProps, NodeResizer } from "@xyflow/react";
import { ComponentData } from "@/types";
import styles from "./styles.module.css";

type BoardNode = Node<ComponentData, "string">;

export function Board({ selected }: NodeProps<BoardNode>) {

    return (
        <div className={`${styles.board} ${selected && styles.board_selected}`}
        >
            {selected && <NodeResizer minWidth={200} minHeight={200} />}
        </div>
    );
}
