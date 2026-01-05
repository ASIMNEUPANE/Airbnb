/*
  Warnings:

  - You are about to drop the column `bookingAmount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingStatus` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `bookingAmount`,
    DROP COLUMN `bookingStatus`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
