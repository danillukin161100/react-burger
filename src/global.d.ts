import "react";

declare module "react" {
	interface HTMLAttributes<T> {
		onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
		onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
	}
	interface RefAttributes<T> {
		onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
		onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
	}
}

declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

// declare module "*.css" {
// 	interface IClassNames {
// 		[className: string]: string;
// 	}
// 	const classNames: IClassNames;
// 	export = classNames;
// }

// declare module "*.module.css";
