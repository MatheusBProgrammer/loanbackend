//Através desse código, garantiremos a criação de apenas uma conexão utilizando o Prisma
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
