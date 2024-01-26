import styles from "./product-item.module.css";
import Image from "next/image";
import ratingIcon from "@/public/icons/rating.svg";
import categoryIcon from "@/public/icons/tags.svg";
import Product from "@/app/interfaces/product";
import Link from "next/link";
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
export default function ProductItem ({product}: {product: Product}) {
    const formatTitle = (title: string, limit: number)=>{
        if (title.length > limit){
            return title.substring(0,limit)+"...";
        }
        return title;
    }
    return (
        <Link href={`/products/${product.id}`}>
            <div className={styles.container}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={80}
                    style={{alignSelf: 'center', objectFit: "contain", mixBlendMode: "darken"}}
                    height={80}
                />
                <h3>{formatter.format(product.price)}</h3>
                <p>{formatTitle(product.title, 40)}</p>
                <div className={styles.rating}>
                    <Image src={ratingIcon} width={12} height={12} alt={"rating icon"}/>
                    <p>{product.rating.rate} ({product.rating.count})</p>
                </div>
                <div className={styles.rating}>
                    <Image src={categoryIcon} width={14} height={14} alt={"category icon"}/>
                    <p style={{color: "#444444", fontSize: '13px'}}>{product.category}</p>
                </div>

            </div>
        </Link>
    )
}