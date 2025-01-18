import { ConnectionLineComponentProps, getSmoothStepPath } from "@xyflow/react";


export function ConnectionLine({ fromX, fromY, toX, toY, fromPosition, toPosition, connectionStatus }: ConnectionLineComponentProps) {
    const [d] = getSmoothStepPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
        borderRadius: 2, offset: 18

    });


    let color = 'white';
    if (connectionStatus === 'valid') color = '#2dd451';
    if (connectionStatus === 'invalid') color = '#f33524';

    return (
        <path fill="none" stroke={color} strokeWidth={1.5} d={d} type="smoothstep" />
    );
};