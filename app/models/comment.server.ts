import { prisma } from "~/db.server";
import type { Comment } from "@prisma/client";

export async function createComment(
  data: Omit<Comment, "id" | "createdAt" | "updatedAt">,
): Promise<Comment> {
  return prisma.comment.create({
    data,
  });
}

export async function getCommentById(id: string): Promise<Comment | null> {
  return prisma.comment.findUnique({
    where: { id },
  });
}

export async function updateComment(
  id: string,
  data: Partial<Comment>,
): Promise<Comment> {
  return prisma.comment.update({
    where: { id },
    data,
  });
}

export async function deleteComment(id: string): Promise<Comment> {
  return prisma.comment.delete({
    where: { id },
  });
}

export async function getAllComments(): Promise<Comment[]> {
  return prisma.comment.findMany();
}

// Edge case: Get comments by authorId
export async function getCommentsByAuthorId(
  authorId: string,
): Promise<Comment[]> {
  return prisma.comment.findMany({
    where: { authorId },
  });
}

// Edge case: Get comments by interactionId
export async function getCommentsByInteractionId(
  interactionId: string,
): Promise<Comment[]> {
  return prisma.comment.findMany({
    where: { interactionId },
  });
}

// Edge case: Get comments by customerId
export async function getCommentsByCustomerId(
  customerId: string,
): Promise<Comment[]> {
  return prisma.comment.findMany({
    where: { customerId },
  });
}
