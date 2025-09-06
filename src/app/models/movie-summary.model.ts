import { Movie } from "./movie.model";

export type MovieSummary = Pick<
  Movie,
  "id" | "title" | "poster_path" | "vote_average"
>;
