import styles from "./page.module.css"
import LoginButton from "@/app/login/components/login-button";
export default function Login(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.overlay}>
                        <h1>Hello Admin.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Curabitur et est sed felis aliquet sollicitudin
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <h5>Login</h5>
                    <LoginButton/>
                </div>
            </div>
        </div>
    )
}