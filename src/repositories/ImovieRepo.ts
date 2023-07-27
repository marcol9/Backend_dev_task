import Movie from "../models/movie";

export default interface ImovieRepo {
  getMovies(): Promise<any>;
  getMovie(id: number): Promise<any>;
  deleteMovie(id: number): Promise<string>;
  createMovie(movie: Movie): Promise<string>;
  updateMovie(movie: Movie): Promise<string>;
}
