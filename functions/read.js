const fs = require("fs/promises");

const readAnimes = async (param, value) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    let search = {};

    switch (param) {
      case "id":
        search = anime[value];

        break;

      case "nombre":
        search = Object.values(anime).find(
          (item) => item.nombre.toLowerCase() === value.toLowerCase()
        );

        break;
      default:
        search = anime;
    }

    if (!search)
      throw { code: 404, message: "El anime seleccionado no existe" };

    return { ok: true, status: 200, data: search };
  } catch (error) {
    return { ok: false, status: error.code, message: error.message };
  }
};

module.exports = { readAnimes };
