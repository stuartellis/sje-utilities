-- CreateTable
CREATE TABLE "Pipeline" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adoId" INTEGER NOT NULL,
    "configPath" VARCHAR(255) NOT NULL,
    "configType" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "folder" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "revision" INTEGER NOT NULL,
    "url" TEXT,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);
