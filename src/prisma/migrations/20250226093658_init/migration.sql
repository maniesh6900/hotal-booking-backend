/*
  Warnings:

  - You are about to drop the column `unitId` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `listingId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_unitId_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "unitId",
ADD COLUMN     "listingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
