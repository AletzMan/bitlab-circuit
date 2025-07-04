import {
	ANDIcon,
	BJTNPNIcon,
	BJTPNPIcon,
	BUFFERIcon,
	BatteryIcon,
	BoardIcon,
	CapacitorIcon,
	DiodeIcon,
	FerriteCoreInductorIcon,
	GroundIcon,
	InductorIcon,
	IronCoreInductorIcon,
	JFETNIcon,
	JFETPIcon,
	LDRIcon,
	LEDIcon,
	NANDIcon,
	NChainDepMOSFETIcon,
	NChainEnhMOSFETIcon,
	NORIcon,
	NOTIcon,
	NodeIcon,
	ORIcon,
	PChainDepMOSFETIcon,
	PChainEnhMOSFETIcon,
	PhotoDiodeIcon,
	PhotoTransistorNPN3PinsIcon,
	PhotoTransistorNPNIcon,
	PhotoTransistorPNP3PinsIcon,
	PhotoTransistorPNPIcon,
	PhotovoltaicCellIcon,
	PolarisedCapacitorIcon,
	PotentiometerIcon,
	PowerSupplyIcon,
	PresetFerriteCoreInductorIcon,
	PresetIronCoreInductorIcon,
	PushButtonCloseNCIcon,
	PushButtonOpenNOIcon,
	RelayDPDTOpenIcon,
	RelayDPSTOpenIcon,
	RelaySPDTOpenIcon,
	RelaySPSTOpenIcon,
	ResistorIcon,
	RheostatIcon,
	SchottkyIcon,
	SwitchDPDTOpenIcon,
	SwitchDPSTOpenIcon,
	SwitchSPDTOpenIcon,
	SwitchSPSTOpenIcon,
	TVSDiodeIcon,
	ThermistorIcon,
	TrimmerCapacitorIcon,
	TunnelIcon,
	VaractorIcon,
	VariableCapacitorIcon,
	VariableFerriteCoreInductorIcon,
	VariableIronCoreInductorIcon,
	XNORIcon,
	XORIcon,
	ZenerIcon,
} from "@/icons";
import { Categories, ComponentProperties, ComponentType, UnitsType } from "@/types";

// Mapa para almacenar contadores por tipo
export const ComponentsMap: Record<ComponentType, ComponentProperties> = {
	[ComponentType.Board]: {
		name: "Board",
		value: 0,
		category: Categories.Structure,
		componentType: ComponentType.Board,
		icon: <BoardIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "BR",
		type: "board",
		has_properties: false,
		isDesignatorVisible: false,
		isValueVisible: false,
		connectedHandles: [],
		style: {
			height: 200,
			width: 200,
		},
		size: "small",
	},
	[ComponentType.Ground]: {
		name: "Ground",
		value: 0,
		category: Categories["Power & Supply"],
		componentType: ComponentType.Ground,
		icon: <GroundIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "G",
		type: "ground",
		has_properties: true,
		isDesignatorVisible: false,
		isValueVisible: false,
		connectedHandles: [
			{
				isConnected: false,
				type: "ground",
			},
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Node]: {
		name: "Node",
		value: 0,
		category: Categories.Structure,
		componentType: ComponentType.Node,
		icon: <NodeIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "N",
		type: "nodeComponent",
		has_properties: false,
		isDesignatorVisible: false,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		color: "var(--foreground-color)",
		style: undefined,
		size: "small",
	},
	[ComponentType.Battery]: {
		name: "Battery",
		value: 12,
		category: Categories["Power & Supply"],
		componentType: ComponentType.Battery,
		icon: <BatteryIcon />,
		unit: UnitsType.VoltageDC,
		prefix: "V",
		designator: "BAT",
		type: "battery",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "negative" },
			{ isConnected: false, type: "positive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PhotovoltaicCell]: {
		name: "PhotoVoltaic Cell",
		value: 12,
		category: Categories["Power & Supply"],
		componentType: ComponentType.PhotovoltaicCell,
		icon: <PhotovoltaicCellIcon />,
		unit: UnitsType.VoltageDC,
		prefix: "V",
		designator: "BAT",
		type: "battery",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "negative" },
			{ isConnected: false, type: "positive" },
		],
		style: undefined,
		size: "medium",
	},
	[ComponentType.PowerSupply]: {
		name: "Power Supply",
		value: 12,
		value_optional: 120,
		category: Categories["Power & Supply"],
		componentType: ComponentType.PowerSupply,
		icon: <PowerSupplyIcon />,
		unit: UnitsType.VoltageDC,
		unit_optional: UnitsType.VoltageAC,
		prefix: "V",
		prefix_optional: "VAC",
		designator: "PS",
		type: "powerSupply",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		isValueOptionalVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "negative" },
			{ isConnected: false, type: "positive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Resistor]: {
		name: "Resistor",
		value: 1,
		category: Categories.Resistors,
		componentType: ComponentType.Resistor,
		icon: <ResistorIcon />,
		unit: UnitsType.Ohm,
		prefix: "kΩ",
		designator: "R",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Rheostat]: {
		name: "Rheostat",
		value: 1,
		category: Categories.Resistors,
		componentType: ComponentType.Rheostat,
		icon: <RheostatIcon />,
		unit: UnitsType.Ohm,
		prefix: "kΩ",
		designator: "RH",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Thermistor]: {
		name: "Thermistor",
		value: 10,
		category: Categories.Resistors,
		componentType: ComponentType.Thermistor,
		icon: <ThermistorIcon />,
		unit: UnitsType.Ohm,
		prefix: "kΩ",
		designator: "RT",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Photoresistance]: {
		name: "Photo Resistance",
		value: 10,
		category: Categories.Resistors,
		componentType: ComponentType.Photoresistance,
		icon: <LDRIcon />,
		unit: UnitsType.Ohm,
		prefix: "KΩ",
		designator: "LDR",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "medium",
	},
	[ComponentType.Potentiometer]: {
		name: "Potentiometer",
		value: 1,
		category: Categories.Resistors,
		componentType: ComponentType.Potentiometer,
		icon: <PotentiometerIcon />,
		unit: UnitsType.Ohm,
		prefix: "kΩ",
		designator: "R",
		type: "potentiometer",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Capacitor]: {
		name: "Capacitor",
		value: 100,
		category: Categories.Capacitors,
		componentType: ComponentType.Capacitor,
		icon: <CapacitorIcon />,
		unit: UnitsType.Capacitance,
		prefix: "nF",
		designator: "C",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PolarisedCapacitor]: {
		name: "Polarised Capacitor",
		value: 4.7,
		category: Categories.Capacitors,
		componentType: ComponentType.PolarisedCapacitor,
		icon: <PolarisedCapacitorIcon />,
		unit: UnitsType.Capacitance,
		prefix: "µF",
		designator: "C",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "negative" },
			{ isConnected: false, type: "positive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.VariableCapacitor]: {
		name: "Variable Capacitor",
		value: 100,
		category: Categories.Capacitors,
		componentType: ComponentType.VariableCapacitor,
		icon: <VariableCapacitorIcon />,
		unit: UnitsType.Capacitance,
		prefix: "µF",
		designator: "VC",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TrimmerCapacitor]: {
		name: "Trimmer Capacitor",
		value: 100,
		category: Categories.Capacitors,
		componentType: ComponentType.TrimmerCapacitor,
		icon: <TrimmerCapacitorIcon />,
		unit: UnitsType.Capacitance,
		prefix: "µF",
		designator: "VC",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Diode]: {
		name: "Diode",
		value: 0.7,
		value_optional: 0.7,
		category: Categories.Diodes,
		componentType: ComponentType.Diode,
		icon: <DiodeIcon />,
		unit: UnitsType.VoltageDC,
		unit_optional: UnitsType.VoltageDC,
		prefix: "V",
		prefix_optional: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Led]: {
		name: "LED",
		value: 1.7,
		value_optional: 20,
		forwardVoltage: 1.7,
		internalResistance: 8.5,
		category: Categories.Diodes,
		componentType: ComponentType.Led,
		icon: <LEDIcon />,
		unit: UnitsType.VoltageDC,
		unit_optional: UnitsType.Current,
		prefix: "V",
		prefix_optional: "mA",
		designator: "LED",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
		color: "transparent",
	},
	[ComponentType.Zener]: {
		name: "Zener",
		value: 6,
		category: Categories.Diodes,
		componentType: ComponentType.Zener,
		icon: <ZenerIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Schottky]: {
		name: "Schottky",
		value: 30,
		category: Categories.Diodes,
		componentType: ComponentType.Schottky,
		icon: <SchottkyIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Tunnel]: {
		name: "Tunnel",
		value: 15,
		category: Categories.Diodes,
		componentType: ComponentType.Tunnel,
		icon: <TunnelIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PhotoDiode]: {
		name: "Photo Diode",
		value: 6,
		category: Categories.Diodes,
		componentType: ComponentType.PhotoDiode,
		icon: <PhotoDiodeIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TVSDiode]: {
		name: "TVS Diode",
		value: 15,
		category: Categories.Diodes,
		componentType: ComponentType.TVSDiode,
		icon: <TVSDiodeIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.Varactor]: {
		name: "Varactor",
		value: 30,
		category: Categories.Diodes,
		componentType: ComponentType.Varactor,
		icon: <VaractorIcon />,
		unit: UnitsType.Current,
		prefix: "V",
		designator: "D",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorBJT_NPN]: {
		name: "Transistor BJT NPN",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorBJT_NPN,
		icon: <BJTNPNIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorBJT_PNP]: {
		name: "Transistor BJT PNP",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorBJT_PNP,
		icon: <BJTPNPIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorJFET_N]: {
		name: "Transistor JFET N-Chan",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorJFET_N,
		icon: <JFETNIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorJFET_P]: {
		name: "Transistor JFET P-Chan",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorJFET_P,
		icon: <JFETPIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorMOSFET_N_Enhanced]: {
		name: "Transistor MOSFET N-Chan Enhanced",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorMOSFET_N_Enhanced,
		icon: <NChainEnhMOSFETIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorMOSFET_P_Enhanced]: {
		name: "Transistor MOSFET P-Chan Enhanced",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorMOSFET_P_Enhanced,
		icon: <PChainEnhMOSFETIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorMOSFET_N_Depletion]: {
		name: "Transistor MOSFET N-Chan Depletion",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorMOSFET_N_Depletion,
		icon: <NChainDepMOSFETIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.TransistorMOSFET_P_Depletion]: {
		name: "Transistor MOSFET P-Chan Depletion",
		value: 1,
		category: Categories.Transistors,
		componentType: ComponentType.TransistorMOSFET_P_Depletion,
		icon: <PChainDepMOSFETIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PhotoTransistorNPN]: {
		name: "Photo Transistor NPN",
		value: 100,
		category: Categories.Transistors,
		componentType: ComponentType.PhotoTransistorNPN,
		icon: <PhotoTransistorNPNIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "photoTransistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "large",
	},
	[ComponentType.PhotoTransistorPNP]: {
		name: "Photo Transistor PNP",
		value: 100,
		category: Categories.Transistors,
		componentType: ComponentType.PhotoTransistorPNP,
		icon: <PhotoTransistorPNPIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "photoTransistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "large",
	},
	[ComponentType.PhotoTransistorNPN3Pins]: {
		name: "Photo Transistor NPN 3 Pins",
		value: 100,
		category: Categories.Transistors,
		componentType: ComponentType.PhotoTransistorNPN3Pins,
		icon: <PhotoTransistorNPN3PinsIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "large",
	},
	[ComponentType.PhotoTransistorPNP3Pins]: {
		name: "Photo Transistor PNP 3 Pins",
		value: 100,
		category: Categories.Transistors,
		componentType: ComponentType.PhotoTransistorPNP3Pins,
		icon: <PhotoTransistorPNP3PinsIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "Q",
		type: "transistorComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "large",
	},
	[ComponentType.Inductor]: {
		name: "Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.Inductor,
		icon: <InductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.FerriteCoreInductor]: {
		name: "Ferrite Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.FerriteCoreInductor,
		icon: <FerriteCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.IronCoreInductor]: {
		name: "Iron Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.IronCoreInductor,
		icon: <IronCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PresetFerriteCoreInductor]: {
		name: "Preset Ferrite Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.PresetFerriteCoreInductor,
		icon: <PresetFerriteCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PresetIronCoreInductor]: {
		name: "Preset Iron Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.PresetIronCoreInductor,
		icon: <PresetIronCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.VariableFerriteCoreInductor]: {
		name: "Variable Ferrite Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.VariableFerriteCoreInductor,
		icon: <VariableFerriteCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.VariableIronCoreInductor]: {
		name: "Variable Iron Core Inductor",
		value: 100,
		category: Categories.Inductors,
		componentType: ComponentType.VariableIronCoreInductor,
		icon: <VariableIronCoreInductorIcon />,
		unit: UnitsType.Inductance,
		prefix: "mH",
		designator: "L",
		type: "analogComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.SwitchSPST]: {
		name: "SPST Switch",
		value: 0,
		state: {
			on: false,
		},
		category: Categories["Switches & Relays"],
		componentType: ComponentType.SwitchSPST,
		icon: <SwitchSPSTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "mechanicalComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.SwitchDPST]: {
		name: "DPST Switch",
		value: 0,
		state: {
			on: false,
		},
		category: Categories["Switches & Relays"],
		componentType: ComponentType.SwitchDPST,
		icon: <SwitchDPSTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "switchDPST",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.PusuhButtonOpen]: {
		name: "Push Button Normally Open",
		value: 0,
		state: {
			on: false,
		},
		category: Categories["Switches & Relays"],
		componentType: ComponentType.PusuhButtonOpen,
		icon: <PushButtonOpenNOIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "mechanicalComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "medium",
	},
	[ComponentType.PusuhButtonClose]: {
		name: "Push Button Normally Close",
		state: {
			on: true,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.PusuhButtonClose,
		icon: <PushButtonCloseNCIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "mechanicalComponent",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.SwitchSPDT]: {
		name: "Switch SPDT",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.SwitchSPDT,
		icon: <SwitchSPDTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "switchSPDT",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.SwitchDPDT]: {
		name: "Switch DPDT",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.SwitchDPDT,
		icon: <SwitchDPDTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "SW",
		type: "switchDPDT",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.RelaySPST]: {
		name: "Relay SPST",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.RelaySPST,
		icon: <RelaySPSTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "K",
		type: "relaySPST",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.RelayDPST]: {
		name: "Relay DPST",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.RelayDPST,
		icon: <RelayDPSTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "K",
		type: "relayDPST",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.RelaySPDT]: {
		name: "Relay SPDT",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.RelaySPDT,
		icon: <RelaySPDTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "K",
		type: "relaySPDT",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.RelayDPDT]: {
		name: "Relay DPDT",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Switches & Relays"],
		componentType: ComponentType.RelayDPDT,
		icon: <RelayDPDTOpenIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "K",
		type: "relayDPDT",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "passive" },
			{ isConnected: false, type: "positive" },
			{ isConnected: false, type: "negative" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.ANDGate]: {
		name: "AND Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.ANDGate,
		icon: <ANDIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.ORGate]: {
		name: "OR Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.ORGate,
		icon: <ORIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.NANDGate]: {
		name: "NAND Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.NANDGate,
		icon: <NANDIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.NORGate]: {
		name: "NOR Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.NORGate,
		icon: <NORIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.XORGate]: {
		name: "XOR Gate",
		value: "",
		category: Categories["Logic Gates"],
		componentType: ComponentType.XORGate,
		state: undefined,
		icon: <XORIcon />,
		prefix: "",
		collapsed: undefined,
		unit: UnitsType.Undefined,
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isValueVisible: false,
		isDesignatorVisible: true,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		color: undefined,
		size: "small",
		style: undefined,
	},
	[ComponentType.XNORGate]: {
		name: "XNOR Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.XNORGate,
		icon: <XNORIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
			{ isConnected: false, type: "input" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.NOTGate]: {
		name: "NOT Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.NOTGate,
		icon: <NOTIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
	[ComponentType.BUFFERGate]: {
		name: "BUFFER Gate",
		state: {
			on: false,
		},
		value: 0,
		category: Categories["Logic Gates"],
		componentType: ComponentType.BUFFERGate,
		icon: <BUFFERIcon />,
		unit: UnitsType.Undefined,
		prefix: "",
		designator: "U",
		type: "logicGate",
		has_properties: true,
		isDesignatorVisible: true,
		isValueVisible: false,
		connectedHandles: [
			{ isConnected: false, type: "input" },
			{ isConnected: false, type: "output" },
		],
		style: undefined,
		size: "small",
	},
};

export const typeGroupDiode = new Set<ComponentType>([
	ComponentType.Diode,
	ComponentType.Zener,
	ComponentType.Schottky,
	ComponentType.Tunnel,
	ComponentType.PhotoDiode,
	ComponentType.TVSDiode,
	ComponentType.Varactor,
]);

export const typeGroupResistor = new Set<ComponentType>([
	ComponentType.Resistor,
	ComponentType.Potentiometer,
]);

export const typeGroupCapacitor = new Set<ComponentType>([
	ComponentType.Capacitor,
	ComponentType.PolarisedCapacitor,
]);

export const typeGroupVariableCapacitor = new Set<ComponentType>([
	ComponentType.VariableCapacitor,
	ComponentType.TrimmerCapacitor,
]);

export const typeGroupTransistor = new Set<ComponentType>([
	ComponentType.TransistorBJT_NPN,
	ComponentType.TransistorBJT_PNP,
	ComponentType.TransistorJFET_N,
	ComponentType.TransistorJFET_P,
	ComponentType.TransistorMOSFET_N_Enhanced,
	ComponentType.TransistorMOSFET_P_Enhanced,
	ComponentType.TransistorMOSFET_N_Depletion,
	ComponentType.TransistorMOSFET_P_Depletion,
	ComponentType.PhotoTransistorNPN,
	ComponentType.PhotoTransistorPNP,
	ComponentType.PhotoTransistorNPN3Pins,
	ComponentType.PhotoTransistorPNP3Pins,
]);

export const typeGroupTransistorSmall = new Set<ComponentType>([
	ComponentType.TransistorBJT_NPN,
	ComponentType.TransistorBJT_PNP,
	ComponentType.PhotoTransistorNPN,
	ComponentType.PhotoTransistorPNP,
	ComponentType.PhotoTransistorNPN3Pins,
	ComponentType.PhotoTransistorPNP3Pins,
]);

export const typeGroupInductor = new Set<ComponentType>([
	ComponentType.Inductor,
	ComponentType.FerriteCoreInductor,
	ComponentType.IronCoreInductor,
	ComponentType.PresetFerriteCoreInductor,
	ComponentType.PresetIronCoreInductor,
	ComponentType.VariableFerriteCoreInductor,
	ComponentType.VariableIronCoreInductor,
]);

export const typeGroupSwitch = new Set<ComponentType>([
	ComponentType.SwitchSPST,
	ComponentType.SwitchDPST,
	ComponentType.PusuhButtonOpen,
	ComponentType.PusuhButtonClose,
	ComponentType.SwitchSPDT,
	ComponentType.SwitchDPDT,
]);

export const typeGroupRelay = new Set<ComponentType>([
	ComponentType.RelaySPST,
	ComponentType.RelayDPST,
	ComponentType.RelaySPDT,
	ComponentType.RelayDPDT,
]);

export type TypeGroupKey =
	| "ResistorGroup"
	| "CapacitorGroup"
	| "VariableCapacitorGroup"
	| "DiodeGroup"
	| "TransistorGroup"
	| "SwitchGroup"
	| "InductorGroup"
	| "RelayGroup";

// Define un mapa que relacione los grupos con sus tipos correspondientes
export const typeGroups: Record<TypeGroupKey, { types: Set<ComponentType>; designator: string }> = {
	ResistorGroup: { types: typeGroupResistor, designator: "R" },
	CapacitorGroup: { types: typeGroupCapacitor, designator: "C" },
	VariableCapacitorGroup: { types: typeGroupVariableCapacitor, designator: "VC" },
	DiodeGroup: {
		types: new Set([...typeGroupDiode].filter((type) => type !== ComponentType.Led)),
		designator: "D",
	},
	TransistorGroup: { types: typeGroupTransistor, designator: "Q" },
	InductorGroup: { types: typeGroupInductor, designator: "L" },
	SwitchGroup: { types: typeGroupSwitch, designator: "SW" },
	RelayGroup: { types: typeGroupRelay, designator: "K" },
};
