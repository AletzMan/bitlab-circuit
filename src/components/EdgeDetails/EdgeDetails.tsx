
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
        setCurrentColor(css);
        console.log(css);
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