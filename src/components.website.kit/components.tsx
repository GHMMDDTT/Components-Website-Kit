import React from "react";
import { ComponentProperty$Style$Stroke, ComponentProperty$Style$Radius, ComponentsProperty, ResolvingComponentsProperty, ComponentProperty$Style$Border, ComponentProperty$Style$Shadows, ComponentProperty$Style$Shadow, ComponentsProperty$TextLabel, ResolvingComponentsProperty$TextLabel, ComponentsProperty$TextLabel$Content, ComponentsProperty$TextLabel$Content$Style } from "./Property";
import { DataTypes } from "./Types";

export function View(data: ComponentsProperty): React.JSX.Element {
	let rcp: ResolvingComponentsProperty = new ResolvingComponentsProperty(data);
	let component: React.JSX.Element = <div
		style={rcp.resolvingStyling()}
		onMouseDown={data.onPressed} onTouchStart={data.onPressed}
		onMouseUp={data.onReleased} onTouchEnd={data.onReleased} />;

	return component;
}

export function Border(_: ComponentProperty$Style$Border): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV; // empty, reason: only need the "props"
}

export function Stroke(_: ComponentProperty$Style$Stroke): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV; // empty, reason: only need the "props"
}

export function Radius(_: ComponentProperty$Style$Radius): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV; // empty, reason: only need the "props"
}

export function Shadows(_: ComponentProperty$Style$Shadows): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV; // empty, reason: only need the "props"
}

export function Shadow(_: ComponentProperty$Style$Shadow): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV; // empty, reason: only need the "props"
}

export function TextLabel(data: ComponentsProperty$TextLabel): React.JSX.Element {
	let rcp: ResolvingComponentsProperty$TextLabel = new ResolvingComponentsProperty$TextLabel(data);
	// console.log(rcp.resolvingValue());
	let component: React.JSX.Element = <p
		style={rcp.resolvingStyling()}
		onMouseDown={data.onPressed} onTouchStart={data.onPressed}
		onMouseUp={data.onReleased} onTouchEnd={data.onReleased} dangerouslySetInnerHTML={ { __html: rcp.resolvingValue() } } />;

	return component;
}

export function TextLabel$Content(_: ComponentsProperty$TextLabel$Content): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV;
}

export function TextLabel$Content$Style(_: ComponentsProperty$TextLabel$Content$Style): React.JSX.Element {
	return DataTypes.DataTypesDefault.DEFAULT_DIV;
}