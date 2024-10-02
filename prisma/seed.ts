import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
import coachData from './seedData/Coaches.json'
import studentData from './seedData/Students.json'

interface Coach {
    id : number
    firstName : string 
    lastName : string
    phoneNumber: string
    role?: Role
}
interface Student {
    id : number
    firstName : string 
    lastName : string
    phoneNumber: string
    role?: Role
}
async function main() {

    const coaches : Coach[] = coachData.map(each => ({...each, role : Role.COACH}))
    const students : Student[] = studentData.map(each=> ({...each, role : Role.STUDENT}))


  // Seed coaches
  await prisma.coach.createMany({
    data: coaches
  });

  await prisma.student.createMany({
    data: students,
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });