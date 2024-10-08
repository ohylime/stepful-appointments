"use client";
import { IAppts } from "@/app/interfaces";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { Role } from "@prisma/client";

// 1 Monday 2 Tuesday 3 Wednesday 4 Thursday 5 Friday
interface CalendarProps {
  appts: IAppts[];
  role: Role;
  userId: number;
}

interface Row {
  key: string;
  date: string;
  end: string;
  student?: string;
  coach?: string;
}

export function Calender({ appts, role, userId }: CalendarProps) {
  const [rows, setRows] = useState<Row[]>([]);

  async function addStudentToAppointment(apptId: number, studentId: number) {
    try {
      const resp = await fetch("/api/assignAppt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          apptId,
        }),
      });
      console.log(resp);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const details: Row[] = appts.map((each: IAppts) => {
      const start = new Date(each.startTime);
      const end = new Date(each.endTime);
      const currentRow = {
        key: each.id + "-appt",
        date:
          start.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }) + "",
        start: start.toLocaleTimeString(),
        end: end.toLocaleTimeString(),
      };

      if (role === Role.COACH && each.student) {
        currentRow["student"] = each.student.lastName;
        currentRow["feedback"] = <Button>Give</Button>;
        currentRow["phone"] = each.student.phoneNumber;
      } else {
        currentRow["coach"] = each.coach ? each.coach.lastName : "";
        currentRow["book"] = each.studenId ? (
          "You are Booked!"
        ) : (
          <Button onPress={() => addStudentToAppointment(each.id, userId)}>
            Book
          </Button>
        );
        currentRow["phone"] = each.studenId ? each.coach.phoneNumber : "";
      }

      return currentRow;
    });
    setRows(details);
  }, []);

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
      key: role === Role.COACH ? "feedback" : "book",
      label: role === Role.COACH ? "Feedback" : "Availability",
    },
    {
      key: "phone",
      label: "Phone Number",
    },
  ];

  if (!rows) {
    return (
      <>
        <Table aria-label="Example empty table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
      </>
    );
  }

  return (
    <div>
      <Table aria-label="calender">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
