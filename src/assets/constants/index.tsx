import { CapacitorIcon, ResistorIcon } from "../icons";
import { ElectricalComponentType } from "../types";

export const COMPONENTS = [
    {
        icon: <ResistorIcon />,
        type: ElectricalComponentType.Resistor,
        label: "Resistor"
    },
    {
        icon: <CapacitorIcon />,
        type: ElectricalComponentType.Resistor,
        label: "Capacitor"
    }
];