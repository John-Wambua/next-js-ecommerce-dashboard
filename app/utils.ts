import Product from "@/app/interfaces/product";

export async function getProducts(){
    const res = await fetch('https://fakestoreapi.com/products')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json() as Array<Product>
}
export async function getProductCategories(){
    const res = await fetch('https://fakestoreapi.com/products/categories')

    if (!res.ok) {
        throw new Error('Failed to fetch categories')
    }

    return await res.json() as Array<string>
}
export async function getProductById(id: number){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json() as Product
}