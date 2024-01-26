"use client"
import { signIn } from "next-auth/react"
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginButton(){
    return (
        <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            color={"error"}
            sx={{
                "&.MuiButtonBase-root": {
                    textTransform: "none"
                }
            }}
            onClick={()=>signIn('google', { callbackUrl: 'http://localhost:3000/' })}
        >
            Sign In with Google
        </Button>
    )
}