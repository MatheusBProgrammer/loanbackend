import { PrismaClient } from "@prisma/client";
import { ClientGateway } from "../../../domain/client/gateway/client.gateway";
import { Client } from "../../../domain/client/entity/client.entity";

export class ClientRepositoryPrisma implements ClientGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}
  // Método de fábrica para criar a instância
  public static create(prismaClient: PrismaClient): ClientRepositoryPrisma {
    return new ClientRepositoryPrisma(prismaClient);
  }
  public async save(client: Client): Promise<void> {
    const data = {
      id: client.id,
      name: client.name,
      phone: client.phone,
      loanAmount: client.loanAmount,
      amountPaid: client.amountPaid,
      startDate: client.startDate,
      initialNumberOfInstallments: client.initialNumberOfInstallments, // Initial number of installments
      numberOfRemainingInstallments: client.numberOfRemainingInstallments, // Number of remaining installments};
    };
    await this.prismaClient.client.create({
      data,
    });
  }
  public async list(): Promise<Client[]> {
    return (await this.prismaClient.client.findMany()).map((p) =>
      Client.with({
        id: p.id,
        name: p.name,
        phone: p.phone,
        loanAmount: p.loanAmount,
        amountPaid: p.amountPaid,
        startDate: p.startDate,
        initialNumberOfInstallments: p.initialNumberOfInstallments,
        numberOfRemainingInstallments: p.numberOfRemainingInstallments,
      })
    );
  }
  public async findById(id: string): Promise<Client> {
    return await this.prismaClient.client
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((p) => {
        if (p) {
          return Client.with({
            id: p.id,
            name: p.name,
            phone: p.phone,
            loanAmount: p.loanAmount,
            amountPaid: p.amountPaid,
            startDate: p.startDate,
            initialNumberOfInstallments: p.initialNumberOfInstallments,
            numberOfRemainingInstallments: p.numberOfRemainingInstallments,
          });
        } else {
          throw new Error("Client not found");
        }
      });
  }
  public async update(client: Client): Promise<void> {
    await this.prismaClient.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        phone: client.phone,
        loanAmount: client.loanAmount,
        amountPaid: client.amountPaid,
        startDate: client.startDate,
        initialNumberOfInstallments: client.initialNumberOfInstallments,
        numberOfRemainingInstallments: client.numberOfRemainingInstallments,
      },
    });
  }
  public async delete(id: string): Promise<void> {
    await this.prismaClient.client.delete({
      where: {
        id: id,
      },
    });
  }
}
