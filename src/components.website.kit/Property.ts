export class ResolvingComponentsProperty {
	readonly data: ComponentsProperty;

	constructor(data: ComponentsProperty) {
		this.data = data;
	}
	
	public resolvingBackgroundColor(): string | undefined {
		const bc = this.data.backgroundColor;
		if (bc === undefined) return undefined;


		if (Array.isArray(bc)) {
			if (typeof bc[0] === 'number' && typeof bc[1] === 'number' && typeof bc[2] === 'number') {
				return typeof bc[3] === 'number' && bc[3] !== undefined ? `rgb(${bc[0]}, ${bc[1]}, ${bc[2]}, ${bc[3]}` : `rgb(${bc[0]}, ${bc[1]}, ${bc[2]}`
			} else {
				return bc[3] !== undefined ? `#${bc[0]}${bc[1]}${bc[2]}${bc[3]}` : `#${bc[0]}${bc[1]}${bc[2]}`
			}
		}

		return undefined;
	}

	public resolvingOnPressedListener() {

	}
}

export interface ComponentsProperty {
	height: ViewPort$Height | PorcentageRange | Pixel | Point | Inch | Centimeters | Millimeters;
	width: ViewPort$Width | PorcentageRange | Pixel | Point | Inch | Centimeters | Millimeters;
	id: string;

	backgroundColor?: [RangeNumberColor, RangeNumberColor, RangeNumberColor, RangeNumberColor?] | [RangeHexadecimalColor, RangeHexadecimalColor, RangeHexadecimalColor, RangeHexadecimalColor?];

	onPressed?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
	onReleased?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
}

export type PorcentageRange =
	'0%' | '1%' | '2%' | '3%' | '4%' | '5%' | '6%' | '7%' | '8%' | '9%' | '10%' | '11%' | '12%' | '13%' | '14%' | '15%' | '16%' | '17%' | '18%' | '19%' | '20%' | '21%' | '22%' | '23%' | '24%' | '25%' | '26%' | '27%' | '28%' | '29%' | '30%' | '31%' | '32%' | '33%' | '34%' | '35%' | '36%' | '37%' | '38%' | '39%' | '40%' | '41%' | '42%' | '43%' | '44%' | '45%' | '46%' | '47%' | '48%' | '49%' | '50%' | '51%' | '52%' | '53%' | '54%' | '55%' | '56%' | '57%' | '58%' | '59%' | '60%' | '61%' | '62%' | '63%' | '64%' | '65%' | '66%' | '67%' | '68%' | '69%' | '70%' | '71%' | '72%' | '73%' | '74%' | '75%' | '76%' | '77%' | '78%' | '79%' | '80%' | '81%' | '82%' | '83%' | '84%' | '85%' | '86%' | '87%' | '88%' | '89%' | '90%' | '91%' | '92%' | '93%' | '94%' | '95%' | '96%' | '97%' | '98%' | '99%' | '100%';

export type ViewPort$Height =
	'0vh' | '1vh' | '2vh' | '3vh' | '4vh' | '5vh' | '6vh' | '7vh' | '8vh' | '9vh' | '10vh' | '11vh' | '12vh' | '13vh' | '14vh' | '15vh' | '16vh' | '17vh' | '18vh' | '19vh' | '20vh' | '21vh' | '22vh' | '23vh' | '24vh' | '25vh' | '26vh' | '27vh' | '28vh' | '29vh' | '30vh' | '31vh' | '32vh' | '33vh' | '34vh' | '35vh' | '36vh' | '37vh' | '38vh' | '39vh' | '40vh' | '41vh' | '42vh' | '43vh' | '44vh' | '45vh' | '46vh' | '47vh' | '48vh' | '49vh' | '50vh' | '51vh' | '52vh' | '53vh' | '54vh' | '55vh' | '56vh' | '57vh' | '58vh' | '59vh' | '60vh' | '61vh' | '62vh' | '63vh' | '64vh' | '65vh' | '66vh' | '67vh' | '68vh' | '69vh' | '70vh' | '71vh' | '72vh' | '73vh' | '74vh' | '75vh' | '76vh' | '77vh' | '78vh' | '79vh' | '80vh' | '81vh' | '82vh' | '83vh' | '84vh' | '85vh' | '86vh' | '87vh' | '88vh' | '89vh' | '90vh' | '91vh' | '92vh' | '93vh' | '94vh' | '95vh' | '96vh' | '97vh' | '98vh' | '99vh' | '100vh';

export type ViewPort$Width =
	'0vw' | '1vw' | '2vw' | '3vw' | '4vw' | '5vw' | '6vw' | '7vw' | '8vw' | '9vw' | '10vw' | '11vw' | '12vw' | '13vw' | '14vw' | '15vw' | '16vw' | '17vw' | '18vw' | '19vw' | '20vw' | '21vw' | '22vw' | '23vw' | '24vw' | '25vw' | '26vw' | '27vw' | '28vw' | '29vw' | '30vw' | '31vw' | '32vw' | '33vw' | '34vw' | '35vw' | '36vw' | '37vw' | '38vw' | '39vw' | '40vw' | '41vw' | '42vw' | '43vw' | '44vw' | '45vw' | '46vw' | '47vw' | '48vw' | '49vw' | '50vw' | '51vw' | '52vw' | '53vw' | '54vw' | '55vw' | '56vw' | '57vw' | '58vw' | '59vw' | '60vw' | '61vw' | '62vw' | '63vw' | '64vw' | '65vw' | '66vw' | '67vw' | '68vw' | '69vw' | '70vw' | '71vw' | '72vw' | '73vw' | '74vw' | '75vw' | '76vw' | '77vw' | '78vw' | '79vw' | '80vw' | '81vw' | '82vw' | '83vw' | '84vw' | '85vw' | '86vw' | '87vw' | '88vw' | '89vw' | '90vw' | '91vw' | '92vw' | '93vw' | '94vw' | '95vw' | '96vw' | '97vw' | '98vw' | '99vw' | '100vw';

export type Pixel = `${number}px`;
export type Point = `${number}pt`;
export type Inch = `${number}in`;
export type Centimeters = `${number}cm`;
export type Millimeters = `${number}mm`;

export type RangeNumberColor =
	0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;

export type RangeHexadecimalColor =
	'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '0A' | '0B' | '0C' | '0D' | '0E' | '0F' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '1A' | '1B' | '1C' | '1D' | '1E' | '1F' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '2A' | '2B' | '2C' | '2D' | '2E' | '2F' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '3A' | '3B' | '3C' | '3D' | '3E' | '3F' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '4A' | '4B' | '4C' | '4D' | '4E' | '4F' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '5A' | '5B' | '5C' | '5D' | '5E' | '5F' | '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '6A' | '6B' | '6C' | '6D' | '6E' | '6F' | '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '7A' | '7B' | '7C' | '7D' | '7E' | '7F' | '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89' | '8A' | '8B' | '8C' | '8D' | '8E' | '8F' | '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99' | '9A' | '9B' | '9C' | '9D' | '9E' | '9F' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'AA' | 'AB' | 'AC' | 'AD' | 'AE' | 'AF' | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'BA' | 'BB' | 'BC' | 'BD' | 'BE' | 'BF' | 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'CA' | 'CB' | 'CC' | 'CD' | 'CE' | 'CF' | 'D0' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'DA' | 'DB' | 'DC' | 'DD' | 'DE' | 'DF' | 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8' | 'E9' | 'EA' | 'EB' | 'EC' | 'ED' | 'EE' | 'EF' | 'F0' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'FA' | 'FB' | 'FC' | 'FD' | 'FE' | 'FF';