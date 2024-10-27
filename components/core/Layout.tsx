"use client"
import React from 'react'
import { Navbar } from '../custom/navbar'
import { useParams, usePathname } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname()
    const params = useParams()
    console.log(pathName)
    return (
        <div className="flex flex-col h-full">
            {
                !["/workflow", `/workflow/${params?.id}`]?.includes(pathName) && <Navbar />
            }
            <div className=" grow overflow-y-auto">{children}</div>
        </div>
    )
}

export default Layout