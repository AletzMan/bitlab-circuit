import { SVGProps } from "react";

const STROKE_WIDTH = 2.5;

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
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 400 400">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 200, 0 L 200, 200"
			></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 50, 200 L 350, 200 "
			></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 100, 300 L 300, 300 "
			></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 150, 395 L 250, 395 "
			></path>
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
			version="1.1"
			viewBox="0 0 600 600"
		>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 0,300 L 150,300 L 175,250 L 225,350 L 275,250 L 325,350 L 375,250 L 425,350 L 450,300 L 600,300"
			></path>
		</svg>
	);
}

export function RheostatIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M 0,300 L 150,300 L 175,250 L 225,350 L 275,250 L 325,350 L 375,250 L 425,350 L 450,300 L 600,300"
			></path>
			<line
				x1="150"
				y1="430"
				x2="410"
				y2="180"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
		</svg>
	);
}

export function ThermistorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M 0,300 L 150,300 L 175,250 L 225,350 L 275,250 L 325,350 L 375,250 L 425,350 L 450,300 L 600,300"
			></path>
			<line
				x1="211"
				y1="426"
				x2="396"
				y2="146"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="126"
				y1="423"
				x2="216"
				y2="423"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
		</svg>
	);
}

export function LDRIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 0,300 L 150,300 L 175,250 L 225,350 L 275,250 L 325,350 L 375,250 L 425,350 L 450,300 L 600,300"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 186.64 155.41 l -31.738 -55.422 l -7.0547 7.0547 l -32.242 -31.738 l -9.0703 8.5625 l 32.246 32.246 l -7.0547 7.0508 z"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 75.3 115.61 l 31.738 32.242 l -7.0547 7.0547 l 55.422 31.738 l -32.246 -54.914 l -7.0508 7.0547 l -32.246 -32.246 z"
			/>
			<circle
				cx="300"
				cy="300"
				r="160"
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
		</svg>
	);
}

export function PotentiometerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="300"
				y1="0"
				x2="300"
				y2="180"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>

			<path
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				stroke="currentColor"
				d="M 0,300 L 150,300 L 175,250 L 225,350 L 275,250 L 325,350 L 375,250 L 425,350 L 450,300 L 600,300"
			></path>
		</svg>
	);
}

export function CapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="265"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="330"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="335"
				y1="180"
				x2="335"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="265"
				y1="180"
				x2="265"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function PolarisedCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="275"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="335"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="335"
				y1="180"
				x2="335"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				fill="none"
				d="M230,180 C275,225 295,350 230,420"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<path
				d="m 389.52 349.24 v 19.145 h -19.145 v 12.594 h 19.145 v 18.641 h 12.598 v -18.641 h 18.641 v -12.594 h -18.641 v -19.145 z"
				strokeLinejoin="round"
				strokeLinecap="round"
			></path>
		</svg>
	);
}

export function VariableCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<defs>
				<marker id="head" orient="auto" markerWidth="5" markerHeight="3" refX="0.1" refY="1.5">
					<path d="M 0 0 V 3 L 5 1.5 Z" fill="currentColor" />
				</marker>
			</defs>
			<line
				x1="0"
				y1="300"
				x2="265"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="330"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="335"
				y1="180"
				x2="335"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="265"
				y1="180"
				x2="265"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="150"
				y1="430"
				x2="410"
				y2="180"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
		</svg>
	);
}

export function TrimmerCapacitorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
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
				y1="300"
				x2="265"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="330"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="335"
				y1="180"
				x2="335"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				x1="265"
				y1="180"
				x2="265"
				y2="420"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<line
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				x1="150"
				y1="430"
				x2="410"
				y2="180"
				strokeLinecap="round"
				markerEnd="url(#headVariable)"
			/>
		</svg>
	);
}

export function DiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="400"
				y1="200"
				x2="400"
				y2="400"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
		</svg>
	);
}

export function ZenerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M360,200 L400,200 L400,400 L440,400"
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
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="200"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="400"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="transparent"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill={props.color_led}
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,200 L400,400"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 291.36 168.81 l 26.195 -37.281 l 8.0625 5.543 l 22.168 -59.449 l -48.871 40.809 l 8.0625 5.5391 l -25.695 37.281 z"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 328.14 194 l 25.691 -36.777 l 8.5664 5.5391 l 21.664 -59.953 l -48.871 41.312 l 8.5664 5.543 l -26.199 37.281 z"
			></path>
		</svg>
	);
}

export function SchottkyIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<line
				x1="400"
				y1="200"
				x2="400"
				y2="400"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M350,225 L350,200 L400,200 L400,400 L450,400 L450,375"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function TunnelIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M360,200 L400,200 L400,400 L360,400"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoDiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,200 L400,400"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 394.02 139.29 l -26.195 37.281 l -8.0625 -5.543 l -22.168 59.449 l 48.871 -40.809 l -8.0625 -6.0469 l 25.695 -36.777 z"
			></path>
			<path
				strokeWidth={STROKE_WIDTH}
				stroke="currentColor"
				d="m 331.55 150.87 l -8.5625 -5.543 l -21.664 59.953 l 48.867 -41.312 l -8.5625 -5.5391 l 26.199 -37.285 l -10.582 -7.0508 z"
			></path>
		</svg>
	);
}

export function TVSDiodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="110,400 290,300 110,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="490,400 310,300 490,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M340,200 L300,200 L300,400 L260,400"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function VaractorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<line
				x1="0"
				y1="300"
				x2="600"
				y2="300"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<polygon
				points="210,400 390,300 210,200"
				fill="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,200 L400,400"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M450,200 L450,400"
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
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 L250,300"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,250 L400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="252"
				y1="350"
				x2="340"
				y2="400"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,450 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function BJTPNPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 L250,300"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="400"
				y1="170"
				x2="315"
				y2="220"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,350 L400,430 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function JFETNIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,0 L400,200 L275,200 L275,160 L275,440 L275,400 L400,400 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M205,400 L205,400 "
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M220,400 L0,400"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function JFETPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,0 L400,200 L275,200 L275,160 L275,440 L275,400 L400,400 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M275,400 L240,400"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M220,400 L0,400"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function NChainEnhMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,400 L230,400 L230,200"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,170 L270,240 L270,200 L400,200 L400,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,270 L270,340 L270,300 L400,300 L400,386"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,370 L270,440 L270,400 L400,400 L400,600"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M330,300 L320,300 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PChainEnhMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,400 L230,400 L230,200"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,170 L270,240 L270,200 L400,200 L400,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,270 L270,340 L270,300 L400,300 L400,386"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,370 L270,440 L270,400 L400,400 L400,600"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M290,300 L300,300 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function NChainDepMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,400 L230,400 L230,200"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M280,220 L400,220 L400,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M280,300 L400,300 L400,366"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,360 L270,170 L270,440 L270,380 L400,380 L400,600"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M340,300 L320,300 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PChainDepMOSFETIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,400 L230,400 L230,200"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M280,220 L400,220 L400,0"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M280,300 L400,300 L400,366"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M270,360 L270,170 L270,440 L270,380 L400,380 L400,600"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M290,300  L300,300 "
				strokeLinecap="square"
				markerEnd="url(#headTwo)"
			/>
		</svg>
	);
}

export function PhotoTransistorNPNIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M50,90 L100,130"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M90,40 L140,85"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,250 L400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="252"
				y1="350"
				x2="340"
				y2="400"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,450 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorPNPIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M50,90 L100,130"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M90,40 L140,85"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="400"
				y1="170"
				x2="315"
				y2="220"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,350 L400,430 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorNPN3PinsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M50,90 L100,130"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M90,40 L140,85"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 L250,300"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,250 L400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="252"
				y1="350"
				x2="340"
				y2="400"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,450 L400,600"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
		</svg>
	);
}

export function PhotoTransistorPNP3PinsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M50,90 L100,130"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M90,40 L140,85"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 L250,300"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M250,190 L250,410"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<line
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				x1="400"
				y1="170"
				x2="315"
				y2="220"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M400,170 L400,0"
				strokeLinejoin="miter"
				strokeLinecap="square"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={170}
				cx={300}
				cy={300}
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M252,350 L400,430 L400,600"
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
			viewBox="0 0 600 600"
		>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>
		</svg>
	);
}

export function FerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>{" "}
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L210,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M230,220 L290,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M310,220 L370,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M390,220 L450,220"></path>
		</svg>
	);
}

export function IronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L450,220"></path>
		</svg>
	);
}

export function PresetFerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>{" "}
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L210,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M230,220 L290,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M310,220 L370,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M390,220 L450,220"></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M170,450 L430,120 L390,90 L470, 150"
			></path>
		</svg>
	);
}

export function PresetIronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>{" "}
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L450,220"></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M170,450 L430,120 L390,90 L470, 150"
			></path>
		</svg>
	);
}

export function VariableFerriteCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L210,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M230,220 L290,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M310,220 L370,220"></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M390,220 L450,220"></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M170,450 L430,120 "
				markerEnd="url(#head)"
			></path>
		</svg>
	);
}

export function VariableIronCoreInductorIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M0,300 V300 L140,300 A 10 10 1 1 1 220,300 A 10 10 1 1 1 300,300 A 10 10 1 1 1 380,300 A 10 10 1 1 1 460,300 H600 V300"
			/>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,220 L450,220"></path>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M170,450 L430,120"
				markerEnd="url(#head)"
			></path>
		</svg>
	);
}

export function SwitchSPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,300  260,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchSPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,300 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonOpenNOIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 140,200 320,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,200 0,-100"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonCloseNOIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 140,258 320,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,258 0,-100"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonOpenNCIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 140,400 320,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,400 0,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function PushButtonCloseNCIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 140,342 320,0"
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,342 0,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchSPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,400 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,300  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="450"
				r="30"
			/>
		</svg>
	);
}

export function SwitchSPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m  0,300 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,400 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,300 295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="450"
				r="30"
			/>
		</svg>
	);
}

export function SwitchDPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  260,-130"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,140  0,190"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,400 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,400 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,400  260,-130"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchDPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,185 0,190"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,400 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,400 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,400 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="400"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
		</svg>
	);
}

export function SwitchDPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 800">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			//Dashed
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,185 0,400"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			//Switch Two
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,600 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,700 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,600  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="600"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="700"
				cx="450"
				r="30"
			/>
		</svg>
	);
}

export function SwitchDPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 800">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			//Dashed
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 300,230 0,400"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			//Switch Two
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,600 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,700 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,600  295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="600"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="700"
				cx="450"
				r="30"
			/>
		</svg>
	);
}

export function RelaySPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 185,200  260,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,600 V500 L140,500 A 10 10 1 1 1 220,500 A 10 10 1 1 1 300,500 A 10 10 1 1 1 380,500  A 10 10 1 1 1 460,500 H500 V600"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,420 L450,420"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,415 L300,120"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelaySPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,600 V500 L140,500 A 10 10 1 1 1 220,500 A 10 10 1 1 1 300,500 A 10 10 1 1 1 380,500  A 10 10 1 1 1 460,500 H500 V600"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,420 L450,420"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,415 L300,200"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelayDPSTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 800">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  260,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,500 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,500  260,-150"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,800 V700 L140,700 A 10 10 1 1 1 220,700 A 10 10 1 1 1 300,700 A 10 10 1 1 1 380,700  A 10 10 1 1 1 460,700 H500 V800"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,620 L450,620"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,615 L300,120"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelayDPSTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 800">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,200 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,500 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,500 280,-42"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="150"
				r="30"
				x={0}
				y={0}
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,800 V700 L140,700 A 10 10 1 1 1 220,700 A 10 10 1 1 1 300,700 A 10 10 1 1 1 380,700  A 10 10 1 1 1 460,700 H500 V800"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,620 L450,620"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,615 L300,200"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelaySPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,600 V500 L140,500 A 10 10 1 1 1 220,500 A 10 10 1 1 1 300,500 A 10 10 1 1 1 380,500  A 10 10 1 1 1 460,500 H500 V600"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,420 L450,420"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,415 L300,200"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelaySPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m  0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200 295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,600 V500 L140,500 A 10 10 1 1 1 220,500 A 10 10 1 1 1 300,500 A 10 10 1 1 1 380,500  A 10 10 1 1 1 460,500 H500 V600"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,420 L450,420"></path>
			<path
				strokeWidth={STROKE_WIDTH * 2}
				stroke="currentColor"
				d="M300,415 L300,220"
				strokeDasharray="27 35"
				strokeDashoffset="0"
			></path>
		</svg>
	);
}

export function RelayDPDTOpenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 1000">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			//Dashed
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 2}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M300,180 V800"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			//Switch Two
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,600 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,700 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,600  295,-62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="600"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="700"
				cx="450"
				r="30"
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,1000 V900 L140,900 A 10 10 1 1 1 220,900 A 10 10 1 1 1 300,900 A 10 10 1 1 1 380,900  A 10 10 1 1 1 460,900 H500 V1000"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,820 L450,820"></path>
		</svg>
	);
}

export function RelayDPDTCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 1000">
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,200 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,100 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,300 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,200  295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="200"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="100"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="300"
				cx="450"
				r="30"
			/>
			//Dashed
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 2}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M300,230 V800"
				strokeDasharray="25 35"
				strokeDashoffset="0"
			/>
			//Switch Two
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 0,600 120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,500 -120,0" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="m 600,700 -120,0" />
			<path
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="m 180,600  295,62"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="600"
				cx="150"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="500"
				cx="450"
				r="30"
			/>
			<circle
				fill="transparent"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cy="700"
				cx="450"
				r="30"
			/>
			<path
				strokeWidth={STROKE_WIDTH * 4}
				stroke="currentColor"
				fill="none"
				d="M100,1000 V900 L140,900 A 10 10 1 1 1 220,900 A 10 10 1 1 1 300,900 A 10 10 1 1 1 380,900  A 10 10 1 1 1 460,900 H500 V1000"
			></path>
			<path strokeWidth={STROKE_WIDTH * 4} stroke="currentColor" d="M150,820 L450,820"></path>
		</svg>
	);
}

export function ANDIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M0,200 H100 V100 H300 A 10 10 1 1 1 300,500 H100 V400 H0 100 V100 "
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M0,200 H100 V100 H300 A 10 10 1 1 1 300,500 H100 V400 H0 100 V100 "
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M500,300 H600" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M500,300 H600" />
		</svg>
	);
}

export function ORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M100,100 C100,100 250,300 100,500 C100,500 350,550 500,300 C500,250 300,50 100,100"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,200 H150" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,400 H150" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M500,300 H600" />
		</svg>
	);
}

export function NANDIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,200 H100 V100 H300 A 10 10 1 1 1 300,500 H100 V400 H0 100 V200"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,200 H100 V100 H300 A 10 10 1 1 1 300,500 H100 V400 H0 100 V200"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cx={532}
				cy={300}
				r={25}
			></circle>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M550,300 H600" />
		</svg>
	);
}

export function NORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M100,100 C100,100 250,300 100,500 C100,500 350,550 500,300 C500,250 300,50 100,100"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,200 H150" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,400 H150" />
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cx={532}
				cy={300}
				r={25}
			></circle>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M550,300 H600" />
		</svg>
	);
}

export function XORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M100,100 C100,100 250,300 100,500 C100,500 350,550 500,300 C500,250 300,50 100,100"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M60,100 C60,100 210,300 60,500"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,200 H110" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,400 H110" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M500,300 H600" />
		</svg>
	);
}

export function XNORIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M100,100 C100,100 250,300 100,500 C100,500 350,550 500,300 C500,250 300,50 100,100"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cx={532}
				cy={300}
				r={25}
			></circle>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M60,100 C60,100 210,300 60,500"
			/>
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,200 H110" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,400 H110" />
			<path fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M550,300 H600" />
		</svg>
	);
}

export function NOTIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M150,125 V475 L450,300 L150,125"
			/>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				cx={480}
				cy={300}
				r={25}
			></circle>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,300 H150" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M500,300 H600" />
		</svg>
	);
}

export function BUFFERIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" fill="currentColor" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				strokeLinejoin="round"
				strokeLinecap="round"
				d="M150,125 V475 L450,300 L150,125"
			/>
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M0,300 H150" />
			<path stroke="currentColor" strokeWidth={STROKE_WIDTH * 4} d="M450,300 H600" />
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
		<svg {...props} height="33px" width="33px" viewBox="0 0 600 600">
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 H200 V175 V435 V300  M266,250 V350 M332,175 V425  M400,250 V350 V300 H600 M130,115 V188 V150 H95 H165"
			></path>
		</svg>
	);
}

export function PhotovoltaicCellIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 600 600">
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M50,90 L100,130"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				d="M90,40 L140,85"
				strokeLinejoin="miter"
				strokeLinecap="square"
				markerEnd="url(#head)"
			/>
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 H200 V250 V350 V300  M266,175 V425 M332,250 V350  M400,175 V425 V300 H600  M480,115 V188 V150 H445 H515"
			></path>
			<path
				stroke="currentColor"
				fill="none"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,300 H200 V250 V350 V300  M266,175 V425 M332,250 V350  M400,175 V425 V300 H600  M480,115 V188 V150 H445 H515"
			></path>
			<circle
				fill="none"
				stroke="currentColor"
				strokeWidth={STROKE_WIDTH * 4}
				r={185}
				cx={300}
				cy={300}
			/>
		</svg>
	);
}

export function PowerSupplyIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} height="33px" width="33px" viewBox="0 0 600 600">
			<path
				stroke="currentColor"
				fill="none"
				strokeLinejoin="round"
				strokeLinecap="round"
				strokeWidth={STROKE_WIDTH * 4}
				d="M0,200 H100 M0,400 H100 M100,100 V500 H500 V100 H100 M500,200 H600 M500,400 H600 M100,500 L500,100 M350,380 H370 M390,380 H410 M430,380 H450 M350,350 H450 M150,250 C150,250 175,200 200,250 C200,250 225,300 250,250"
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
