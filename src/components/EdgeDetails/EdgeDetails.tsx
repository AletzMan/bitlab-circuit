import { Edge } from "@xyflow/react";
import styles from "./styles.module.css";
import { DeletetIcon } from "@/icons";
import { Button, Flex, Card } from "antd";
import { Dispatch, SetStateAction } from "react";


export default function EdgeDetails({
    edge,
    setEdges,
    setSelectedEdge
}: {
    edge: Edge;
    setEdges: Dispatch<SetStateAction<Edge[]>>,
    setSelectedEdge: Dispatch<SetStateAction<Edge | undefined>>
}) {


    const handleDelete = () => {
        setEdges(prevEdges => prevEdges.filter(prevEdge => prevEdge.id !== edge.id));
        setSelectedEdge(undefined);
    };

    return (
        <Card className={styles.details} title="Edge" size="small">
            <label>Actions</label>
            <Flex gap={10} wrap>
                <Button onClick={handleDelete}>
                    <DeletetIcon />
                </Button>
            </Flex>
        </Card>
    );
}