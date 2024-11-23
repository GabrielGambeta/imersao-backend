// ... (importações)
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts (req, res) {
  // Obtém todos os posts do banco de dados
    const posts =  await getTodosPosts();
     // Retorna os posts em formato JSON com status 200
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function  postarNovoPost(req, res) {
       // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body; 
    try {
           // Cria o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
          // Retorna o post criado com status 200
        res.status(200).json(postCriado);
    } catch(erro) {
           // Loga o erro no console e retorna um erro genérico
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function  uploadImagem(req, res) {
      // Cria um objeto com os dados do novo post, incluindo a imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
          // Cria o novo post
        const postCriado = await criarPost(novoPost);
           // Renomeia o arquivo da imagem para um nome único
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
           // Retorna o post criado
        res.status(200).json(postCriado);  
    } catch(erro) {
          // ... (tratamento de erro)
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

// Função para atualizar um post existente
export async function atualizarNovoPost(req, res) {
     // Obtém o ID do post a ser atualizado
    const id = req.params.id;
     // ... (lógica para gerar a descrição e atualizar o post)
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}








