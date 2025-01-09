import { Node, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { ElectricalComponentData } from "@/types";


export default function ComponentDetail({
    node,
}: {
    node: Node<ElectricalComponentData>;
}) {
    const nodeType = node?.data?.type || node?.type;
    const [value, setValue] = useState(`${node?.data?.value || 0}`);

    const { updateNodeData } = useReactFlow();
    const unit = "X";

    return (
        <div>
            <div  >{nodeType?.toUpperCase()}</div>
            {node?.data?.value && (
                <div  >
                    <input
                        value={value}
                        onChange={(e) => {
                            const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                            setValue(newValue.toString());
                            updateNodeData(node.id, { value: newValue });
                        }}
                    />
                    <div>{unit}</div>
                </div>
            )}
        </div>
    );
}