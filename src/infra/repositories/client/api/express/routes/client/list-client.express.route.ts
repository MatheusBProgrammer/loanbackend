import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {
  ListClientInputDto,
  ListClientOutputDto,
  ListClientUsecase,
} from "../../../../../../../usecases/list-client/list-client.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class ListClientRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listClientUsecase: ListClientUsecase
  ) {}

  public static create(listClientUsecase: ListClientUsecase): ListClientRoute {
    return new ListClientRoute("/clients", HttpMethod.GET, listClientUsecase);
  }
  getHandler() {
    return async (req: Request, res: Response) => {
      const input: ListClientInputDto = void 0;
      const output: ListClientOutputDto = await this.listClientUsecase.execute(
        input
      );
      const response = this.present(output);
      res.status(200).json(response);
    };
  }

  private present(input: ListClientOutputDto): ListClientOutputDto {
    const response = {
      clients: input.clients.map((p) => ({
        id: p.id,
        name: p.name,
        phone: p.phone,
        loanAmount: p.loanAmount,
        amountPaid: p.amountPaid,
        startDate: p.startDate,
        initialNumberOfInstallments: p.initialNumberOfInstallments,
        numberOfRemainingInstallments: p.numberOfRemainingInstallments,
      })),
    };
    return response;
  }

  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
