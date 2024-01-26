'use client'

import { useFormStatus } from 'react-dom'
import Button from "@mui/material/Button";

export function SubmitButton({text, color}: {text: string, color?: 'primary'|'secondary'|'error'|'warning'}) {
    const { pending } = useFormStatus()

    return (
        <Button
            variant="contained"
            aria-disabled={pending}
            disabled={pending}
            color={color?color:'primary'}
            sx={{
                "&.MuiButtonBase-root": {
                    width: "5rem"
                }}}
            type={"submit"}
        >
            {text}
        </Button>
    )
}