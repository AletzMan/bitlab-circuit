import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DeletetIcon, DuplicateIcon, FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
import { Input, Select, Button, Flex, Divider, Card, Tooltip } from "antd";
import { ComponentData, ComponentNode, UNITS } from "@/types";
//import useHistoryManager from "@/hooks/useHistoryManager";
const { Option } = Select;


export default function ComponentProperties({
    node,
    selectedNodes,
    removeNode,
    isSingleNode,
    duplicateComponents
}: {
    node: ComponentNode | undefined,
    selectedNodes: ComponentNode[] | undefined,
    removeNode: (node: ComponentNode[] | undefined, shouldAddToHistory?: boolean) => void,
    isSingleNode: boolean,
    duplicateComponents: () => void
}) {
    const nodeType = node?.data?.type || node?.type;
    const [dataComponent, setDataComponent] = useState<ComponentData | undefined>();
    const updateNodeInternals = useUpdateNodeInternals();
    const { updateNodeData } = useReactFlow();
    //const { removeNode } = useHistoryManager();

    useEffect(() => {
        setDataComponent(node?.data);
    }, [node, node?.data]);

    const handleFlipHorizontal = () => {
        if (node && dataComponent) {
            const newRotation = dataComponent.rotation === 90 ? 270 : 90;
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleFlipVertical = () => {
        if (node && dataComponent) {
            const newRotation = dataComponent.rotation === 0 ? 180 : 0;
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
        if (node && dataComponent) {
            updateNodeData(node?.id, { prefix: value });
            setDataComponent({ ...dataComponent, prefix: value });
        }
    };

    const handleRemoveNode = () => {
        if (isSingleNode) {
            removeNode([node as ComponentNode], true);
        } else {
            removeNode(selectedNodes, true);
        }
    };

    return (
        <Card className={styles.details} title="Properties" size="small" type="inner" >
            {isSingleNode &&
                <>
                    <div className={styles.details_name}  >{nodeType}</div>
                    {node?.data?.has_properties && (
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
                    <Divider style={{ margin: "16px 0" }} />
                </>
            }
            {isSingleNode &&
                <>
                    <label className={styles.label}>Transform</label>
                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                    <Flex gap={10} wrap  >
                        <Tooltip placement="top" title="Flip Horizontal (CTRL + ALT + Left)"  >
                            <Button className={styles.button} variant="filled" color="primary" onClick={handleFlipHorizontal}>
                                <FlipHIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Flip Vertical (CTRL + ALT + Down)"  >
                            <Button className={styles.button} variant="filled" color="primary" onClick={handleFlipVertical}>
                                <FlipVIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Rotate Left (CTRL + ALT + L)"  >
                            <Button className={styles.button} variant="filled" color="primary" onClick={handleRotateLeft}>
                                <RotateLeftIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Rotate Right (CTRL + ALT + R)"  >
                            <Button className={styles.button} variant="filled" color="primary" onClick={handleRotateRight}>
                                <RotateRightIcon />
                            </Button>
                        </Tooltip>
                    </Flex>
                    <Divider style={{ margin: "12px 0 24px 0" }} />
                </>
            }
            <label className={styles.label}>Actions</label>
            <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
            <Flex gap={10} wrap>
                <Tooltip placement="top" title="Duplicate (CTRL + ALT + D)"  >
                    <Button className={styles.button} variant="filled" color="primary" onClick={duplicateComponents}>
                        <DuplicateIcon />
                    </Button>
                </Tooltip>
                <Tooltip placement="top" title="Delete (Delete)"  >
                    <Button className={styles.button} variant="filled" color="red" onClick={handleRemoveNode}>
                        <DeletetIcon />
                    </Button>
                </Tooltip>
            </Flex>
            <Divider style={{ margin: "12px 0 24px 0" }} />
        </Card>
    );
}