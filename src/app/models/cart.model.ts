import { Movie } from "./movie.model";

export interface Cart{
  products: MovieProduct[];
  discount?: number;     //El número representa un porcentaje
}

export interface MovieProduct{
  movie: Movie;
  amount: number;
}
