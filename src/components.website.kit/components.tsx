import React from "react";

export function View(data: ComponentsProperty): View {
	let rp = new ResolvingProperty(data);
	
	return <div style={{
		width: rp.resolvingWidth(),
		height: rp.resolvingHeight(),

		margin: rp.resolvingMargin(),
		backgroundColor: rp.resolvingBackgroundColor()
	}} />;
}

export function ViewGroup(data: ComponentsPropertyChildren): ViewGroup {
	let rp = new ResolvingProperty(data);
	return <div style={{
		width: rp.resolvingWidth(),
		height: rp.resolvingHeight(),

		margin: rp.resolvingMargin(),
		backgroundColor: rp.resolvingBackgroundColor()
	}}>
		{data.children}
	</div>;
}

export function Border(data: StyleDesign): View {
	return <div></div>
}

class ResolvingProperty {
	private readonly data: ComponentsProperty;

	constructor(data: ComponentsProperty) {
		this.data = data;
	}

	public resolvingMargin(): string | undefined {
		const m = this.data.margin;
		if (m === undefined) return undefined;

		if (typeof m === "number") return `${m}px `.repeat(4);
		if (typeof m === "string") return m === 'auto' ? 'auto' : `${m} ${m} ${m} ${m}`;
		if (Array.isArray(m)) {
			const filled = [...m];
			while (filled.length < 4) filled.push(filled[filled.length % m.length]);
			return filled.map(v => (typeof v === 'string' ? v : `${v}px`)).join(' ');
		}

		return undefined;
	}

	public resolvingBackgroundColor(): string | undefined {
		const m = this.data.backgroundColor;
		if (m === undefined) return undefined;

		if (Array.isArray(m)) {
			if (typeof m[0] === 'number' && typeof m[1] === 'number' && typeof m[2] === 'number') {
				if (typeof m[3] === 'number') {
					return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${m[3] / 255})`;
				}
				return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
			} else {
				if (m[3] !== undefined) {
					return `#${m[0]}${m[1]}${m[2]}${m[3]}`
				}
				return `#${m[0]}${m[1]}${m[2]}`
			}
		}

		return undefined;
	}

	public resolvingWidth(): string | undefined {
		return this.resolvingStringUtilsOfSize(this.data.width);
	}

	public resolvingHeight(): string | undefined {
		return this.resolvingStringUtilsOfSize(this.data.height);
	}

	public resolvingStringUtilsOfSize(m: string): string | undefined {
		if (m === undefined) return undefined;
		return m;
	}
}

type View =
	React.JSX.Element;

type ViewGroup = 
	View;

interface ComponentsProperty {
	width: RangePorcent | Pixel,
	height: RangePorcent | Pixel,

	styling: StyleDesign

	backgroundColor?: [NumberHexadecimal, NumberHexadecimal, NumberHexadecimal, NumberHexadecimal?] | [RangeNumber, RangeNumber, RangeNumber, RangeNumber?],

	margin?: [number, number, number, number] | [number, number] | number | [RangePorcent, RangePorcent, RangePorcent, RangePorcent] | [RangePorcent, RangePorcent] | RangePorcent | 'auto'
}

interface BorderDesign {
    borderRadius: Pixel;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
}

// 2. Define la estructura de tu nueva prop 'style'
interface StyleDesign extends React.JSX.Element {
    border?: BorderDesign;
}


interface ComponentsPropertyChildren extends ComponentsProperty {
	children: View
}


type RangeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;
type NumberHexadecimal = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '0A' | '0B' | '0C' | '0D' | '0E' | '0F' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '1A' | '1B' | '1C' | '1D' | '1E' | '1F' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '2A' | '2B' | '2C' | '2D' | '2E' | '2F' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '3A' | '3B' | '3C' | '3D' | '3E' | '3F' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '4A' | '4B' | '4C' | '4D' | '4E' | '4F' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '5A' | '5B' | '5C' | '5D' | '5E' | '5F' | '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '6A' | '6B' | '6C' | '6D' | '6E' | '6F' | '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '7A' | '7B' | '7C' | '7D' | '7E' | '7F' | '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89' | '8A' | '8B' | '8C' | '8D' | '8E' | '8F' | '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99' | '9A' | '9B' | '9C' | '9D' | '9E' | '9F' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'AA' | 'AB' | 'AC' | 'AD' | 'AE' | 'AF' | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'BA' | 'BB' | 'BC' | 'BD' | 'BE' | 'BF' | 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'CA' | 'CB' | 'CC' | 'CD' | 'CE' | 'CF' | 'D0' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'DA' | 'DB' | 'DC' | 'DD' | 'DE' | 'DF' | 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8' | 'E9' | 'EA' | 'EB' | 'EC' | 'ED' | 'EE' | 'EF' | 'F0' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'FA' | 'FB' | 'FC' | 'FD' | 'FE' | 'FF'

type RangePorcent = '0%' | '1%' | '2%' | '3%' | '4%' | '5%' | '6%' | '7%' | '8%' | '9%' | '10%' | '11%' | '12%' | '13%' | '14%' | '15%' | '16%' | '17%' | '18%' | '19%' | '20%' | '21%' | '22%' | '23%' | '24%' | '25%' | '26%' | '27%' | '28%' | '29%' | '30%' | '31%' | '32%' | '33%' | '34%' | '35%' | '36%' | '37%' | '38%' | '39%' | '40%' | '41%' | '42%' | '43%' | '44%' | '45%' | '46%' | '47%' | '48%' | '49%' | '50%' | '51%' | '52%' | '53%' | '54%' | '55%' | '56%' | '57%' | '58%' | '59%' | '60%' | '61%' | '62%' | '63%' | '64%' | '65%' | '66%' | '67%' | '68%' | '69%' | '70%' | '71%' | '72%' | '73%' | '74%' | '75%' | '76%' | '77%' | '78%' | '79%' | '80%' | '81%' | '82%' | '83%' | '84%' | '85%' | '86%' | '87%' | '88%' | '89%' | '90%' | '91%' | '92%' | '93%' | '94%' | '95%' | '96%' | '97%' | '98%' | '99%' | '100%';

type Pixel = `${number}px`;