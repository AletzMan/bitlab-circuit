import { Handle, HandleProps } from "@xyflow/react";
import styles from "./styles.module.css";

interface TerminalProps extends HandleProps {
	isPolarized?: boolean;
}

export function Terminal(props: TerminalProps) { 
	return (
		<Handle
			{...props}
			className={`${props.isConnectable ? styles.terminal_connectable : styles.terminal} ${props.isPolarized ? styles.terminal_polarized : ''}`}
			 
		/>
	);
}
