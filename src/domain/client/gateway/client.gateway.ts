import { Client } from "../entity/client.entity";

export interface ClientGateway {
  save(client: Client): Promise<void>;
  list(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  update(client: Client): Promise<void>;
  delete(id: string): Promise<void>;
}
