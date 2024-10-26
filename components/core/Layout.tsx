"use client"
import React from 'react'
import { Navbar } from '../custom/navbar'
import { usePathname } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname()
    console.log(pathName)
    return (
        <div className="flex flex-col h-full">
            {
                pathName !== "/workflow" && <Navbar />
            }
            <div className=" grow overflow-y-auto">{children}</div>
        </div>
    )
}

export default Layout