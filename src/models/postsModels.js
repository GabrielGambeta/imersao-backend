
// Importações necessárias
import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Estabelece a conexão com o banco de dados MongoDB
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para obter todos os posts
export async function getTodosPosts() {
    // Obtém a referência ao banco de dados e à coleção
    const db = conexao.db("imersão-instabyte");
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Função para criar um novo post
export async function criarPost(novoPost) {
    // Obtém a referência ao banco de dados e à coleção
    const db = conexao.db("imersão-instabyte");
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
    // Obtém a referência ao banco de dados e à coleção
    const db = conexao.db("imersão-instabyte");
    const colecao = db.collection("posts");
    // Converte o ID de string para ObjectId do MongoDB
    const objID = ObjectId.createFromHexString(id)
    // Atualiza o post com o novo conteúdo
    return colecao.updateOne({_id: new ObjectId (objID)}, {$set:novoPost});
}