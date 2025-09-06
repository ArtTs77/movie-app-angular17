import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { PagedResponse, GenreResponse } from "../models/tmdb-responses.model";
import { Movie } from "../models/movie.model";
import { MovieSummary } from "../models/movie-summary.model";
import { environment } from "src/environments/environment.example";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private apiUrl = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient) {}

  getPopular(): Observable<PagedResponse<MovieSummary>> {
    return this.http.get<PagedResponse<MovieSummary>>(
      `${this.apiUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US&page=1`
    );
  }

  getTopRated(): Observable<PagedResponse<MovieSummary>> {
    return this.http.get<PagedResponse<MovieSummary>>(
      `${this.apiUrl}/movie/top_rated?api_key=${environment.tmdbApiKey}&language=en-US&page=1`
    );
  }

  getGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(
      `${this.apiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en-US`
    );
  }

  filterByGenre(genreId: number): Observable<PagedResponse<MovieSummary>> {
    return this.http.get<PagedResponse<MovieSummary>>(
      `${this.apiUrl}/discover/movie?api_key=${environment.tmdbApiKey}&language=en-US&page=1&with_genres=${genreId}`
    );
  }

  filterByYear(year: number): Observable<PagedResponse<MovieSummary>> {
    return this.http.get<PagedResponse<MovieSummary>>(
      `${this.apiUrl}/discover/movie?api_key=${environment.tmdbApiKey}&language=en-US&page=1&primary_release_year=${year}`
    );
  }

  searchMovies(query: string): Observable<PagedResponse<MovieSummary>> {
    return this.http.get<PagedResponse<MovieSummary>>(
      `${this.apiUrl}/search/movie?api_key=${environment.tmdbApiKey}&language=en-US&query=${query}`
    );
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=en-US&append_to_response=credits`
    );
  }
}
