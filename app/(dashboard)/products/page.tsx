import ProductsList from "./components/products-list";
import {getProductCategories, getProducts} from "@/app/utils";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/authOptions";

export default async function ProductsPage(){
    const products = await getProducts();
    const categories = await getProductCategories();
    const session = await getServerSession(authOptions as any);
   if (!session){
       redirect("/login")
   }

    return (
        <ProductsList products={products} categories={categories}/>
    )
}