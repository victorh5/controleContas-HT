const Mongoose = require("mongoose")

class Usuario extends Mongoose.Schema {
    constructor() {
        super({
            nome: {
                type: String,
                required: true,
            },
            senha: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            ativo: {
                type: Boolean,
                required: true,
            },
        })
    }
}