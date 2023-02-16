import { PrismaClient } from "@prisma/client";
import { env } from "../env/server.mjs";

const prismaClient = new PrismaClient({
  log:
    env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
export default prismaClient;
