/*
  Warnings:

  - The values [Boooked] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `room_type` on the `Units` table. All the data in the column will be lost.
  - You are about to drop the column `table_type` on the `Units` table. All the data in the column will be lost.
  - Added the required column `booking_type` to the `Units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venderId` to the `Units` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "booking_type" AS ENUM ('Single', 'Double', 'Triple', 'Family');

-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('Available', 'Occupied', 'Maintenance');
ALTER TABLE "Units" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Units" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Units" ALTER COLUMN "status" SET DEFAULT 'Available';
COMMIT;

-- AlterTable
ALTER TABLE "Units" DROP COLUMN "room_type",
DROP COLUMN "table_type",
ADD COLUMN     "booking_type" "booking_type" NOT NULL,
ADD COLUMN     "venderId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Table_type";

-- DropEnum
DROP TYPE "room_type";

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_venderId_fkey" FOREIGN KEY ("venderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
