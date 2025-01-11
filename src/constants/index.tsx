import { BoardIcon, CapacitorIcon, ResistorIcon } from "../icons";
import { ComponentType } from "../types";

export const COMPONENTS = [
    {
        icon: <ResistorIcon />,
        type: ComponentType.Resistor,
        label: "Resistor"
    },
    {
        icon: <CapacitorIcon />,
        type: ComponentType.Capacitor,
        label: "Capacitor"
    },
    {
        icon: <BoardIcon />,
        type: ComponentType.Board,
        label: 'Board'
    }
];