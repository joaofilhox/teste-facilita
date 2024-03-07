import { Request, Response } from "express";
import { pool } from "../config/connection";
import * as math from "mathjs";
import { Client } from "../interfaces/clientInterfaces";


export class CalculatingRoutes {
  public async calculatedRoute(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await CalculatingRoutes.getClientsFromDatabase();

      if (clients.length === 0) {
        return res.status(404).json({ message: "Nenhum cliente cadastrado." });
      }

      const coordinates = clients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        coordinate_x: client.coordinate_x,
        coordinate_y: client.coordinate_y,
      }));

      const route = CalculatingRoutes.calculateRoute(coordinates);

      return res.status(200).json(route);
    } catch (error) {
      console.error("Erro ao executar a consulta SQL:", error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }

  private static async getClientsFromDatabase(): Promise<Client[]> {
    const clients = await pool.query("SELECT * FROM clients");
    return clients.rows;
  }

  private static calculateRoute(coordinates: Client[]): Client[] {
    const route: Client[] = [];
    let currentPoint = { coordinate_x: 0, coordinate_y: 0 };

    while (coordinates.length > 0) {
      const nearestNeighbor = CalculatingRoutes.findNearestNeighbor(currentPoint, coordinates);
      route.push(nearestNeighbor);
      currentPoint = nearestNeighbor;
      coordinates.splice(coordinates.findIndex((point) => point.id === nearestNeighbor.id), 1);
    }

    return route;
  }

  private static findNearestNeighbor(point: any, availablePoints: Client[]): Client {
    let minimumDistance = Number.MAX_SAFE_INTEGER;
    let nearestNeighbor: Client | null = null;

    for (const availablePoint of availablePoints) {
      const distance = CalculatingRoutes.calculateDistance(point, availablePoint);

      if (distance < minimumDistance) {
        minimumDistance = distance;
        nearestNeighbor = availablePoint;
      }
    }

    return nearestNeighbor!;
  }
  private static calculateDistance(point1: any, point2: Client): number {
    const x1 = Number(point1.coordinate_x);
    const y1 = Number(point1.coordinate_y);
    const x2 = Number(point2.coordinate_x);
    const y2 = Number(point2.coordinate_y);
  
    return Number(math.distance([x1, y1], [x2, y2]));
  }
  
  
}
