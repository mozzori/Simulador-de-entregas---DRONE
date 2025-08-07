export type Priority = "baixa" | "media" | "alta";

export interface DeliveryRequest {
  x: number;
  y: number;
  weight: number;
  priority: Priority;
}
