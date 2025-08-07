import { Router } from 'express';

const deliveriesRoutes = Router();

type DroneState = "Idle" | "Carregando" | "Em voo" | "Entregando" | "Retornando";

interface Drone {
  id: number;
  state: DroneState;
  lastUpdate: number;
}

interface Pedido {
  id: number;
  x: number;
  y: number;
  weight: number;
  priority: string;
}

let drone: Drone = {
  id: 1,
  state: "Idle",
  lastUpdate: Date.now()
};

let pedidos: Pedido[] = [];
let pedidoIdCounter = 1;

function calcularTempoParaEntrega(priority: string): string {
  switch (priority.toLowerCase()) {
    case "alta":
      return "1 hora e 30 minutos";
    case "média":
      return "3 horas";
    case "baixa":
      return "4 horas";
    default:
      return "Tempo indefinido";
  }
}

deliveriesRoutes.post("/simulate", async (req, res) => {
  const { x, y, weight, priority } = req.body;

  if (x === undefined || y === undefined || weight === undefined || !priority) {
    return res.status(400).json({ error: "Campos obrigatórios: x, y, weight, priority" });
  }

  const MAX_WEIGHT = 5; // kg
  const MAX_RANGE = 20; // km
  const DRONE_SPEED = 50; // km/h
  const OBSTACLE_ZONE = (x: number, y: number) => y > 50;

  if (OBSTACLE_ZONE(x, y)) {
    return res.status(400).json({ error: "Área não atendida (zona norte bloqueada)" });
  }

  if (weight > MAX_WEIGHT) {
    return res.status(400).json({ error: "Peso excede o limite do drone" });
  }

  const distance = Math.sqrt(x * x + y * y);
  if (distance > MAX_RANGE) {
    return res.status(400).json({ error: "Destino fora do alcance do drone" });
  }

  const timeHours = distance / DRONE_SPEED;
  const timeMinutes = Math.ceil(timeHours * 60);

  const states: DroneState[] = ["Idle", "Carregando", "Em voo", "Entregando", "Retornando", "Idle"];
  const feedbacks: string[] = [
    `Seu pedido sairá para entrega em ${calcularTempoParaEntrega(priority)}.`,
    "Seu pedido está sendo preparado.",
    "Seu pedido saiu para entrega.",
    `Seu pacote está a ${Math.ceil(distance / 2)} quadras de distância.`,
    "Seu pedido chegou!",
    "Drone retornando à base."
  ];

  const simulation: { estado: DroneState, feedback: string }[] = [];

  for (let i = 0; i < states.length; i++) {
    drone.state = states[i];
    drone.lastUpdate = Date.now();
    simulation.push({
      estado: drone.state,
      feedback: feedbacks[i]
    });
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return res.json({
    Mensagem: "Entrega realizada com sucesso.",
    Destino: {
      CoordenadaX: x,
      CoordenadaY: y
    },
    Distância: `${distance.toFixed(2)} km`,
    "Tempo estimado de entrega": calcularTempoParaEntrega(priority),
    "Tempo estimado de chegada do drone": `${timeMinutes} minutos`,
    Sucesso: true,
    Simulacao: simulation
  });
});

// cria um novo pedido
deliveriesRoutes.post("/pedidos", (req, res) => {
  const { x, y, weight, priority } = req.body;

  if (x === undefined || y === undefined || weight === undefined || !priority) {
    return res.status(400).json({ error: "Campos obrigatórios: x, y, weight, priority" });
  }

  const novoPedido: Pedido = {
    id: pedidoIdCounter++,
    x,
    y,
    weight,
    priority
  };

  pedidos.push(novoPedido);

  console.log('Pedido criado:', novoPedido);
  console.log('Pedidos totais:', pedidos.length);

  return res.status(201).json({ mensagem: "Pedido criado com sucesso", pedido: novoPedido });
});

// lista os pedidos
deliveriesRoutes.get("/entregas/rota", (req, res) => {
  return res.json({ 
    totalPedidos: pedidos.length,
    pedidos 
  });
});

// status atual do drone
deliveriesRoutes.get("/drones/status", (req, res) => {
  return res.json({ drone });
});

export default deliveriesRoutes;
