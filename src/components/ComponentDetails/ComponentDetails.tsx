import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
import { Input, Select, Button, Flex, Divider, Card } from "antd";
import { ElectricalComponentData, ElectricalComponentNode, UNITS } from "@/types";
const { Option } = Select;


export default function ComponentDetail({
    node,
}: {
    node: ElectricalComponentNode | undefined;
}) {
    const nodeType = node?.data?.type || node?.type;
    const [dataComponent, setDataComponent] = useState<ElectricalComponentData | undefined>();
    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        setDataComponent(node?.data);
    }, [node, node?.data]);


    const { updateNodeData } = useReactFlow();
    //const unit = "KΩ";


    const handleFlipHorizontal = () => {
        const newRotation = node?.data.rotation === 90 ? 270 : 90;
        if (node && dataComponent) {
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleFlipVertical = () => {
        const newRotation = node?.data.rotation === 0 ? 180 : 0;
        if (node && dataComponent) {
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleRotateLeft = () => {
        if (node && dataComponent) {
            const checkRoation = dataComponent.rotation === 0 ? 360 : dataComponent.rotation;
            let newRotation = checkRoation - 90;
            newRotation = newRotation === 360 ? 0 : newRotation;
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleRotateRight = () => {
        if (node && dataComponent) {
            let newRotation = dataComponent.rotation + 90;
            newRotation = newRotation === 360 ? 0 : newRotation;
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleChangeUnit = (value: string) => {
        console.log(value);
    };

    return (
        <Card className={styles.details} title="Details" size="small">
            <div className={styles.details_name}  >{nodeType?.toUpperCase()}</div>
            {node?.data?.value && (
                <Input
                    className={styles.value_number}
                    value={dataComponent?.value}
                    onChange={(e) => {
                        const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                        if (dataComponent) {
                            setDataComponent({ ...dataComponent, value: newValue });
                            updateNodeData(node.id, { value: newValue });
                        }
                    }}
                    addonAfter={dataComponent &&
                        <Select defaultValue={dataComponent.prefix} value={dataComponent.prefix} onChange={handleChangeUnit}>
                            {UNITS[dataComponent.unit].map(value => (
                                <Option key={value} value={value}>{value}</Option>
                            )

                            )}
                        </Select>}
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