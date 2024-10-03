
import React from 'react'
import {Navbar, NavbarBrand} from '@nextui-org/navbar'
import {Home} from '@mui/icons-material'
import Link from 'next/link'
export function Nav({title}){
    return (
        <Navbar 
            className='bg-[#ECE8DD]'
            position='static' > 
                <NavbarBrand>
                    <Link href='/'>
                       <Home/>
                    </Link>
                </NavbarBrand>
        {title}  
        </Navbar>
    )
}