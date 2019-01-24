process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Produto = require("../model/Produto");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

let arrProd = [];

describe("Produto", () => {
    before(done => {
        Produto.remove({}, err => {
            done();
        });
    });
    describe("Produto api/v1/prod", () => {
        it("Deve adicionar um novo produto", done => {
            let prod = {
                produto: "Produto Teste 1",
                valor: 13.21,
                tipo: 'CM',
                importado: false,
                tags: 'Novo,FreteGrátis',
                data: '21/12/2018'
            };
            chai
                .request(server)
                .post("/api/v1/prod")
                .send(prod)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve adicionar um novo produto", done => {
            let prod = {
                produto: "Produto Teste 2",
                valor: 54.34,
                tipo: 'CM',
                importado: false,
                tags: 'Novo,FreteGrátis',
                data: '21/12/2018'
            };
            chai
                .request(server)
                .post("/api/v1/prod")
                .send(prod)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve adicionar um novo produto", done => {
            let prod = {
                produto: "Produto Teste 3",
                valor: 123.21,
                tipo: 'CM',
                importado: false,
                tags: 'Novo,FreteGrátis',
                data: '21/12/2018'
            };
            chai
                .request(server)
                .post("/api/v1/prod")
                .send(prod)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve listar todos os produtos", done => {
            chai
                .request(server)
                .get("/api/v1/prod")
                .end((err, res) => {
                    arrProd = res.body.data;
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve listar um produto", done => {
            chai
                .request(server)
                .get("/api/v1/prod/" + arrProd[0]._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve alterar somente o nome de um produto", done => {
            let updateUser = {
                nome: "Nilson update PUT"
            }
            chai
                .request(server)
                .put("/api/v1/prod/" + arrProd[0]._id)
                .send(updateUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve alterar somente o nome de um produto", done => {
            let updateUser = {
                nome: "Nilson 2 update patch"
            }
            chai
                .request(server)
                .patch("/api/v1/prod/" + arrProd[1]._id)
                .send(updateUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("Deve deletar um produto", done => {
            chai
                .request(server)
                .delete("/api/v1/prod/" + arrProd[2]._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});