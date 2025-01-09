export enum ElectricalComponentType {
    Resistor = 'resistor',
    Capacitor = 'capacitor',
    Led = "led",
    Battery = 'battery'
}

export type ElectricalComponentData = {
    value?: number
    type?: ElectricalComponentType
}