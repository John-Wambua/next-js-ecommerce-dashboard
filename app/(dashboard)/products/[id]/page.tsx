import {getProductById, getProductCategories} from "@/app/utils";
import ProductDetail from "@/app/(dashboard)/products/components/product-detail";

export default async function ProductITem({ params }: { params: { id: string } }){
    const product = await getProductById(+params.id);
    const categories = await getProductCategories();
    return (
        <ProductDetail categories={categories} product={product}/>
    )
}