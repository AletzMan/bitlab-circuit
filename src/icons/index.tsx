import { SVGProps } from "react";

const STROKE_WIDTH = 1.5;

export function LogoBitlab(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="40px"
			width="40px"
			fill="currentColor"
			viewBox="0 0 500 500"
			style={{ backgroundColor: "#FF000015" }}
		>
			<rect
				x="100"
				y="100"
				width="300"
				height="300"
				rx="50"
				ry="50"
				fill="none"
				stroke="currentColor"
				strokeWidth={25}
			/>
			<g transform="scale(17) translate(9, 9)">
				<path
					fill="#fff"
					d="M3.15 11.96c-.14 0-.25-.05-.34-.11c-.29-.2-.36-.58-.2-1.03L4.3 6H3.24a.74.74 0 0 1-.62-.32c-.14-.21-.15-.48-.04-.74L4.42.66c.16-.38.57-.66.97-.66H9.1c.26 0 .49.12.62.32a.8.8 0 0 1 .04.74L7.68 5h1.09c.33 0 .58.16.69.42c.05.15.13.53-.34.98l-5.27 5.22c-.28.26-.52.34-.7.34"
				/>
			</g>
			<circle cx="60" cy="60" r="35" fill="currentColor" stroke="currentColor" strokeWidth={1} />
			<path d="M 60 60 L 200 60" stroke="currentColor" strokeWidth={25} />
			<circle cx="440" cy="440" r="35" fill="currentColor" stroke="currentColor" strokeWidth={1} />
		</svg>
	);
}

export function GroundIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			{/* Línea vertical principal */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 16.5,0 L 16.5,16.5"
			/>
			{/* Primera barra (Larga) -> Y = 16.5 */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				d="M 4.5,16.5 L 28.5,16.5"
			/>
			{/* Segunda barra (Mediana) -> Y = 20.5 (Alineado a .5) */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				d="M 8.5,20.5 L 24.5,20.5"
			/>
			{/* Tercera barra (Corta) -> Y = 24.5 (Alineado a .5) */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				d="M 12.5,24.5 L 20.5,24.5"
			/>
		</svg>
	);
}

export function ResistorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			viewBox="0 0 33 33"
		>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M 0,16.5 L 8.25,16.5 L 9.63,13.75 L 12.38,19.25 L 15.13,13.75 L 17.88,19.25 L 20.63,13.75 L 23.38,19.25 L 24.75,16.5 L 33,16.5"
			></path>
		</svg>
	);
}

export function AmmeterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			version="1.1"
			viewBox="0 0 33 33"
		>
			<rect
				x="8.25"
				y="11"
				width="16.5"
				height="11"
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				rx="1.1"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 0,16.5 L 8.25,16.5"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 24.75,16.5 L 33,16.5"
			/>
			<text
				x="16.5"
				y="18.7"
				textAnchor="middle"
				fontSize="6.6"
				fill="currentColor"
				stroke="none"
			>
				A
			</text>
		</svg>
	);
}

export function OhmmeterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			version="1.1"
			viewBox="0 0 33 33"
		>
			<rect
				x="8.25"
				y="11"
				width="16.5"
				height="11"
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				rx="1.1"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 0,16.5 L 8.25,16.5"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 24.75,16.5 L 33,16.5"
			/>
			<text
				x="16.5"
				y="18.7"
				textAnchor="middle"
				fontSize="6.6"
				fill="currentColor"
				stroke="none"
			>
				Ω
			</text>
		</svg>
	);
}

export function VoltmeterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			version="1.1"
			viewBox="0 0 33 33"
		>
			<rect
				x="8.25"
				y="11"
				width="16.5"
				height="11"
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				rx="1.1"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 0,16.5 L 8.25,16.5"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				fill="none"
				stroke="currentColor"
				d="M 24.75,16.5 L 33,16.5"
			/>
			<text
				x="16.5"
				y="18.7"
				textAnchor="middle"
				fontSize="6.6"
				fill="currentColor"
				stroke="none"
			>
				V
			</text>
		</svg>
	);
}

export function RheostatIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 0,16.5 L 8.25,16.5 L 9.63,13.75 L 12.38,19.25 L 15.13,13.75 L 17.88,19.25 L 20.63,13.75 L 23.38,19.25 L 24.75,16.5 L 33,16.5"
			></path>
			<line
				x1="8.25"
				y1="23.65"
				x2="22.55"
				y2="9.9"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
		</svg>
	);
}

export function ThermistorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 0,16.5 L 8.25,16.5 L 9.63,13.75 L 12.38,19.25 L 15.13,13.75 L 17.88,19.25 L 20.63,13.75 L 23.38,19.25 L 24.75,16.5 L 33,16.5"
			></path>
			<line
				x1="11.61"
				y1="23.43"
				x2="21.78"
				y2="8.03"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<line
				x1="6.93"
				y1="23.27"
				x2="11.88"
				y2="23.27"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
		</svg>
	);
}

export function LDRIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				stroke="currentColor"
				d="M 0,16.5 L 8.25,16.5 L 9.63,13.75 L 12.38,19.25 L 15.13,13.75 L 17.88,19.25 L 20.63,13.75 L 23.38,19.25 L 24.75,16.5 L 33,16.5"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				d="m 10.27 8.55 l -1.75 -3.05 l -0.39 0.39 l -1.79 -1.75 l -0.5 0.47 l 1.79 1.79 l -0.39 0.39 z"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				d="m 4.17 6.34 l 1.75 1.79 l -0.39 0.39 l 3.05 1.75 l -1.79 -3.05 l -0.39 0.39 l -1.79 -1.79 z"
			/>
			<circle
				cx="16.5"
				cy="16.5"
				r="8.8"
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
		</svg>
	);
}

export function PotentiometerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="16.5"
				y1="0"
				x2="16.5"
				y2="9.9"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>

			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				stroke="currentColor"
				d="M 0,16.5 L 8.25,16.5 L 9.63,13.75 L 12.38,19.25 L 15.13,13.75 L 17.88,19.25 L 20.63,13.75 L 23.38,19.25 L 24.75,16.5 L 33,16.5"
			></path>
		</svg>
	);
}

export function CapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="14.58"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.15"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.43"
				y1="9.9"
				x2="18.43"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="14.58"
				y1="9.9"
				x2="14.58"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function PolarisedCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="15.13"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.43"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.43"
				y1="9.9"
				x2="18.43"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M12.65,9.9 C15.13,12.38 16.23,19.25 12.65,23.1"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<path
				d="m 21.42 19.21 v 1.05 h -1.05 v 0.69 h 1.05 v 1.02 h 0.69 v -1.02 h 1.02 v -0.69 h -1.02 v -1.05 z"
				strokeLinejoin="round"
				strokeLinecap="round"
			></path>
		</svg>
	);
}

export function VariableCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<defs>
				<marker id="head" orient="auto" markerWidth="5" markerHeight="3" refX="0.1" refY="1.5">
					<path d="M 0 0 V 3 L 5 1.5 Z" fill="currentColor" />
				</marker>
			</defs>
			<line
				x1="0"
				y1="16.5"
				x2="14.58"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.15"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.43"
				y1="9.9"
				x2="18.43"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="14.58"
				y1="9.9"
				x2="14.58"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="8.25"
				y1="23.65"
				x2="22.55"
				y2="9.9"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
		</svg>
	);
}

export function TrimmerCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<defs>
				<marker
					id="headVariable"
					orient="auto"
					markerWidth="5"
					markerHeight="5"
					refX="0"
					refY="2.5"
				>
					<path d="M 0 0 V 5 L 1 5 L 1 0 Z" fill="currentColor" />
				</marker>
			</defs>
			<line
				x1="0"
				y1="16.5"
				x2="14.58"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.15"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="18.43"
				y1="9.9"
				x2="18.43"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="14.58"
				y1="9.9"
				x2="14.58"
				y2="23.1"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				x1="8.25"
				y1="23.65"
				x2="22.55"
				y2="9.9"
				strokeLinecap="round"
				markerEnd="url(#headVariable)"
			/>
		</svg>
	);
}

export function DiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="22"
				y1="11"
				x2="22"
				y2="22"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
		</svg>
	);
}

export function ZenerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M19.8,11 L22,11 L22,22 L24.2,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

interface PropsLED extends SVGProps<SVGSVGElement> {
	color_led?: string;
}

export function LEDIcon(props: PropsLED) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			viewBox="0 0 33 33"
		>
			{/* Terminal de entrada (Ánodo) - Línea recta */}
			<line
				x1="0"
				y1="16.5"
				x2="11.5"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>

			{/* Terminal de salida (Cátodo) - Línea recta */}
			<line
				x1="22.5"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>

			{/* Barra vertical del Cátodo - Línea recta */}
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 22.5,11 L 22.5,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>

			{/* Triángulo del Diodo - Diagonales suavemente renderizadas */}
			<polygon
				points="11.5,22 21.5,16.5 11.5,11"
				fill={props.color_led || "transparent"}
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>

			{/* Flecha emisora de luz 1 */}
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke" 
				fill="currentColor"
				stroke="currentColor"
				d="M 16.02,9.28 L 17.47,7.23 L 17.91,7.54 L 19.13,4.27 L 16.44,6.51 L 16.88,6.82 L 15.47,8.87 Z"
			/>

			{/* Flecha emisora de luz 2 */}
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke" 
				fill="currentColor"
				stroke="currentColor"
				d="M 18.05,10.67 L 19.46,8.65 L 19.93,8.95 L 21.12,5.65 L 18.43,7.92 L 18.90,8.23 L 17.46,10.28 Z"
			/>
		</svg>
	);
}

export function SchottkyIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<line
				x1="22"
				y1="11"
				x2="22"
				y2="22"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M19.25,12.38 L19.25,11 L22,11 L22,22 L24.75,22 L24.75,20.63"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function TunnelIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M19.8,11 L22,11 L22,22 L19.8,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoDiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,11 L22,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				strokeWidth={STROKE_WIDTH / 4}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				d="m 21.8 7.66 l -1.44 2.05 l -0.44 -0.3 l -1.22 3.27 l 2.69 -2.24 l -0.44 -0.33 l 1.41 -2.02 z"
			></path>
			<path
				strokeWidth={STROKE_WIDTH / 4}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				d="m 18.35 8.3 l -0.47 -0.3 l -1.19 3.29 l 2.69 -2.26 l -0.47 -0.3 l 1.44 -2.05 l -0.58 -0.39 z"
			></path>
		</svg>
	);
}

export function TVSDiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<polygon
				points="6.05,22 15.95,16.5 6.05,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<polygon
				points="26.95,22 17.05,16.5 26.95,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M18.67,11 L16.5,11 L16.5,22 L14.33,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function VaractorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<line
				x1="0"
				y1="16.5"
				x2="33"
				y2="16.5"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
			/>
			<polygon
				points="11.55,22 21.45,16.5 11.55,11"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,11 L22,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M24.75,11 L24.75,22"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function NodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="38px" width="38px" viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="20" fill="currentColor" />
		</svg>
	);
}

export function BJTNPNIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 L13.75,16.5"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,13.75 L22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="13.86"
				y1="19.25"
				x2="18.7"
				y2="22"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,24.75 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function BJTPNPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 L13.75,16.5"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="22"
				y1="9.35"
				x2="17.33"
				y2="12.1"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,19.25 L22,23.65 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function JFETNIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,0 L22,11 L15.13,11 L15.13,8.8 L15.13,24.2 L15.13,22 L22,22 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M11.28,22 L11.28,22 "
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M12.1,22 L0,22"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function JFETPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,0 L22,11 L15.13,11 L15.13,8.8 L15.13,24.2 L15.13,22 L22,22 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.13,22 L13.2,22"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M12.1,22 L0,22"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function NChainEnhMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,22 L12.67,22 L12.67,11"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,9.35 L14.85,13.2 L14.85,11 L22,11 L22,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,14.85 L14.85,18.7 L14.85,16.5 L22,16.5 L22,21.23"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,20.35 L14.85,24.2 L14.85,22 L22,22 L22,33"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M18.15,16.5 L17.67,16.5 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PChainEnhMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,22 L12.67,22 L12.67,11"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,9.35 L14.85,13.2 L14.85,11 L22,11 L22,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,14.85 L14.85,18.7 L14.85,16.5 L22,16.5 L22,21.23"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,20.35 L14.85,24.2 L14.85,22 L22,22 L22,33"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.95,16.5 L16.5,16.5 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function NChainDepMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,22 L12.67,22 L12.67,11"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.4,12.1 L22,12.1 L22,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.4,16.5 L22,16.5 L22,20.13"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,19.8 L14.85,9.35 L14.85,24.2 L14.85,20.9 L22,20.9 L22,33"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M18.67,16.5 L17.67,16.5 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PChainDepMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,22 L12.67,22 L12.67,11"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.4,12.1 L22,12.1 L22,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.4,16.5 L22,16.5 L22,20.13"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M14.85,19.8 L14.85,9.35 L14.85,24.2 L14.85,20.9 L22,20.9 L22,33"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M15.95,16.5  L16.5,16.5 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PhotoTransistorNPNIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M2.75,4.95 L5.5,7.15"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M4.95,2.2 L7.7,4.67"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,13.75 L22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="13.86"
				y1="19.25"
				x2="18.7"
				y2="22"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,24.75 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorPNPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M2.75,4.95 L5.5,7.15"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M4.95,2.2 L7.7,4.67"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="22"
				y1="9.35"
				x2="17.33"
				y2="12.1"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,19.25 L22,23.65 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorNPN3PinsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M2.75,4.95 L5.5,7.15"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M4.95,2.2 L7.7,4.67"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 L13.75,16.5"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,13.75 L22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="13.86"
				y1="19.25"
				x2="18.7"
				y2="22"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,24.75 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorPNP3PinsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M2.75,4.95 L5.5,7.15"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M4.95,2.2 L7.7,4.67"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 L13.75,16.5"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M13.75,10.45 L13.75,22.55"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				x1="22"
				y1="9.35"
				x2="17.33"
				y2="12.1"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M22,9.35 L22,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				r={9.35}
				cx={16.5}
				cy={16.5}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M13.86,19.25 L22,23.65 L22,33"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function InductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="33px"
			width="33px"
			fill="currentColor"
			version="1.1"
			viewBox="0 0 33 33"
		>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/>
		</svg>
	);
}

export function FerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/>{" "}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M8.25,12.1 L11.55,12.1"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M12.67,12.1 L15.97,12.1"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M17.08,12.1 L20.38,12.1"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M21.5,12.1 L24.8,12.1"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				fill="none"
				d="M9.35,24.75 L23.65,6.6 L21.5,4.95 L25.85, 8.25"
			></path>
		</svg>
	);
}

export function IronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,12.1 L24.8,12.1"></path>
		</svg>
	);
}

export function PresetFerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/> {" "}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,12.1 L11.55,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M12.67,12.1 L15.97,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M17.08,12.1 L20.38,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M21.5,12.1 L24.8,12.1"></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M9.35,24.75 L23.65,6.6 L21.5,4.95 L25.85, 8.25"
			></path>
		</svg>
	);
}

export function PresetIronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/> {" "}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,12.1 L24.8,12.1"></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M9.35,24.75 L23.65,6.6 L21.5,4.95 L25.85, 8.25"
			></path>
		</svg>
	);
}

export function VariableFerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,12.1 L11.55,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M12.67,12.1 L15.97,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M17.08,12.1 L20.38,12.1"></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M21.5,12.1 L24.8,12.1"></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M9.35,24.75 L23.65,6.6 "
				markerEnd="url(#head)"
			></path>
		</svg>
	);
}

export function VariableIronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M0,16.5 V16.5 L7.7,16.5 A 0.55 0.55 1 1 1 12.1,16.5 A 0.55 0.55 1 1 1 16.5,16.5 A 0.55 0.55 1 1 1 20.9,16.5 A 0.55 0.55 1 1 1 25.3,16.5 H33 V16.5"
			/>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,12.1 L24.8,12.1"></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				fill="none"
				d="M9.35,24.75 L23.65,6.6"
				markerEnd="url(#head)"
			></path>
		</svg>
	);
}

export function SwitchSPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			{/* Terminal izquierda recta */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 0,16.5 L 6.6,16.5"
			/>
			{/* Terminal derecha recta */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 33,16.5 L 26.4,16.5"
			/>
			{/* Interruptor abierto en diagonal */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,16.5 L 24.2,8.25"
			/>
			{/* Círculos de terminales */}
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
			/>
		</svg>
	);
}

export function SwitchSPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			{/* Terminales horizontales rectas */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 0,16.5 L 6.6,16.5"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 33,16.5 L 26.4,16.5"
			/>
			{/* Interruptor en diagonal (usa geometricPrecision para suavizado fluido) */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,16.5 L 25.3,14.19"
			/>
			{/* Círculos de conexión */}
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
			/>
		</svg>
	);
}

export function PushButtonOpenNOIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,16.5 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,16.5 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 7.7,11 17.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 16.5,11 0,-5.5"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonCloseNOIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,16.5 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,16.5 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 7.7,14.19 17.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 16.5,14.19 0,-5.5"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonOpenNCIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,16.5 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,16.5 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 7.7,22 17.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 16.5,22 0,-8.25"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonCloseNCIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,16.5 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,16.5 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 7.7,18.81 17.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 16.5,18.81 0,-8.25"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchSPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,16.5 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,11 -6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,22 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,16.5  16.23,-3.41"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="24.75"
				r="1.65"
			/>
		</svg>
	);
}

export function SwitchSPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m  0,16.5 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,11 -6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,22 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,16.5 16.23,3.41"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="8.25"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="24.75"
				r="1.65"
			/>
		</svg>
	);
}

export function SwitchDPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,11 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,11 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,11  14.3,-7.15"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 16.5,7.7  0,10.45"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,22 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,22 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,22  14.3,-7.15"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchDPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,11 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,11 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,11 15.4,-2.31"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 16.5,9.7  0,10.45"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 0,22 6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="m 33,22 -6.6,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,22 15.4,-2.31"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="22"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchDPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="44px" width="33px" fill="currentColor" viewBox="0 0 33 44">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,5.5 L 26.4,5.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,16.5 L 26.4,16.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 25.75,7.75"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="16.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="5.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,33 L 6.6,33" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,38.5 L 26.4,38.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,33 L 26,29.75"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="38.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="33" cx="8.25" r="1.65" />
			{/* Dashed mechanical coupling */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 16.5,10 L 16.5,33"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
		</svg>
	);
}

export function SwitchDPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="44px" width="33px" fill="currentColor" viewBox="0 0 33 44">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,5.5 L 26.4,5.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,16.5 L 26.4,16.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 25.85,14.25"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="16.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="5.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,33 L 6.6,33" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,38.5 L 26.4,38.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,33 L 25.75,36.3"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="38.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="33" cx="8.25" r="1.65" />
			{/* Dashed mechanical coupling */}
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M 16.5,12.5 L 16.5,33.825"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
		</svg>
	);
}

export function RelaySPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,11 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,11 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 10.17,11  14.3,-8.25"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M5.5,33 V27.5 L7.7,27.5 A 0.55 0.55 1 1 1 12.1,27.5 A 0.55 0.55 1 1 1 16.5,27.5 A 0.55 0.55 1 1 1 20.9,27.5  A 0.55 0.55 1 1 1 25.3,27.5 H27.5 V33"
			></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,23.1 L24.8,23.1"></path>
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M16.5,22.83 L16.5,6.6"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelaySPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,11 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,11 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,11 15.4,-2.31"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M5.5,33 V27.5 L7.7,27.5 A 0.55 0.55 1 1 1 12.1,27.5 A 0.55 0.55 1 1 1 16.5,27.5 A 0.55 0.55 1 1 1 20.9,27.5  A 0.55 0.55 1 1 1 25.3,27.5 H27.5 V33"
			></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,23.1 L24.8,23.1"></path>
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M16.5,22.83 L16.5,11"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelayDPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="44px"
			width="33px"
			fill="currentColor"
			viewBox="0 0 33 44"
		>
			{/* --- Switch 1 (Superior) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,11 L 26.4,11" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 24.2,2.75"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />

			{/* --- Switch 2 (Inferior) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,27.5 L 6.6,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,27.5 L 24.2,19.25"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="8.25" r="1.65" />

			{/* --- Bobina e Inductancia (Coil) --- */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 5.5,44 V 38.5 L 7.7,38.5 A 2.2 2.2 0 1 1 12.1,38.5 A 2.2 2.2 0 1 1 16.5,38.5 A 2.2 2.2 0 1 1 20.9,38.5 A 2.2 2.2 0 1 1 25.3,38.5 H 27.5 V 44"
			/>
			{/* Barra Núcleo del Relé */}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M 8.25,34.1 L 24.75,34.1" />

			{/* Acoplamiento Mecánico Punteado */}
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M 16.5,33.825 L 16.5,6.6"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
		</svg>
	);
}

export function RelayDPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			height="44px"
			width="33px"
			fill="currentColor"
			viewBox="0 0 33 44"
		>
			{/* --- Switch 1 (Superior - Cerrado) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,11 L 26.4,11" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 25.3,8.69"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />

			{/* --- Switch 2 (Inferior - Cerrado) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,27.5 L 6.6,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,27.5 L 25.3,25.19"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="8.25" r="1.65" />

			{/* --- Bobina e Inductancia (Coil) --- */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 5.5,44 V 38.5 L 7.7,38.5 A 2.2 2.2 0 1 1 12.1,38.5 A 2.2 2.2 0 1 1 16.5,38.5 A 2.2 2.2 0 1 1 20.9,38.5 A 2.2 2.2 0 1 1 25.3,38.5 H 27.5 V 44"
			/>
			{/* Barra Núcleo del Relé */}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M 8.25,34.1 L 24.75,34.1" />

			{/* Acoplamiento Mecánico Punteado */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M 16.5,33.825 L 16.5,11"
				strokeDasharray="3 3"
			/>
		</svg>
	);
}

export function RelaySPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 0,11 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,5.5 -6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,16.5 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,11  16.23,-3.41"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="5.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M5.5,33 V27.5 L7.7,27.5 A 0.55 0.55 1 1 1 12.1,27.5 A 0.55 0.55 1 1 1 16.5,27.5 A 0.55 0.55 1 1 1 20.9,27.5  A 0.55 0.55 1 1 1 25.3,27.5 H27.5 V33"
			></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,23.1 L24.8,23.1"></path>
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M16.5,22.83 L16.5,11"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelaySPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m  0,11 6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,5.5 -6.6,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="m 33,16.5 -6.6,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 9.9,11 16.23,3.41"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="11"
				cx="8.25"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="5.5"
				cx="24.75"
				r="1.65"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cy="16.5"
				cx="24.75"
				r="1.65"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M5.5,33 V27.5 L7.7,27.5 A 0.55 0.55 1 1 1 12.1,27.5 A 0.55 0.55 1 1 1 16.5,27.5 A 0.55 0.55 1 1 1 20.9,27.5  A 0.55 0.55 1 1 1 25.3,27.5 H27.5 V33"
			></path>
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M8.25,23.1 L24.8,23.1"></path>
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M16.5,22.83 L16.5,12.1"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelayDPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="44px" width="33px" fill="currentColor" viewBox="0 0 33 44">
			{/* --- Switch 1 (Superior) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,11 L 26.4,11" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 24.2,2.75"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />

			{/* --- Switch 2 (Inferior) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,27.5 L 6.6,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,27.5 L 24.2,19.25"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="8.25" r="1.65" />

			{/* --- Bobina e Inductancia (Coil) --- */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 5.5,44 V 38.5 L 7.7,38.5 A 2.2 2.2 0 1 1 12.1,38.5 A 2.2 2.2 0 1 1 16.5,38.5 A 2.2 2.2 0 1 1 20.9,38.5 A 2.2 2.2 0 1 1 25.3,38.5 H 27.5 V 44"
			/>
			{/* Barra Núcleo del Relé */}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M 8.25,34.1 L 24.75,34.1" />

			{/* Acoplamiento Mecánico Punteado */}
			<path
				strokeWidth={STROKE_WIDTH / 2}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M 16.5,33.825 L 16.5,6.6"
				strokeDasharray="3 3"
				strokeDashoffset="0"
			/>
		</svg>
	);
}

export function RelayDPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="44px" width="33px" fill="currentColor" viewBox="0 0 33 44">
			{/* --- Switch 1 (Superior - Cerrado) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,11 L 6.6,11" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,11 L 26.4,11" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,11 L 25.3,8.69"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="11" cx="8.25" r="1.65" />

			{/* --- Switch 2 (Inferior - Cerrado) --- */}
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 0,27.5 L 6.6,27.5" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M 33,27.5 L 26.4,27.5" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M 9.9,27.5 L 25.3,25.19"
			/>
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="24.75" r="1.65" />
			<circle fill="transparent" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="geometricPrecision" cy="27.5" cx="8.25" r="1.65" />

			{/* --- Bobina e Inductancia (Coil) --- */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				stroke="currentColor"
				fill="none"
				d="M 5.5,44 V 38.5 L 7.7,38.5 A 2.2 2.2 0 1 1 12.1,38.5 A 2.2 2.2 0 1 1 16.5,38.5 A 2.2 2.2 0 1 1 20.9,38.5 A 2.2 2.2 0 1 1 25.3,38.5 H 27.5 V 44"
			/>
			{/* Barra Núcleo del Relé */}
			<path strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" stroke="currentColor" d="M 8.25,34.1 L 24.75,34.1" />

			{/* Acoplamiento Mecánico Punteado */}
			<path
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				stroke="currentColor"
				d="M 16.5,33.825 L 16.5,11"
				strokeDasharray="3 3"
			/>
		</svg>
	);
}

export function ANDIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M0,11 H5.5 V5.5 H16.5 A 0.55 0.55 1 1 1 16.5,27.5 H5.5 V22 H0 5.5 V5.5 "
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M0,11 H5.5 V5.5 H16.5 A 0.55 0.55 1 1 1 16.5,27.5 H5.5 V22 H0 5.5 V5.5 "
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M27.5,16.5 H33" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M27.5,16.5 H33" />
		</svg>
	);
}

export function ORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M5.5,5.5 C5.5,5.5 13.75,16.5 5.5,27.5 C5.5,27.5 19.25,30.25 27.5,16.5 C27.5,13.75 16.5,2.75 5.5,5.5"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,11 H8.25" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,22 H8.25" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M27.5,16.5 H33" />
		</svg>
	);
}

export function NANDIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M0,11 H5.5 V5.5 H16.5 A 0.55 0.55 1 1 1 16.5,27.5 H5.5 V22 H0 5.5 V11"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M0,11 H5.5 V5.5 H16.5 A 0.55 0.55 1 1 1 16.5,27.5 H5.5 V22 H0 5.5 V11"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cx={29.26}
				cy={16.5}
				r={1.38}
			></circle>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M30.25,16.5 H33" />
		</svg>
	);
}

export function NORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M5.5,5.5 C5.5,5.5 13.75,16.5 5.5,27.5 C5.5,27.5 19.25,30.25 27.5,16.5 C27.5,13.75 16.5,2.75 5.5,5.5"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,11 H8.25" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,22 H8.25" />
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cx={29.26}
				cy={16.5}
				r={1.38}
			></circle>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M30.25,16.5 H33" />
		</svg>
	);
}

export function XORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M5.5,5.5 C5.5,5.5 13.75,16.5 5.5,27.5 C5.5,27.5 19.25,30.25 27.5,16.5 C27.5,13.75 16.5,2.75 5.5,5.5"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M3.3,5.5 C3.3,5.5 11.55,16.5 3.3,27.5"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,11 H6.05" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,22 H6.05" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M27.5,16.5 H33" />
		</svg>
	);
}

export function XNORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M5.5,5.5 C5.5,5.5 13.75,16.5 5.5,27.5 C5.5,27.5 19.25,30.25 27.5,16.5 C27.5,13.75 16.5,2.75 5.5,5.5"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cx={29.26}
				cy={16.5}
				r={1.38}
			></circle>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				d="M3.3,5.5 C3.3,5.5 11.55,16.5 3.3,27.5"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,11 H6.05" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,22 H6.05" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M30.25,16.5 H33" />
		</svg>
	);
}

export function NOTIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M8.25,6.88 V26.13 L24.75,16.5 L8.25,6.88"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				cx={26.4}
				cy={16.5}
				r={1.38}
			></circle>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,16.5 H8.25" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M27.5,16.5 H33" />
		</svg>
	);
}

export function BUFFERIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M8.25,6.88 V26.13 L24.75,16.5 L8.25,6.88"
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M0,16.5 H8.25" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" d="M24.75,16.5 H33" />
		</svg>
	);
}

export function BoardIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 256 256" style={{ display: "flex" }}>
			<path
				fill="currentColor"
				d="M76 48a4 4 0 0 1-4 4H40a4 4 0 0 0-4 4v16a4 4 0 0 1-8 0V56a12 12 0 0 1 12-12h32a4 4 0 0 1 4 4M32 148a4 4 0 0 0 4-4v-32a4 4 0 0 0-8 0v32a4 4 0 0 0 4 4m40 56H40a4 4 0 0 1-4-4v-16a4 4 0 0 0-8 0v16a12 12 0 0 0 12 12h32a4 4 0 0 0 0-8m72 0h-32a4 4 0 0 0 0 8h32a4 4 0 0 0 0-8m80-24a4 4 0 0 0-4 4v16a4 4 0 0 1-4 4h-32a4 4 0 0 0 0 8h32a12 12 0 0 0 12-12v-16a4 4 0 0 0-4-4m0-72a4 4 0 0 0-4 4v32a4 4 0 0 0 8 0v-32a4 4 0 0 0-4-4m-8-64h-32a4 4 0 0 0 0 8h32a4 4 0 0 1 4 4v16a4 4 0 0 0 8 0V56a12 12 0 0 0-12-12m-72 0h-32a4 4 0 0 0 0 8h32a4 4 0 0 0 0-8"
			></path>
		</svg>
	);
}

export function BatteryIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 33 33">
			{/* 1. Terminal izquierda y primer placa larga */}
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M0,16.5 H11 V9.63 V24.38"
			/>
			{/* 2. Placas intermedias de la batería */}
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M14.63,13.75 V19.25 M18.26,9.63 V23.38"
			/>
			{/* 3. Última placa corta y terminal derecha */}
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M22,13.75 V19.25 M22,16.5 H33"
			/>
			{/* 4. Símbolo de polaridad Positiva (+) */}
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M7.15,6.32 V10.34 M5.23,8.25 H9.08"
			/>
		</svg>
	);
}

export function PhotovoltaicCellIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 33 33">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke" 
				d="M2.75,4.95 L5.5,7.15"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke" 
				d="M4.95,2.2 L7.7,4.68"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 H11 V13.75 V19.25 V16.5  M14.63,9.63 V23.38 M18.26,13.75 V19.25  M22,9.63 V23.38 V16.5 H33  M26.4,6.32 V10.34 V8.25 H24.48 H28.33"
			></path>
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke"
				shapeRendering="crispEdges"
				d="M0,16.5 H11 V13.75 V19.25 V16.5  M14.63,9.63 V23.38 M18.26,13.75 V19.25  M22,9.63 V23.38 V16.5 H33  M26.4,6.32 V10.34 V8.25 H24.48 H28.33"
			></path>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH}
				vectorEffect="non-scaling-stroke" 
				r={10.18}
				cx={16.5}
				cy={16.5}
			/>
		</svg>
	);
}

export function PowerSupplyIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 33 33">
			<path
				stroke="currentColor"
				fill="none"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH / 2}
				d="M0,11 H5.5 M0,22 H5.5 M5.5,5.5 V27.5 H27.5 V5.5 H5.5 M27.5,11 H33 M27.5,22 H33 M5.5,27.5 L27.5,5.5 M19.25,20.9 H20.35 M21.45,20.9 H22.55 M23.65,20.9 H24.75 M19.25,19.25 H24.75 M8.25,13.75 C8.25,13.75 9.63,11 11,13.75 C11,13.75 12.38,16.5 13.75,13.75"
			></path>
		</svg>
	);
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.25em" height="1.25em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7 7c0-2.762 2.238-5 5-5s5 2.238 5 5v3h.4c.88 0 1.6.72 1.6 1.6v7c0 1.32-1.08 2.4-2.4 2.4H7.4C6.08 21 5 19.92 5 18.6v-7c0-.88.72-1.6 1.6-1.6H7zm8 0v3H9V7c0-1.658 1.342-3 3-3s3 1.342 3 3m-3 5.25a1.75 1.75 0 0 0-.75 3.332V18a.75.75 0 0 0 1.5 0v-2.418A1.75 1.75 0 0 0 12 12.25"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function UnlockIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.25em" height="1.25em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7 7a5 5 0 0 1 9.843-1.25a1 1 0 0 1-1.937.5A3 3 0 0 0 9 7v3h8.4c.88 0 1.6.72 1.6 1.6v7c0 1.32-1.08 2.4-2.4 2.4H7.4C6.08 21 5 19.92 5 18.6v-7c0-.88.72-1.6 1.6-1.6H7zm5 5.25a1.75 1.75 0 0 0-.75 3.332V18a.75.75 0 0 0 1.5 0v-2.418A1.75 1.75 0 0 0 12 12.25"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function FlipHIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="m0 15l6-5l-6-4.9zm9-4.9l6 4.9V5zm5 2.8l-3.4-2.8l3.4-3zM7 5h1v1H7zm0-2h1v1H7zm0 4h1v1H7zm0 2h1v1H7zm0 2h1v1H7zm0 2h1v1H7zm0 2h1v1H7z"
			></path>
			<path
				fill="currentColor"
				d="M7.5 1c1.3 0 2.6.7 3.6 1.9L10 4h3V1l-1.2 1.2C10.6.8 9.1 0 7.5 0C5.6 0 3.9 1 2.6 2.9l.8.6C4.5 1.9 5.9 1 7.5 1"
			></path>
		</svg>
	);
}

export function FlipVIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="m1 1l5 6l4.94-6zm4.94 9L1 16h10zm-2.82 5l2.83-3.44l3 3.44zM10 8h1v1h-1zm2 0h1v1h-1zM8 8h1v1H8zM6 8h1v1H6zM4 8h1v1H4zM2 8h1v1H2zM0 8h1v1H0z"
			></path>
			<path
				fill="currentColor"
				d="M15 8.47a4.8 4.8 0 0 1-1.879 3.632L12 11v3h3l-1.18-1.18A5.76 5.76 0 0 0 16 8.478V8.47a6.06 6.06 0 0 0-2.884-4.905l-.596.805a5.1 5.1 0 0 1 2.479 4.087z"
			></path>
		</svg>
	);
}

export function RotateLeftIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 15 15">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.597 2.936A.25.25 0 0 0 8 2.74V2c1.981 0 3.185.364 3.91 1.09C12.637 3.814 13 5.018 13 7a.5.5 0 0 0 1 0c0-2.056-.367-3.603-1.382-4.618C11.603 1.368 10.056 1 8 1V.261a.25.25 0 0 0-.403-.197L6.004 1.303a.25.25 0 0 0 0 .394zM9.5 5h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5m-7-1A1.5 1.5 0 0 0 1 5.5v7A1.5 1.5 0 0 0 2.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 9.5 4z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function RotateRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width="1.5em"
			height="1.5em"
			viewBox="0 0 15 15"
			style={{ transform: "scaleX(-1)" }}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.597 2.936A.25.25 0 0 0 8 2.74V2c1.981 0 3.185.364 3.91 1.09C12.637 3.814 13 5.018 13 7a.5.5 0 0 0 1 0c0-2.056-.367-3.603-1.382-4.618C11.603 1.368 10.056 1 8 1V.261a.25.25 0 0 0-.403-.197L6.004 1.303a.25.25 0 0 0 0 .394zM9.5 5h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5m-7-1A1.5 1.5 0 0 0 1 5.5v7A1.5 1.5 0 0 0 2.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 9.5 4z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function DeletetIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 24 24">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6"
				color="currentColor"
			></path>
		</svg>
	);
}

export function SaveIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 32 32">
			<path
				fill="currentColor"
				d="M5 7.5A2.5 2.5 0 0 1 7.5 5H9v4.5a2.5 2.5 0 0 0 2.5 2.5h8A2.5 2.5 0 0 0 22 9.5V5.04a2.5 2.5 0 0 1 1.318.692l2.95 2.95A2.5 2.5 0 0 1 27 10.45V24.5a2.5 2.5 0 0 1-2 2.45V18.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 7 18.5v8.45a2.5 2.5 0 0 1-2-2.45zM9 27v-8.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5V27zM20 5v4.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V5zM7.5 3A4.5 4.5 0 0 0 3 7.5v17A4.5 4.5 0 0 0 7.5 29h17a4.5 4.5 0 0 0 4.5-4.5V10.45a4.5 4.5 0 0 0-1.318-3.182l-2.95-2.95A4.5 4.5 0 0 0 21.55 3z"
			></path>
		</svg>
	);
}

export function OpenFileIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.6em" height="1.6em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M3.5 6.25c0-.966.784-1.75 1.75-1.75h2.88a.75.75 0 0 1 .53.22l2.06 2.06c.142.141.332.22.531.22h5.5c.967 0 1.75.784 1.75 1.75q.001.13.041.246H8.72a3.75 3.75 0 0 0-3.25 1.874L3.5 14.283zM2 17.788A3.25 3.25 0 0 0 5.25 21H11q.044 0 .086-.005h5.195a3.75 3.75 0 0 0 3.248-1.875l3.03-5.25c1.216-2.104-.225-4.72-2.602-4.868A.8.8 0 0 0 20 8.75a3.25 3.25 0 0 0-3.25-3.25h-5.19L9.72 3.659A2.25 2.25 0 0 0 8.129 3H5.25A3.25 3.25 0 0 0 2 6.25zm6.719-7.292h11.026c1.347 0 2.19 1.458 1.515 2.625l-3.03 5.25a2.25 2.25 0 0 1-1.949 1.124H5.255c-1.347 0-2.19-1.458-1.516-2.625l3.031-5.25a2.25 2.25 0 0 1 1.949-1.124"
			></path>
		</svg>
	);
}

export function ExportIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.7em" height="1.7em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M15.25 15.75c-.41 0-.75.34-.75.75V18c0 .69-.56 1.25-1.25 1.25h-7.5c-.69 0-1.25-.56-1.25-1.25V6c0-.69.56-1.25 1.25-1.25H9V9.5c0 .41.34.75.75.75h4.75v1.25c0 .41.34.75.75.75s.75-.34.75-.75v-2c0-.2-.08-.39-.22-.53l-5.5-5.5a.75.75 0 0 0-.53-.22h-4C4.23 3.25 3 4.48 3 6v12c0 1.52 1.23 2.75 2.75 2.75h7.5c1.52 0 2.75-1.23 2.75-2.75v-1.5c0-.41-.34-.75-.75-.75M10.5 5.81l2.94 2.94H10.5zm10.44 8.48c-.04.09-.09.17-.16.24l-3 3c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l1.72-1.72H9.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.69l-1.72-1.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l3 3c.07.07.12.15.16.24c.08.18.08.39 0 .57Z"
			></path>
		</svg>
	);
}

export function DuplicateIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="2em" height="2em" viewBox="0 0 20 20">
			<g fill="currentColor">
				<path
					fillRule="evenodd"
					d="M15 7.5H8a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5m-6.5 7v-6h6v6z"
					clipRule="evenodd"
				></path>
				<path d="M5.5 11.5h3v1H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.5h-1v-3h-6z"></path>
			</g>
		</svg>
	);
}

export function FitZoomIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width="2em"
			height="2em"
			viewBox="0 0 32 32"
			style={{ transform: "scale(0.8)" }}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<circle cx={14} cy={14} r={12}></circle>
				<path d="m23 23l7 7M9 12V9h3m4 0h3v3M9 16v3h3m7-3v3h-3"></path>
			</g>
		</svg>
	);
}

export function ResetZoomIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width="2em"
			height="2em"
			viewBox="0 0 24 24"
			style={{ transform: "scale(0.8)" }}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="m21 21l-6-6M3.268 12.043A7.02 7.02 0 0 0 9.902 17a7.01 7.01 0 0 0 7.043-6.131a7 7 0 0 0-5.314-7.672A7.02 7.02 0 0 0 3.39 7.6"></path>
				<path d="M3 4v4h4"></path>
			</g>
		</svg>
	);
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1"
			></path>
		</svg>
	);
}

export function UndoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="2em" height="2em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.53 3.47a.75.75 0 0 1 0 1.06L5.81 6.25H15a5.75 5.75 0 0 1 0 11.5H8a.75.75 0 0 1 0-1.5h7a4.25 4.25 0 0 0 0-8.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.1em" height="1.1em" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M9 3a1 1 0 0 0-2 0v4H3a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0V9h4a1 1 0 0 0 0-2H9z"
			></path>
		</svg>
	);
}

export function MinusIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.25em" height="1.25em" viewBox="0 0 20 20">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M5 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function RedoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width="2em"
			height="2em"
			viewBox="0 0 24 24"
			style={{ transform: "scaleX(-1)" }}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.53 3.47a.75.75 0 0 1 0 1.06L5.81 6.25H15a5.75 5.75 0 0 1 0 11.5H8a.75.75 0 0 1 0-1.5h7a4.25 4.25 0 0 0 0-8.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.5em" height="1.5em" viewBox="0 0 24 24">
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
				<path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2"></path>
			</g>
		</svg>
	);
}

export function DarkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="1.75em" height="1.75em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M12.741 20.917a9.4 9.4 0 0 1-1.395-.105a9.141 9.141 0 0 1-1.465-17.7a1.18 1.18 0 0 1 1.21.281a1.27 1.27 0 0 1 .325 1.293a8.1 8.1 0 0 0-.353 2.68a8.27 8.27 0 0 0 4.366 6.857a7.6 7.6 0 0 0 3.711.993a1.242 1.242 0 0 1 .994 1.963a9.15 9.15 0 0 1-7.393 3.738M10.261 4.05a.2.2 0 0 0-.065.011a8.137 8.137 0 1 0 9.131 12.526a.22.22 0 0 0 .013-.235a.23.23 0 0 0-.206-.136a8.6 8.6 0 0 1-4.188-1.116a9.27 9.27 0 0 1-4.883-7.7a9.1 9.1 0 0 1 .4-3.008a.29.29 0 0 0-.069-.285a.18.18 0 0 0-.133-.057"
			></path>
		</svg>
	);
}

export function LightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			width="1.75em"
			height="1.75em"
			viewBox="0 0 24 24"
			style={{ transform: "translateY(-4px)" }}
		>
			<g fill="none" stroke="#f0b62e" strokeWidth={1.5}>
				<circle cx={12} cy={12} r={4} strokeLinejoin="round"></circle>
				<path
					strokeLinecap="round"
					d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
				></path>
			</g>
		</svg>
	);
}

export function ArrowPushIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" strokeWidth={1.5}>
				<circle cx={12} cy={12} r={10}></circle>
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l3-3m-3 3l-3-3"></path>
			</g>
		</svg>
	);
}

export function AlignTopIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 32 32">
			<path
				fill="currentColor"
				d="M4 3a1 1 0 0 0 0 2h24a1 1 0 1 0 0-2zm1 7.5A3.5 3.5 0 0 1 8.5 7h3a3.5 3.5 0 0 1 3.5 3.5v15a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 5 25.5zm12 0A3.5 3.5 0 0 1 20.5 7h3a3.5 3.5 0 0 1 3.5 3.5v9a3.5 3.5 0 0 1-3.5 3.5h-3a3.5 3.5 0 0 1-3.5-3.5z"
			></path>
		</svg>
	);
}

export function AlignRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 32 32" transform="rotate(90)">
			<path
				fill="currentColor"
				d="M4 3a1 1 0 0 0 0 2h24a1 1 0 1 0 0-2zm1 7.5A3.5 3.5 0 0 1 8.5 7h3a3.5 3.5 0 0 1 3.5 3.5v15a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 5 25.5zm12 0A3.5 3.5 0 0 1 20.5 7h3a3.5 3.5 0 0 1 3.5 3.5v9a3.5 3.5 0 0 1-3.5 3.5h-3a3.5 3.5 0 0 1-3.5-3.5z"
			></path>
		</svg>
	);
}

export function AlignBottomIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 32 32" transform="rotate(180)">
			<path
				fill="currentColor"
				d="M4 3a1 1 0 0 0 0 2h24a1 1 0 1 0 0-2zm1 7.5A3.5 3.5 0 0 1 8.5 7h3a3.5 3.5 0 0 1 3.5 3.5v15a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 5 25.5zm12 0A3.5 3.5 0 0 1 20.5 7h3a3.5 3.5 0 0 1 3.5 3.5v9a3.5 3.5 0 0 1-3.5 3.5h-3a3.5 3.5 0 0 1-3.5-3.5z"
			></path>
		</svg>
	);
}

export function AlignLeftIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 32 32" transform="rotate(270)">
			<path
				fill="currentColor"
				d="M4 3a1 1 0 0 0 0 2h24a1 1 0 1 0 0-2zm1 7.5A3.5 3.5 0 0 1 8.5 7h3a3.5 3.5 0 0 1 3.5 3.5v15a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 5 25.5zm12 0A3.5 3.5 0 0 1 20.5 7h3a3.5 3.5 0 0 1 3.5 3.5v9a3.5 3.5 0 0 1-3.5 3.5h-3a3.5 3.5 0 0 1-3.5-3.5z"
			></path>
		</svg>
	);
}

export function AlignHorizontalCenterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 28 28" transform="rotate(180)">
			<path
				fill="currentColor"
				d="M14.25 26a.75.75 0 0 1-.75-.75V23H10a2.75 2.75 0 0 1-2.75-2.75v-2.5A2.75 2.75 0 0 1 10 15h3.5v-2H7.25a2.75 2.75 0 0 1-2.75-2.75v-2.5A2.75 2.75 0 0 1 7.25 5h6.25V2.75a.75.75 0 0 1 1.5 0V5h5.75a2.75 2.75 0 0 1 2.75 2.75v2.5A2.75 2.75 0 0 1 20.75 13H15v2h3a2.75 2.75 0 0 1 2.75 2.75v2.5A2.75 2.75 0 0 1 18 23h-3v2.25a.75.75 0 0 1-.75.75"
			/>
		</svg>
	);
}

export function AlignVerticalCenterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 28 28" transform="rotate(270)">
			<path
				fill="currentColor"
				d="M14.25 26a.75.75 0 0 1-.75-.75V23H10a2.75 2.75 0 0 1-2.75-2.75v-2.5A2.75 2.75 0 0 1 10 15h3.5v-2H7.25a2.75 2.75 0 0 1-2.75-2.75v-2.5A2.75 2.75 0 0 1 7.25 5h6.25V2.75a.75.75 0 0 1 1.5 0V5h5.75a2.75 2.75 0 0 1 2.75 2.75v2.5A2.75 2.75 0 0 1 20.75 13H15v2h3a2.75 2.75 0 0 1 2.75 2.75v2.5A2.75 2.75 0 0 1 18 23h-3v2.25a.75.75 0 0 1-.75.75"
			/>
		</svg>
	);
}

export function DistributeVerticalIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 24 24">
			<g fill="none">
				<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
				<path
					fill="currentColor"
					d="M20 19a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM17 8a2 2 0 0 1 1.995 1.85L19 10v4a2 2 0 0 1-1.85 1.995L17 16H7a2 2 0 0 1-1.995-1.85L5 14v-4a2 2 0 0 1 1.85-1.995L7 8zm3-5a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
				></path>
			</g>
		</svg>
	);
}

export function DistributeHorizontalIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 24 24" transform="rotate(90)">
			<g fill="none">
				<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
				<path
					fill="currentColor"
					d="M20 19a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM17 8a2 2 0 0 1 1.995 1.85L19 10v4a2 2 0 0 1-1.85 1.995L17 16H7a2 2 0 0 1-1.995-1.85L5 14v-4a2 2 0 0 1 1.85-1.995L7 8zm3-5a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
				></path>
			</g>
		</svg>
	);
}

export function ProbeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="20px" height="20px" viewBox="0 0 24 24" transform="rotate(90)">
			<path
				fill="currentColor"
				d="m19.47 3.47l-6 6l-2.94.53c-.31.03-.59.18-.81.4l-6.91 6.91a2.76 2.76 0 0 0 0 3.89a2.76 2.76 0 0 0 3.89 0l6.91-6.91c.22-.22.39-.5.42-.79l.51-2.96l6-6L22 2zM11 14.38c-.76 0-1.38-.62-1.38-1.38s.62-1.38 1.38-1.38s1.38.62 1.38 1.38A1.39 1.39 0 0 1 11 14.38"
			></path>
		</svg>
	);
}

export function CursorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} width="24px" height="24px" viewBox="0 0 48 48">
			<path
				fill="#e0e0e0"
				d="M27.8 39.7c-.1 0-.2 0-.4-.1s-.4-.3-.6-.5l-3.7-8.6l-4.5 4.2q-.15.3-.6.3c-.1 0-.3 0-.4-.1c-.3-.1-.6-.5-.6-.9V12c0-.4.2-.8.6-.9c.1-.1.3-.1.4-.1c.2 0 .5.1.7.3l16 15c.3.3.4.7.3 1.1s-.5.6-.9.7l-6.3.6l3.9 8.5c.1.2.1.5 0 .8c-.1.2-.3.5-.5.6l-2.9 1.3c-.2-.2-.4-.2-.5-.2"
			></path>
			<path
				fill="#212121"
				d="m18 12l16 15l-7.7.7l4.5 9.8l-2.9 1.3l-4.3-9.9L18 34zm0-2c-.3 0-.5.1-.8.2c-.7.3-1.2 1-1.2 1.8v22c0 .8.5 1.5 1.2 1.8c.3.2.6.2.8.2c.5 0 1-.2 1.4-.5l3.4-3.2l3.1 7.3c.2.5.6.9 1.1 1.1c.2.1.5.1.7.1c.3 0 .5-.1.8-.2l2.9-1.3c.5-.2.9-.6 1.1-1.1s.2-1.1 0-1.5l-3.3-7.2l4.9-.4c.8-.1 1.5-.6 1.7-1.3c.3-.7.1-1.6-.5-2.1l-16-15c-.3-.5-.8-.7-1.3-.7"
			></path>
		</svg>
	);
}
