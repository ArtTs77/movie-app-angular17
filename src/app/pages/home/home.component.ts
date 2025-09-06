import { Component, HostListener, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { MovieSummary } from "src/app/models/movie-summary.model";
import { Genre } from "src/app/models/tmdb-responses.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  popular: MovieSummary[] = [];
  recommended: MovieSummary[] = [];
  genres: Genre[] = [];
  selectedGenre: number | null = null;
  selectedYear: number | null = null;
  searchQuery = "";
  filterOpen = false;

  user: User = {
    id: 1,
    name: "Aymen Missaoui",
    avatar: "assets/profile.jpg",
  };

  constructor(private movie: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movie.getGenres().subscribe((res) => (this.genres = res.genres || []));
    this.movie
      .getPopular()
      .subscribe((res) => (this.popular = res.results || []));
    this.movie
      .getTopRated()
      .subscribe((res) => (this.recommended = res.results || []));
  }

  onSearchChange(query: string) {
    this.searchQuery = query;

    if (this.searchQuery.length > 1) {
      this.movie.searchMovies(this.searchQuery).subscribe((res) => {
        this.popular = res.results || [];
        this.recommended = []; // optional: clear recommended while searching
      });
    } else {
      // Reset to original when search is cleared
      this.movie
        .getPopular()
        .subscribe((res) => (this.popular = res.results || []));
      this.movie
        .getTopRated()
        .subscribe((res) => (this.recommended = res.results || []));
    }
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".filter-container") &&
      !target.closest(".filter-button")
    ) {
      this.filterOpen = false;
    }
  }

  applyFilter() {
    if (this.selectedGenre) {
      this.movie
        .filterByGenre(this.selectedGenre)
        .subscribe((res) => (this.popular = res.results || []));
    } else if (this.selectedYear) {
      this.movie
        .filterByYear(this.selectedYear)
        .subscribe((res) => (this.popular = res.results || []));
    } else {
      this.movie
        .getPopular()
        .subscribe((res) => (this.popular = res.results || []));
    }
  }

  trackById = (_: number, item: MovieSummary) => item.id;

  getPoster(path: string | null): string {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "assets/no-poster.png";
  }

  getStars(vote: number): number {
    return Math.round((vote || 0) / 2);
  }

  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 200, behavior: "smooth" });
  }

  goToDetails(id: number): void {
    this.router.navigate(["/movie", id]);
  }
}
