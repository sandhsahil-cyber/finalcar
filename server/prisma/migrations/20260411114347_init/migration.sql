-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "leaderName" TEXT NOT NULL,
    "leaderAvatar" TEXT NOT NULL,
    "memberCount" INTEGER NOT NULL,
    "monthlyTarget" REAL NOT NULL,
    "achieved" REAL NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SalesPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "monthlyTarget" REAL NOT NULL,
    "achieved" REAL NOT NULL,
    "dealsCount" INTEGER NOT NULL,
    "conversionRate" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "joinedDate" TEXT NOT NULL,
    CONSTRAINT "SalesPerson_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carVariant" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "downPayment" REAL NOT NULL,
    "salespersonId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "expectedDelivery" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "stageProgress" TEXT NOT NULL,
    "financeType" TEXT,
    "financePartner" TEXT,
    "financeStatus" TEXT,
    "insurancePartner" TEXT,
    "accessoriesAmount" REAL,
    "isExchange" BOOLEAN,
    CONSTRAINT "Deal_salespersonId_fkey" FOREIGN KEY ("salespersonId") REFERENCES "SalesPerson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deal_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "dealId" TEXT
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL
);
