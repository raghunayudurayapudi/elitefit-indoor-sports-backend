import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../services/auth";

type Context = {
  prisma: PrismaClient;
  req: any;
};

export default {
  Query: {
    hello: () => "Hello from EliteFit Backend!",
    users: async (_: unknown, __: unknown, { prisma }: Context) => {
      return prisma.user.findMany();
    },
    me: async (_: unknown, __: unknown, { prisma, req }: Context) => {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) return null;
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
        return prisma.user.findUnique({ where: { id: payload.userId } });
      } catch {
        return null;
      }
    },
  },
  Mutation: {
    signup: async (
      _: unknown,
      args: { email: string; password: string; name?: string },
      { prisma }: Context
    ) => {
      const hashed = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: { email: args.email, password: hashed, name: args.name },
      });
      return user;
    },
    login: async (
      _: unknown,
      args: { email: string; password: string },
      { prisma }: Context
    ) => {
      const user = await prisma.user.findUnique({ where: { email: args.email } });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    },
  },
};
