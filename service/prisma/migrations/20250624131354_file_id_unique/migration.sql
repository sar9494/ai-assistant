/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_fileId_key" ON "File"("fileId");
