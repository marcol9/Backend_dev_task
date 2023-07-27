import { Router } from "express";
import Movie from "../models/movie";
import movieServiceImpl from "../utils/serviceImpl";
import { validateMovieBody, validateRequestParameter } from "../utils/validator";

const movieRouter = Router();

/*
  Endpoint: Get all movies
  Possible response codes: 200, 500
*/
movieRouter.get("/movies", async (req, res, next) => {
  try {
    const movies = await movieServiceImpl.getMovies();

    res.send({
      response: movies,
    });
  } catch (error) {
    next(error);
  }
});
/*
  Endpoint: Get movie by id
  Requirements: movieId (int) in url parameter
  Possible response codes: 200,400,404,500
*/
movieRouter.get("/movie/:movieId", async (req, res, next) => {
  try {
    validateRequestParameter(req.params.movieId);
    const movieId = Number(req.params.movieId);
    const movie = await movieServiceImpl.getMovie(movieId);

    res.send({
      response: movie,
    });
  } catch (error) {
    next(error);
  }
});

/*
  Endpoint: Delete movie
  Requirements: movieId (int) in url parameter
  Possible response codes: 200,400,404,500

*/
movieRouter.delete("/movie/:movieId", async (req, res, next) => {
  try {
    validateRequestParameter(req.params.movieId);
    const movieId = Number(req.params.movieId);
    const result = await movieServiceImpl.deleteMovie(movieId);
    res.send({
      response: result,
    });
  } catch (error) {
    next(error);
  }
});

/*
  Endpoint: Create movie
  Requirements: movie data (JSON) in request body
  Body example: 
    {
   "name": string,
   "rating": double(2,1),
   "country_id": int,
   "genre_id": int
    }
  Possible response codes: 200,400,500
*/
movieRouter.post("/movie", async (req, res, next) => {
  try {
    const body = req.body;
    validateMovieBody(body);
    const movie = new Movie(body.name, body.rating, body.country_id, body.genre_id);
    const result = await movieServiceImpl.createMovie(movie);
    res.send({
      response: result,
    });
  } catch (error) {
    next(error);
  }
});

/*
  Endpoint: Update movie
  Requirements: movie data(JSON) in request body
                Movie id(int) in url parameter
  Body example: 
    {
   "name": string,
   "rating": double(2,1),
   "country_id": int,
   "genre_id": int
    }
  Possible response codes: 200,400,404,500
*/
movieRouter.put("/movie/:movieId", async (req, res, next) => {
  try {
    const body = req.body;
    validateMovieBody(body);
    validateRequestParameter(req.params.movieId);
    const movieId = Number(req.params.movieId);
    const movie = new Movie(body.name, body.rating, body.country_id, body.genre_id, movieId);

    const result = await movieServiceImpl.updateMovie(movie);

    res.send({
      response: result,
    });
  } catch (error) {
    next(error);
  }
});

export default movieRouter;
