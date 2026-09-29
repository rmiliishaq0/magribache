import { Prisma } from "@/app/generated/prisma/browser";

export function serializePrisma<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      value instanceof Prisma.Decimal ? Number(value) : value
    )
  );
}