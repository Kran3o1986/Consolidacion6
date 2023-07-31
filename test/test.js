const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../index.js");

chai.use(chaiHttp);

let animeForTest;

describe("Verificación ruta /anime, método GET", () => {
  it("La ruta sin query params responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'id' válido responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime?id=2")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'id' inválido responde con un código 404", (done) => {
    chai
      .request(server)
      .get("/anime?id=202")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });

  it("La ruta con query param 'nombre' válido responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/anime?nombre=naruto")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La ruta con query param 'nombre' inválido responde con un código 404", (done) => {
    chai
      .request(server)
      .get("/anime?nombre=animequenoexiste")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});

describe("Verificación ruta /anime, método POST", () => {
  it("La ruta responde con un código 201 al enviar un body", (done) => {
    chai
      .request(server)
      .post("/anime")
      .send({
        nombre: "Daiya no Ace",
        genero: "Shōnen",
        año: "2013",
        autor: "Terajima Yuji",
      })
      .end((error, response) => {
        animeForTest = response.body.data.id;

        chai.expect(response).to.have.status(201);
        done();
      });
  });

  it("La ruta responde con un código 400 al ser enviada sin un body", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(400);
        done();
      });
  });

  it("La ruta responde con un código 400 al ser enviada co un body vacío", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(400);
        done();
      });
  });
});

describe("Verificación ruta /anime, método PUT", () => {
  it("Responde con un código 200 al modificar un anime válido", (done) => {
    chai
      .request(server)
      .put("/anime?id=" + animeForTest)
      .send({
        nombre: "Daiya no Ace 2nd season",
        año: "2014",
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("Responde con un código 404 al consultar un anime que no existe", (done) => {
    chai
      .request(server)
      .put("/anime?id=100000")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});

describe("Verificación ruta /anime, método DELETE", () => {
  it("Responde con un código 200 al eliminar un anime válido", (done) => {
    chai
      .request(server)
      .delete("/anime?id=" + animeForTest)
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("Responde con un código 404 al intentar eliminar un anime inexistente", (done) => {
    chai
      .request(server)
      .delete("/anime?id=100000")
      .end((error, response) => {
        chai.expect(response).to.have.status(404);
        done();
      });
  });
});
