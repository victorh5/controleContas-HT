const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');

class App {

    constructor() {
        this.app
    }

    init() {
        this.app = Express("/")
        this.app.use(Express.json())
        this.app.use(Cors())

        Mongoose.connect(
            "mongodb+srv://victorh5:fabrica-online@cluster0.ejw64.mongodb.net/fabrica-online-db?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )

        this.app.get("/", (req, res) => {
            res.send(" OLA MUNDO A ")
        })

        this.app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000...");
        })
    }
}

new App().init()