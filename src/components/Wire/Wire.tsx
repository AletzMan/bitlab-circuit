import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styles from "./styles.module.css";

export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
    const [d] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });

    return (
        <BaseEdge path={d} className={styles.wire} type="smoothstep" />
    );
};