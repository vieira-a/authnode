const bcrypt = require("bcrypt");

const { User: UserModel, User } = require("../models/User");

const userController = {
  create: async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ msg: "O campo nome é nome é obrigatório" });
    }

    if (!email) {
      return res.status(422).json({ msg: "O campo email é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ msg: "O campo senha é obrigatório" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ msg: "As senhas não conferem" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ msg: "Já existe um usuário cadastrado com este e-mail" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: passwordHash,
    });

    try {
      await newUser.save();
      res.status(201).json({ msg: "Novo usuário criado com sucesso" });
    } catch (error) {
      console.log(`Erro ao criar um novo usuário: ${error}`);
      res.status(500).json({ error, msg: "Erro ao criar um novo usuário" });
    }
  },
};

module.exports = userController;
