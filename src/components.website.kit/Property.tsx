import React, { ReactElement } from "react";
import { Border, Radius, Shadow, Shadows, Stroke, TextLabel$Content, TextLabel$Content$Style } from "./components";
import { DataTypes } from "./Types";

export class ResolvingComponentsProperty {
	readonly data: ComponentsProperty;

	constructor(data: ComponentsProperty) {
		this.data = data;
	}

	public resolvingStyling(): React.CSSProperties | undefined {
		let types: [string | undefined, string | undefined, string | undefined, string | undefined] = [undefined, undefined, undefined, undefined];

		if (this.data.design) {
			if (this.data.design.type !== Border) throw new Error("Only the type '<Border>...</Border>' can be used; any other type of value is not valid.");

			const borderProps = this.data.design.props;
			const borderChildren = borderProps.children;
			
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
		}

		let datas: React.CSSProperties = {
			height: this.data.height,
			width: this.data.width,

			backgroundColor: resolvingColor(this.data.backgroundColor),
			border: `${types[1]} solid ${types[2]}`,
			borderRadius: types[0],
			boxShadow: types[3],

			padding: resolvingNumber(this.data.padding),
			margin: resolvingNumber(this.data.margin),
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

	public resolvingValue(): string | (ReactElement | string)[] {

		let v = this.data.content;

		if (!v) return '';

		let text: string | (ReactElement | string)[] = [''];
		function Inner(props: ComponentsProperty$TextLabel$Content, content: (React.ReactElement | string)[] = []): (React.ReactElement | string)[] {
			if (typeof props.children === "string") content.push(props.children);
			else if (Array.isArray(props.children)) {
				props.children.forEach((value) => {
					if (typeof value === "string") content.push(value);
					else if (React.isValidElement(value)) {
						if (value.type === TextLabel$Content$Style) {
							const ContentProps = value.props as ComponentsProperty$TextLabel$Content$Style;
							switch (ContentProps.style) {
								case 'strong': {
									content.push(<b>{Inner(ContentProps)}</b>);
									break;
								}
								case 'underline': {
									content.push(<u>{Inner(ContentProps)}</u>);
									break;
								}
								case 'italic': {
									content.push(<i>{Inner(ContentProps)}</i>);
									break;
								}
								default: {
									if (typeof ContentProps.style === "object") {
										let mapping: { reference: string; } | { weight: number } = ContentProps.style;
										if ('reference' in mapping) {
											content.push(<a href={mapping.reference ? undefined : '#' + mapping.reference}>{Inner(ContentProps)}</a>);
										} else if ('weight' in mapping) {
											content.push(<p style={
												{
													fontWeight: mapping.weight
												}
											}>{Inner(ContentProps)}</p>);
										}
									}
								}
							}
							return;
						}
						throw new Error("Only the type '<TextLabel$Content$Style ...>...</TextLabel$Content$Style>' or 'string' can be used; any other type of value is not valid.")
					} 
				})
			}

			return content;
		}
		
		if (typeof v === "string") {
			text = v;
		} else if (React.isValidElement(v)) {
			if (v.type === TextLabel$Content) {
				const ContentProps = v.props as ComponentsProperty$TextLabel$Content;
				text = Inner(ContentProps, text);
				return text;
			}
			throw new Error("Only the type '<TextLabel$Content>...</TextLabel$Content>' can be used; any other type of value is not valid.")
		}

		console.log(v);

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
			} else if (this.data.style === 'underline') {
				mapping.textDecoration = 'underline';
			}

			mapping.color = resolvingColor(this.data.fontColor);
		}
		return mapping;
	}
}

export class ResolvingComponentsProperty$LinearLayout extends ResolvingComponentsProperty {
	readonly data: ComponentsProperty$LinearLayout;

	constructor(data: ComponentsProperty$LinearLayout) {
		super(data);
		this.data = data;
	}

	public resolvingStyling(): React.CSSProperties | undefined {
		let data = this.data;
		let mapping: React.CSSProperties | undefined = super.resolvingStyling();
		if (mapping) {
			mapping.display = 'flex';
			if (data.orientation && data.orientation === 'horizontal') {
				mapping.flexDirection = 'row';
			} else if (data.orientation && data.orientation === 'vertical') {
				mapping.flexDirection = 'column';
			}
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
	margin?: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
		  | ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
		  | (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters);

	onPressed?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
	onReleased?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
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

export interface ComponentsProperty$TextLabel extends ComponentsProperty {
	content: string | React.ReactElement<ComponentsProperty$TextLabel$Content>;
	style?: 'strong' | 'underline' | 'italic' | 'oblique' | { weight: number };
	fontColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentsProperty$TextLabel$Content {
	children: string | (string | React.ReactElement<ComponentsProperty$TextLabel$Content$Style>)[];
}

export interface ComponentsProperty$TextLabel$Content$Style extends ComponentsProperty$TextLabel$Content {
	style: 'strong' | 'underline' | 'italic' | { weight: number } | { reference: string };
	color?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentsProperty$LinearLayout extends ComponentsProperty {
	children: React.ReactElement<ComponentsProperty>[] | React.ReactElement<ComponentsProperty>;
	orientation: 'horizontal' | 'vertical';
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