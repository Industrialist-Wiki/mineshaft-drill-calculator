export const Resources = {
  soil: '🌱 Soil',
  'rich-soil':
      '<div style=\'display: inline; filter: sepia(33%) invert(0.3) saturate(7.1) hue-rotate(334deg) brightness(0.51);\'>🪨</div> Rich Soil',
  sand:
      '<div style=\'display: inline; filter: sepia(1) saturate(2.1) brightness(1.25);\'>🪨</div> Sand',
  gravel: '🪨 Gravel',
  rock: 'Rock',
  coal: 'Coal',
  'raw-copper': 'Raw Copper',
  'raw-iron': 'Raw Iron',
  'raw-lead': 'Raw Lead',
  'raw-zinc': 'Raw Zinc',
  'raw-zirconium': 'Raw Zirconium',
  'raw-uranium': 'Raw Uranium',
  'bauxite-residue': 'Bauxite Residue',
  'table-salt': 'Table Salt',
  'shallow-ef': 'Shallow Earth Fragment',
  'medium-ef': 'Medium Earth Fragment',
  'deep-ef': 'Deep Earth Fragment',
} as const satisfies Record<string, string>;

export type ResourceId = keyof typeof Resources;

export const DrillHeads = {
  copper: {
    dropdownText: 'Copper',
    infoText: 'Copper Drill Head',
    materialInfoText: 'Copper Ingot',
    materialAmount: 700,
    className: 'copper',
    getMulti: (d) => d / 150,
  },
  iron: {
    dropdownText: 'Iron',
    infoText: 'Iron Drill Head',
    materialInfoText: 'Iron Ingot',
    materialAmount: 2100,
    className: 'iron',
    getMulti: (d) => 0.04 * d ** 0.25,
  },
  steel: {
    dropdownText: 'Steel',
    infoText: 'Steel Drill Head',
    materialInfoText: 'Steel Ingot',
    materialAmount: 3500,
    className: 'steel',
    getMulti: (d) => 0.02 * d ** 0.25,
  },
  tungsten: {
    dropdownText: 'Tungsten',
    infoText: 'Tungsten Carbide Drill Head',
    materialInfoText: 'Tungsten Carbide Plate',
    materialAmount: 1275,
    className: 'tungsten',
    getMulti: (d) => 0.005 * d ** 0.25,
  },
} as const satisfies Record < string,
{
  dropdownText: string;
  infoText: string;
  materialInfoText: string;
  materialAmount: number;
  className: string;
  getMulti: (d: number) => number;
}
> ;

export type DrillheadId = keyof typeof DrillHeads;

export const Acids = {
  none: {
    dropdownText: 'None',
    infoText:
        '<div style=\'display: inline; margin-left: 2px;\'></div>🗙<div style=\'display: inline; margin-right: 2px;\'></div> No Acid',
    className: 'none',
    rate: 0,
    getMulti: (d: number) => d ** 2 / 900e3,
  },
  water: {
    dropdownText: 'Water',
    infoText: '💧 Water',
    className: 'water',
    rate: 10,
    getMulti: (d) => d ** 2 / 1875e3,
  },
  acetic: {
    dropdownText: 'Acetic',
    infoText:
        '<div style=\'display: inline; filter: grayscale(1) brightness(2.5);\'>🩸</div> Acetic Acid',
    className: 'acetic',
    rate: 3,
    getMulti: (d) => d ** 0.8 / 450,
  },
  sulfuric: {
    dropdownText: 'Sulfuric',
    infoText:
        '<div style=\'display: inline; filter: hue-rotate(236deg) brightness(3.5);\'>🩸</div> Sulfuric Acid',
    className: 'sulfuric',
    rate: 1,
    getMulti: (d) => 0.09 * d ** 0.25,
  },
  hydrochloric: {
    dropdownText: 'Hydrochloric',
    infoText:
        '<div style=\'display: inline; filter: hue-rotate(71deg) saturate(0.4) brightness(2.5);\'>🩸</div> Hydrochloric Acid',
    className: 'hydrochloric',
    rate: 1.5,
    getMulti: (d) => d < 6000 ?
        0.000013 * d ** (1.5 - 0.00005 * d) + 4.3875 * 10 ** -13.3 * d ** 3 :
        0.09 * d ** 0.25,
  },
} as const satisfies Record < string,
{
  dropdownText: string;
  infoText: string;
  className: string;
  rate: number;
  getMulti: (d: number) => number;
}
> ;

export type AcidId = keyof typeof Acids;

export const Oils = {
  none: {
    dropdownText: 'None',
    infoText:
        '<div style=\'display: inline; margin-left: 2px;\'></div>🗙<div style=\'display: inline; margin-right: 2px;\'></div> No Oil: ',
    className: 'none',
    rate: 0,
  },
  machineOil: {
    dropdownText: 'Machine Oil',
    infoText:
        '<div style=\'display: inline; filter: hue-rotate(65deg) brightness(3.5);\'>🩸</div> Machine Oil: ',
    className: 'machineoil',
    rate: 2,
  },
} as const satisfies Record < string,
{
  dropdownText: string;
  infoText: string;
  className: string;
  rate: number
}
> ;

export type OilId = keyof typeof Oils;

export type DepthYield = {
  resourceId: ResourceId; amount: number
};

export const Depths = {
  100: [
    {resourceId: 'sand', amount: 3},
    {resourceId: 'gravel', amount: 3},
    {resourceId: 'soil', amount: 3},
    {resourceId: 'rich-soil', amount: 1},
  ],
  300: [
    {resourceId: 'sand', amount: 3},
    {resourceId: 'gravel', amount: 3},
    {resourceId: 'soil', amount: 3},
    {resourceId: 'rich-soil', amount: 1},
  ],
  900: [
    {resourceId: 'coal', amount: 6},
    {resourceId: 'gravel', amount: 9},
    {resourceId: 'raw-iron', amount: 5},
    {resourceId: 'raw-copper', amount: 5},
  ],
  1200: [
    {resourceId: 'coal', amount: 20},
    {resourceId: 'gravel', amount: 6},
    {resourceId: 'raw-iron', amount: 10},
    {resourceId: 'shallow-ef', amount: 3},
  ],
  1500: [
    {resourceId: 'raw-lead', amount: 1},
    {resourceId: 'gravel', amount: 8},
    {resourceId: 'raw-iron', amount: 8},
    {resourceId: 'shallow-ef', amount: 5},
  ],
  1800: [
    {resourceId: 'raw-lead', amount: 5},
    {resourceId: 'rock', amount: 8},
    {resourceId: 'medium-ef', amount: 2},
    {resourceId: 'shallow-ef', amount: 1},
  ],
  2000: [
    {resourceId: 'raw-lead', amount: 9.27},
    {resourceId: 'medium-ef', amount: 3.35},
    {resourceId: 'rock', amount: 9.36},
  ],
  2200: [
    {resourceId: 'raw-iron', amount: 9.57},
    {resourceId: 'shallow-ef', amount: 2.31},
    {resourceId: 'raw-lead', amount: 5.14},
    {resourceId: 'medium-ef', amount: 3.13},
  ],
  2400: [
    {resourceId: 'medium-ef', amount: 4.46},
    {resourceId: 'rock', amount: 9.79},
  ],
  2600: [
    {resourceId: 'medium-ef', amount: 8.44},
    {resourceId: 'rock', amount: 10.22},
  ],
  2800: [
    {resourceId: 'gravel', amount: 1.78},
    {resourceId: 'raw-iron', amount: 10.35},
    {resourceId: 'shallow-ef', amount: 2.51},
    {resourceId: 'raw-lead', amount: 2.9},
  ],
  3000: [
    {resourceId: 'shallow-ef', amount: 1.54},
    {resourceId: 'raw-lead', amount: 1.92},
    {resourceId: 'rock', amount: 6.04},
  ],
  3200: [
    {resourceId: 'rock', amount: 5.14},
    {resourceId: 'medium-ef', amount: 4.62},
    {resourceId: 'raw-lead', amount: 3.1},
    {resourceId: 'raw-iron', amount: 6.51},
  ],
  3400: [
    {resourceId: 'raw-iron', amount: 8.26},
    {resourceId: 'raw-lead', amount: 8.58},
    {resourceId: 'rock', amount: 7.76},
  ],
  3600: [
    {resourceId: 'medium-ef', amount: 6.34},
    {resourceId: 'raw-lead', amount: 6.41},
    {resourceId: 'rock', amount: 6.15},
  ],
  3800: [
    {resourceId: 'medium-ef', amount: 6.39},
    {resourceId: 'rock', amount: 9.58},
    {resourceId: 'raw-lead', amount: 3.45},
    {resourceId: 'coal', amount: 30.39},
  ],
  4000: [
    {resourceId: 'table-salt', amount: 58.54},
    {resourceId: 'medium-ef', amount: 3.67},
    {resourceId: 'rock', amount: 5.93},
    {resourceId: 'raw-lead', amount: 9.58},
  ],
  4200: [
    {resourceId: 'medium-ef', amount: 6.31},
    {resourceId: 'rock', amount: 5.01},
    {resourceId: 'raw-lead', amount: 4.81},
    {resourceId: 'coal', amount: 39.32},
  ],
  4400: [
    {resourceId: 'rock', amount: 14.79},
    {resourceId: 'coal', amount: 40.21},
  ],
  4600: [
    {resourceId: 'raw-zinc', amount: 7.61},
    {resourceId: 'bauxite-residue', amount: 1.59},
    {resourceId: 'rock', amount: 7.83},
  ],
  4800: [
    {resourceId: 'medium-ef', amount: 7.77},
    {resourceId: 'raw-zinc', amount: 9.79},
    {resourceId: 'bauxite-residue', amount: 1.2},
    {resourceId: 'rock', amount: 2.63},
  ],
  5000: [
    {resourceId: 'medium-ef', amount: 10.88},
    {resourceId: 'raw-zinc', amount: 4.8},
    {resourceId: 'bauxite-residue', amount: 1.22},
    {resourceId: 'rock', amount: 5.18},
  ],
  5200: [
    {resourceId: 'raw-iron', amount: 21.61},
    {resourceId: 'rock', amount: 7.61},
    {resourceId: 'deep-ef', amount: 1.4},
    {resourceId: 'raw-lead', amount: 4.79},
  ],
  5400: [
    {resourceId: 'medium-ef', amount: 9.5},
    {resourceId: 'bauxite-residue', amount: 1},
    {resourceId: 'rock', amount: 8.5},
  ],
  5600: [
    {resourceId: 'rock', amount: 5.4},
    {resourceId: 'raw-lead', amount: 3.82},
    {resourceId: 'raw-copper', amount: 18.32},
    {resourceId: 'bauxite-residue', amount: 0.92},
  ],
  5800: [
    {resourceId: 'medium-ef', amount: 10.86},
    {resourceId: 'raw-lead', amount: 15.83},
  ],
  6000: [
    {resourceId: 'coal', amount: 54},
    {resourceId: 'raw-lead', amount: 12.06},
    {resourceId: 'rock', amount: 5.18},
  ],
  6200: [
    {resourceId: 'raw-copper', amount: 50.73},
    {resourceId: 'deep-ef', amount: 4.42},
    {resourceId: 'bauxite-residue', amount: 0.96},
    {resourceId: 'rock', amount: 6.55},
  ],
  6400: [
    {resourceId: 'bauxite-residue', amount: 2.3},
    {resourceId: 'deep-ef', amount: 7.71},
    {resourceId: 'rock', amount: 7.69},
  ],
  6600: [
    {resourceId: 'rock', amount: 8.81},
    {resourceId: 'deep-ef', amount: 9.03},
    {resourceId: 'bauxite-residue', amount: 1.9},
  ],
  6800: [
    {resourceId: 'raw-copper', amount: 80.75},
    {resourceId: 'bauxite-residue', amount: 1.6},
    {resourceId: 'deep-ef', amount: 5.87},
    {resourceId: 'rock', amount: 10.35},
  ],
  7000: [
    {resourceId: 'raw-lead', amount: 4.3},
    {resourceId: 'deep-ef', amount: 10.9},
    {resourceId: 'rock', amount: 11.65},
    {resourceId: 'bauxite-residue', amount: 1.33},
  ],
  7200: [
    {resourceId: 'raw-lead', amount: 5.54},
    {resourceId: 'bauxite-residue', amount: 1.06},
    {resourceId: 'deep-ef', amount: 8.57},
    {resourceId: 'rock', amount: 10.79},
  ],
  7400: [
    {resourceId: 'raw-copper', amount: 42.95},
    {resourceId: 'bauxite-residue', amount: 1.05},
    {resourceId: 'deep-ef', amount: 8.7},
    {resourceId: 'rock', amount: 11.38},
  ],
  7600: [
    {resourceId: 'deep-ef', amount: 4.9},
    {resourceId: 'bauxite-residue', amount: 0.99},
    {resourceId: 'rock', amount: 9.79},
  ],
  7800: [
    {resourceId: 'medium-ef', amount: 7.67},
    {resourceId: 'bauxite-residue', amount: 2.23},
    {resourceId: 'deep-ef', amount: 8.43},
  ],
  8000: [
    {resourceId: 'bauxite-residue', amount: 2.11},
    {resourceId: 'rock', amount: 10.65},
    {resourceId: 'deep-ef', amount: 11.65},
  ],
  8200: [
    {resourceId: 'raw-zirconium', amount: 0.61},
    {resourceId: 'rock', amount: 10.65},
    {resourceId: 'deep-ef', amount: 3.52},
  ],
  8400: [
    {resourceId: 'raw-zirconium', amount: 1.73},
    {resourceId: 'raw-uranium', amount: 0.15},
    {resourceId: 'deep-ef', amount: 1.52},
  ],
  8600: [
    {resourceId: 'raw-zirconium', amount: 0.53},
    {resourceId: 'raw-uranium', amount: 2.15},
    {resourceId: 'raw-iron', amount: 10.52},
  ],
  8800: [
    {resourceId: 'deep-ef', amount: 4.24},
    {resourceId: 'raw-uranium', amount: 2.15},
    {resourceId: 'raw-iron', amount: 13.52},
  ],
  9000: [
    {resourceId: 'raw-lead', amount: 8.59},
    {resourceId: 'raw-zirconium', amount: 0.72},
    {resourceId: 'raw-iron', amount: 3.52},
  ],
} as const satisfies Record<number, DepthYield[]>;

export type DepthId = keyof typeof Depths;
