"use client"
import styles from "./product-detail.module.css"
import Product from "@/app/interfaces/product";
import Image from "next/image";
import {formatter} from "@/app/(dashboard)/products/components/product-item";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import ProductUpdate from "@/app/(dashboard)/products/components/product-update";
import ProductDelete from "@/app/(dashboard)/products/components/product-delete";
import backIcon from "@/public/icons/back.svg"
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";

export default function ProductDetail({product, categories}: {product: Product, categories: Array<string>}){
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleDelete = ()=>setOpenDelete(true)
    const handleUpdate = ()=>setOpenUpdate(true)
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleMessage = ({status, message}: {status: string|undefined, message: string|undefined})=>{
        if (status &&message){
            enqueueSnackbar(message, {variant: status==='fail'?'error':'success'})
        }
    }


    return (
        <>
            <Modal
                open={openUpdate}
                onClose={()=>setOpenUpdate(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductUpdate handleMessage={handleMessage} categories={categories} product={product} handleClose={()=>setOpenUpdate(false)}/>
            </Modal>
            <Modal
                open={openDelete}
                onClose={()=>setOpenDelete(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductDelete product={product} handleClose={()=>setOpenDelete(false)}/>
            </Modal>
            <section className={styles.container}>
                <Image onClick={()=>router.back()} src={backIcon} className={styles.backIcon} width={20} height={15} alt={"back button"}/>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    style={{
                        objectFit: "contain"
                    }}
                />
                <div className={styles.description}>
                    <h2>{product.title}</h2>
                    <p className={styles.price}>{formatter.format(product.price)}</p>
                    <p className={styles.text}>{product.description}</p>
                    <div className={styles.actions}>
                        <Button variant="contained" color={"error"} onClick={handleDelete}
                                sx={{
                                    "&.MuiButtonBase-root": {
                                        width: "5rem"
                                    }
                                }}
                        >
                            Delete
                        </Button>
                        <Button variant="contained" onClick={handleUpdate}
                                sx={{
                                    "&.MuiButtonBase-root": {
                                        width: "5rem"
                                    }
                                }}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}