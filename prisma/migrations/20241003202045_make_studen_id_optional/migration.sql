-- DropForeignKey
ALTER TABLE "Appt" DROP CONSTRAINT "Appt_studenId_fkey";

-- AlterTable
ALTER TABLE "Appt" ALTER COLUMN "studenId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appt" ADD CONSTRAINT "Appt_studenId_fkey" FOREIGN KEY ("studenId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
