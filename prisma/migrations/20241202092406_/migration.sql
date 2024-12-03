-- AlterTable
ALTER TABLE "inventoryLocation" ADD COLUMN     "active" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "inventoryWarehouse" ADD COLUMN     "active" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "resUsers" ADD COLUMN     "active" BOOLEAN DEFAULT true;
