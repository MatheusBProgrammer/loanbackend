import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";
import {
  CreateClientInputDto,
  CreateClientOutputDto,
  CreateClientUsecase,
} from "../../../../../../../usecases/create-client/create-client.usecase";

export class CreateClientExpressRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createClientUseCase: CreateClientUsecase
  ) {}

  public static create(createClientUseCase: CreateClientUsecase) {
    return new CreateClientExpressRoute(
      "/client",
      HttpMethod.POST,
      createClientUseCase
    );
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const {
        name,
        phone,
        loanAmount,
        startDate,
        initialNumberOfInstallments,
      } = req.body;

      const input: CreateClientInputDto = {
        name,
        phone,
        loanAmount,
        startDate,
        initialNumberOfInstallments,
      };
      const output: CreateClientOutputDto =
        await this.createClientUseCase.execute(input);
      res.status(201).json(this.present(output));
    };
  }
  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }
  private present(input: CreateClientOutputDto): CreateClientOutputDto {
    const response = { id: input.id };
    return response;
  }
}
