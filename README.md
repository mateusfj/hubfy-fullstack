# Hubfy Fullstack

Aplicação fullstack construída com Next.js (App Router), Prisma e MySQL, com autenticação (login, registro e logout) e um CRUD de tarefas com visualização em lista e Kanban.

Este README explica como configurar o ambiente e rodar o projeto localmente.

---

## Requisitos

- Node.js >= 18 (recomendado LTS)
- npm
- Docker e Docker Compose (recomendado para subir o MySQL)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/mateusfj/hubfy-fullstack.git
cd hubfy-fullstack
```

---

## 2. Configurar variáveis de ambiente

O projeto possui um arquivo `.env.example` na raiz. Crie um arquivo `.env` com base nele.

Exemplo de configuração para desenvolvimento local:

```env
# MYSQL
MYSQL_ROOT_PASSWORD=hubfy_root
MYSQL_DATABASE=hubfy_db
MYSQL_USER=hubfy_user
MYSQL_PASSWORD=hubfy_password
MYSQL_HOST=localhost
MYSQL_PORT=3306

DATABASE_URL=mysql://root:hubfy_root@localhost:3306/hubfy_db

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# JWT
JWT_SECRET=525ccc4e376d63bdedf39477ff5ba10b7c98ea6671ba341172405f984eeb9b14
JWT_EXPIRES_IN=3600
```

Observações:

- DATABASE_URL deve apontar corretamente para o MySQL.
- NEXT_PUBLIC_API_URL, em desenvolvimento, aponta para a própria API do Next.js.
- JWT_EXPIRES_IN está em segundos (3600 = 1 hora).

---

## 3. Subir o MySQL com Docker

O projeto possui um `docker-compose.yml` configurado para o MySQL.

Para subir o banco:

```bash
docker compose up -d
```

Verifique se o container está rodando:

```bash
docker ps
```

Você deve ver um container chamado `mysql_db` em execução.

---

## 4. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

---

## 5. Rodar migrações do Prisma

Com o banco rodando e o `.env` configurado:

```bash
npm run migrate
npm run generate
```

---

## 6. Rodar o projeto em desenvolvimento

Para iniciar o servidor:

```bash
npm run dev
```

A aplicação ficará disponível em:

- Frontend / API: [http://localhost:3000](http://localhost:3000)

---

## 7. Documentação da API

Com o projeto rodando:

- Swagger UI: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)
- Documentação em Markdown: arquivo `API.md` na raiz do projeto

---

## 8. Fluxo básico de uso

1. Acesse [http://localhost:3000/register](http://localhost:3000/register) e crie um usuário.
2. Faça login em [http://localhost:3000/login](http://localhost:3000/login).
3. Após autenticar, você terá acesso à área privada, onde poderá:

   - Criar tarefas.
   - Visualizar tarefas em lista ou Kanban.
   - Filtrar, ordenar e paginar tarefas.
   - Atualizar status, editar e remover tarefas.

As mesmas operações estão disponíveis via API (ver Swagger ou API.md).

---

## 9. Rodar testes

O projeto utiliza Jest.

Para executar os testes:

```bash
npm run test
```

---

## 10. Build e execução em produção (local)

Gerar build:

```bash
npm run build
```

Executar em produção:

```bash
npm start
```

Por padrão, a aplicação roda na porta 3000.

---

## 11. Problemas comuns

### Erro de conexão com o banco

- Verifique se o MySQL está rodando (`docker ps`).
- Confira se as variáveis do `.env` estão corretas.

### Erro nas migrações (Prisma)

Resetar o banco de desenvolvimento:

```bash
npx prisma migrate reset
```

### Erros de autenticação / JWT

- Garanta que `JWT_SECRET` esteja definido.
- Confirme se `JWT_EXPIRES_IN` possui um valor válido.

---

## 12. Referências

- Next.js
- Prisma
- Jest
