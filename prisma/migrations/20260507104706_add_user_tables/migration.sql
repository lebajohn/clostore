/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFeatured` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL,
ADD COLUMN     "numReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "address" JSON,
ADD COLUMN     "emailVerified" TIMESTAMP(6),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "name" SET DEFAULT 'NO_NAME',
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Account" (
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_idx" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User_email_key" RENAME TO "user_email_idx";
