import movieRepo from "../repositories/movieRepo";
import movieService from "../services/movieService";
import * as MySQLConnector from "../utils/db_connector";

//create database pool
MySQLConnector.init();

//create implementation of repository
const movieRepoImpl = new movieRepo(MySQLConnector);

//create implementation of service
const movieServiceImpl = new movieService(movieRepoImpl);

export default movieServiceImpl;
