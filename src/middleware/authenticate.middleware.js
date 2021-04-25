import { verify } from "jsonwebtoken";
import "../config/env.config";

export default async (request, response, next_function) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  } else {
    const token = authorization.replace("Bearer ", "").trim(); //tbm pode ser const [, token] = authorization.slipt(" ");
    try {
      const payload = await verify(token, process.env.JWT_SECRET);
      if (!payload) {
        return response.sendSatus(400);
      } else {
        request.userId = payload.id;
        return next_function();
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message || "Erro interno na tentativa de autenticação.",
      });
    }
  }
};
