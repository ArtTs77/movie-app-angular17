export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Actor[];
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  runtime: number;
  adult: boolean;
  vote_average: number;
  imdb_id: string;
  credits?: Credits;
}
