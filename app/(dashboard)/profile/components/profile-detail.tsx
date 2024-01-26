"use client"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./profile-detail.module.css";
import { useSession, signOut } from "next-auth/react"


export default function ProfileDetail(){
    const { data: session, status } = useSession()

    return (
        <div className={styles.container}>
            {status === 'authenticated' &&
                <>
                    <Avatar
                        alt={session?.user?.name??"user image"}
                        src={session?.user?.image??""}
                        sx={{width: 100, height: 100}}
                    />
                    <h1>{session?.user?.name}</h1>
                    <p>{session?.user?.email}</p>
                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        color={"error"}
                        sx={{
                            "&.MuiButtonBase-root": {
                                textTransform: "none",
                                width: "max-content"
                            }
                        }}
                        onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/login' })}
                    >
                        Logout
                    </Button>
                </>
            }
        </div>
    )
}