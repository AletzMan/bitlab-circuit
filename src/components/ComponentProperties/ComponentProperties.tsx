import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DeletetIcon, DuplicateIcon, FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
import { Input, Select, Button, Flex, Divider, Card, Tooltip, Tag, Checkbox, CheckboxChangeEvent } from "antd";
import { ComponentData, AnalogNode, UNITS } from "@/types";
//import useHistoryManager from "@/hooks/useHistoryManager";
const { Option } = Select;


export default function ComponentProperties({
    node,
    selectedNodes,
    removeNode,
    isSingleNode,
    duplicateComponents,
}: {
    node: AnalogNode | undefined,
    selectedNodes: AnalogNode[] | undefined,
    removeNode: (node: AnalogNode[] | undefined, shouldAddToHistory?: boolean) => void,
    isSingleNode: boolean,
    duplicateComponents: () => void
}) {
    const nodeType = node?.data?.type || node?.type;
    const [dataComponent, setDataComponent] = useState<ComponentData | undefined>();
    const updateNodeInternals = useUpdateNodeInternals();
    const { updateNodeData } = useReactFlow();


    useEffect(() => {
        setDataComponent(node?.data);
    }, [node, node?.data]);

    const handleFlipHorizontal = () => {
        if (node && dataComponent) {
            const newFlipX = dataComponent.flip.x === 1 ? -1 : 1;
            setDataComponent({ ...dataComponent, flip: { ...dataComponent.flip, x: newFlipX } });
            updateNodeData(node.id, { flip: { ...dataComponent.flip, x: newFlipX } });
            updateNodeInternals(node.id);
        }
    };

    const handleFlipVertical = () => {
        if (node && dataComponent) {
            const newFlipY = dataComponent.flip.y === 1 ? -1 : 1;
            setDataComponent({ ...dataComponent, flip: { ...dataComponent.flip, y: newFlipY } });
            updateNodeData(node.id, { flip: { ...dataComponent.flip, y: newFlipY } });
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
            removeNode([node as AnalogNode], true);
        } else {
            removeNode(selectedNodes, true);
        }
    };

    const handleChangeHiddenReference = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        console.log(newValue);
        if (node && dataComponent) {
            updateNodeData(node?.id, { isReferenceVisible: !newValue });
            setDataComponent({ ...dataComponent, isReferenceVisible: !newValue });
        }
    };
    const handleChangeHiddenValue = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        console.log(newValue);
        if (node && dataComponent) {
            updateNodeData(node?.id, { isValueVisible: !newValue });
            setDataComponent({ ...dataComponent, isValueVisible: !newValue });
        }
    };

    return (

        <Card className={styles.details} size="small" type="inner" >
            {isSingleNode &&
                <>
                    <label className="details_name"  >{nodeType}</label>
                    <Divider style={{ margin: "6px 0" }} />
                    <div className={styles.value}>
                        <Flex vertical>
                            <label className={styles.value_label}>Reference</label>
                            <label className={styles.label_reference}>{!dataComponent?.reference}</label>
                        </Flex>
                        <label className={`${styles.value_label} ${styles.value_hidden}`}>
                            Hidden
                            <Checkbox onChange={handleChangeHiddenReference} checked={!dataComponent?.isReferenceVisible} />
                        </label>
                    </div>
                    {node?.data?.has_properties && (
                        <>
                            <Divider style={{ margin: "4px 0" }} variant="dashed" />
                            <div className={styles.value}>
                                <Flex vertical>
                                    <label className={styles.value_label}>Value</label>
                                    <Input className={styles.value_number}
                                        value={dataComponent?.value} size="middle"
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
                                                ))}
                                            </Select>}
                                    />
                                </Flex>
                                <label className={`${styles.value_label} ${styles.value_hidden}`}>
                                    Hidden
                                    <Checkbox onChange={handleChangeHiddenValue} checked={!dataComponent?.isValueVisible} />
                                </label>
                            </div>
                        </>
                    )}
                    <Divider style={{ margin: "16px 0" }} />
                </>
            }
            {!isSingleNode &&
                <Flex className={styles.groupNodes} wrap gap="4px 0" >
                    {selectedNodes?.map(node => (
                        <Tag key={node.id} color="cyan">{`${node.data?.type}`}</Tag>
                    ))

                    }
                    <Divider style={{ margin: "16px 0" }} />
                </Flex>
            }
            {isSingleNode && node?.data.has_properties &&
                <>
                    <label className="label">Transform</label>
                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                    <Flex gap={10} wrap  >
                        <Tooltip placement="top" title="Flip Horizontal (Ctrl+Alt+Left)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleFlipHorizontal}>
                                <FlipHIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Flip Vertical (Ctrl+Alt+Down)" color="cyan"  >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleFlipVertical}>
                                <FlipVIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Rotate Left (Ctrl+Alt+L)" color="cyan"  >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleRotateLeft}>
                                <RotateLeftIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Rotate Right (Ctrl+Alt+R)" color="cyan"  >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleRotateRight}>
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

                <Tooltip placement="top" title="Duplicate (Ctrl+Alt+D)" color="cyan" >
                    <Button className={styles.button} variant="outlined" color="default" onClick={duplicateComponents}>
                        <DuplicateIcon />
                    </Button>
                </Tooltip>
                <Tooltip placement="top" title="Delete (Delete)" color="red" >
                    <Button className={styles.button} variant="outlined" color="red" onClick={handleRemoveNode}>
                        <DeletetIcon />
                    </Button>
                </Tooltip>
            </Flex>
            <Divider style={{ margin: "12px 0 24px 0" }} />
        </Card>
    );
}