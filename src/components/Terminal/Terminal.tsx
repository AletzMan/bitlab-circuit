
import { Handle, HandleProps } from "@xyflow/react";
import styles from "./styles.module.css";

export interface HandlePropsNew extends HandleProps {
    idNode?: string
}

export function Terminal(props: HandlePropsNew) {
    return (
        <Handle {...props} className={styles.terminal} />
    );
};