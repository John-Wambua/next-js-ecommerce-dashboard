"use client"
import React, {useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from '@mui/material/Slider';
import styles from "./product-filter.module.css"
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectFilterCategories, setFilterCategories} from "@/lib/features/filtersSlice";

function valuetext(value: number) {
    return `$${value}`;
}
const minPrice = 10;


export default function ProductFilter({handleClose, categories}:{handleClose: ()=>void, categories: Array<string>}){
    const [price, setPrice] = React.useState<number[]>([20, 37]);
    const filteredCategories: Array<string> = useAppSelector(selectFilterCategories);
    const dispatch = useAppDispatch();
    const initialCategoryState = {} as {[x: string]: boolean};
    categories.forEach(cat=>{
        initialCategoryState[cat] = filteredCategories.includes(cat);
    })
    const falseState = {} as {[x: string]: boolean};
    categories.forEach(cat=>{
        falseState[cat] = false;
    })

    const [checked, setChecked] = useState(initialCategoryState);
    const [allChecked, setAllChecked] = useState(filteredCategories.length===0);
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, category: string)=>{
        if (e.target.checked){
            setAllChecked(false);
        }
        setChecked(prevState => ({...prevState, [category]: e.target.checked}))
    }
    const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked){
            setChecked(falseState);
        }
        setAllChecked(e.target.checked);
    }

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minPrice), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minPrice)]);
        }
    };

    const onApplyFilters = ()=>{
        const filteredByValue = Object.fromEntries(
            Object.entries(checked).filter(([key, value]) => value === true) );
        //@ts-ignore
        dispatch(setFilterCategories(Object.keys(filteredByValue)));

        handleClose();
    }
    const onResetFilters = ()=>{
        //@ts-ignore
        dispatch(setFilterCategories([]));
        setChecked(falseState)
        handleClose();
    }

    return (
        <div className={styles.container}>
            <div className={styles.close} onClick={handleClose}>
                <CloseIcon fontSize={"small"}/>
            </div>
            <p>Category</p>
            <FormControlLabel control={<Checkbox checked={allChecked} onChange={handleAllChecked} />} label={"All Products"} />
            {categories.map(category=>(
                <FormControlLabel key={category} control={<Checkbox checked={checked[category]} onChange={(e)=>handleChecked(e,category)} />} label={category} />
            ))}
            <hr />
            <p>Price</p>
            <Slider
                getAriaLabel={() => 'Minimum price'}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            />
            <div className={styles.actions}>
                <Button
                    variant="outlined"
                    sx={{
                        "&.MuiButtonBase-root": {
                            border: '1px solid #a6a7b0',
                            color: "#505C6E",
                            width: "5rem",
                            textTransform: "none"
                        }
                    }}
                    onClick={onResetFilters}
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        "&.MuiButtonBase-root": {
                            width: "5rem",
                            textTransform: "none"
                        }
                    }}
                    onClick={onApplyFilters}
                >
                    Apply
                </Button>
            </div>
        </div>
    )
}