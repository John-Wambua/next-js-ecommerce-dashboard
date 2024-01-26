"use client"
import { useState } from "react";
import styles from "./products-list.module.css"
import ProductItem from "@/app/(dashboard)/products/components/product-item";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from "@mui/material/InputAdornment";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import ProductAdd from "@/app/(dashboard)/products/components/product-add";
import Modal from '@mui/material/Modal';
import ProductFilter from "@/app/(dashboard)/products/components/product-filter";
import Product from "@/app/interfaces/product";
import { useSnackbar} from 'notistack';
import {useAppSelector} from "@/app/hooks";
import {selectFilterCategories} from "@/lib/features/filtersSlice";

export default function ProductsList ({products, categories}: {products: Array<Product>, categories: Array<string>}) {
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const filterCategories: Array<string> = useAppSelector(selectFilterCategories);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleMessage = ({status, message}: {status: string|undefined, message: string|undefined})=>{
        if (status &&message){
            enqueueSnackbar(message, {variant: status==='fail'?'error':'success'})
        }
    }
    const filteredProducts = products
        .filter(product=>product.title.toLowerCase().includes(search.toLowerCase()))
        .filter(product=>filterCategories.length===0?product:filterCategories.includes(product.category));

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductAdd categories={categories} handleMessage={handleMessage} handleClose={handleClose}/>
            </Modal>
            <Modal
                open={openFilter}
                onClose={()=>setOpenFilter(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductFilter categories={categories} handleClose={()=>setOpenFilter(false)}/>
            </Modal>
            <main className={styles.container}>
                <section className={styles.actions}>
                    <div className={styles.actionItems}>
                        <p>Products: {filteredProducts.length.toLocaleString()}</p>
                        <TextField
                            id="outlined-basic"
                            placeholder={'Search item...'}
                            size="small"
                            variant="outlined"
                            value={search}
                            onChange={e=>setSearch(e.target.value)}
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: "0.9rem",
                                    fontSize: '14px'
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize={"small"}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="outlined" size={"small"} sx={{
                            "&.MuiButtonBase-root": {
                                border: '1px solid #a6a7b0',
                                color: "#505C6E",
                                textTransform: "none"
                            }
                        }}
                                startIcon={<FilterListIcon />}
                                onClick={()=>setOpenFilter(true)}
                        >
                            Filter
                        </Button>
                    </div>
                    <div className={styles.actionItems}>
                        <Button
                            variant="outlined"
                            size={"small"}
                            startIcon={<ControlPointIcon />}
                            sx={{
                                "&.MuiButtonBase-root": {
                                    border: '1px solid #a6a7b0',
                                    color: "#505C6E",
                                    textTransform: "none"
                                }
                            }}
                            onClick={handleOpen}
                        >
                            Add Item
                        </Button>
                    </div>
                </section>
                <section className={styles.products}>
                    {filteredProducts.map(product=>(<ProductItem key={product.id} product={product}/>))}
                </section>
            </main>
        </>
    )
}