import React from "react";
import { Border, Radius, Shadow, Shadows, Stroke } from "./components";
import { DataTypes } from "./Types";

export class ResolvingComponentsProperty {
	readonly data: ComponentsProperty;

	constructor(data: ComponentsProperty) {
		this.data = data;
	}
	
	private resolvingColor(
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

	private resolvingNumber(
		an$n: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
			| ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
			| (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters)
	): string | undefined {
		if (!an$n) return undefined;

		if (Array.isArray(an$n)) {
			return an$n.length === 2 ? `${an$n[0]} ${an$n[0]} ${an$n[1]} ${an$n[1]}` : `${an$n[0]} ${an$n[1]} ${an$n[2]} ${an$n[3]}`;
		}

		return `${an$n} ${an$n} ${an$n} ${an$n}`
	}

	public resolvingStyling(): React.CSSProperties | undefined {
		const s = this.data.style;
		if (!s) return undefined;
		
		if (s.type !== Border) throw new Error("Only the type '<Border>...</Border>' can be used; any other type of value is not valid.");

		const borderProps = s.props;
		const borderChildren = borderProps.children;

		let types: [string | undefined, string | undefined, string | undefined, string | undefined] = [undefined, undefined, undefined, undefined];
		
		React.Children.forEach(borderChildren, (child) => {
			
			if (React.isValidElement(child)) {
				
				if (child.type === Stroke && !(types[1] && types[2])) {
					const strokeProps = child.props as ComponentProperty$Stroke; 
					
					types[1] = strokeProps.strokeWidth;
					types[2] = this.resolvingColor(strokeProps.strokeColor);

					return;
				} else if (child.type === Radius && !types[0]) {
					const radiusProps = child.props as ComponentProperty$Radius;

					types[0] = this.resolvingNumber(radiusProps.radius);

					return;
				} else if (child.type === Shadows && !types[3]) {
					const childShadows = child.props as ComponentProperty$Shadows;
					let shadow: string = '';

					React.Children.forEach(childShadows.children, (child) => {

						if (React.isValidElement(child)) {

							if (child.type === Shadow) {
								const shadowProps = child.props as ComponentProperty$Shadow;

								shadow += `${shadowProps.leftShadow} `;
								shadow += `${shadowProps.bottomShadow} `;
								shadow += !shadowProps.blushShadow ? '' : `${shadowProps.blushShadow} `;
								shadow += !shadowProps.shadowColor ? 'black' : this.resolvingColor(shadowProps.shadowColor);

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

			backgroundColor: this.resolvingColor(this.data.backgroundColor),
			border: `${types[1]} solid ${types[2]}`,
			borderRadius: types[0],
			boxShadow: types[3]
		};

		return datas;
	}
}

export interface ComponentsProperty {
	height: DataTypes.ViewPort$Height | DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	width: DataTypes.ViewPort$Width | DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	id?: string;

	backgroundColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;

	style?: React.ReactElement<ComponentProperty$Border>;

	onPressed?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
	onReleased?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
}

export interface ComponentProperty$Stroke {
	strokeWidth: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters,
	strokeColor: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}

export interface ComponentProperty$Radius {
	radius: ([DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point, DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch, DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters, DataTypes.Millimeters])
		  | ([DataTypes.PorcentageRange, DataTypes.PorcentageRange] | [DataTypes.Pixel, DataTypes.Pixel] | [DataTypes.Point, DataTypes.Point] | [DataTypes.Inch, DataTypes.Inch] | [DataTypes.Centimeters, DataTypes.Centimeters] | [DataTypes.Millimeters, DataTypes.Millimeters])
		  | (DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters);
}

export interface ComponentProperty$Border {
	children: React.ReactElement<ComponentProperty$Radius | ComponentProperty$Stroke | ComponentProperty$Shadows> | React.ReactElement<ComponentProperty$Radius | ComponentProperty$Stroke | ComponentProperty$Shadows>[];
}

export interface ComponentProperty$Shadows {
	children: React.ReactElement<ComponentProperty$Shadow> | React.ReactElement<ComponentProperty$Shadow>[];
}

export interface ComponentProperty$Shadow {
	leftShadow: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	bottomShadow: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	blushShadow?: DataTypes.PorcentageRange | DataTypes.Pixel | DataTypes.Point | DataTypes.Inch | DataTypes.Centimeters | DataTypes.Millimeters;
	shadowColor?: [DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor, DataTypes.RangeNumberColor?] | [DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor, DataTypes.RangeHexadecimalColor?] | DataTypes.NamedColor | DataTypes.DeprecatedSystemColor;
}