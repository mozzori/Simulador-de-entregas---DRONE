import { Request, Response } from "express";
import { simulateDelivery } from "../services/deliveryService";

export function simulate(req: Request, res: Response) {
  const { x, y, weight, priority } = req.body;

  if (x === undefined || y === undefined || weight === undefined || !priority) {
    return res.status(400).json({ error: "Campos obrigatórios: x, y, weight, priority" });
  }

  const result = simulateDelivery({ x, y, weight, priority });

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}
