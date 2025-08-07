# Sistema de Entregas por Drone

Este projeto é uma API REST simples que simula um sistema de entregas utilizando drones. Ele permite criar pedidos de entrega, simular o processo de entrega de um drone e consultar o status atual dos drones e os pedidos registrados.

---

## Funcionalidades

- Criar pedidos de entrega com coordenadas, peso e prioridade.
- Simular entregas com estados do drone e feedbacks.
- Consultar o status atual do drone.
- Listar pedidos cadastrados para entrega.

---

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript (assumido pelo código)
- JSON para troca de dados via API REST

---

## Endpoints da API

### 1. Criar Pedido

- **URL:** `/deliveries/pedidos`
- **Método:** `POST`
- **Descrição:** Cria um novo pedido de entrega, adicionando-o à lista interna.
- **Corpo da requisição (JSON):**

```json
{
  "x": 1,
  "y": 5,
  "weight": 3,
  "priority": "alta"
}
```

---

### 2. Listar Pedidos (Rota)

- **URL:** `/deliveries/entregas/rota`
- **Método:** `GET`
- **Descrição:** Retorna a lista de pedidos criados no sistema.
- **Resposta:**

```json
{
  "totalPedidos": 1,
  "pedidos": [...]
}
```

---

### 3. Simular Entrega

- **URL:** `/deliveries/simulate`
- **Método:** `POST`
- **Descrição:** Simula o processo de entrega do drone para um pedido com coordenadas, peso e prioridade informados.
- **Corpo da requisição:**

```json
{
  "x": 1,
  "y": 5,
  "weight": 3,
  "priority": "alta"
}
```

---

### 4. Status Atual do Drone

- **URL:** `/deliveries/drones/status`
- **Método:** `GET`
- **Descrição:** Retorna o estado atual do drone.

---

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

O servidor estará disponível em:  
`http://localhost:3004`

---

## ✅ Como Testar

### 1. Testar com Postman

#### Criar Pedido

- URL: `http://localhost:3004/deliveries/pedidos`
- Método: `POST`
- Body (JSON):

```json
{
  "x": 10,
  "y": 15,
  "weight": 3,
  "priority": "alta"
}
```

#### Simular Entrega

- URL: `http://localhost:3004/deliveries/simulate`
- Método: `POST`
- Body (JSON):

```json
{
  "x": 10,
  "y": 15,
  "weight": 3,
  "priority": "alta"
}
```

#### Listar Pedidos

- URL: `http://localhost:3004/deliveries/entregas/rota`
- Método: `GET`

#### Status do Drone

- URL: `http://localhost:3004/deliveries/drones/status`
- Método: `GET`

---

### 2. Testar com curl

```bash
curl -X POST http://localhost:3004/deliveries/pedidos -H "Content-Type: application/json" -d '{"x":10,"y":15,"weight":3,"priority":"alta"}'
curl -X POST http://localhost:3004/deliveries/simulate -H "Content-Type: application/json" -d '{"x":10,"y":15,"weight":3,"priority":"alta"}'
curl http://localhost:3004/deliveries/entregas/rota
curl http://localhost:3004/deliveries/drones/status
```

---

## Observações

- O array de pedidos é armazenado apenas na **memória do servidor**, então será zerado ao reiniciar.
- A simulação do drone é sequencial, com diferentes estados (Idle, Carregando, Em voo...).
- Áreas bloqueadas (como `y > 50`) e pesos acima de 5kg não são aceitos.

---

## Melhorias Futuras

- Persistência de dados com banco de dados (ex: SQLite ou PostgreSQL)
- Integração com frontend visual
- Autenticação de usuários e pedidos por cliente