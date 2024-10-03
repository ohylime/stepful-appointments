import { Role } from '@prisma/client';
export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    role: Role
    appts?: Array<IAppts>
  }

  export interface ICoach {
    id: number;
    firstName: string;
    lastName: string;
    role: Role
    appts?: Array<IAppts>
  }
  
  
  export interface IAppts  {
    id: number
    coach?: ICoach
    coachId : number
    endTime: string
    startTime : string
    student? : IStudent
    studentId? : number
  }