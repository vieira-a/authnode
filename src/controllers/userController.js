const { User: UserModel, User } = require("../models/User");

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password, confirmpassword } = req.body;
      const newUser = new UserModel({
        name,
        email,
        password,
        confirmpassword,
      });

      //await newUser.save();
      res.status(201).json({ msg: "Novo usuário criado com sucesso" });
    } catch (error) {
      console.log(`Erro ao criar um novo usuário: ${error}`);
      res.status(500).json({ error, msg: "Erro ao criar um novo usuário" });
    }
  },
};

module.exports = userController;
