import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import {
	AnalogNode,
	ComponentCollapsed,
	ComponentType,
	IConnectedHandles,
	ITerminalSetting,
} from "@/types";
import { LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { ComponentsMap } from "@/constants/components";

export function LogicGate({
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
	},
	selected,
	id,
	parentId,
}: NodeProps<AnalogNode>) {
	const { updateNode } = useReactFlow();
	const [connectedHandlesInternal, setConnectedHandlesInternal] = useState<IConnectedHandles[]>([
		{ isConnected: false, type: "passive" },
		{ isConnected: false, type: "passive" },
		{ isConnected: false, type: "passive" },
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
				newState[handleNumber] = { isConnected: isOnConnect, type: "passive" };
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
				newState[handleNumber] = { isConnected: isOnConnect, type: "passive" };
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
		const positionPIN1 =
			type === ComponentType.NOTGate || type === ComponentType.BUFFERGate ? "0" : "10px";
		switch (rotation) {
			case 0: {
				position = [Position.Left, Position.Right, Position.Left];
				adjustment = [
					{ top: `calc(50% + ${positionPIN1})` },
					{ top: "50%" },
					{ top: "calc(50% - 10px)" },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [Position.Right, Position.Left, Position.Right];
					adjustment = [
						{ top: `calc(50% + ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% - 10px)" },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [Position.Left, Position.Right, Position.Left];
					adjustment = [
						{ top: `calc(50% - ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% + 10px)" },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [Position.Right, Position.Left, Position.Right];
					adjustment = [
						{ top: `calc(50% - ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% + 10px)" },
					];
				}
				return { position, adjustment };
			}
			case 90: {
				position = [Position.Top, Position.Bottom, Position.Top];
				adjustment = [
					{ left: `calc(50% - ${positionPIN1})` },
					{ left: "50%" },
					{ left: "calc(50% + 10px)" },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [Position.Top, Position.Bottom, Position.Top];
					adjustment = [
						{ left: `calc(50% + ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% - 10px)" },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [Position.Bottom, Position.Top, Position.Bottom];
					adjustment = [
						{ left: `calc(50% - ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% + 10px)" },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [Position.Bottom, Position.Top, Position.Bottom];
					adjustment = [
						{ left: `calc(50% + ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% - 10px)" },
					];
				}
				return { position, adjustment };
			}
			case 180: {
				position = [Position.Right, Position.Left, Position.Right];
				adjustment = [
					{ top: `calc(50% - ${positionPIN1})` },
					{ top: "50%" },
					{ top: "calc(50% + 10px)" },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [Position.Left, Position.Right, Position.Left];
					adjustment = [
						{ top: `calc(50% - ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% + 10px)" },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [Position.Right, Position.Left, Position.Right];
					adjustment = [
						{ top: `calc(50% + ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% - 10px)" },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [Position.Left, Position.Right, Position.Left];
					adjustment = [
						{ top: `calc(50% + ${positionPIN1})` },
						{ top: "50%" },
						{ top: "calc(50% - 10px)" },
					];
				}
				return { position, adjustment };
			}
			case 270: {
				position = [Position.Bottom, Position.Top, Position.Bottom];
				adjustment = [
					{ left: `calc(50% + ${positionPIN1})` },
					{ left: "50%" },
					{ left: "calc(50% - 10px)" },
				];
				if (flip.x === -1 && flip.y === 1) {
					position = [Position.Bottom, Position.Top, Position.Bottom];
					adjustment = [
						{ left: `calc(50% - ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% + 10px)" },
					];
				} else if (flip.y === -1 && flip.x === 1) {
					position = [Position.Top, Position.Bottom, Position.Top];
					adjustment = [
						{ left: `calc(50% + ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% - 10px)" },
					];
				} else if (flip.y === -1 && flip.x === -1) {
					position = [Position.Top, Position.Bottom, Position.Top];
					adjustment = [
						{ left: `calc(50% - ${positionPIN1})` },
						{ left: "50%" },
						{ left: "calc(50% + 10px)" },
					];
				}
				return { position, adjustment };
			}

			default:
				return { position, adjustment };
		}
	}, [rotation, flip.x, flip.y, type]);

	return (
		<div
			className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${
				isAdditionInvalid && styles.box_invalid
			}`}
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
			<div
				style={{
					transform: `rotate(${rotation}deg) scaleX(${
						rotation === 0 || rotation === 180 ? flip.x : flip.y
					})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})`,
				}}
				className={styles.icon}
			>
				{ComponentsMap[type].icon}
			</div>
			<Terminal
				type="source"
				position={terminalSettings.position[0]}
				id="1"
				isConnectable={!connectedHandlesInternal[0].isConnected}
				style={terminalSettings.adjustment[0]}
			/>
			<Terminal
				type="source"
				position={terminalSettings.position[1]}
				id="2"
				isConnectable={!connectedHandlesInternal[1].isConnected}
				style={terminalSettings.adjustment[1]}
			/>
			{type !== ComponentType.NOTGate && type !== ComponentType.BUFFERGate && (
				<Terminal
					type="source"
					position={terminalSettings.position[2]}
					id="3"
					isConnectable={!connectedHandlesInternal[2].isConnected}
					style={terminalSettings.adjustment[2]}
				/>
			)}
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
