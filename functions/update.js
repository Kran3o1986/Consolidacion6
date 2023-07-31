const fs = require("fs/promises");

const updateAnime = async (id, data) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));

    if (!anime[id])
      throw { code: 404, message: "El anime seleccionado no existe" };

    const animeModificado = { ...anime[id], ...data };
    anime[id] = animeModificado;
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));

    return {
      ok: true,
      status: 200,
      message: `Se ha modificado exitosamente el anime '${animeModificado.nombre}'`,
      data: anime[id],
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { updateAnime };
