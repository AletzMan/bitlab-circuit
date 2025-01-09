import { ConnectionLineComponentProps, getSimpleBezierPath } from "@xyflow/react";


export function ConnectionLine({ fromX, fromY, toX, toY, connectionStatus }: ConnectionLineComponentProps) {
    const [d] = getSimpleBezierPath({ sourceX: fromX, sourceY: fromY, targetX: toX, targetY: toY });
    let color = 'black';
    if (connectionStatus === 'valid') color = '#2dd451';
    if (connectionStatus === 'invalid') color = '#f33524';

    return (
        <path fill="none" stroke={color} strokeWidth={1.5} d={d} />
    );
};