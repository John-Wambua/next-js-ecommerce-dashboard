'use server'

import {redirect} from "next/navigation";

export async function addProduct(prevState: { message: string, status: string }, formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        price: formData.get('price'),
        description: formData.get('description'),
        image: formData.get('image'),
        category: formData.get('category'),
    }
    const res = await fetch('https://fakestoreapi.com/products',{
        method:"POST",
        body:JSON.stringify(rawFormData)
    })
    if (!res.ok){
        return {message: 'Failed to add product', status: 'fail'}
    }
    return {message: 'Product added successfully', status: 'success'}
}
export async function updateProduct(prevState: { message: string, status: string }, formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        price: formData.get('price'),
        description: formData.get('description'),
        image: formData.get('image'),
        category: formData.get('category'),
    }
    const res = await fetch(`https://fakestoreapi.com/products/${formData.get('productId')}`,{
        method:"PUT",
        body:JSON.stringify(rawFormData)
    })
    if (!res.ok){
        return {message: 'Failed to update product', status: 'fail'}
    }
    return {message: 'Product updated successfully', status: 'success'}
}
export async function deleteProductById(prevState: { message: string, status: string }, formData: FormData) {
    const id =  formData.get('productId');
    const res = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method:"DELETE",
    })
    if (!res.ok){
        return {message: 'Failed to delete product', status: 'fail'}
    }
    redirect(`/products`)
    return {message: 'Product deleted successfully', status: 'success'}
}
