import { prisma } from "~/db.server";
import type { Comment, Interaction } from "@prisma/client";

export async function createInteraction(
  data: Omit<Interaction, "id" | "createdAt" | "updatedAt">,
) {
  return prisma.interaction.create({
    data,
  });
}

export async function createInteractionWithComments(
  data: Omit<Interaction, "id" | "createdAt" | "updatedAt">,
  comments: Pick<Comment, "authorId" | "content">[],
) {
  return prisma.interaction.create({
    data: {
      ...data,
      comments: {
        create: comments,
      },
    },
  });
}

export async function getInteractionById(id: string) {
  return prisma.interaction.findUnique({
    where: { id },
  });
}

export async function updateInteraction(
  id: string,
  data: Partial<Interaction>,
) {
  return prisma.interaction.update({
    where: { id },
    data,
  });
}

export async function deleteInteraction(id: string) {
  return prisma.interaction.delete({
    where: { id },
  });
}

export async function getAllInteractions() {
  return prisma.interaction.findMany();
}
