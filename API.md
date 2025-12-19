# Documentação da API

Esta documentação descreve os endpoints disponíveis na API do projeto **Hubfy Fullstack Test API**, baseada na definição do Swagger e na implementação atual.

Base URL padrão (desenvolvimento):

- `http://localhost:3000`

Todas as rotas abaixo são relativas a esta base.

---

## Autenticação (Auth)

### POST /api/auth/login

Autentica um usuário e retorna um token JWT.

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha12345"
}
```

**Resposta de Sucesso (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@exemplo.com"
  }
}
```

**Respostas de Erro:**

- **400 / 422 – Erro de validação**

  ```json
  {
    "message": "Password must be at least 8 characters"
  }
  ```

- **401 – Credenciais inválidas**

  ```json
  {
    "message": "Email ou senha inválidos"
  }
  ```

---

### POST /api/auth/register

Registra um novo usuário na aplicação.

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "name": "João Silva",
  "email": "usuario@exemplo.com",
  "password": "senha12345"
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@exemplo.com"
  }
}
```

**Resposta de Erro (400 / 422 – Erro de validação):**

```json
{
  "message": "Too small: expected string to have >=8 characters"
}
```

---

### GET /api/auth/logout

Remove os tokens de autenticação (cookies/session) e redireciona o usuário para a página de login.

**Body:**

- Não possui corpo na requisição.

**Resposta de Sucesso (302):**

Redireciona para `/login`.

Sem corpo JSON garantido, pois é uma resposta de redirecionamento.

---

## Tarefas (Tasks)

Todas as rotas de tarefas exigem autenticação via JWT no header `Authorization`.

**Header de Autorização (obrigatório):**

- `Authorization: Bearer <token>`

---

### POST /api/task

Cria uma nova tarefa associada a um usuário.

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Body:**

```json
{
  "userId": 1,
  "title": "Implementar tela de login",
  "description": "Criar formulário com validação de email e senha.",
  "status": "PENDING"
}
```

Campos:

- `userId` (number, obrigatório): ID do usuário dono da tarefa.
- `title` (string, obrigatório): Título da tarefa.
- `description` (string, opcional): Descrição da tarefa.
- `status` (string, obrigatório): Status da tarefa. Valores possíveis:
  - `PENDING`
  - `IN_PROGRESS`
  - `COMPLETED`

**Resposta de Sucesso (201):**

```json
{
  "message": "Tarefa criado com sucesso",
  "task": {
    "id": 10,
    "userId": 1,
    "title": "Implementar tela de login",
    "description": "Criar formulário com validação de email e senha.",
    "status": "PENDING",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
}
```

**Respostas de Erro:**

- **400 / 422 – Erro de validação**

  ```json
  {
    "message": "Campo obrigatório"
  }
  ```

- **401 – Não autorizado**

  ```json
  {
    "message": "Não autorizado"
  }
  ```

---

### GET /api/task

Lista as tarefas do usuário autenticado, com suporte a filtros, busca e paginação.

**Headers:**

- `Authorization: Bearer <token>`

**Query Params (opcionais):**

- `page` (number, padrão: 1): Página atual da listagem.
- `limit` (number, padrão: 10): Quantidade de itens por página.
- `search` (string): Busca parcial pelo título da tarefa.
- `status` (string): Filtra pelo status da tarefa. Valores possíveis: `PENDING`, `IN_PROGRESS`, `COMPLETED`.
- `orderBy` (string, padrão: `createdAt`): Campo de ordenação. Valores possíveis: `createdAt`, `title`.
- `orderDirection` (string, padrão: `desc`): Direção da ordenação. Valores possíveis: `asc`, `desc`.

**Exemplo de Requisição:**

`GET /api/task?page=1&limit=10&search=login&status=PENDING&orderBy=createdAt&orderDirection=desc`

**Resposta de Sucesso (200):**

```json
{
  "tasks": [
    {
      "id": 10,
      "userId": 1,
      "title": "Implementar tela de login",
      "description": "Criar formulário com validação de email e senha.",
      "status": "PENDING",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1
  }
}
```

**Respostas de Erro:**

- **401 – Não autorizado**

  ```json
  {
    "message": "Não autorizado"
  }
  ```

---

### GET /api/task/{id}

Busca os detalhes de uma tarefa específica.

**Headers:**

- `Authorization: Bearer <token>`

**Parâmetros de Caminho (Path Params):**

- `id` (string, obrigatório): ID da tarefa.

**Exemplo de Requisição:**

`GET /api/task/10`

**Resposta de Sucesso (200):**

```json
{
  "task": {
    "id": 10,
    "userId": 1,
    "title": "Implementar tela de login",
    "description": "Criar formulário com validação de email e senha.",
    "status": "PENDING",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
}
```

**Respostas de Erro:**

- **401 – Não autorizado**

  ```json
  {
    "message": "Não autorizado"
  }
  ```

- **404 – Tarefa não encontrada**

  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

### PATCH /api/task/{id}

Atualiza parcialmente uma tarefa existente.

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Parâmetros de Caminho (Path Params):**

- `id` (string, obrigatório): ID da tarefa.

**Body (todos os campos opcionais, envie apenas o que deseja alterar):**

```json
{
  "title": "Implementar tela de login (refatorada)",
  "description": "Ajustar layout e mensagens de erro.",
  "status": "IN_PROGRESS"
}
```

Campos:

- `title` (string, opcional)
- `description` (string, opcional)
- `status` (string, opcional): `PENDING`, `IN_PROGRESS`, `COMPLETED`

**Resposta de Sucesso (200):**

```json
{
  "message": "Tarefa atualizada com sucesso",
  "task": {
    "id": 10,
    "userId": 1,
    "title": "Implementar tela de login (refatorada)",
    "description": "Ajustar layout e mensagens de erro.",
    "status": "IN_PROGRESS",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-02T09:30:00.000Z"
  }
}
```

**Respostas de Erro:**

- **400 / 422 – Erro de validação**

  ```json
  {
    "message": "Campo obrigatório"
  }
  ```

- **401 – Não autorizado**

  ```json
  {
    "message": "Não autorizado"
  }
  ```

- **404 – Tarefa não encontrada**

  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

### DELETE /api/task/{id}

Remove uma tarefa existente.

**Headers:**

- `Authorization: Bearer <token>`

**Parâmetros de Caminho (Path Params):**

- `id` (string, obrigatório): ID da tarefa.

**Exemplo de Requisição:**

`DELETE /api/task/10`

**Resposta de Sucesso (200):**

```json
{
  "message": "Tarefa removida com sucesso"
}
```

**Respostas de Erro:**

- **401 – Não autorizado**

  ```json
  {
    "message": "Não autorizado"
  }
  ```

- **404 – Tarefa não encontrada**

  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

## Estruturas de Dados (Schemas principais)

Abaixo um resumo dos principais schemas definidos no Swagger.

### User

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "usuario@exemplo.com"
}
```

### Task

```json
{
  "id": 10,
  "userId": 1,
  "title": "Implementar tela de login",
  "description": "Criar formulário com validação de email e senha.",
  "status": "PENDING",
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

### ErrorResponse

```json
{
  "message": "Mensagem de erro descritiva"
}
```
