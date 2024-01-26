"use client"
import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from '@mui/icons-material/Close';
import Product from "@/app/interfaces/product";
import styles from "./product-updates.module.css"
import {useFormState } from "react-dom";
import { updateProduct} from "@/app/actions";
import {SubmitButton} from "@/app/(dashboard)/products/components/submit-button";

const initialState = {
    message: "",
    status: ""
};
export default function ProductUpdate ({product, handleClose, handleMessage, categories}: {
    product: Product,
    handleClose: ()=>void,
    categories: Array<string>,
    handleMessage: ({status, message}: {status: string|undefined, message:string|undefined})=>void,
}) {
    const [state, formAction] = useFormState(updateProduct, initialState);

    useEffect(()=>{
        if (state?.message){
            handleMessage({status: state?.status, message: state?.message})
            handleClose();
        }
    }, [handleClose, handleMessage, state])

    return (
        <form className={styles.container} action={formAction}>
            <div className={styles.close} onClick={handleClose}>
                <CloseIcon fontSize={"small"}/>
            </div>
            <h1>Update Product</h1>
            <label htmlFor="title">Title</label>
            <TextField id="title" name={'title'} required variant="outlined" defaultValue={product.title} size={"small"}/>
            <label htmlFor="description">Description</label>
            <TextareaAutosize id="description" name={'description'} required defaultValue={product.description} minRows={4} />
            <label htmlFor="category">Category</label>
            <input type={'hidden'} defaultValue={product.id} name={'productId'}/>
            <TextField
                id="category"
                select
                defaultValue={product.category}
                size={"small"}
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
                name={'price'}
                size={"small"}
                type={"number"}
                defaultValue={product.price}
                required
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <SubmitButton text={"Update"}/>
        </form>
    )
}