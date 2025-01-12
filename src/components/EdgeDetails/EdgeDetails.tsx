import { Edge } from "@xyflow/react";
import styles from "./styles.module.css";
import { DeletetIcon } from "@/icons";
import { Button, Flex, Card } from "antd";
import { Dispatch, SetStateAction } from "react";


export default function EdgeDetails({
    edge,
    setSelectedEdge,
    removeEdges,
    isSingleEdgeSelection,
    selectedEdges,
}: {
    edge: Edge;
    setSelectedEdge: Dispatch<SetStateAction<Edge | undefined>>,
    removeEdges: (edges: Edge[] | undefined) => void,
    isSingleEdgeSelection: boolean,
    selectedEdges: Edge[]
}) {


    const handleDelete = () => {
        if (isSingleEdgeSelection) {
            removeEdges([edge]);
        } else {
            removeEdges(selectedEdges);
        }
        setSelectedEdge(undefined);
    };

    return (
        <Card className={styles.details} title="Edge" size="small" type="inner" >
            <label>Actions</label>
            <Flex gap={10} wrap>
                <Button className={styles.button} variant="filled" color="danger" onClick={handleDelete}>
                    <DeletetIcon />
                </Button>
            </Flex>
        </Card>
    );
}