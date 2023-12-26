-- CreateTable
CREATE TABLE "Lote" (
    "id" TEXT NOT NULL,
    "barCode" INTEGER NOT NULL,
    "lote" TEXT NOT NULL,
    "qnt" INTEGER NOT NULL,
    "custoPrice" INTEGER NOT NULL,
    "custoVenda" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lote_barCode_key" ON "Lote"("barCode");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_lote_key" ON "Lote"("lote");
