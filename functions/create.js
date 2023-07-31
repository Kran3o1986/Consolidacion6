const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const createAnime = async (data) => {
  try {
    if (!data)
      throw { code: 400, message: "La petición debe contener un body" };

    if (!Object.keys(data).length)
      throw {
        code: 400,
        message: "El body de la petición debe tener contenido",
      };

    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    const newID = uuidv4();

    anime[newID] = { ...data };
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));

    return {
      ok: true,
      status: 201,
      message: "Anime creado exitosamente!",
      data: { id: newID, ...data },
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { createAnime };
