const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O campo email é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ msg: "O campo senha é obrigatório" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      const _id = user._id;

      res.status(200).json({ token, _id });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msg: "Serviço indisponível. Tente novamente mais tarde" });
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id, "-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    try {
      res.json(user);
    } catch (error) {
      console.log(`Erro obter a lista de usuários ${error}`);
      res.status(404).json({ msg: "Erro ao obter dados do usuário " });
    }
  },
};

module.exports = userController;
