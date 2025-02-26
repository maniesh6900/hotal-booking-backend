/*
  Warnings:

  - You are about to drop the column `Address` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `address` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "Address",
ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "images" SET NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT;
