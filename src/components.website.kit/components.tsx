import React from "react";
import { ComponentProperty$Stroke, ComponentProperty$Radius, ComponentsProperty, ResolvingComponentsProperty, ComponentProperty$Border, ComponentProperty$Shadows, ComponentProperty$Shadow } from "./Property";

export function View(data: ComponentsProperty): React.JSX.Element {
	let rcp: ResolvingComponentsProperty = new ResolvingComponentsProperty(data);
	let component: React.JSX.Element = <div
		style={rcp.resolvingStyling()}
		onMouseDown={data.onPressed} onTouchStart={data.onPressed}
		onMouseUp={data.onReleased} onTouchEnd={data.onReleased} />;

	return component;
}

export function Border(data: ComponentProperty$Border): React.JSX.Element {
	return <div />; // empty, reason: only need the "props"
}

export function Stroke(data: ComponentProperty$Stroke): React.JSX.Element {
	return <div />; // empty, reason: only need the "props"
}

export function Radius(data: ComponentProperty$Radius): React.JSX.Element {
	return <div />; // empty, reason: only need the "props"
}

export function Shadows(data: ComponentProperty$Shadows): React.JSX.Element {
	return <div />; // empty, reason: only need the "props"
}

export function Shadow(data: ComponentProperty$Shadow): React.JSX.Element {
	return <div />; // empty, reason: only need the "props"
}