import User from "../database/models/User.model";

class UserController {
  async create(request, response) {
    const { name, email, password, provider } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return response
        .status(400)
        .json({ message: "Usuário já cadastrado na base de dados." });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        provider: provider ? provider : false,
      })
        .then((data) => response.status(200).json(data))
        .catch((error) =>
          response.status(500).json({
            message: error.message || "Erro interno ao cadastrar usuário.",
          })
        );
    }
  }
}

export default new UserController();
