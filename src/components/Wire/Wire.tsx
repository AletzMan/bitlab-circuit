import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styles from "./styles.module.css";
import { ComponentEdge } from "@/types";
import { CSSProperties } from "react";
import { useTheme } from "@/store";

export function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<ComponentEdge>) {
    const { currentTheme } = useTheme();
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
        <BaseEdge path={d} className={styles.wire} style={{ "--wire-color": (data?.color === "#000000" && currentTheme === 'dark') ? '#FFFFFF' : (data?.color.toLowerCase() === "#ffffff" && currentTheme === 'light') ? "#000000" : data?.color } as CSSProperties} type="smoothstep" />
    );
};