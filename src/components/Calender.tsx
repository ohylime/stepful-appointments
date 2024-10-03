'use client'

import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/react";
  
  // 1 Monday 2 Tuesday 3 Wednesday 4 Thursday 5 Friday

  export function Calender({props}){
  
    // const columns = [
    //     {
    //         key: "monday",
    //         label: "MONDAY",
    //       },
    //       {
    //         key: "TUESDAY",
    //         label: "tuesday",
    //       },
    //       {
    //         key: "WEDNESDAY",
    //         label: "wednesday",
    //       },
    //   ]

      if(!props){
        return ( <>     
            <Table aria-label="Example empty table">
            <TableHeader>
              <TableColumn>MONDAY</TableColumn>
              <TableColumn>TUESDAY</TableColumn>
              <TableColumn>WEDNESDAY</TableColumn>
              <TableColumn>THURSDAY</TableColumn>
              <TableColumn>FRIDAY</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          </Table>   
              </>)
      }

    return(
        <div>
   <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    </Table>
        </div>

    )
}