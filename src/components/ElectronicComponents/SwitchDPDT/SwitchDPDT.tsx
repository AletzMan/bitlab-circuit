import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import {
	AnalogNode,
	ComponentCollapsed,
	ComponentType,
	IConnectedHandles,
	ITerminalSetting,
} from "@/types";
import {
	ArrowPushIcon,
	LockIcon,
	SwitchDPDTCloseIcon,
	SwitchDPDTOpenIcon,
	UnlockIcon,
} from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useEffect, useMemo, useState, MouseEvent, CSSProperties } from "react";
import { ComponentsMap } from "@/constants/components";

export function SwitchDPDT({
	data: {
		type,
		rotation,
		flip,
		collapsed,
		isLock,
		designator,
		isDesignatorVisible,
		connectedHandles,
		size,
		state,
	},
	selected,
	id,
	parentId,
}: NodeProps<AnalogNode>) {
	const { updateNode, updateNodeData } = useReactFlow();
	const [connectedHandlesInternal, setConnectedHandlesInternal] = useState<IConnectedHandles[]>([
		{
			isConnected: false,
			type: "passive",
		},
		{
			isConnected: false,
			type: "passive",
		},
		{
			isConnected: false,
			type: "passive",
		},
		{
			isConnected: false,
			type: "passive",
		},
		{
			isConnected: false,
			type: "passive",
		},
		{
			isConnected: false,
			type: "passive",
		},
	]);

	useEffect(() => {
		setConnectedHandlesInternal(connectedHandles);
	}, [connectedHandles]);

	const isAdditionValid = collapsed === ComponentCollapsed.Add;
	const isAdditionInvalid = collapsed === ComponentCollapsed.NotAdd;

	const onConnect = (connections: Connection[]) => {
		setConnectionsTerminals(connections, true);
	};

	const onDisconnect = (connections: Connection[]) => {
		setConnectionsTerminals(connections, false);
	};

	useNodeConnections({ onConnect, onDisconnect });

	const setConnectionsTerminals = (connections: Connection[], isOnConnect: boolean) => {
		connections.forEach((connection) => {
			const newState = [...connectedHandlesInternal];

			if (connection.target === id) {
				const handleNumber = Number(connection.targetHandle) - 1;

				newState[handleNumber].isConnected = isOnConnect;
				setConnectedHandlesInternal(newState);
				updateNode(id, (prevNode) => ({
					data: {
						...prevNode.data,
						connectedHandles: [...newState],
					},
				}));
			}
			if (connection.source === id) {
				const handleNumber = Number(connection.sourceHandle) - 1;
				newState[handleNumber].isConnected = isOnConnect;
				setConnectedHandlesInternal(newState);
				updateNode(id, (prevNode) => ({
					data: {
						...prevNode.data,
						connectedHandles: [...newState],
					},
				}));
			}
		});
	};

	const terminalSettings: ITerminalSetting = useMemo(() => {
		let position: Position[] = [];
		let adjustment: CSSProperties[] = [];
		switch (rotation) {
			case 0: {
				position = [
					Position.Left,
					Position.Right,
					Position.Right,
					Position.Left,
					Position.Right,
					Position.Right,
				];
				adjustment = [
					{ top: `calc(50% - 20px)` },
					{ top: `calc(50% - 30px)` },
					{ top: `calc(50% - 10px)` },
					{ top: `calc(50% + 20px)` },
					{ top: `calc(50% + 30px)` },
					{ top: `calc(50% + 10px)` },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [
						Position.Right,
						Position.Left,
						Position.Left,
						Position.Right,
						Position.Left,
						Position.Left,
					];
					adjustment = [
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [
						Position.Left,
						Position.Right,
						Position.Right,
						Position.Left,
						Position.Right,
						Position.Right,
					];
					adjustment = [
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [
						Position.Right,
						Position.Left,
						Position.Left,
						Position.Right,
						Position.Left,
						Position.Left,
					];
					adjustment = [
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
					];
				}
				return { position: position, adjustment };
			}
			case 90: {
				position = [
					Position.Top,
					Position.Bottom,
					Position.Bottom,
					Position.Top,
					Position.Bottom,
					Position.Bottom,
				];
				adjustment = [
					{ left: `calc(50% + 20px)` },
					{ left: `calc(50% + 30px)` },
					{ left: `calc(50% + 10px)` },
					{ left: `calc(50% - 20px)` },
					{ left: `calc(50% - 30px)` },
					{ left: `calc(50% - 10px)` },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [
						Position.Top,
						Position.Bottom,
						Position.Bottom,
						Position.Top,
						Position.Bottom,
						Position.Bottom,
					];
					adjustment = [
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [
						Position.Bottom,
						Position.Top,
						Position.Top,
						Position.Bottom,
						Position.Top,
						Position.Top,
					];
					adjustment = [
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [
						Position.Bottom,
						Position.Top,
						Position.Top,
						Position.Bottom,
						Position.Top,
						Position.Top,
					];
					adjustment = [
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
					];
				}
				return { position: position, adjustment };
			}
			case 180: {
				position = [
					Position.Right,
					Position.Left,
					Position.Left,
					Position.Right,
					Position.Left,
					Position.Left,
				];
				adjustment = [
					{ top: `calc(50% + 20px)` },
					{ top: `calc(50% + 30px)` },
					{ top: `calc(50% + 10px)` },
					{ top: `calc(50% - 20px)` },
					{ top: `calc(50% - 30px)` },
					{ top: `calc(50% - 10px)` },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [
						Position.Left,
						Position.Right,
						Position.Right,
						Position.Left,
						Position.Right,
						Position.Right,
					];
					adjustment = [
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [
						Position.Right,
						Position.Left,
						Position.Left,
						Position.Right,
						Position.Left,
						Position.Left,
					];
					adjustment = [
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [
						Position.Left,
						Position.Right,
						Position.Right,
						Position.Left,
						Position.Right,
						Position.Right,
					];
					adjustment = [
						{ top: `calc(50% - 20px)` },
						{ top: `calc(50% - 30px)` },
						{ top: `calc(50% - 10px)` },
						{ top: `calc(50% + 20px)` },
						{ top: `calc(50% + 30px)` },
						{ top: `calc(50% + 10px)` },
					];
				}
				return { position: position, adjustment };
			}
			case 270: {
				position = [
					Position.Bottom,
					Position.Top,
					Position.Top,
					Position.Bottom,
					Position.Top,
					Position.Top,
				];
				adjustment = [
					{ left: `calc(50% - 20px)` },
					{ left: `calc(50% - 30px)` },
					{ left: `calc(50% - 10px)` },
					{ left: `calc(50% + 20px)` },
					{ left: `calc(50% + 30px)` },
					{ left: `calc(50% + 10px)` },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [
						Position.Bottom,
						Position.Top,
						Position.Top,
						Position.Bottom,
						Position.Top,
						Position.Top,
					];
					adjustment = [
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [
						Position.Top,
						Position.Bottom,
						Position.Bottom,
						Position.Top,
						Position.Bottom,
						Position.Bottom,
					];
					adjustment = [
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [
						Position.Top,
						Position.Bottom,
						Position.Bottom,
						Position.Top,
						Position.Bottom,
						Position.Bottom,
					];
					adjustment = [
						{ left: `calc(50% + 20px)` },
						{ left: `calc(50% + 30px)` },
						{ left: `calc(50% + 10px)` },
						{ left: `calc(50% - 20px)` },
						{ left: `calc(50% - 30px)` },
						{ left: `calc(50% - 10px)` },
					];
				}
				return { position: position, adjustment };
			}

			default:
				return { position: position, adjustment };
		}
	}, [rotation, flip.x, flip.y]);

	const handleChangeState = (_e: MouseEvent<HTMLButtonElement>) => {
		// Usa updateNode con un actualizador funcional para obtener el estado más reciente
		updateNode(id, (prevNode) => {
			const currentOnState = (prevNode as AnalogNode).data.state?.on ?? false; // Obtén el estado 'on' actual del nodo previo
			const newOnState = !currentOnState; // Calcula el nuevo estado

			// Lógica para botones de pulso (mantienen el estado temporalmente)
			if (type === ComponentType.PusuhButtonClose || type === ComponentType.PusuhButtonOpen) {
				// Actualiza el nodo al nuevo estado (ON/OFF)
				// Usamos updateNodeData para evitar un bucle de renderizado ya que el return del primer updateNode
				// también actualiza el estado del nodo. Aquí solo queremos un efecto secundario.
				updateNodeData(id, {
					state: {
						...(prevNode.data.state || {}), // Asegura que 'state' no sea undefined
						on: newOnState,
					},
				});

				// Restaura el estado original después de 100ms
				setTimeout(() => {
					updateNodeData(id, {
						state: {
							...(prevNode.data.state || {}), // Asegura que 'state' no sea undefined
							on: currentOnState, // Vuelve al estado original
						},
					});
				}, 100);

				// Retorna el nodo con el estado *temporalmente* cambiado para la renderización inmediata
				return {
					...prevNode,
					data: {
						...prevNode.data,
						state: {
							...(prevNode.data.state || {}),
							on: newOnState,
						},
					},
				};
			} else {
				// Para interruptores normales, simplemente alterna el estado
				return {
					...prevNode, // Copia el nodo anterior
					data: {
						...prevNode.data, // Copia los datos anteriores del nodo
						state: {
							...(prevNode.data.state || {}), // Asegura que 'state' no sea undefined antes de copiar
							on: newOnState, // Invierte el estado 'on' para el nuevo objeto de estado
						},
					},
				};
			}
		});
	};

	console.log(connectedHandlesInternal);

	return (
		<div
			className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${
				isAdditionInvalid && styles.box_invalid
			} ${rotation === 90 && styles.box_90} ${rotation === 270 && styles.box_270}`}
		>
			{parentId && selected && (
				<div
					className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${
						rotation === 270 && styles.lock_270
					}`}
					onClick={() =>
						updateNode(id, (prevNode) => ({
							extent: prevNode.extent === "parent" ? undefined : "parent",
							data: { ...prevNode.data, isLock: !isLock },
						}))
					}
				>
					{!isLock && <UnlockIcon />}
					{isLock && <LockIcon />}
				</div>
			)}
			<div className={`${selected && styles.box_selected}`}></div>
			{selected && (
				<button className={styles.action} onClick={handleChangeState}>
					<ArrowPushIcon
						className={`${styles.action_icon} ${state?.on && styles.action_icon_active}`}
					/>
				</button>
			)}
			<div
				className={styles.icon}
				style={{
					transform: `rotate(${rotation}deg) scaleX(${
						rotation === 0 || rotation === 180 ? flip.x : flip.y
					})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})`,
				}}
			>
				{state ? (
					state?.on ? (
						<SwitchDPDTCloseIcon />
					) : (
						<SwitchDPDTOpenIcon />
					)
				) : (
					ComponentsMap[type].icon
				)}
			</div>
			<Terminal
				type="source"
				position={terminalSettings.position[0]}
				id="1"
				isConnectable={!connectedHandlesInternal[0]!.isConnected}
				style={terminalSettings.adjustment[0]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[1]}
				id="2"
				isConnectable={!connectedHandlesInternal[1]!.isConnected}
				style={terminalSettings.adjustment[1]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[2]}
				id="3"
				isConnectable={!connectedHandlesInternal[2]!.isConnected}
				style={terminalSettings.adjustment[2]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[3]}
				id="4"
				isConnectable={!connectedHandlesInternal[3]!.isConnected}
				style={terminalSettings.adjustment[3]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[4]}
				id="5"
				isConnectable={!connectedHandlesInternal[4]!.isConnected}
				style={terminalSettings.adjustment[4]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[5]}
				id="6"
				isConnectable={!connectedHandlesInternal[5]!.isConnected}
				style={terminalSettings.adjustment[5]}
			/>
			{isDesignatorVisible && (
				<span
					className={`${styles.designator} ${size === "small" && styles.designator_small} ${
						size === "medium" && styles.designator_medium
					} ${size === "large" && styles.designator_large} ${
						rotation === 90 && styles.designator_90
					}   ${rotation === 270 && styles.designator_270}`}
					style={{ transform: `rotate(${rotation - rotation}deg)` }}
				>
					{designator}
				</span>
			)}
		</div>
	);
}
