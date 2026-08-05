import { Handle, HandleProps } from "@xyflow/react";
import styles from "./styles.module.css";


export function Terminal(props: HandleProps) { 
	return (
		<Handle
			{...props}
			className={`${props.isConnectable ? styles.terminal_connectable : styles.terminal} `}
			 
		>
			<svg viewBox="0 0 33 33">
				<line x1="0" y1="4.95" x2="33" y2="4.95"  strokeWidth="5" 	shape-rendering="crispEdges"/>
			</svg>
		</Handle>
	);
}
