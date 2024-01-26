import styles from "./page.module.css";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions as any);
    if (!session){
        redirect("/login")
    }
  return (
    <main className={styles.main}>
      Hey!
    </main>
  );
}
