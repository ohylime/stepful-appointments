
import React from 'react'
import {Navbar, NavbarBrand} from '@nextui-org/navbar'
import {Home} from '@mui/icons-material'
export function Nav({title}){


    return (
        <Navbar 
            className='bg-[#ECE8DD]'
            position='static' > 
                <NavbarBrand>
                    <Home/>
                </NavbarBrand>
        {title}  
        </Navbar>
    )
}