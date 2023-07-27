import ImovieRepo from "./ImovieRepo";
import Api404Error from "../errorHandling/api404Error";
import Movie from "../models/movie";

export default class movieRepo implements ImovieRepo {
  private db_conn: any;

  constructor(db_conn: any) {
    this.db_conn = db_conn;
  }

  // returns all existing movies
  async getMovies() {
    const response = await this.db_conn.execute(
      `SELECT movie.name, movie.rating, country.country, genre.genre 
      FROM movie 
      INNER JOIN country 
      ON movie.country_id = country.id 
      INNER JOIN genre 
      ON movie.genre_id = genre.id `,
      ""
    );

    return response;
  }

  // get movie by id
  async getMovie(id: number) {
    const response = await this.db_conn.execute(
      `SELECT movie.name, movie.rating, country.country, genre.genre 
        FROM movie 
        INNER JOIN country 
        ON movie.country_id = country.id 
        INNER JOIN genre 
        ON movie.genre_id = genre.id 
        WHERE movie.id = ?`,
      id
    );
    if (response.length === 0) {
      //checking response arry length. 0 means record not found
      throw new Api404Error(`Movie record with id ${id} not found`);
    }

    return response;
  }

  // delete movie by id
  async deleteMovie(id: number) {
    const response = await this.db_conn.execute("DELETE FROM movie WHERE id = ?", id);

    if (response.affectedRows === 0) {
      //checking how much rows were affected. 0 means record not found
      throw new Api404Error(`Movie record with id ${id} not found`);
    }

    return `Movie data record with id ${id} has been deleted successfully`;
  }

  //create movie
  async createMovie(movie: Movie) {
    await this.db_conn.execute(
      `INSERT INTO movie(name,rating,country_id,genre_id)
                                 VALUES(?,?,?,?)`,
      [movie.name, movie.rating, movie.country_id, movie.genre_id]
    );

    return `Movie record has been created`;
  }

  //update movie
  async updateMovie(movie: Movie) {
    const response = await this.db_conn.execute(
      `UPDATE movie SET name = ?, rating = ?, country_id = ?, genre_id = ?
     WHERE id = ?`,
      [movie.name, movie.rating, movie.country_id, movie.genre_id, movie.id]
    );

    if (response.affectedRows === 0) {
      //checking how much rows were affected. 0 means record not found
      throw new Api404Error(`Movie record with id ${movie.id} not found`);
    }

    return `Movie record has been updated`;
  }
}
