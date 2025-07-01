/*
  Warnings:

  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('CALENDAR', 'HR', 'COMPANY', 'TOOL', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "FileType" NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
