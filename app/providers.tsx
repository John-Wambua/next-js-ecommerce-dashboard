'use client'

import { SnackbarProvider } from 'notistack'
import StoreProvider from "@/app/store-provider";
import { SessionProvider } from "next-auth/react"
import React from "react";

export  function Providers({children}: {children: React.ReactNode}){
    return (
        <SessionProvider>
            <SnackbarProvider>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </SnackbarProvider>
        </SessionProvider>
    )
}