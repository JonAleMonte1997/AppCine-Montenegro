export interface Movie{
  id?: number;
  title: string;
  year: number;
  director: string;
  gender: string[];
  plot: string;
  posterURL: string;
  classifield: Classifield;
  rate: number;           //Número entre 1-5
  duration: number;       //En minutos
  price: number;
}

export enum Classifield{
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  R = "R",
  NC_17 = "NC-17"
}
