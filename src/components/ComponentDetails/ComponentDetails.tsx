/* eslint-disable react-hooks/exhaustive-deps */
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
import { Input, Select, Button, Flex, Divider, Card } from "antd";
import { ElectricalComponentNode } from "@/types";
const { Option } = Select;

const selectAfter = (
    <Select defaultValue="Ω">
        <Option value="Ω">Ω</Option>
        <Option value="KΩ">KΩ</Option>
        <Option value="MΩ">MΩ</Option>
    </Select>
);

export default function ComponentDetail({
    node,
}: {
    node: ElectricalComponentNode | undefined;
}) {
    const nodeType = node?.data?.type || node?.type;
    const [value, setValue] = useState<string | undefined>(`${node?.data?.value}`);

    useEffect(() => {
        setValue(node?.data.value?.toString());
    }, [node]);


    const { updateNodeData } = useReactFlow();
    //const unit = "KΩ";


    const handleFlipHorizontal = () => {
        const newRotation = node?.data.rotation === 90 ? 270 : 90;
        if (node) {
            updateNodeData(node?.id, { rotation: newRotation });
        }
    };

    const handleFlipVertical = () => {
        const newRotation = node?.data.rotation === 0 ? 180 : 0;
        if (node) {
            updateNodeData(node?.id, { rotation: newRotation });
        }
    };

    const handleRotateLeft = () => {
        if (node) {
            const checkRoation = node?.data?.rotation === 0 ? 360 : node?.data?.rotation;
            let newRotation = checkRoation - 90;
            newRotation = newRotation === 360 ? 0 : newRotation;
            updateNodeData(node?.id, { rotation: newRotation });
        }
    };

    const handleRotateRight = () => {
        if (node) {
            let newRotation = node.data.rotation + 90;
            newRotation = newRotation === 360 ? 0 : newRotation;
            if (node) {
                updateNodeData(node.id, { rotation: newRotation });
            }
        }
    };

    console.log(node);

    useEffect(() => {
    }, [node?.data]);
    return (
        <Card className={styles.details} title="Details" size="small">
            <div className={styles.details_name}  >{nodeType?.toUpperCase()}</div>
            {node?.data?.value && (
                <Input
                    className={styles.value_number}
                    value={value}
                    onChange={(e) => {
                        const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                        setValue(newValue.toString());
                        updateNodeData(node.id, { value: newValue });
                    }}
                    addonAfter={selectAfter}
                />
            )}
            <Divider />
            <label>Actions</label>
            <Flex gap={10} wrap>
                <Button onClick={handleFlipHorizontal}>
                    <FlipHIcon />
                </Button>
                <Button onClick={handleFlipVertical}>
                    <FlipVIcon />
                </Button>
                <Button onClick={handleRotateLeft}>
                    <RotateLeftIcon />
                </Button>
                <Button onClick={handleRotateRight}>
                    <RotateRightIcon />
                </Button>
            </Flex>
        </Card>
    );
}