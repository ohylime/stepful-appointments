'use client'
import { IAppts, IStudent, ICoach } from '@/app/interfaces';
import React, { useEffect , useState} from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@nextui-org/react";
import { Role } from '@prisma/client';
  
  // 1 Monday 2 Tuesday 3 Wednesday 4 Thursday 5 Friday
  interface CalendarProps {
    appts: IAppts[];
    role: Role
  }

  interface Row {
    key: string
    date: string
    end: string
    student? : string
    coach?: string
  }

  export function Calender({appts, role} : CalendarProps){
    const [rows, setRows] = useState<Row[]>([])

    useEffect(()=> {

        const details : Row[] = appts.map( (each : IAppts) => {
            const start = new Date(each.startTime)
            const end = new Date(each.endTime)
            const currentRow =  {
                key : each.id+'appt',
                date: start.toLocaleDateString('en-US', {weekday :'short', year: 'numeric', month: '2-digit', day: '2-digit' })+ '',
                start: start.toLocaleTimeString(),
                end: end.toLocaleTimeString(),
            }

            if(role === Role.COACH){
                currentRow['student'] = each.student ?  each.student.lastName  : ""
            }else {
                currentRow['coach'] = each.coach ?  each.coach.lastName  : ""
            }

            return currentRow
        })
       setRows(details)
       console.log(rows)
    },[])
  
    const columns = [
        {
            key: "date",
            label: "Date",
          },
          {
            key: "start",
            label: "Start Time",
          },
          {
            key: "end",
            label: "End Time",
          },
          {
            key: role === Role.COACH ? "student" : "coach",
            label: role === Role.COACH ? "Student" : "Coach",
          },
          {
            key: "feedback",
            label: "Feedback",
          },
      ]



      if(!rows){
        return ( <>     
            <Table aria-label="Example empty table">
            <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          </Table>   
              </>)
      }

    return(
        <div>
            <Table aria-label="calender">
            <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>       
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>)}
            </TableBody>
          </Table>   
        </div>

    )
}