-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_customerId_fkey";

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
