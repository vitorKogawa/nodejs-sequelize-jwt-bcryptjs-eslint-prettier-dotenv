import app from "./app";
import "./config/env.config";

const port = process.env.PORT || 3333;
app.listen(port, () =>
  console.log(`Servidor rodando em htpp://127.0.0.1:${port}`)
);
