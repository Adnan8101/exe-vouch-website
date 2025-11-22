-- CreateTable
CREATE TABLE "Vouch" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT,
    "message" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vouch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptureSession" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "totalVouches" INTEGER NOT NULL,
    "startedBy" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "isPushed" BOOLEAN NOT NULL DEFAULT false,
    "pushedAt" TIMESTAMP(3),
    "summary" TEXT,

    CONSTRAINT "CaptureSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vouch_messageId_key" ON "Vouch"("messageId");

-- CreateIndex
CREATE INDEX "Vouch_channelId_idx" ON "Vouch"("channelId");

-- CreateIndex
CREATE INDEX "Vouch_authorId_idx" ON "Vouch"("authorId");

-- CreateIndex
CREATE INDEX "Vouch_timestamp_idx" ON "Vouch"("timestamp");

-- CreateIndex
CREATE INDEX "CaptureSession_channelId_idx" ON "CaptureSession"("channelId");

-- CreateIndex
CREATE INDEX "CaptureSession_startedAt_idx" ON "CaptureSession"("startedAt");
