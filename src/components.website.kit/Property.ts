import React from "react";
import { Border, Radius, Shadow, Shadows, Stroke, TextLabel$Content, TextLabel$Content$Style } from "./components";
import { DataTypes } from "./Types";
import { getValue } from "@testing-library/user-event/dist/utils";

export class ResolvingComponentsProperty {
	readonly data: ComponentsProperty;

	constructor(data: ComponentsProperty) {
		this.data = data;
	}

	public resolvingStyling(): React.CSSProperties | undefined {
		const s = this.data.design;
		if (!s) return undefined;
		
		if (s.type !== Border) throw new Error("Only the type '<Border>...</Border>' can be used; any other type of value is not valid.");

		const borderProps = s.props;
		const borderChildren = borderProps.children;

		let types: [string | undefined, string | undefined, string | undefined, string | undefined] = [undefined, undefined, undefined, undefined];
		
		React.Children.forEach(borderChildren, (child) => {
			
			if (React.isValidElement(child)) {
				
				if (child.type === Stroke && !(types[1] && types[2])) {
					const strokeProps = child.props as ComponentProperty$Style$Stroke; 
					
					types[1] = strokeProps.strokeWidth;
					types[2] = resolvingColor(strokeProps.strokeColor);

					return;
				} else if (child.type === Radius && !types[0]) {
					const radiusProps = child.props as ComponentProperty$Style$Radius;

					types[0] = resolvingNumber(radiusProps.radius);

					return;
				} else if (child.type === Shadows && !types[3]) {
					const childShadows = child.props as ComponentProperty$Style$Shadows;
					let shadow: string = '';

					React.Children.forEach(childShadows.children, (child) => {

						if (React.isValidElement(child)) {

							if (child.type === Shadow) {
								const shadowProps = child.props as ComponentProperty$Style$Shadow;

								shadow += `${shadowProps.leftShadow} `;
								shadow += `${shadowProps.bottomShadow} `;
								shadow += !shadowProps.blurShadow ? '' : `${shadowProps.blurShadow} `;
								shadow += !shadowProps.shadowColor ? 'black' : resolvingColor(shadowProps.shadowColor);

								shadow += ', ';
								return;
							}

							throw new Error("Only the type '<Shadow .../>' can be used; any other type of value is not valid.")

						}

					});

					types[3] = shadow.substring(0, shadow.length - 2);
					return;
				}
				throw new Error("Duplicate tag ('Shadows', 'Radius' & 'Stroke') or invalid tag");
			}
		});

		let datas: React.CSSProperties = {
			height: this.data.height,
			width: this.data.width,

			backgroundColor: resolvingColor(this.data.backgroundColor),
			border: `${types[1]} solid ${types[2]}`,
			borderRadius: types[0],
			boxShadow: types[3],

			padding: resolvingNumber(this.data.padding)
		};

		return datas;
	}
}

export class ResolvingComponentsProperty$TextLabel extends ResolvingComponentsProperty {
	readonly data: ComponentsProperty$TextLabel;

	constructor(data: ComponentsProperty$TextLabel) {
		super(data);
		this.data = data;
	}

	public resolvingValue(): string {
		function Inner(props: ComponentsProperty$TextLabel$Content, text: string = ''): string {
			if (typeof props.children === "string") text += props.children;
			else if (Array.isArray(props.children)) {
				props.children.forEach((value) => {
					if (typeof value === "string") text += value;
					else if (React.isValidElement(value)) {
						if (value.type === TextLabel$Content$Style) {
							const ContentProps = value.props as ComponentsProperty$TextLabel$Content$Style;
							switch (ContentProps.style) {
								case 'strong': {
									text += `<b ${ContentProps.color ? ` style='color: ${resolvingColor(ContentProps.color)}'` : ''}>${Inner(ContentProps)}</b>`;
									break;
								}
								case 'underline': {
									text += `<u ${ContentProps.color ? ` style='color: ${resolvingColor(ContentProps.color)}'` : ''}>${Inner(ContentProps)}</u>`;
									break;
								}
								case 'italic': {
									text += `<i ${ContentProps.color ? ` style='color: ${resolvingColor(ContentProps.color)}'` : ''}>${Inner(ContentProps)}</i>`;
									break;
								}
								default: {
									if (typeof ContentProps.style === "object") {
										let mapping: { reference: string; } | { weight: number } = ContentProps.style;
										if ('reference' in mapping) {
											text += `<a ${ContentProps.color ? ` style='color: ${resolvingColor(ContentProps.color)}'` : ''} href='#${mapping.reference}'>${Inner(ContentProps)}</a>`;
										} else if ('weight' in mapping) {
											text += `<p ${ContentProps.color ? ` style='margin: 0px; font-weight: ${mapping.weight}; color: ${resolvingColor(ContentProps.color)}'` : ''}>${Inner(ContentProps)}</p>`;
										}
									}
								}
							}
						} else {
							const ContentProps = value.props as ComponentsProperty$TextLabel$Content;

							text = Inner(ContentProps, text);
						}
					} 
				})
			}

			return text;
		}

		let v = this.data.value;
		let text: string = '';

		if (!v) return '';
		
		if (React.isValidElement(v)) {
			const ContentProps = v.props as ComponentsProperty$TextLabel$Content;

			text = Inner(ContentProps, text);
			console.log(text)
		} else if (typeof v === "string") {
			text = v;
		}

		return text;
	}

	public resolvingStyling(): React.CSSProperties | undefined {
		let mapping: React.CSSProperties | undefined = super.resolvingStyling();
		if (mapping) {
			if (typeof this.data.style === "object") {
				let map: { weight: number } = this.data.style;
				if ('weight' in map) {
					mapping.fontWeight = map.weight;
				}
			} else if (this.data.style === 'strong') {
				mapping.fontWeight = 800;
			} else if (this.data.style === 'underline') {
				mapping.fontStyle = 'unset';
			} else if (this.data.style === 'italic') {
				mapping.fontStyle = 'italic';
			} else if (this.data.style === 'oblique') {
				mapping.fontStyle = 'oblique';
			}

			mapping.color = resolvingColor(this.data.fontColor);
		}
		return mapping;
	}
}

export interface ComponentsProperty {
	height: DataTypes.ViewPort$Height | DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	width: DataTypes.ViewPort$Width | DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	id?: string;

	backgroundColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;

	design?: React.ReactElement<ComponentProperty$Style$Border>;

	padding?: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
		  | ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
		  | (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters);

	onPressed?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
	onReleased?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
}

export interface ComponentsProperty$TextLabel extends ComponentsProperty {
	value: string | React.JSX.Element;
	style?: 'strong' | 'underline' | 'italic' | 'oblique' | { weight: number };
	fontColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentsProperty$TextLabel$Content {
	children: string | (string | React.JSX.Element)[];
}

export interface ComponentsProperty$TextLabel$Content$Style extends ComponentsProperty$TextLabel$Content {
	style: 'strong' | 'underline' | 'italic' | { weight: number } | { reference: string };
	color?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentProperty$Style$Stroke {
	strokeWidth: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters,
	strokeColor: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentProperty$Style$Radius {
	radius: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
		  | ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
		  | (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters);
}

export interface ComponentProperty$Style$Border {
	children: React.ReactElement<ComponentProperty$Style$Radius | ComponentProperty$Style$Stroke | ComponentProperty$Style$Shadows> | React.ReactElement<ComponentProperty$Style$Radius | ComponentProperty$Style$Stroke | ComponentProperty$Style$Shadows>[];
}

export interface ComponentProperty$Style$Shadows {
	children: React.ReactElement<ComponentProperty$Style$Shadow> | React.ReactElement<ComponentProperty$Style$Shadow>[];
}

export interface ComponentProperty$Style$Shadow {
	leftShadow: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	bottomShadow: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	blurShadow?: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	shadowColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

function resolvingColor(
	bc: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?]
		| [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?]
		| DataTypes.NamedColor
		| DataTypes.DeprecatedSystemColor
		| undefined
): string | undefined {
	if (bc === undefined) return undefined;


	if (Array.isArray(bc)) {
		if (typeof bc[0] === 'number' && typeof bc[1] === 'number' && typeof bc[2] === 'number') {
			return typeof bc[3] === 'number' && bc[3] !== undefined ? `rgba(${bc[0]}, ${bc[1]}, ${bc[2]}, ${bc[3]})` : `rgb(${bc[0]}, ${bc[1]}, ${bc[2]})`
		} else {
			return bc[3] !== undefined ? `#${bc[0]}${bc[1]}${bc[2]}${bc[3]}` : `#${bc[0]}${bc[1]}${bc[2]}`
		}
	}

	return bc;
}

function resolvingNumber(
	an$n: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
		| ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
		| (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters) | undefined
): string | undefined {
	if (!an$n) return '0px 0px 0px 0px';

	if (Array.isArray(an$n)) {
		return an$n.length === 2 ? `${an$n[0]} ${an$n[0]} ${an$n[1]} ${an$n[1]}` : `${an$n[0]} ${an$n[1]} ${an$n[2]} ${an$n[3]}`;
	}

	return `${an$n} ${an$n} ${an$n} ${an$n}`
}