-- CreateTable
CREATE TABLE "Repo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adoId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "isDisabled" BOOLEAN NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);
