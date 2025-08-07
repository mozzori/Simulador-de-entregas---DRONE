import { DeliveryRequest } from "../models/delivery";

const MAX_WEIGHT_KG = 5;
const MAX_DISTANCE_KM = 10;

function calculateDistance(x: number, y: number): number {
  const baseX = 0;
  const baseY = 0;
  const dx = x - baseX;
  const dy = y - baseY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function simulateDelivery(request: DeliveryRequest) {
  const distance = calculateDistance(request.x, request.y);

  if (request.weight > MAX_WEIGHT_KG) {
    return { success: false, error: "Peso excede a capacidade do drone" };
  }

  if (distance > MAX_DISTANCE_KM) {
    return { success: false, error: "Distância excede a autonomia do drone" };
  }

  return {
    success: true,
    message: `Entrega simulada para (${request.x}, ${request.y}) com prioridade ${request.priority}`,
    distance: distance.toFixed(2) + " km",
  };
}
