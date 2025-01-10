import { Node, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { ElectricalComponentData } from "@/types";
import styles from "./styles.module.css";

export default function ComponentDetail({
    node,
}: {
    node: Node<ElectricalComponentData> | undefined;
}) {
    const nodeType = node?.data?.type || node?.type;
    const [value, setValue] = useState<string | undefined>(`${node?.data?.value}`);

    useEffect(() => {
        setValue(node?.data?.value?.toString());
    }, [node]);


    const { updateNodeData } = useReactFlow();
    const unit = "KΩ";

    return (
        <div className={styles.details}>
            <div className={styles.details_name}  >{nodeType?.toUpperCase()}</div>
            {node?.data?.value && (
                <div className={styles.value}>
                    <input
                        className={styles.value_number}
                        value={value}
                        onChange={(e) => {
                            const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                            setValue(newValue.toString());
                            updateNodeData(node.id, { value: newValue });
                        }}
                    />
                    <div className={styles.value_unit}>{unit}</div>
                </div>
            )}
        </div>
    );
}