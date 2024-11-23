import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma nova aplicação Express
const app = express();

// Configura o diretório "uploads" para servir arquivos estáticos
app.use(express.static("uploads"))

// Carrega as rotas definidas em postsRoutes.js
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});