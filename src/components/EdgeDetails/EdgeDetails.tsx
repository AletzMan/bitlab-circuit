
import styles from "./styles.module.css";
import { DeletetIcon } from "@/icons";
import { Button, Flex, Card, Divider, ColorPicker } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ComponentEdge } from "@/types";
import useDebounce from "@/hooks/useDebounce";
import { genPresets } from "@/helpers";
import { CustomColorsWire } from "@/constants";
import { AggregationColor } from "antd/es/color-picker/color";
import { useTheme } from "@/store";
import { useReactFlow } from "@xyflow/react";

interface IEdgeProps {
    edge: ComponentEdge;
    setSelectedEdge: Dispatch<SetStateAction<ComponentEdge | undefined>>,
    removeEdges: (edges: ComponentEdge[] | undefined) => void,
    isSingleEdgeSelection: boolean,
    selectedEdges: ComponentEdge[],
    setEdges: Dispatch<SetStateAction<ComponentEdge[]>>
}

export default function EdgeDetails({
    edge,
    setSelectedEdge,
    removeEdges,
    isSingleEdgeSelection,
    selectedEdges,
    setEdges,
}: IEdgeProps) {
    const { currentTheme } = useTheme();
    const { getEdges, getNodes, setNodes } = useReactFlow();
    const [currentColor, setCurrentColor] = useState(edge?.data?.color);
    const debouncedColor = useDebounce(currentColor, 500);
    const presets = genPresets(CustomColorsWire);

    useEffect(() => {
        setCurrentColor(edge?.data?.color);
    }, [edge]);

    useEffect(() => {
        setEdges((prevEdges) =>
            prevEdges.map((edgePrev) =>
                edgePrev.id === edge.id
                    ? { ...edgePrev, data: { ...edgePrev.data, color: debouncedColor as string, path: "" } }
                    : edgePrev
            )
        );
    }, [debouncedColor, edge.id, setEdges]);

    const handleDelete = () => {
        if (isSingleEdgeSelection) {
            removeEdges([edge]);
        } else {
            removeEdges(selectedEdges);
        }
        setSelectedEdge(undefined);
    };

    const handleChangeColorWire = (_value: AggregationColor, css: string) => {
        const visitedEdges = new Set<string>(); // Para evitar procesar edges repetidos
        const visitedNodes = new Set<string>(); // Para evitar procesar nodos repetidos


        // Función para propagar cambios a edges conectados
        const propagateEdges = (nodeId: string) => { // Cambiar color del nodo actual si es `nodeComponent`
            setNodes(prevNodes =>
                prevNodes.map(node =>
                    node.id === nodeId && node.type === "nodeComponent"
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                color: css as string, // Cambiar color del nodo
                            },
                        }
                        : node
                )
            );
            // Encontrar edges conectados al nodo actual que aún no han sido procesados
            const connectedEdges = getEdges().filter(
                currentEdge =>
                    (currentEdge.source === nodeId || currentEdge.target === nodeId) &&
                    currentEdge.id !== edge.id && // Ignorar el edge inicial
                    !visitedEdges.has(currentEdge.id)
            );

            // Marcar edges como visitados
            connectedEdges.forEach(edge => visitedEdges.add(edge.id));

            // Actualizar los edges conectados
            setEdges(prevEdges =>
                prevEdges.map(edgePrev => {
                    if (connectedEdges.some(edge => edge.id === edgePrev.id)) {
                        return {
                            ...edgePrev,
                            data: {
                                ...edgePrev.data,
                                color: css as string, // Cambiar color
                                path: "", // Otras propiedades que desees cambiar
                            },
                        };
                    }
                    return edgePrev;
                })
            );

            // Propagar cambios a los nodos conectados por estos edges
            connectedEdges.forEach(edge => {
                const connectedNodeId = edge.source === nodeId ? edge.target : edge.source;
                const connectedNode = getNodes().find(node => node.id === connectedNodeId);

                // Asegurarse de que el nodo es del tipo `nodeComponent` y no ha sido procesado
                if (connectedNode?.type === "nodeComponent" && !visitedNodes.has(connectedNode.id)) {
                    visitedNodes.add(connectedNode.id);
                    propagateEdges(connectedNode.id); // Propagar al siguiente nodo
                }
            });
        };

        // Obtener los nodos iniciales del edge seleccionado
        const startNode = getNodes().find(node => node.id === edge.source);
        const endNode = getNodes().find(node => node.id === edge.target);

        // Iniciar la propagación desde los nodos iniciales si son de tipo `nodeComponent`
        if (startNode?.type === "nodeComponent") {
            visitedNodes.add(startNode.id);
            propagateEdges(startNode.id);
        }
        if (endNode?.type === "nodeComponent") {
            visitedNodes.add(endNode.id);
            propagateEdges(endNode.id);
        }

        // También actualizar el edge seleccionado
        setEdges(prevEdges =>
            prevEdges.map(edgePrev =>
                edgePrev.id === edge.id
                    ? {
                        ...edgePrev,
                        data: {
                            ...edgePrev.data,
                            color: css as string, // Cambiar color
                            path: "", // Otras propiedades que desees cambiar
                        },
                    }
                    : edgePrev
            )
        );

        setCurrentColor(css);
    };

    return (
        <Card className={styles.details} size="small" type="inner" >
            <Flex vertical>
                <label className="details_name"  >Wire</label>
                <Flex>
                    <Flex vertical align="center">
                        <ColorPicker
                            presets={currentTheme === "dark" ? [presets[1]] : [presets[0]]}
                            value={currentColor} styles={{ popupOverlayInner: { maxWidth: "85px" } }}
                            onChange={handleChangeColorWire} format="hex" disabledFormat
                        />
                        <label className={styles.label}>Color</label>
                    </Flex>
                </Flex>
                <Divider style={{ margin: "16px 0" }} />
                <label className="label">Actions</label>
                <Flex gap={10} wrap>
                    <Button className={styles.button} variant="filled" color="danger" onClick={handleDelete}>
                        <DeletetIcon />
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}