export interface Country {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
  population: number;
  area: number;
  gini: number;
  borders: string[];

  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
}