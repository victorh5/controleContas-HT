const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');

const env = process.NODE_ENV || "development"
const config = require('./config.json')[env]

const Usuario = require("./src/model/Usuario")
const Conta = require("./src/model/Conta")

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
        new Conta()

        const UsuarioRoute = require("./src/routes/UsuarioRoute")
        const ContaRoute = require("./src/routes/ContaRoute")

        new UsuarioRoute(this.app)
        new ContaRoute(this.app)

        this.app.get("/", (req, res) => {
            res.send("OLA MUNDO")
        })

        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando em: http://${config.host}:${config.port}`);
        })
    }
}

new App().init()