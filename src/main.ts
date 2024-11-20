import { ApiExpress } from "./infra/repositories/client/api/express/api.express";
import { CreateClientExpressRoute } from "./infra/repositories/client/api/express/routes/client/create-client.express.route";
import { ListClientRoute } from "./infra/repositories/client/api/express/routes/client/list-client.express.route";
import { ClientRepositoryPrisma } from "./infra/repositories/client/client.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateClientUsecase } from "./usecases/create-client/create-client.usecase";
import { ListClientUsecase } from "./usecases/list-client/list-client.usecase";

function main() {
  const aRepository = ClientRepositoryPrisma.create(prisma);

  const createClientUsecase = CreateClientUsecase.create(aRepository);
  const listClientUsecase = ListClientUsecase.create(aRepository);

  const createRoute = CreateClientExpressRoute.create(createClientUsecase);
  const listRoute = ListClientRoute.create(listClientUsecase);

  const port = 8000;

  const api = ApiExpress.create([createRoute, listRoute]);
  api.start(port);
}
main();
