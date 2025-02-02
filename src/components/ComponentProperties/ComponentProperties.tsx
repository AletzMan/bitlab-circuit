
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edge, useNodesData, useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AlignBottomIcon, AlignHorizontalCenterIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon, AlignVerticalCenterIcon, DeletetIcon, DistributeHorizontalIcon, DistributeVerticalIcon, DuplicateIcon, FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon } from "@/icons";
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

    const handleChangeUnitOptional = (value: string) => {
        if (node && dataComponent) {
            updateNodeData(node?.id, { prefix_optional: value });
            setDataComponent({ ...dataComponent, prefix_optional: value });
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

    const handleChangeHiddenValueOptional = (e: CheckboxChangeEvent) => {
        const newValue = e.target.checked;
        if (node && dataComponent) {
            updateNodeData(node?.id, { isValueOptionalVisible: !newValue });
            setDataComponent({ ...dataComponent, isValueOptionalVisible: !newValue });
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

    const handleAlign = (align: 'h-left' | 'h-center' | 'h-right' | 'v-top' | 'v-center' | 'v-bottom' | 'h-dist' | 'v-dist') => {
        const nodes = getNodes().filter(node => node.selected);
        switch (align) {
            case 'h-left': {
                const topNode = [...nodes].sort((a, b) => a.position.x - b.position.x)[0];
                const posX = topNode.position.x;
                const nodeHeight = topNode.measured?.width;
                if (posX && nodeHeight) {
                    const alignPosX = posX;
                    nodes.forEach(currentNode => {
                        updateNode(currentNode.id, (prevNode) => ({ ...prevNode, position: { ...prevNode.position, x: alignPosX } }));
                    });
                }
            }
                break;
            case 'h-center': {
                const sortNodes = [...nodes].sort((a, b) => (b?.measured?.width ?? 0) - (a?.measured?.width ?? 0));
                const highestNode = sortNodes[0];
                const posX = highestNode.position.x;
                const nodeWider = (highestNode.measured?.width ?? 0);
                if (posX && nodeWider) {
                    const alignPosX = posX + (nodeWider / 2);
                    nodes.forEach(currentNode => {
                        if (currentNode.id !== highestNode.id) {
                            updateNode(currentNode.id, (prevNode) => ({ ...prevNode, position: { ...prevNode.position, x: alignPosX - (((currentNode.measured?.width ?? 0)) / 2) } }));
                        }
                    });
                }
            }
                break;
            case 'h-right': {
                const sortNodes = [...nodes].sort((a, b) => (b.position.x + (b.measured?.width ?? 0)) - (a.position.x + (a.measured?.width ?? 0)));
                const bottomNode = sortNodes[0];
                const posX = bottomNode.position.x;
                const nodeWider = bottomNode.measured?.width;
                if (posX && nodeWider) {
                    const alignPosX = posX + nodeWider;
                    nodes.forEach(currentNode => {
                        if (currentNode.id !== bottomNode.id) {
                            updateNode(currentNode.id, (prevNode) => ({
                                ...prevNode,
                                position: {
                                    ...prevNode.position,
                                    x: (alignPosX - (currentNode?.measured?.width ?? 0))
                                }
                            }));
                        }
                    });
                }
            }
                break;
            case 'v-top': {
                const topNode = [...nodes].sort((a, b) => a.position.y - b.position.y)[0];
                const posY = topNode.position.y;
                const nodeHeight = topNode.measured?.height;
                if (posY && nodeHeight) {
                    const alignPosY = posY;
                    nodes.forEach(currentNode => {
                        updateNode(currentNode.id, (prevNode) => ({ ...prevNode, position: { ...prevNode.position, y: alignPosY } }));
                    });
                }
            }
                break;
            case 'v-center': {
                const sortNodes = [...nodes].sort((a, b) => (b?.measured?.height ?? 0) - (a?.measured?.height ?? 0));
                const highestNode = sortNodes[0];
                const posY = highestNode.position.y;
                const nodeHeight = (highestNode.measured?.height ?? 0);
                if (posY && nodeHeight) {
                    const alignPosY = posY + (nodeHeight / 2);
                    nodes.forEach(currentNode => {
                        if (currentNode.id !== highestNode.id) {
                            updateNode(currentNode.id, (prevNode) => ({ ...prevNode, position: { ...prevNode.position, y: alignPosY - (((currentNode.measured?.height ?? 0)) / 2) } }));
                        }
                    });
                }
            }
                break;
            case 'v-bottom': {
                const sortNodes = [...nodes].sort((a, b) => (b.position.y + (b.measured?.height ?? 0)) - (a.position.y + (a.measured?.height ?? 0)));
                const bottomNode = sortNodes[0];
                const posY = bottomNode.position.y;
                const nodeHeight = bottomNode.measured?.height;
                if (posY && nodeHeight) {
                    const alignPosY = posY + nodeHeight;
                    nodes.forEach(currentNode => {
                        if (currentNode.id !== bottomNode.id) {
                            updateNode(currentNode.id, (prevNode) => ({
                                ...prevNode,
                                position: {
                                    ...prevNode.position,
                                    y: (alignPosY - (currentNode?.measured?.height ?? 0))
                                }
                            }));
                        }
                    });
                }
            }
                break;
            case 'h-dist': {
                const sortedNodes = [...nodes].sort((a, b) => (a.position.x ?? 0) - (b.position.x ?? 0));

                if (sortedNodes.length < 2) break;

                const minX = sortedNodes[0].position.x ?? 0;
                const maxX = sortedNodes[sortedNodes.length - 1].position.x ?? 0;
                const totalNodes = sortedNodes.length;

                const spacing = (maxX - minX) / (totalNodes - 1);

                sortedNodes.forEach((node, index) => {
                    const newX = minX + index * spacing;
                    updateNode(node.id, (prevNode) => ({
                        ...prevNode,
                        position: { ...prevNode.position, x: newX }
                    }));
                });

            }
                break;
            case 'v-dist': {
                const sortedNodes = [...nodes].sort((a, b) => (a.position.y ?? 0) - (b.position.y ?? 0));

                if (sortedNodes.length < 2) break;

                const minY = sortedNodes[0].position.y ?? 0;
                const maxY = sortedNodes[sortedNodes.length - 1].position.y ?? 0;
                const totalNodes = sortedNodes.length;

                const spacing = (maxY - minY) / (totalNodes - 1);

                sortedNodes.forEach((node, index) => {
                    const newY = minY + index * spacing;
                    updateNode(node.id, (prevNode) => ({
                        ...prevNode,
                        position: { ...prevNode.position, y: newY }
                    }));
                });

                console.log("Distribución vertical completa:", sortedNodes);
            }
                break;

            default:
                break;
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
                                    {dataComponent?.isValueOptionalVisible && <>
                                        <Divider style={{ margin: "4px 0" }} variant="dashed" />
                                        <div className={styles.value}>
                                            <Flex vertical>
                                                <label className={styles.value_label}>Optional Value</label>
                                                <Input className={styles.value_number}
                                                    value={dataComponent?.value_optional} size="middle"
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                                                        if (dataComponent) {
                                                            setDataComponent({ ...dataComponent, value_optional: newValue });
                                                            updateNodeData(node.id, { value_optional: newValue });
                                                        }
                                                    }}
                                                    addonAfter={dataComponent &&
                                                        <Select defaultValue={dataComponent.prefix_optional} value={dataComponent.prefix_optional} onChange={handleChangeUnitOptional}>
                                                            {dataComponent.unit_optional && UNITS[dataComponent.unit_optional].map(value => (
                                                                <Option key={value} value={value}>{value}</Option>
                                                            ))}
                                                        </Select>}
                                                />
                                            </Flex>
                                            <label className={`${styles.value_label} ${styles.value_hidden}`}>
                                                Hidden
                                                <Checkbox onChange={handleChangeHiddenValueOptional} checked={!dataComponent?.isValueOptionalVisible} />
                                            </label>
                                        </div>
                                    </>}
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
                <>
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
                    <label className={styles.label}>Align</label>
                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                    <Flex className={styles.groupNodes} wrap gap="4px" >
                        <Tooltip placement="top" title="Horizontal Align Left (Ctrl+Alt+Left)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("h-left")}><AlignLeftIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Horizontal Align Center (Ctrl+Alt+Right)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("h-center")}><AlignHorizontalCenterIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Horizontal Align Right (Ctrl+Alt+Right)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("h-right")}><AlignRightIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Vertical Align Top (Ctrl+Alt+Up)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("v-top")}><AlignTopIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Vertical Align Center (Ctrl+Alt+Up)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("v-center")}><AlignVerticalCenterIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Vertical Align Bottom (Ctrl+Alt+Bottom)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("v-bottom")}><AlignBottomIcon /></Button>
                        </Tooltip>
                    </Flex>
                    <Divider style={{ margin: "16px 0" }} />
                    <label className={styles.label}>Distribute spacing</label>
                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                    <Flex className={styles.groupNodes} wrap gap="4px" >
                        <Tooltip placement="top" title="Distribute Horizontal (Ctrl+Alt+0)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("h-dist")}><DistributeHorizontalIcon /></Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Distribute Vertical (Ctrl+Alt+1)" color="cyan" >
                            <Button className={styles.button} variant="outlined" color="default" onClick={() => handleAlign("v-dist")}><DistributeVerticalIcon /></Button>
                        </Tooltip>
                    </Flex>
                    <Divider style={{ margin: "16px 0" }} />
                </>
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