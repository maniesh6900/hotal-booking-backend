/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer', 'Vender');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Hotal', 'Restaurant', 'Both');

-- CreateEnum
CREATE TYPE "room_type" AS ENUM ('Single', 'Double', 'Triple', 'Family');

-- CreateEnum
CREATE TYPE "Table_type" AS ENUM ('Single', 'Double', 'Triple', 'Family');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Available', 'Boooked');

-- CreateEnum
CREATE TYPE "Slot" AS ENUM ('Morning', 'Afternoon', 'Evening', 'Night');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'confirmed', 'Failed');

-- CreateEnum
CREATE TYPE "Pack" AS ENUM ('Gold', 'Platinum');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Customer',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Facilities" TEXT NOT NULL,
    "images" TEXT[],
    "VenderId" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" TEXT NOT NULL,
    "ListingId" TEXT NOT NULL,
    "room_type" "room_type",
    "table_type" "Table_type",
    "price" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "CustomerId" TEXT NOT NULL,
    "unitid" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "date" TEXT NOT NULL,
    "slot" "Slot",
    "guests" INTEGER NOT NULL,
    "pack" "Pack" NOT NULL DEFAULT 'Gold',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Listing_name_key" ON "Listing"("name");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_VenderId_fkey" FOREIGN KEY ("VenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_ListingId_fkey" FOREIGN KEY ("ListingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_unitid_fkey" FOREIGN KEY ("unitid") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
