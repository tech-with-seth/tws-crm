import { prisma } from "~/db.server";
import type { Customer } from "@prisma/client";

export async function createCustomer(
  data: Omit<Customer, "id" | "createdAt" | "updatedAt">,
) {
  return prisma.customer.create({
    data,
  });
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
  });
}

export async function getCustomerByEmail(email: string) {
  return prisma.customer.findUnique({
    where: { email },
  });
}

export async function getCustomerByEmailWithInteractions(email: string) {
  return prisma.customer.findUnique({
    where: { email },
    include: {
      interactions: {
        include: {
          author: true,
          comments: true,
        },
      },
    },
  });
}

export async function updateCustomer(id: string, data: Partial<Customer>) {
  return prisma.customer.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: { id },
  });
}

export async function getAllCustomers() {
  return prisma.customer.findMany();
}
