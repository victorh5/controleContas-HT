const Mongoose = require("mongoose")
const Usuario = Mongoose.model("Usuario")

class UsuarioController {

    static async buscarTodos(req, res) {

        try {
            res.status(200).json(await Usuario.find({}))
        } catch (error) {
            console.log(`[USUARIOS] : BUSCAR TODOS => ERRO: ${error}`)
            res.status(500).send(`Erro ao buscar usuarios`)
        }
    }
}

module.exports = UsuarioController;