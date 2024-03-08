# Teste Facilita Juridico
## Video
 https://www.loom.com/share/4bd17fa96783462c895974301d28a3ad
## Backend
Para rodar esse projeto, entre na pasta backend e digite o comando:
```bash
cd Backend
npm install
```
### Configuração do Banco de Dados: 
Antes de prosseguir, é necessário criar um banco de dados no PostgreSQL. Você pode fazer isso
manualmente ou usando ferramentas de gerenciamento de banco de dados. Após criar o banco de dados, substitua os valores no arquivo 
.env com as credenciais do seu banco de dados PostgreSQL.

Apos isso, substitua os valores no arquivo .env com os valores do banco postgres que sera usado para armazenar os dados.

### .env
```.env
PORT=3000
DB_HOST='localhost'
DB_PORT=5432
DB_USER=usuario
DB_PASS=senha
DB_NAME=seu_banco_criado

exemplo:
PORT=3000
DB_HOST='localhost'
DB_PORT=5432
DB_USER='postgres'
DB_PASS='postgres'
DB_NAME='client_management'

```
Para popular o banco e criar as tabelas no banco de dados, digite o comando:
```bash
npm run startDb
```

Após essa etapa, digitar o comando:
```bash
npm run dev
```
Dessa forma, verificar se o servidor backend foi inicializado.

## Frontend
Após inicializar o backend, Abra outro terminal na pasta raiz do projeto e digite:
```bash
cd Frontend
npm install
```
Após concluir a instalação dos pacotes listados em node_modules, é importante verificar as configurações de 
conexão do servidor frontend no arquivo src/services/config.ts se é a mesma porta do backend.

No exemplo fornecido, o endereço é http://localhost:3000, o que significa que o servidor backend está sendo executado localmente 
na porta 3000. Ao garantir que a porta definida em config.ts seja a mesma que a porta especificada no .env, você assegura a 
correta comunicação entre o frontend e o backend do seu projeto.

Finalmente digite o comando:
```bash
npm run dev
```
Após executar essas etapas, o frontend estará disponível para acesso via navegador. 
Basta seguir o link gerado pelo servidor frontend e utilizar o webapp.
