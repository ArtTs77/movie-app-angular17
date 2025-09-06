import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { Movie } from "src/app/models/movie.model";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  isFavorite = false;
  showFullOverview = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.movieService.getMovieDetails(+id).subscribe((res) => {
        this.movie = res;
      });
    }
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  getPoster(path: string): string {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "assets/no-poster.png";
  }

  getRuntime(runtime: number | undefined): string {
    if (!runtime) return "";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  toggleOverview() {
    this.showFullOverview = !this.showFullOverview;
  }
}
