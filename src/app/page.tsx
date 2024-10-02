'use client'
import { Role } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  role: Role
}

export default function Home() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch('/api/getAllUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch coaches');
        }
        const data = await response.json();
        setCoaches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Students and Coach Schedule App 
      <ul>
        {coaches.map((coach) => (
          <div key={coach.id}>
            <p>Coach : {coach.lastName}</p>
            <ul>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}
