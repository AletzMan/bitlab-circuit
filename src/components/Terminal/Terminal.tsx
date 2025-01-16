

import { Handle, HandleProps } from "@xyflow/react";
import styles from "./styles.module.css";


export function Terminal(props: HandleProps) {

    return (
        <Handle {...props} className={styles.terminal} />
    );
};