const http = require("http");

//FUNCTIONS
const { createAnime } = require("./functions/create");
const { readAnimes } = require("./functions/read");
const { updateAnime } = require("./functions/update");
const { deleteAnime } = require("./functions/delete");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const { searchParams, pathname } = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  const params = new URLSearchParams(searchParams);

  //GET ROUTE
  if (pathname === "/anime" && req.method === "GET") {
    const id = params.get("id");
    const nombre = params.get("nombre");
    res.setHeader("content-type", "application/json");

    let resultado;

    //POR ID
    if (id) resultado = await readAnimes("id", id);

    //POR NOMBRE
    if (nombre) resultado = await readAnimes("nombre", nombre);

    //DEFAULT
    if (!id && !nombre) resultado = await readAnimes();

    res.statusCode = resultado.status;
    res.write(JSON.stringify(resultado));

    res.end();
  }

  //POST ROUTE
  if (pathname === "/anime" && req.method === "POST") {
    let body;

    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });

    req.on("end", async () => {
      const resultado = await createAnime(body);

      res.setHeader("content-type", "application/json");
      res.statusCode = resultado.status;
      res.end(JSON.stringify(resultado));
    });
  }

  //PUT ROUTE
  if (pathname === "/anime" && req.method === "PUT") {
    let body;

    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });

    req.on("end", async () => {
      const id = params.get("id");
      const resultado = await updateAnime(id, body);

      res.setHeader("content-type", "application/json");
      res.statusCode = resultado.status;
      res.end(JSON.stringify(resultado));
    });
  }

  //DELETE ROUTE
  if (pathname === "/anime" && req.method === "DELETE") {
    const id = params.get("id");
    const resultado = await deleteAnime(id);

    res.setHeader("content-type", "application/json");
    res.statusCode = resultado.status;
    res.write(JSON.stringify(resultado));
    res.end();
  }
});

server.listen(PORT, console.log(`Servidor activo en el puerto ${PORT}`));

module.exports = { server };
