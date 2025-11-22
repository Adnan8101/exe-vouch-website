-- CreateTable
CREATE TABLE "Proof" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT,
    "message" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofSession" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "totalProofs" INTEGER NOT NULL,
    "totalImages" INTEGER NOT NULL,
    "startedBy" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "isPushed" BOOLEAN NOT NULL DEFAULT false,
    "pushedAt" TIMESTAMP(3),
    "summary" TEXT,

    CONSTRAINT "ProofSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proof_messageId_key" ON "Proof"("messageId");

-- CreateIndex
CREATE INDEX "Proof_channelId_idx" ON "Proof"("channelId");

-- CreateIndex
CREATE INDEX "Proof_authorId_idx" ON "Proof"("authorId");

-- CreateIndex
CREATE INDEX "Proof_timestamp_idx" ON "Proof"("timestamp");

-- CreateIndex
CREATE INDEX "ProofSession_channelId_idx" ON "ProofSession"("channelId");

-- CreateIndex
CREATE INDEX "ProofSession_startedAt_idx" ON "ProofSession"("startedAt");
