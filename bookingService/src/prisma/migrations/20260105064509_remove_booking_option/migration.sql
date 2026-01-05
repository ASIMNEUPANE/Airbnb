/*
  Warnings:

  - Made the column `bookingId` on table `IdempotencyKey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `IdempotencyKey` DROP FOREIGN KEY `IdempotencyKey_bookingId_fkey`;

-- AlterTable
ALTER TABLE `IdempotencyKey` MODIFY `bookingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `IdempotencyKey` ADD CONSTRAINT `IdempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
