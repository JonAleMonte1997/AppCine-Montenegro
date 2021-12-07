export interface Movie{
  id?: number;
  title: string;
  year: number;
  director: string;
  gender: string[];
  plot: string;
  posterURL: string;
  classifield: string;
  rate: number;           //Número entre 1-5
  duration: number;       //En minutos
  price: number;
}
