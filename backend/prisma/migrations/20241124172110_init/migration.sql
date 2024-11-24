-- CreateTable
CREATE TABLE "TipoUva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Varietal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipoUvaId" INTEGER NOT NULL,
    CONSTRAINT "Varietal_tipoUvaId_fkey" FOREIGN KEY ("tipoUvaId") REFERENCES "TipoUva" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,
    CONSTRAINT "Provincia_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RegionVitivinicola" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    CONSTRAINT "RegionVitivinicola_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bodega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "regionVitivinicolaId" INTEGER NOT NULL,
    CONSTRAINT "Bodega_regionVitivinicolaId_fkey" FOREIGN KEY ("regionVitivinicolaId") REFERENCES "RegionVitivinicola" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL NOT NULL,
    "bodegaId" INTEGER NOT NULL,
    CONSTRAINT "Vino_bodegaId_fkey" FOREIGN KEY ("bodegaId") REFERENCES "Bodega" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resenia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "esPremium" BOOLEAN NOT NULL,
    "fechaResenia" DATETIME NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "vinoId" INTEGER NOT NULL,
    CONSTRAINT "Resenia_vinoId_fkey" FOREIGN KEY ("vinoId") REFERENCES "Vino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_VarietalToVino" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_VarietalToVino_A_fkey" FOREIGN KEY ("A") REFERENCES "Varietal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VarietalToVino_B_fkey" FOREIGN KEY ("B") REFERENCES "Vino" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_VarietalToVino_AB_unique" ON "_VarietalToVino"("A", "B");

-- CreateIndex
CREATE INDEX "_VarietalToVino_B_index" ON "_VarietalToVino"("B");
