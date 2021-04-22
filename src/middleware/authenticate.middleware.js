import { verify } from "jsonwebtoken";
import "../config/env.config";

export default (request, response, next_function) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  } else {
    const token = authorization.replace("Bearer ", "").trim();
    try {
      const payload = verify(token, process.env.JWT_SECRET);
      if (!payload) {
        return response.sendSatus(400);
      } else {
          return response.status(200).json(payload)
      }
    } catch (error) {
      return response
        .status(500)
        .json({
          message:
            error.message || "Erro interno na tentativa de autenticação.",
        });
    }
  }
};
