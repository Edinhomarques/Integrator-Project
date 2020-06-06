const { Newsletter } = require("../models");

const newsletterController = { 
    store: async (req, res) => {
        const { nome, email} = req.body;
        try{
            const cadastroNewsletter = await Newsletter.create({
                first_name: nome,
                email: email,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.send(cadastroNewsletter)
        } catch(error){
            res.send(error)
        }
    },
    read: async (req, res) => {

        const dados = {
            newsletter:await Newsletter.findAll(),
        }
        res.send(dados);
    }
};

module.exports = newsletterController;