import pool from "./db.js";
import path from "path";

const router = {
  GET: {
    "/": (req, res, matches) => {
      res.end("Hello from the other side!");
    },
    "/genres": async (req, res, matches) => {
      const genres = await pool.query("SELECT * FROM genres");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(genres.rows));
    },
    "/films": async (req, res, matches) => {
      const films = await pool.query("SELECT * FROM films");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(films.rows));
    },
  },
  POST: {
    "/genre": async (req, res, matches) => {
      const body = [];
      req
        .on("data", (chunk) => body.push(chunk.toString()))
        .on("end", async () => {
          const data = body.join();
          await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [
            data,
          ]);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ added: true, value: data }));
        });
    },
    "/film": async (req, res, matches) => {
      const fullUrl = path.join(`http://${req.headers.host}`, req.url);
      const url = new URL(fullUrl);

      const name = url.searchParams.get("name");
      const year = url.searchParams.get("year");

      await pool.query("INSERT INTO films (film_name, year) VALUES ($1, $2)", [
        name,
        year,
      ]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ added: true, value: name }));
    },
  },
  PUT: {
    "/genre": async (req, res, matches) => {
      const fullUrl = path.join(`http://${req.headers.host}`, req.url);
      const url = new URL(fullUrl);

      const id = Number(url.searchParams.get("id"));
      const name = url.searchParams.get("name");

      await pool.query("UPDATE genres SET genre_name = $1 WHERE id = $2", [
        name,
        id,
      ]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ updated: true, id, newValue: name }));
    },
    "/film": async (req, res, matches) => {
      const fullUrl = path.join(`http://${req.headers.host}`, req.url);
      const url = new URL(fullUrl);

      const id = Number(url.searchParams.get("id"));
      const name = url.searchParams.get("name");
      const year = url.searchParams.get("year");

      if (name !== null && year !== null) {
        await pool.query(
          "UPDATE films SET film_name = $1, year = $2 WHERE id = $3",
          [name, year, id]
        );
      } else if (name !== null) {
        await pool.query("UPDATE films SET film_name = $1 WHERE id = $2", [
          name,
          id,
        ]);
      } else if (year !== null) {
        await pool.query("UPDATE films SET year = $1 WHERE id = $2", [
          year,
          id,
        ]);
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ name, year }));
    },
  },
  DELETE: {
    "/genre": async (req, res, matches) => {
      const fullUrl = path.join(`http://${req.headers.host}`, req.url);
      const url = new URL(fullUrl);

      const id = Number(url.searchParams.get("id"));

      await pool.query("DELETE FROM genres WHERE id = $1", [id]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ deleted: true, id }));
    },
    "/film": async (req, res, matches) => {
      const fullUrl = path.join(`http://${req.headers.host}`, req.url);
      const url = new URL(fullUrl);

      const id = Number(url.searchParams.get("id"));

      await pool.query("DELETE FROM films WHERE id = $1", [id]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ deleted: true, id }));
    },
  },
};

export default router;
