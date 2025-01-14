
import styles from "./styles.module.css";
import { DeletetIcon } from "@/icons";
import { Button, Flex, Card, Divider, Input } from "antd";
import { Dispatch, SetStateAction, useEffect, useState, ChangeEvent } from "react";
import { ComponentEdge } from "@/types";
import useDebounce from "@/hooks/useDebounce";

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
    const [currentColor, setCurrentColor] = useState(edge?.data?.color);
    const debouncedColor = useDebounce(currentColor, 500);

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

    const handleChangeColorWire = (e: ChangeEvent<HTMLInputElement>) => {
        const newColor = e.currentTarget.value;
        setCurrentColor(newColor);
    };

    return (
        <Card className={styles.details} size="small" type="inner" >
            <Flex vertical>
                <label className="details_name"  >Wire</label>
                <Flex>
                    <Flex vertical align="center">
                        <Input className={styles.input} type="color" value={currentColor} onChange={handleChangeColorWire} />
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