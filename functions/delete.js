const fs = require("fs/promises");

const deleteAnime = async (id) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    const animeEliminado = anime[id];

    if (!animeEliminado)
      throw { code: 404, message: "El anime seleccionado no existe" };

    delete anime[id];
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));
    return {
      ok: true,
      status: 200,
      message: `Se ha eliminado exitosamente el animé '${animeEliminado.nombre}'`,
      erasedData: animeEliminado,
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { deleteAnime };
