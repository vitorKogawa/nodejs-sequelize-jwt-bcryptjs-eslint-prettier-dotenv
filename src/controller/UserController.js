import User from "../database/models/User.model";
import * as Yup from "yup";
class UserController {
  async create(request, response) {
    //definindo validação
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ message: "Erro na validação." });
    }

    const { name, email, password, provider } = request.body;

    //verificando se existe um usuário na base de dados atrelado ao email informado
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

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, newPassword) =>
          oldPassword ? newPassword.required() : newPassword
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : password
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ message: "Falha na validação." });
    }

    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return response.status(400).json({ message: "Email já em uso." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(400).json({ message: "Senha inválida." });
    }

    const { id, name, provider } = await user.update(request.body);
    return response.status(200).json({ id, name, email, provider });
  }

  async deleteAll(request, response) {
    await User.destroy({ where: {}, truncate: true, force: true })
      .then((data) =>
        response.status(200).json({ message: "Dados removidos com sucesso." })
      )
      .catch((error) =>
        response.status(500).json({
          message: error.message || "Erro interno ai tentar remover dados.",
        })
      );
  }

  async findAll(request, response) {
    await User.findAll()
      .then((data) => response.status(200).json(data))
      .catch((error) =>
        response
          .status(500)
          .json({ message: error.message || "Erro interno ao listar usuário." })
      );
  }
}

export default new UserController();
