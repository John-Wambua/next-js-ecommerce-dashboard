import styles from "./product-delete.module.css";
import Product from "@/app/interfaces/product";
import Button from "@mui/material/Button";
import { useFormState } from "react-dom";
import {deleteProductById} from "@/app/actions";
import {SubmitButton} from "@/app/(dashboard)/products/components/submit-button";

const initialState = {
    message: "",
    status: ""
};

export default function ProductDelete(
    {product, handleClose}:
        {
            product: Product,
            handleClose: ()=>void,
        }){

    const [state, formAction] = useFormState(deleteProductById, initialState);


    return (
        <div className={styles.container}>
            <h2>Delete Product</h2>
            <p>{product.title}</p>
            <form className={styles.actions} action={formAction}>
                <input type='hidden' name={'productId'} value={product.id}/>
                <Button
                    variant="outlined"
                    sx={{
                        "&.MuiButtonBase-root": {
                            width: "5rem"
                        }}}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <SubmitButton text={'Delete'} color={'error'}/>
            </form>
        </div>
    )
}