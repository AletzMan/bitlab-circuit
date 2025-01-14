import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styles from "./styles.module.css";
import { ComponentEdge } from "@/types";

export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<ComponentEdge>) {
    const [d] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 0,
    });

    return (
        <BaseEdge path={d} className={styles.wire} style={{ stroke: data?.color }} type="smoothstep" />
    );
};