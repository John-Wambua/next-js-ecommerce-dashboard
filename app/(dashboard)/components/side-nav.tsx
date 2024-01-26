"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./side-nav.module.css"
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import {signOut, useSession} from "next-auth/react"


const drawerWidth = 240;

export default function SideNav({children}: {children: React.ReactNode}) {
    const { data: session, status } = useSession()

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/*(theme) => theme.zIndex.drawer */}
            <AppBar position="fixed" sx={{ zIndex:  1, bgcolor: '#FFFFFF', color: '#800080' }}>
                <Toolbar>
                    <div className={styles.toolbar}>
                        <Link href={'/'}>
                            <h1>Dashboard</h1>
                        </Link>
                        {status==='authenticated'&&session?.user?.image&&<Link href='/profile'>
                            <div className={styles.icon}>
                                <span>
                                    <p>{session?.user?.name} </p>
                                    <p className={styles.email}>{session?.user?.email} </p>
                                </span>
                                <Avatar alt={session?.user?.name??"user image"} src={session?.user?.image??""}/>
                            </div>
                        </Link>}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: "#800080"},
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', color: '#FFFFFF', display: "flex", flexDirection: "column" }}>
                    <List>
                        {[
                            {name: "Dashboard", link: "/", icon: <DashboardIcon />},
                            {name: "Products", link: "/products", icon: <InventoryIcon/>},
                            {name: "Profile", link: "/profile", icon: <Person2Icon/>},
                        ].map(({name, link, icon}, index) => (
                            <Link key={name}  href={link}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider light />
                    <List onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/login' })}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                     <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}