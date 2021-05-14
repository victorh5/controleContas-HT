const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');

const env = process.NODE_ENV || "development"
const config = require('./config.json')[env]

const Usuario = require("./src/model/Usuario")

class App {

    constructor() {
        this.app
    }

    init() {
        this.app = Express("/")
        this.app.use(Express.json())
        this.app.use(Cors())

        Mongoose.connect(
            `${config.database.protocol}://${config.database.user}:${config.database.password}@${config.database.host}/${config.database.name}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            }
        )

        new Usuario()

        const UsuarioRoute = require("./src/routes/UsuarioRoute")

        new UsuarioRoute(this.app)

        this.app.get("/", (req, res) => {
            res.send("OLA MUNDO")
        })

        this.app.listen(config.port, () => {
            console.log(`Servidor rodando em: http://${config.host}:${config.port}`);
        })
    }
}

new App().init()