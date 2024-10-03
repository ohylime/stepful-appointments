'use client'
import React, { useEffect, useState } from 'react';
import {IAppts, IStudent} from '../../interfaces'
import { Nav } from '../../../components/Nav';
import { Calender } from '../../../components/Calender';
import {Button} from '@nextui-org/button';


const StudentHeader = ({ name }: {name :string}) => {
  if(name ){
    return <div>
      Welcome {`${name}`}
    </div>
    
  }else {
    return <div>Loading</div>
  }
} 

interface IData {
  available : IAppts
  student : IStudent
}

const StudentDash = ({ params }: { params: { id: string } }) => {

  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {

      const fetchData = async () => {
        try {
          
          const response = await fetch('/api/getStudentDashboard', {
            method : "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: params.id }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch student data');
          }
          const data = await response.json();
          console.log(data)
          setData(data);
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

  if(data)

  return (<>    
    <Nav title="Coach Dashboard" />
    <div className='h-full grid grid-cols-4 m-5 gap-4'>
      <div className='row-span-1 m-5 flex flex-col'>
 
      <StudentHeader name={data.student.firstName} />
      
      <div className='m-5 h-1/2 flex flex-col justify-evenly' >
          <Button size='sm' className='bg-[#C38774]'> Book</Button>
      </div>
  
      </div>

      <div className='row-span-5 col-span-3 m-5'> 
        <h3>Calender</h3>
        <Calender appts={[...data.available,...data.student.appts ]} role={data.student.role} userId={data.student.id}/>
      </div>

    </div>
  </>

  );
};

export default StudentDash