import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentState, ComponentType } from "@/types";
import { LockIcon, NodeIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";


export function NodeComponent({ data: { type, state, isLock, reference }, selected, id, parentId }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();


    const isAdditionValid = state === ComponentState.Add;
    const isAdditionInvalid = state === ComponentState.NotAdd;



    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} `} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }
            <div className={`${styles.terminal} ${styles.terminal_vertical}`}></div>
            <div className={`${styles.terminal} ${styles.terminal_horizontal}`}></div>
            <div className={styles.icon}>
                {type === ComponentType.Node && <NodeIcon />}
            </div>
            <span className={`${styles.id}  `} >{reference}</span>
            <Terminal type="source" position={Position.Top} id="1" style={{ backgroundColor: "transparent", borderColor: "transparent" }} />
            <Terminal type="source" position={Position.Right} id="2" style={{ backgroundColor: "transparent", borderColor: "transparent" }} />
            <Terminal type="source" position={Position.Bottom} id="3" style={{ backgroundColor: "transparent", borderColor: "transparent" }} />
            <Terminal type="source" position={Position.Left} id="4" style={{ backgroundColor: "transparent", borderColor: "transparent" }} />
        </div>
    );
}