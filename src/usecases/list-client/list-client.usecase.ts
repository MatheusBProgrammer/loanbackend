import { Client } from "../../domain/client/entity/client.entity";
import { ClientGateway } from "../../domain/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type ListClientInputDto = void;

export type ListClientOutputDto = {
  clients: {
    id: string;
    name: string;
    phone: string;
    loanAmount: number;
    amountPaid: number;
    startDate: Date;
    initialNumberOfInstallments: number;
    numberOfRemainingInstallments: number;
  }[];
};

export class ListClientUsecase
  implements Usecase<ListClientInputDto, ListClientOutputDto>
{
  private constructor(private readonly clientGateway: ClientGateway) {}

  public static create(clientGateway: ClientGateway) {
    return new ListClientUsecase(clientGateway);
  }

  public async execute(
    inputDto: ListClientInputDto
  ): Promise<ListClientOutputDto> {
    const aClients = await this.clientGateway.list();
    const outout = this.presentOutput(aClients);
    return outout;
  }

  private presentOutput(clients: Client[]): ListClientOutputDto {
    return {
      clients: clients.map((p) => {
        return {
          id: p.id,
          name: p.name,
          phone: p.phone,
          loanAmount: p.loanAmount,
          amountPaid: p.amountPaid,
          startDate: p.startDate,
          initialNumberOfInstallments: p.initialNumberOfInstallments,
          numberOfRemainingInstallments: p.numberOfRemainingInstallments,
        };
      }),
    };
  }
}
