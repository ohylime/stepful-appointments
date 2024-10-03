'use client'
import React, {  useState } from 'react';
import {now, getLocalTimeZone} from "@internationalized/date";

import {DatePicker} from "@nextui-org/date-picker";
import {Button} from "@nextui-org/button";
import {Spacer} from "@nextui-org/spacer";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
  } from "@nextui-org/modal";

  export function AppointmentForm({id, isOpen, close}){
    const [apptDate, setDate] = useState({startTime: '', endTime: ''})
    const [isValid, setValid] = useState<boolean>()

    // {
    //     "calendar":{"identifier":"gregory"},
    //     "era":"AD","year":2024,
    //     "month":10,"day":23,
    //     "timeZone":"America/New_York",
    //     "offset":-14400000,"hour":5,
    //     "minute":18,
    //     "second":13,
    //     "millisecond":945
    // }

    function convertTimetoUTC(dateObj){
        const { year, month, day, hour } = dateObj;
        const startTime = new Date(year, month - 1, day, hour ).toISOString();
        const endTime = new Date(year, month - 1, day, hour + 2).toISOString();
        return {startTime, endTime}
    }



    function validateStartTime(dateObj){
        const { year, month, day, hour, minute } = dateObj;

        // Create a Date object using the user's local time
        const date = new Date(year, month - 1, day, hour, minute);

        // Check if the date is Monday to Friday (getDay() returns 0 for Sunday and 6 for Saturday)
        const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, ..., 5: Friday, 6: Saturday
        if (dayOfWeek < 1 || dayOfWeek > 5) {
          return false; // Not a weekday
        }
      
        // Check if the time is between 9 AM and 5 PM (inclusive)
        const hours = date.getHours();
        if (hours < 9 || hours >= 16) {
          return false; // Not within business hours (9 AM - 5 PM)
        }
      
        // All checks passed, it's a valid business date/time
        return true;
    }


    async function handleAddAppointment(value){
        if(validateStartTime(value)){
            setValid(true)
            setDate(convertTimetoUTC(value))
            
        }else {
            setValid(false)
        }
        
    }


    async function createAppointment(){

        try {
       
                const resp = await fetch(
                    '/api/createAppt',
                    {method : "POST",
                     headers : {'Content-Type': 'application/json'},
                     body: JSON.stringify({
                        id : id, 
                        startTime : apptDate.startTime, 
                        endTime :apptDate.endTime
                    })
                    }
                )
                console.log(resp)
                close()
               
            }catch(err){
                console.log(err)
            }
    }

    async function handleSubmit(){
        if(isValid){
            await createAppointment()
        }
       
    } 

      
    return(
     <Modal isOpen={isOpen} onClose={close} className='w-1/3'>
        <ModalContent>
        {(onClose) => (<>
        
        <ModalHeader className="flex flex-col gap-1">Select Your Appointment</ModalHeader>
        <ModalBody>

        </ModalBody>

           <div className='flex flex-row m-5'>
           <DatePicker
                label="Event Date"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                isInvalid={isValid === undefined ? false : !isValid}
                errorMessage="Please enter a valid date and time."
                defaultValue={now(getLocalTimeZone())}
                onChange={handleAddAppointment}
      />
           <Spacer x={4}/>
           </div>
            
         <ModalFooter>
            All appointments are 2 hour slots. Rounds to the Hour
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button isDisabled={!isValid} color="primary" onPress={handleSubmit}>
              Add 
            </Button>
          </ModalFooter>
        </>)}

        </ModalContent>
     </Modal>



    )
}