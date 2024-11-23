import { MongoClient } from 'mongodb';

// Importa o cliente MongoDB para interagir com o banco de dados.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona para conectar ao banco, recebendo a string de conexão como parâmetro.

  let mongoClient;
  // Declara uma variável para armazenar o cliente MongoDB, que será inicializado dentro do bloco try-catch.

  try {
    // Bloco try para encapsular as operações que podem lançar exceções.

    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão fornecida.

    console.log('Conectando ao cluster do banco de dados...');
    // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.

    await mongoClient.connect();
    // Tenta estabelecer a conexão com o banco de dados. A palavra-chave 'await' pausa a execução da função até que a conexão seja estabelecida ou ocorra um erro.

    console.log('Conectado ao MongoDB Atlas com sucesso!');
    // Imprime uma mensagem de sucesso caso a conexão seja estabelecida.

    return mongoClient;
    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código para realizar operações no banco de dados.

  } catch (erro) {
    // Bloco catch para tratar possíveis erros durante a conexão.

    console.error('Falha na conexão com o banco!', erro);
    // Imprime uma mensagem de erro no console, junto com o objeto de erro para facilitar a depuração.

    process.exit();
    // Encerra a execução do processo em caso de falha na conexão, evitando que o programa continue com um banco de dados indisponível.
  }
}