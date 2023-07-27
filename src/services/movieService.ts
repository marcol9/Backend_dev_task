import Movie from "../models/movie";
import movieRepo from "../repositories/movieRepo";
import ImovieService from "./ImovieService";

export default class MovieService implements ImovieService {
  private movieRepoImpl: movieRepo;

  constructor(movieRepoImpl: movieRepo) {
    this.movieRepoImpl = movieRepoImpl;
  }

  async getMovies() {
    return this.movieRepoImpl.getMovies();
  }
  async getMovie(id: number) {
    return this.movieRepoImpl.getMovie(id);
  }
  async deleteMovie(id: number) {
    return this.movieRepoImpl.deleteMovie(id);
  }
  async createMovie(movie: Movie) {
    return this.movieRepoImpl.createMovie(movie);
  }
  async updateMovie(movie: Movie) {
    return this.movieRepoImpl.updateMovie(movie);
  }
}
