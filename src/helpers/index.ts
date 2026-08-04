/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentsMap, TypeGroupKey, typeGroups } from "@/constants/components";
import { AnalogNode, ComponentProperties, ComponentType, Presets } from "../types";
import { Connection, XYPosition } from "@xyflow/react";
import { createRoot } from "react-dom/client"; 

/**
 * Verifica si un punto está dentro de un cuadrado.
 * @param point - El punto a verificar.
 * @param box - El cuadrado en el que se verificará.
 * @returns Un booleano que indica si el punto está dentro del cuadrado.
 */
export const isPointInBox = (
	point: { x: number; y: number },
	box: { x: number; y: number; height: number; width: number }
) => {
	return (
		point.x >= box.x &&
		point.x <= box.x + box.width &&
		point.y >= box.y &&
		point.y <= box.y + box.height
	);
};

/**
 * Obtiene la unidad de un componente.
 * @param type - El tipo del componente.
 * @returns Un string que representa la unidad del componente.
 */
export function getUnit(type: ComponentType) {
	let unit;
	switch (type) {
		case ComponentType.Resistor: {
			unit = "kΩ";
			break;
		}
		case ComponentType.Capacitor: {
			unit = "μF";
			break;
		}
	}
	return unit;
}

/**
 * Calcula la luminancia de un color en formato hexadecimal.
 * @param hex - El color en formato hexadecimal.
 * @returns Un número que representa la luminancia del color.
 */
export function getLuminance(hex: string): number {
	const [r, g, b] = hex
		.replace("#", "")
		.match(/.{2}/g)!
		.map((channel) => parseInt(channel, 16) / 255);

	const toLinear = (value: number) =>
		value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

	return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Verifica si hay buen contraste.
 * @param colorHex - El color en formato hexadecimal.
 * @param theme - El tema ("dark" o "light").
 * @returns Un booleano que indica si hay buen contraste.
 */
export function hasGoodContrast(colorHex: string, theme: "dark" | "light"): boolean {
	const colorLuminance = getLuminance(colorHex);
	const themeLuminance = theme === "dark" ? 0 : 1;

	const contrastRatio =
		(Math.max(colorLuminance, themeLuminance) + 0.05) /
		(Math.min(colorLuminance, themeLuminance) + 0.05);

	return contrastRatio >= 4.5;
}

/**
 * Genera los presets para los colores.
 * @param customColors - Los colores personalizados.
 * @returns Un array de presets.
 */
export function genPresets(customColors: { [key: string]: string[] }) {
	return Object.entries(customColors).map<Presets>(([label, colors]) => ({
		label,
		colors,
		key: label,
	}));
}

/**
 * Obtiene las propiedades de un componente.
 * @param type - El tipo del componente.
 * @param components - Los componentes del circuito.
 * @returns Un objeto con las propiedades del componente.
 */
export function getComponentProperties(
	type: ComponentType,
	components: AnalogNode[]
): ComponentProperties {
	const designator = ComponentsMap[type]?.designator;
	if (!designator) {
		throw new Error(`Unknown component type: ${type}`);
	}

	// Buscar el grupo correspondiente al tipo
	const groupEntry = Object.entries(typeGroups).find(([_, group]) => group.types.has(type));

	let matchingComponents: AnalogNode[] = [];
	if (groupEntry) {
		const [, group] = groupEntry;
		matchingComponents = components.filter((component) => group.types.has(component.data.type));
	} else {
		matchingComponents = components.filter((component) => component.data.type === type);
	}

	const properties: ComponentProperties = {
		designator: `${designator}${matchingComponents.length + 1}`,
		prefix: ComponentsMap[type].prefix,
		unit: ComponentsMap[type].unit,
		prefix_optional: ComponentsMap[type].prefix_optional,
		unit_optional: ComponentsMap[type].unit_optional,
		value: ComponentsMap[type].value,
		value_optional: ComponentsMap[type].value_optional,
		state: ComponentsMap[type].state,
		collapsed: ComponentsMap[type].collapsed,
		icon: ComponentsMap[type].icon,
		category: ComponentsMap[type].category,
		componentType: ComponentsMap[type].componentType,
		type: ComponentsMap[type].type,
		has_properties: ComponentsMap[type].has_properties,
		isDesignatorVisible: ComponentsMap[type].isDesignatorVisible,
		isValueVisible: ComponentsMap[type].isValueVisible,
		isValueOptionalVisible: ComponentsMap[type].isValueOptionalVisible,
		forwardVoltage: ComponentsMap[type].forwardVoltage,
		internalResistance: ComponentsMap[type].internalResistance,
		connectedHandles: ComponentsMap[type].connectedHandles,
		color: ComponentsMap[type].color,
		size: ComponentsMap[type].size,
		style: ComponentsMap[type].style,
		name: ComponentsMap[type].name,
	};

	return properties;
}

const initialValues = Object.keys(ComponentsMap).reduce((acc, key) => {
	acc[key as ComponentType] = 0; // Asigna el valor inicial (por ejemplo, 0)
	return acc;
}, {} as Record<ComponentType, number>);

/**
 * Reordena los designadores de los componentes.
 * @param components - Los componentes a reordenar.
 * @returns Un array de componentes con los designadores reordenados.
 */
export function reorderComponentDesignators(components: AnalogNode[]): AnalogNode[] {
	const typeCounters: Record<
		| ComponentType
		| "DiodeGroup"
		| "CapacitorGroup"
		| "VariableCapacitorGroup"
		| "ResistorGroup"
		| "TransistorGroup"
		| "InductorGroup"
		| "SwitchGroup"
		| "RelayGroup"
		| "GateGroup",
		number
	> = {
		CapacitorGroup: 0,
		DiodeGroup: 0,
		VariableCapacitorGroup: 0,
		ResistorGroup: 0,
		TransistorGroup: 0,
		InductorGroup: 0,
		SwitchGroup: 0,
		RelayGroup: 0,
		GateGroup: 0,
		...initialValues,
	};

	return components.map((component) => {
		// Itera sobre el mapa para encontrar el grupo al que pertenece el tipo
		let groupKey: TypeGroupKey | undefined;
		for (const key in typeGroups) {
			if (typeGroups[key as TypeGroupKey].types.has(component.data.type)) {
				groupKey = key as TypeGroupKey;
				break;
			}
		}

		// Incrementar el contador correspondiente
		if (groupKey) {
			typeCounters[groupKey] += 1; // Aquí ya no dará error porque groupKey tiene el tipo correcto
		} else {
			// Si no pertenece a ningún grupo predefinido, usa el tipo directamente
			typeCounters[component.data.type] += 1; // Este tipo debe coincidir con las claves de typeCounters
		}

		// Generar la nueva referencia
		const newDesignator = groupKey
			? `${typeGroups[groupKey].designator}${typeCounters[groupKey]}` // Usa la primera letra del grupo
			: `${ComponentsMap[component.data.type].designator.toUpperCase()}${typeCounters[component.data.type]
			}`;

		return {
			...component,
			data: {
				...component.data,
				designator: newDesignator,
			},
		};
	});
}

/**
 * Obtiene la imagen de arrastre para un componente.
 * @param type - El tipo del componente.
 * @returns Un div con la imagen de arrastre.
 */
export function getImageBackgroundDrag(type: ComponentType): HTMLDivElement {
	let currentComponent: ComponentProperties | undefined = undefined;

	currentComponent = ComponentsMap[type];

	if (!currentComponent) currentComponent = ComponentsMap[type];

	const tempContainer = document.createElement("div");
	if (currentComponent) {
		tempContainer.className = "elementDrag";
		// Posicionar fuera del viewport para evitar reflow/scroll
		tempContainer.style.position = "fixed";
		tempContainer.style.left = "-9999px";
		tempContainer.style.top = "-9999px";
		tempContainer.style.pointerEvents = "none";

		// Renderizar el ícono en el contenedor
		const root = createRoot(tempContainer as HTMLElement);
		root.render(currentComponent.icon);
		document.body.appendChild(tempContainer);

		// Remover el contenedor después de que el browser tome la imagen
		setTimeout(() => {
			root.unmount();
			document.body.removeChild(tempContainer);
		}, 0);
	}
	return tempContainer;
}

/**
 * Obtiene la nueva posición de un nodo al solaparse con otro.
 * @param dragNodePosition - La posición del nodo que se está arrastrando.
 * @param overlappingNodePosition - La posición del nodo que se solapa.
 * @returns La nueva posición del nodo.
 */
export const getNewPositionByOverlapping = (
	dragNodePosition: XYPosition,
	overlappingNodePosition: XYPosition
): XYPosition => {
	const widthNode = 60;
	const horizontalOverlapping: "right" | "left" | "none" =
		overlappingNodePosition.x === dragNodePosition.x
			? "none"
			: overlappingNodePosition.x > dragNodePosition.x
				? "left"
				: "right";
	const verticalOverlapping: "top" | "bottom" | "none" =
		overlappingNodePosition.y === dragNodePosition.y
			? "none"
			: overlappingNodePosition.y > dragNodePosition.y
				? "top"
				: "bottom";

	// Si no hay solapamiento en ninguna dirección, no mover el nodo
	if (horizontalOverlapping === "none" && verticalOverlapping === "none") {
		return {
			x: dragNodePosition.x + widthNode * 2, // Mover a la derecha
			y: dragNodePosition.y, // Mover hacia abajo
		};
	}
	// Desplazamientos predeterminados en caso de solapamiento
	let offsetX = verticalOverlapping === "none" ? 20 : 0;
	let offsetY = horizontalOverlapping === "none" ? 20 : 0;

	// Desplazar al lado más cercano en horizontal
	if (horizontalOverlapping !== "none") {
		const distanceLeft = dragNodePosition.x - overlappingNodePosition.x;
		const distanceRight = overlappingNodePosition.x - dragNodePosition.x;
		if (distanceLeft < distanceRight) {
			offsetX = widthNode; // Mover a la derecha
		} else {
			offsetX = -widthNode; // Mover a la izquierda
		}
	}

	// Desplazar al lado más cercano en vertical
	if (verticalOverlapping !== "none") {
		const distanceTop = dragNodePosition.y - overlappingNodePosition.y;
		const distanceBottom = overlappingNodePosition.y - dragNodePosition.y;

		if (distanceTop < distanceBottom) {
			offsetY = widthNode; // Mover hacia abajo
		} else {
			offsetY = -widthNode; // Mover hacia arriba
		}
	}

	return { x: dragNodePosition.x - offsetX, y: dragNodePosition.y - offsetY };
};

/**
 * Agrupa los ítems en un objeto con claves y valores.
 * @param items - Los ítems a agrupar.
 * @param key - La clave por la que se agruparán los ítems.
 * @returns Un objeto con claves y valores.
 */
export function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
	return items.reduce((acc, item) => {
		const groupKey = String(item[key]); // Convertimos la clave a string
		if (!acc[groupKey]) {
			acc[groupKey] = [];
		}
		acc[groupKey].push(item);
		return acc;
	}, {} as Record<string, T[]>);
}

/**
 * Agrupa los ítems en un array de objetos con categoría e ítems.
 * @param items - Los ítems a agrupar.
 * @param key - La clave por la que se agruparán los ítems.
 * @returns Un array de objetos con categoría e ítems.
 */
export function groupByToArray<T, K extends keyof T>(
	items: T[],
	key: K
): Array<{ category: T[K]; items: T[] }> {
	const grouped = items.reduce((acc, item) => {
		const groupKey = item[key];
		if (!acc.has(groupKey)) {
			acc.set(groupKey, []);
		}
		acc.get(groupKey)!.push(item);
		return acc;
	}, new Map<T[K], T[]>());

	// Convertimos el Map a un array de objetos con categoría e ítems
	return Array.from(grouped, ([category, items]) => ({
		category,
		items,
	}));
}

/**
 * Obtiene el siguiente número de designador para un componente.
 * @param designator - El designador actual.
 * @param nodes - Los nodos del circuito.
 * @returns El siguiente número de designador.
 */
export function getNextDesignatorNumber(designator: string, nodes: AnalogNode[]): string {
	const quantityNodes = nodes.filter(
		(node) => node.data.designator.replace(/\d+/g, "") === designator.replace(/\d+/g, "")
	).length;
	const letterDesignator = designator.replace(/\d+/g, "");
	return `${letterDesignator}${quantityNodes + 1}`;
}


const SVG_NS = "http://www.w3.org/2000/svg";

export enum ProbeOrientation {
	Left = "left",
	Right = "right",
	Top = "top",
	Bottom = "bottom",
}

export enum MeasurementType {
	Voltage = "voltage",
	Current = "current",
	Resistance = "resistance",
}

export interface MeasurementData {
	type: MeasurementType;
	edgeId?: string;
	nodeId?: string;
	secondaryEdgeId?: string; // Para mediciones que requieren dos puntos
	secondaryNodeId?: string;
	value: number;
}

export function createMeasurementView(
	measurementId: string,
	type: MeasurementType,
	value: number,
	primaryX: number,
	primaryY: number,
	orientation: ProbeOrientation,
	secondaryX?: number,
	secondaryY?: number
) {

	const container = document.querySelector(
		".container-measurements"
	) as HTMLElement;

	if (!container) return;

	removeProbe(measurementId);

	//----------------------------------------
	// SVG
	//----------------------------------------

	let svg = container.querySelector(".measurement-layer") as SVGSVGElement;

	if (!svg) {
		svg = document.createElementNS(SVG_NS, "svg");
		svg.classList.add("measurement-layer");
		container.appendChild(svg);
	}

	//----------------------------------------
	// Probe
	//----------------------------------------

	const probe = document.createElement("div");
	probe.className = `viewVoltage measurement-${measurementId}`;
	probe.dataset.measurementId = measurementId;
	probe.dataset.measurementType = type;

	//----------------------------------------

	const header = document.createElement("div");
	header.className = "measurement-header";

	let unit = "V";
	let label = "DC VOLTAGE";

	switch (type) {
		case MeasurementType.Voltage:
			label = "DC VOLTAGE";
			unit = "V";
			break;
		case MeasurementType.Current:
			label = "DC CURRENT";
			unit = "A";
			break;
		case MeasurementType.Resistance:
			label = "RESISTANCE";
			unit = "Ω";
			break;
	}

	header.innerText = label;

	//----------------------------------------

	const display = document.createElement("div");
	display.className = "measurement-display";
	display.innerHTML = `${value.toFixed(2)} <span class="unit">${unit}</span>`;

	probe.append(
		header,
		display
	);

	//----------------------------------------

	const node = document.createElement("div");
	node.className = `measurement-node measurement-node-${measurementId}`;

	//----------------------------------------

	node.style.left = `${primaryX}px`;
	node.style.top = `${primaryY}px`;

	//----------------------------------------
	// Posicionar probe
	//----------------------------------------

	const pos = getProbePosition(
		primaryX,
		primaryY,
		orientation
	);

	probe.style.left = `${pos.x}px`;
	probe.style.top = `${pos.y}px`;
	probe.style.cursor = "grab";

	//----------------------------------------

	container.appendChild(node);
	container.appendChild(probe);



	//----------------------------------------
	//-----------Remove Button Logic----------
	//----------------------------------------

	const removeButton = document.createElement("button");
	removeButton.className = "measurement-remove";
	// El mismo SVG que usa Ant Design para CloseOutlined
	removeButton.innerHTML = `
  <span role="img" aria-label="close" class="anticon anticon-close">
    <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="10px" height="10px" fill="currentColor" aria-hidden="true">
      <path d="M563.8 512l262.5-262.5c12.5-12.5 12.5-32.8 0-45.3l-28.3-28.3c-12.5-12.5-32.8-12.5-45.3 0L490.2 438.4 227.7 175.9c-12.5-12.5-32.8-12.5-45.3 0l-28.3 28.3c-12.5 12.5-12.5 32.8 0 45.3L416.6 512 154.1 774.5c-12.5 12.5-12.5 32.8 0 45.3l28.3 28.3c12.5 12.5 32.8 12.5 45.3 0l262.5-262.5 262.5 262.5c12.5 12.5 32.8 12.5 45.3 0l28.3-28.3c12.5-12.5 12.5-32.8 0-45.3L563.8 512z"></path>
    </svg>
  </span>
`;
	removeButton.addEventListener("click", () => {
		removeProbe(measurementId);
	});

	probe.appendChild(removeButton);



	//----------------------------------------
	// Wire
	//----------------------------------------

	const glow = document.createElementNS(SVG_NS, "path");
	glow.classList.add("measurement-wire-glow", `wire-glow-${measurementId}`);
	const wire = document.createElementNS(SVG_NS, "path");
	wire.classList.add("measurement-wire", `wire-${measurementId}`);
	svg.append(glow);
	svg.append(wire);

	// Calcular el centro del probe para el wire
	const probeWidth = 84;
	const probeHeight = 44;
	const transformOffsetX = 14;
	const transformOffsetY = -18;

	// Función para actualizar el wire
	const updateWireFromProbe = (probeX: number, probeY: number) => {
		const probeCenterX = probeX + probeWidth / 2 + transformOffsetX;
		const probeCenterY = probeY + probeHeight / 2 + transformOffsetY;
		updateWire(
			primaryX,
			primaryY,
			probeCenterX,
			probeCenterY,
			wire,
			glow
		);
	};

	// Inicializar wire
	updateWireFromProbe(pos.x, pos.y);

	// Si hay un segundo punto (para mediciones de corriente/resistencia), crear segundo wire
	let secondaryNode: HTMLElement | null = null;
	let secondaryWire: SVGPathElement | null = null;
	let secondaryGlow: SVGPathElement | null = null;

	if (secondaryX !== undefined && secondaryY !== undefined) {
		secondaryNode = document.createElement("div");
		secondaryNode.className = `measurement-node measurement-node-${measurementId}-secondary`;
		secondaryNode.style.left = `${secondaryX}px`;
		secondaryNode.style.top = `${secondaryY}px`;
		container.appendChild(secondaryNode);

		secondaryGlow = document.createElementNS(SVG_NS, "path");
		secondaryGlow.classList.add("measurement-wire-glow", `wire-glow-${measurementId}-secondary`);
		secondaryWire = document.createElementNS(SVG_NS, "path");
		secondaryWire.classList.add("measurement-wire", `wire-${measurementId}-secondary`);
		svg.append(secondaryGlow);
		svg.append(secondaryWire);

		const updateSecondaryWire = (probeX: number, probeY: number) => {
			const probeCenterX = probeX + probeWidth / 2 + transformOffsetX;
			const probeCenterY = probeY + probeHeight / 2 + transformOffsetY;
			updateWire(
				secondaryX,
				secondaryY,
				probeCenterX,
				probeCenterY,
				secondaryWire!,
				secondaryGlow!
			);
		};

		updateSecondaryWire(pos.x, pos.y);
	}

	//----------------------------------------
	// Arrastre del probe
	//----------------------------------------

	let isDragging = false;
	let dragOffsetX = 0;
	let dragOffsetY = 0;

	probe.addEventListener("mousedown", (e) => {
		e.preventDefault();
		e.stopPropagation();
		isDragging = true;
		probe.style.cursor = "grabbing";

		const currentProbeX = parseFloat(probe.style.left) || 0;
		const currentProbeY = parseFloat(probe.style.top) || 0;
		dragOffsetX = e.clientX - currentProbeX;
		dragOffsetY = e.clientY - currentProbeY;
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDragging) return;

		const viewport = document.querySelector(".react-flow__viewport") as HTMLElement;
		if (!viewport) return;

		const transform = viewport.style.transform;
		let zoom = 1;
		let panX = 0;
		let panY = 0;

		if (transform) {
			const scaleMatch = transform.match(/scale\(([^)]+)\)/);
			const translateMatch = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);

			if (scaleMatch) zoom = parseFloat(scaleMatch[1]);
			if (translateMatch) {
				panX = parseFloat(translateMatch[1]);
				panY = parseFloat(translateMatch[2]);
			}
		}

		const newProbeX = (e.clientX - panX) / zoom - dragOffsetX / zoom;
		const newProbeY = (e.clientY - panY) / zoom - dragOffsetY / zoom;

		probe.style.left = `${newProbeX}px`;
		probe.style.top = `${newProbeY}px`;

		updateWireFromProbe(newProbeX, newProbeY);

		if (secondaryWire && secondaryGlow) {
			const probeCenterX = newProbeX + probeWidth / 2 + transformOffsetX;
			const probeCenterY = newProbeY + probeHeight / 2 + transformOffsetY;
			updateWire(
				secondaryX!,
				secondaryY!,
				probeCenterX,
				probeCenterY,
				secondaryWire,
				secondaryGlow
			);
		}
	});

	document.addEventListener("mouseup", () => {
		if (isDragging) {
			isDragging = false;
			probe.style.cursor = "grab";
		}
	});

}

// Mantener compatibilidad con la función anterior
export function createVoltageView(
	x: number,
	y: number,
	voltage: number,
	edgeId: string,
	orientation: ProbeOrientation
) {
	createMeasurementView(
		edgeId,
		MeasurementType.Voltage,
		voltage,
		x,
		y,
		orientation
	);
}

function getProbePosition(
	x: number,
	y: number,
	side: ProbeOrientation
): { x: number; y: number } {

	const width = 92;
	const height = 44;
	switch (side) {
		case "top":
			return {
				x: x - width / 2,
				y: y - 70
			}

		case "bottom":
			return {
				x: x - width / 2,
				y: y + 45
			};

		case "left":
			return {
				x: x - width - 25,
				y: y - height / 2
			};

		case "right":
			return {
				x: x + 25,
				y: y - height / 2
			};

		default:
			return { x, y };
	}
}

function updateWire(
	nodeX: number,
	nodeY: number,
	probeX: number,
	probeY: number,
	wire: SVGPathElement,
	glow: SVGPathElement
) {

	const d = `M ${nodeX} ${nodeY} L ${probeX} ${probeY}`;
	wire.setAttribute("d", d);
	glow.setAttribute("d", d);

}

export function removeProbe(measurementId: string) {
	console.log("Removing probe", measurementId);
	document.querySelector(`.measurement-${measurementId}`)?.remove();
	document.querySelector(`.measurement-node-${measurementId}`)?.remove();
	document.querySelector(`.measurement-node-${measurementId}-secondary`)?.remove();
	document.querySelector(`.wire-${measurementId}`)?.remove();
	document.querySelector(`.wire-${measurementId}-secondary`)?.remove();
	document.querySelector(`.wire-glow-${measurementId}`)?.remove();
	document.querySelector(`.wire-glow-${measurementId}-secondary`)?.remove();
}

export function changeMeasurementView(measurementId: string, value: number, type?: MeasurementType) {
	const measurementElement = document.querySelector(`.measurement-${measurementId}`) as HTMLElement;
	if (measurementElement) {
		const display = measurementElement.querySelector(".measurement-display");
		if (display) {
			const measurementType = type || (measurementElement.dataset.measurementType as MeasurementType) || MeasurementType.Voltage;
			let unit = "V";

			switch (measurementType) {
				case MeasurementType.Voltage:
					unit = "V";
					break;
				case MeasurementType.Current:
					unit = "A";
					break;
				case MeasurementType.Resistance:
					unit = "Ω";
					break;
			}

			display.innerHTML = `${value.toFixed(2)} <span class="unit">${unit}</span>`;
		}
	}
}

// Mantener compatibilidad con la función anterior
export function changeVoltageView(edgeId: string, voltage: number) {
	changeMeasurementView(edgeId, voltage, MeasurementType.Voltage);
}

/*
export function removeProbe(edgeId: string) {
	const measurementElement = document.querySelector(`.measurement-${edgeId}`);
	if (measurementElement) {
		measurementElement.remove();
	}
}*/

export function clearVoltageView() {
	const measurements = document.querySelectorAll(".viewVoltage");
	measurements.forEach((measurement) => {
		const display = measurement.querySelector(".measurement-display");
		if (display) {
			const measurementElement = measurement as HTMLElement;
			const measurementType = measurementElement.dataset.measurementType as MeasurementType || MeasurementType.Voltage;
			let unit = "V";

			switch (measurementType) {
				case MeasurementType.Voltage:
					unit = "V";
					break;
				case MeasurementType.Current:
					unit = "A";
					break;
				case MeasurementType.Resistance:
					unit = "Ω";
					break;
			}

			display.innerHTML = `0.00 <span class="unit">${unit}</span>`;
		}
	});
}


export function formatCurrent(amperes: number): string {
	if (amperes === 0) return `${"0"}.00 A`;

	const absAmperes = Math.abs(amperes);
	const sign = amperes < 0 ? "-" : "";

	if (absAmperes >= 1) {
		// 1 A o más
		return `${sign}${absAmperes.toFixed(2)} sA`;
	} else if (absAmperes >= 1e-3) {
		// Rango de miliamperios (0.001 A a 0.999 A)
		return `${sign}${(absAmperes * 1e3).toFixed(2)} mA`;
	} else if (absAmperes >= 1e-6) {
		// Rango de microamperios (0.000001 A a 0.000999 A)
		return `${sign}${(absAmperes * 1e6).toFixed(2)} µA`;
	} else if (absAmperes >= 1e-9) {
		// Rango de nanoamperios
		return `${sign}${(absAmperes * 1e9).toFixed(2)} nA`;
	} else {
		// Valores extremadamente pequeños (picoamperios o cercanos a cero por tolerancia del MNA)
		return `0.00 A`;
	}
}

export function formatResistance(ohms: number): string {
	if (ohms === 0) return `${0}.00 Ω`;

	const absOhms = Math.abs(ohms);
	const sign = ohms < 0 ? "-" : "";

	if (absOhms >= 1e6) {
		// 1 MΩ o más
		return `${sign}${(absOhms / 1e6).toFixed(4)} MΩ`;
	} else if (absOhms >= 1e3) {
		// Rango de kilo-ohms (1 kΩ a 999 kΩ)
		return `${sign}${(absOhms / 1e3).toFixed(4)} kΩ`;
	} else if (absOhms >= 1) {
		// Rango de ohms (1 Ω a 999 Ω)
		return `${sign}${absOhms.toFixed(4)} Ω`;
	} else if (absOhms >= 1e-3) {
		// Rango de mili-ohms (0.001 Ω a 0.999 Ω)
		return `${sign}${(absOhms * 1e3).toFixed(4)} mΩ`;
	} else {
		// Valores extremadamente pequeños
		return `0.00 Ω`;
	}
}

export function formatVoltage(volts: number): string {
	if (volts === 0) return `${0}.00 V`;

	const absVolts = Math.abs(volts);
	const sign = volts < 0 ? "-" : "";

	if (absVolts >= 1e3) {
		// 1 kV o más
		return `${sign}${(absVolts / 1e3).toFixed(2)} kV`;
	} else if (absVolts >= 1) {
		// Rango de voltios (1 V a 999 V)
		return `${sign}${absVolts.toFixed(2)} V`;
	} else if (absVolts >= 1e-3) {
		// Rango de milivoltios (0.001 V a 0.999 V)
		return `${sign}${(absVolts * 1e3).toFixed(2)} mV`;
	} else if (absVolts >= 1e-6) {
		// Rango de microvoltios (0.000001 V a 0.000999 V)
		return `${sign}${(absVolts * 1e6).toFixed(2)} µV`;
	} else {
		// Valores extremadamente pequeños
		return `0.00 V`;
	}
}

export function getWireColor(connection: Connection, nodes: AnalogNode[]): string {
	console.log("connection", connection);
	console.log("nodes", nodes);

	const customColorNodeDevices = ['Ammeter', 'Voltmeter', 'Ohmmeter'];
	const sourceNode = nodes.find((node) => node.id === connection.source);
	const targetNode = nodes.find((node) => node.id === connection.target);
	const nameNodeSource = sourceNode?.data.name;
	const nameNodeTarget = targetNode?.data.name;

	if (customColorNodeDevices.includes(nameNodeSource || "")) {
		if (connection.sourceHandle === "1") {
			return "var(--positive-color)";
		}
		return "var(--negative-color)";
	}
	if (customColorNodeDevices.includes(nameNodeTarget || "")) {
		if (connection.targetHandle === "1") {
			return "var(--positive-color)";
		}
		return "var(--negative-color)";
	}
	console.log("nameNodeSource", nameNodeSource);
	console.log("nameNodeTarget", nameNodeTarget);
	return "var(--foreground-color)";
}