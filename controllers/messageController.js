const { Message } = require("../models");

const messageController = { 
    store: async (req, res) => {
        const { nome, email, assunto, mensagem} = req.body;
        try{    
            const envioMessage = await Message.create({
                name: nome,
                email: email,
                assunto: assunto,
                message: mensagem,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.send(envioMessage)
        } catch(error){
            console.log(error)
            res.send(error)
        }
    
    },
    read: async (req, res) => {
        const dados = {
            mensagen:await Message.findAll()
        }
        res.send(dados);
    }
};

module.exports = messageController;