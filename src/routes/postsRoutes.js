// Imports
import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

// Configurações CORS para permitir requisições da porta 8000
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessesStatus:200
}

// Configurações para armazenamento de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 1 
  }
})

const upload = multer({ storage: storage })


// Função para definir as rotas da aplicação
const routes = (app) => {
  // Middleware para parsing de requests JSON
  app.use(express.json());
  // Middleware para habilitar CORS com as configurações definidas
  app.use(cors(corsOptions));

  // Rotas para a API de posts
  app.get("/posts", listarPosts);
  app.post("/posts", postarNovoPost);
  // Rota com middleware para upload de imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;