
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edge, useNodesData, useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DeletetIcon, DuplicateIcon, FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
import { Input, Select, Button, Flex, Divider, Card, Tooltip, Checkbox, CheckboxChangeEvent, ColorPicker } from "antd";
import { ComponentData, AnalogNode, UNITS, ComponentType, Categories } from "@/types";
import { genPresets } from "@/helpers";
import { LedColors } from "@/constants";
import { AggregationColor } from "antd/es/color-picker/color";
import { useSelectedItems } from "@/store";
import useHistoryManager from "@/hooks/useHistoryManager";
const { Option } = Select;


export function ComponentProperties({
    duplicateComponents,
}: {
    duplicateComponents: () => void
}) {
    const { removeNode, removeEdge } = useHistoryManager();
    const node = useSelectedItems((state) => state.selectedNode);
    const selectedNodes = useSelectedItems((state) => state.selectedNodes);
    const isSingleNodeSelection = useSelectedItems((state) => state.isSingleNodeSelection);
    const updateNodeInternals = useUpdateNodeInternals();
    const { updateNodeData, updateNode, getNodes, getEdges } = useReactFlow();
    const nodeData = useNodesData(node?.id as string);
    const [dataComponent, setDataComponent] = useState<ComponentData | undefined>(nodeData?.data as ComponentData);
    const presets = genPresets(LedColors);


    useEffect(() => {
        const dataNode = nodeData?.data as ComponentData;
        if (dataNode) {
            setDataComponent(dataNode);
        }
    }, [nodeData]);

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
            if (dataComponent.flip.x === -1 && dataComponent.flip.y === -1) {
                newRotation = checkRoation - 90;
            } else if (dataComponent.flip.x === -1 || dataComponent.flip.y === -1) {
                newRotation = checkRoation + 90;
            }
            newRotation = newRotation === 450 ? 90 : newRotation;
            newRotation = newRotation === 360 ? 0 : newRotation;
            setDataComponent({ ...dataComponent, rotation: newRotation });
            updateNodeData(node.id, { rotation: newRotation });
            updateNodeInternals(node.id);
        }
    };

    const handleRotateRight = () => {
        if (node && dataComponent) {
            let newRotation = dataComponent.rotation + 90;
            if (dataComponent.flip.x === -1 && dataComponent.flip.y === -1) {
                newRotation = dataComponent.rotation + 90;
            } else if (dataComponent.flip.x === -1 || dataComponent.flip.y === -1) {
                newRotation = dataComponent.rotation - 90;
            }
            newRotation = newRotation === 360 ? 0 : newRotation;
            newRotation = newRotation === -90 ? 270 : newRotation;
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
        if (isSingleNodeSelection) {
            const nodeEdges = getEdges().filter(edge => edge.source === node?.id || edge.target === node?.id);
            removeEdge(nodeEdges);
            removeNode([node as AnalogNode], true);
        } else {
            const selectedNodeIds = new Set(selectedNodes?.map(node => node.id));
            const nodeEdges: Edge[] = [];
            getEdges().forEach(element => {
                if (selectedNodeIds.has(element.source) || selectedNodeIds.has(element.target)) {
                    nodeEdges.push(element);
                }
            });

            removeEdge(nodeEdges, true);
            removeNode(selectedNodes, true);
        }
    };

    const handleChangeHiddenDesignator = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        if (node && dataComponent) {
            updateNodeData(node?.id, { isDesignatorVisible: !newValue });
            setDataComponent({ ...dataComponent, isDesignatorVisible: !newValue });
        }
    };
    const handleChangeHiddenValue = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        if (node && dataComponent) {
            updateNodeData(node?.id, { isValueVisible: !newValue });
            setDataComponent({ ...dataComponent, isValueVisible: !newValue });
        }
    };
    const handleChangeState = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        if (node && dataComponent) {
            updateNodeData(node?.id, { state: { on: newValue } });
            setDataComponent({ ...dataComponent, state: { ...dataComponent.state, on: newValue } });
        }
    };

    const handleClickSelectedNode = (nodeSelected: AnalogNode) => {
        const nodes = getNodes(); // Obtén la lista de nodos actual
        nodes.forEach((node) => {
            if (node.id === nodeSelected.id) {
                // Marca el nodo seleccionado y alterna la visibilidad 
                updateNode(node.id, (prevNode) => ({ ...prevNode, selected: true }));
            } else {
                // Desmarca los demás nodos
                updateNode(node.id, (prevNode) => ({ ...prevNode, selected: false }));
            }
        });
    };

    const handleChangeColorWire = (value: AggregationColor, _css: string) => {
        if (node && dataComponent) {
            console.log(value.toHexString());
            updateNodeData(node?.id, { color: value.toHexString() });
            setDataComponent({ ...dataComponent, color: value.toHexString() });
        }
    };

    return (

        <Card className={styles.details} size="small" type="inner" >
            {isSingleNodeSelection &&
                <>
                    <label className="details_name"  >{dataComponent?.name}</label>
                    <Divider style={{ margin: "6px 0" }} />
                    <div className={styles.value}>
                        <Flex vertical>
                            <label className={styles.value_label}>Designator</label>
                            <label className={styles.label_designator}>{node?.data?.designator}</label>
                        </Flex>
                        <label className={`${styles.value_label} ${styles.value_hidden}`}>
                            Hidden
                            <Checkbox onChange={handleChangeHiddenDesignator} checked={!dataComponent?.isDesignatorVisible} />
                        </label>
                    </div>
                    {node?.data?.has_properties && (
                        <>
                            {dataComponent?.category !== Categories["Switches & Relays"] &&
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
                            }
                            {dataComponent?.type === ComponentType.Led &&
                                <>
                                    <Divider style={{ margin: "12px 0 4px 0" }} variant="dashed" />
                                    <Flex vertical>
                                        <label className={styles.value_label}>Color</label>
                                        <Flex vertical align="flex-start" justify="center">
                                            <ColorPicker
                                                presets={presets}
                                                value={dataComponent?.color} styles={{ popupOverlayInner: { maxWidth: "85px" } }}
                                                onChange={handleChangeColorWire} format="hex" disabledFormat
                                            />
                                        </Flex>
                                    </Flex>
                                </>
                            }
                            {dataComponent?.state &&
                                <>
                                    <Divider style={{ margin: "12px 0 4px 0" }} variant="dashed" />
                                    <Flex vertical>
                                        <label className={styles.value_label}>State</label>
                                        <Flex vertical align="flex-start" justify="center">
                                            <Checkbox onChange={handleChangeState} checked={dataComponent?.state.on}  >{dataComponent?.state.on ? 'Closed' : 'Open'}</Checkbox>
                                        </Flex>
                                    </Flex>
                                </>
                            }
                        </>
                    )}
                    <Divider style={{ margin: "12px 0 24px 0" }} />
                </>
            }
            {!isSingleNodeSelection &&
                <Flex className={styles.groupNodes} wrap gap="4px" >
                    {selectedNodes?.map(node => (
                        <Tooltip key={node.id} placement="top" color="cyan" title={node.data?.designator}>
                            <Button key={node.id} size="middle" variant="filled" color="cyan"
                                style={{ textTransform: "capitalize", display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '0', fontSize: '0.85em' }}
                                onClick={() => handleClickSelectedNode(node)}> {`${node.data?.name}-${node.data.designator}`} </Button>
                        </Tooltip>
                    ))
                    }
                    <Divider style={{ margin: "16px 0" }} />
                </Flex>
            }
            {isSingleNodeSelection && node?.data.has_properties &&
                <>
                    <label className="label">Transform</label>
                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                    <Flex gap={10} wrap  >
                        <Tooltip placement="top" title="Flip Horizontal (Ctrl+Alt+Left)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleFlipHorizontal}>
                                <FlipHIcon className={styles.button_icon} style={{ transform: `scaleX(${dataComponent?.flip.x})` }} />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Flip Vertical (Ctrl+Alt+Down)" color="cyan"   >
                            <Button className={styles.button} variant="outlined" color="default" onClick={handleFlipVertical}>
                                <FlipVIcon className={styles.button_icon} style={{ transform: `scaleY(${dataComponent?.flip.y})` }} />
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