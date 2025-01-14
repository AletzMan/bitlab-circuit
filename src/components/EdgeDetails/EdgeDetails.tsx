
import styles from "./styles.module.css";
import { DeletetIcon } from "@/icons";
import { Button, Flex, Card, Divider, Input } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ComponentEdge } from "@/types";

interface IEdgeProps {
    edge: ComponentEdge;
    setSelectedEdge: Dispatch<SetStateAction<ComponentEdge | undefined>>,
    removeEdges: (edges: ComponentEdge[] | undefined) => void,
    isSingleEdgeSelection: boolean,
    selectedEdges: ComponentEdge[],
    setEdges: React.Dispatch<React.SetStateAction<ComponentEdge[]>>
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


    useEffect(() => {
        setCurrentColor(edge?.data?.color);
    }, [edge]);

    const handleDelete = () => {
        if (isSingleEdgeSelection) {
            removeEdges([edge]);
        } else {
            removeEdges(selectedEdges);
        }
        setSelectedEdge(undefined);
    };

    const handleChangeColorWire = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.currentTarget.value;
        setEdges((prevEdges) =>
            prevEdges.map((edgePrev) =>
                edgePrev.id === edge.id
                    ? { ...edgePrev, data: { ...edgePrev.data, color: newColor, path: "" } }
                    : edgePrev
            )
        );
        setCurrentColor(newColor);
    };

    return (
        <Card className={styles.details} size="small" type="inner" >
            <Flex vertical>
                <label className="details_name"  >Wire</label>
                <Input type="color" value={currentColor} onChange={handleChangeColorWire} />
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