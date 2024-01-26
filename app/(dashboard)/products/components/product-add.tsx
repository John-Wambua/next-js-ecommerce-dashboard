"use client"

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import styles from "./product-add.module.css";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormState } from "react-dom";
import {addProduct} from "@/app/actions";
import {useEffect} from "react";
import {SubmitButton} from "@/app/(dashboard)/products/components/submit-button";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    name: 'image',
    id: 'image',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const initialState = {
    message: "",
    status: ""
};
export default function ProductAdd (
    {handleClose, handleMessage, categories}:
        {
            handleClose: ()=>void,
            handleMessage: ({status, message}: {status: string|undefined, message:string|undefined})=>void,
            categories: Array<string>
        }
) {
    const [state, formAction] = useFormState(addProduct, initialState);
    
    useEffect(()=>{
        if (state?.message){
            handleMessage({status: state?.status, message: state?.message})
            handleClose();
        }
    }, [handleClose, handleMessage, state])
    return (
        <form className={styles.container} action={formAction}>
            <h1 style={{alignSelf: "center"}}>Add New Product</h1>
            <label htmlFor="title">Title</label>
            <TextField id="title" required variant="outlined" name={'title'} size={"small"}/>
            <label htmlFor="description">Description</label>
            <TextareaAutosize id="description" required name={'description'} minRows={4} />
            <label htmlFor="category">Category</label>
            <TextField
                id="category"
                select
                defaultValue="electronics"
                size={"small"}
                required
                name={'category'}
            >
                {categories.map(category=>(
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
            <label htmlFor="price">Price</label>
            <TextField
                id="price"
                size={"small"}
                type={"number"}
                required
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name={'price'}
            />
            <label htmlFor="image">Select Image</label>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                    "&.MuiButtonBase-root": {
                        width: "max-content",
                    }
                }}
            >
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button>
            <span className={styles.actions}>
                <Button
                    variant="contained"
                    color={"warning"}
                    sx={{
                        "&.MuiButtonBase-root": {
                            width: "5rem"
                        }}}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
               <SubmitButton text={'Save'}/>
            </span>
        </form>
    )
}