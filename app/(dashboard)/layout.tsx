import React from "react";
import SideNav from "@/app/(dashboard)/components/side-nav";

export default function Layout({children}: {children: React.ReactNode}){
    return (
        <SideNav>
            {children}
        </SideNav>
    )
}