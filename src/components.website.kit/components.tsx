import React from "react";
import { ComponentsProperty, ResolvingComponentsProperty } from "./Property";

export function View(data: ComponentsProperty): React.JSX.Element {
	let rcp: ResolvingComponentsProperty = new ResolvingComponentsProperty(data);
	let component: React.JSX.Element = <div
		style={{
			height: data.height,
			width: data.width,

			backgroundColor: rcp.resolvingBackgroundColor(),
		}}
		onMouseDown={data.onPressed} onTouchStart={data.onPressed}
		onMouseUp={data.onReleased} onTouchEnd={data.onReleased} />;

	return component;
}
