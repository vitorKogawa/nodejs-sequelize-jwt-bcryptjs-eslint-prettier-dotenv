import User from "../database/models/User.model";
import File from "../database/models/File";

class ProviderController {
  async index(request, response) {
    const provider = await User.findAll({
      where: { provider: 0 },
      attributes: ["id", "name", "email", "provider"],
      include: [
        {
          model: File,
          attributes: ["name", "path"]
        },
      ],
    });

    return response.status(200).json(provider);
  }
}

export default new ProviderController();
