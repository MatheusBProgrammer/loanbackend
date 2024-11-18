import { Client } from "../../domain/client/entity/client.entity";
import { ClientGateway } from "../../domain/client/gateway/client.gateway";
import { Usecase } from "../usecase";

export type CreateClientInputDto = {
  name: string;
  phone: string;
  loanAmount: number;
  startDate: Date;
  initialNumberOfInstallments: number;
};

export type CreateClientOutputDto = {
  id: string;
};

export class CreateClientUsecase
  implements Usecase<CreateClientInputDto, CreateClientOutputDto>
{
  private constructor(private readonly clientGateway: ClientGateway) {}

  public static create(clientGateway: ClientGateway) {
    return new CreateClientUsecase(clientGateway);
  }

  public async execute({
    name,
    phone,
    loanAmount,
    startDate,
    initialNumberOfInstallments,
  }: CreateClientInputDto): Promise<CreateClientOutputDto> {
    const aClient = Client.create(
      name,
      phone,
      loanAmount,
      startDate,
      initialNumberOfInstallments
    );
    await this.clientGateway.save(aClient);
    return this.presentOutput(aClient);
  }

  private presentOutput(client: Client): CreateClientOutputDto {
    return { id: client.id };
  }
}
