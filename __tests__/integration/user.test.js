const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../src/db/models");

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

describe("Criar usuário", () => {
    test("Deve ser possivel criar um usuário", async () => {
        const response = await request(app).post("/users/create").send({
            nome: "Teste",
            email: "teste@email.com",
            password: "SenhaForte#20"
        })

        expect(response.status).toBe(201)
        expect(response.body.nome).toContain("Teste")
    })
})