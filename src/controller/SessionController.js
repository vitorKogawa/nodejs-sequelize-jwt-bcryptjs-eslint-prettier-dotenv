import { sign } from "jsonwebtoken";
import User from "../database/models/User.model";
import authenticateConfig from "../config/authenticate.config";

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return response.status(400).json({ message: "Usuário não existe!" });
    } else {
      if (!(await userExists.checkPassword(password))) {
        return response.status(400).json({ message: "Dados inválidos." });
      } else {
        const user = { id: userExists.id, name: userExists.name };
        const acessToken = sign(user, authenticateConfig.secret, {
          expiresIn: authenticateConfig.expiresIn,
        });
        return response.status(200).json({ user, token: acessToken });
      }
    }
  }
}

export default new SessionController();
