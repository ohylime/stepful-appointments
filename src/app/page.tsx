"use client";
import { Role } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import Link from "next/link";
interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}

export default function Home() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch coaches");
        }
        const data = await response.json();
        setCoaches(data.coaches);
        setStudents(data.students);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="flex flex-row items-center justify-center w-500 h-600">
        <div className="">
          <div>Coaches</div>

          {coaches.map((coach) => (
            <div key={coach.id} className="p-[8px]">
              <Link href={`/coach/${coach.id}`}>
                <Button className="bg-[#607581]" size="md">
                  Coach : {coach.lastName}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="">
          <div>Students</div>

          {students.map((student) => (
            <div key={student.id} className="p-[8px]">
              <Link href={`/student/${student.id}`}>
                <Button className="bg-[#C2D3CC]" size="md">
                  Student : {student.lastName}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
