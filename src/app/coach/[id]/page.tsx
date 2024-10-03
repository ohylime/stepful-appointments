"use client";
import React, { useEffect, useState } from "react";
import { ICoach } from "../../interfaces";
import { Nav } from "../../../components/Nav";
import { Calender } from "../../../components/Calender";
import { AppointmentForm } from "../../../components/AppointmentForm";
import { Button } from "@nextui-org/button";

const CoachHeader = ({ name }: { name: string }) => {
  if (name) {
    return <div>Welcome Coach {`${name}`}</div>;
  } else {
    return <div>Loading</div>;
  }
};

const CoachDash = ({ params }: { params: { id: string } }) => {
  const [coach, setCoachData] = useState<ICoach>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApptFormOpen, setApptForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCoachDashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: params.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch coach data");
        }
        const data = await response.json();
        console.log(data);
        setCoachData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (coach)
    return (
      <>
        <Nav title="Coach Dashboard" />
        <div className="h-full grid grid-cols-4 m-5 gap-4">
          <div className="row-span-1 m-5 flex flex-col">
            <CoachHeader name={coach.firstName} />

            <div className="m-5 h-1/2 flex flex-col justify-evenly">
              <AppointmentForm
                id={params.id}
                isOpen={isApptFormOpen}
                close={() => {
                  setApptForm(false);
                }}
              />
              <Button
                size="sm"
                className="bg-[#C38774]"
                onPress={() => setApptForm(true)}
              >
                {" "}
                Add Appointment
              </Button>
              <Button size="sm" className="bg-[#C38774]">
                {" "}
                Feedbacks
              </Button>
            </div>
          </div>

          <div className="row-span-5 col-span-3 m-5">
            <h3>Calender</h3>
            <Calender appts={coach.appts} role={coach.role} />
          </div>
        </div>
      </>
    );
};

export default CoachDash;
