import { createPool, Pool } from "mysql";
import { DATA_SOURCES } from "../config/var.config";
import Api500Error from "../errorHandling/api500Error";
import { logError } from "../errorHandling/errorHandler";

//injecting data source data
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    pool = createPool({
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });

    console.debug("MySql Adapter Pool generated successfully");
  } catch (error) {
    logError(error);
    throw new Api500Error("failed to initialized pool");
  }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error("Pool was not created. Ensure pool is created when running the app.");

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    logError(error);
    throw new Api500Error("failed to execute MySQL query");
  }
};
