import { useRouter } from 'next/router'
import Link from "next/link"
import styles from '../../styles/CoffeeStore.module.css'

export default function CoffeeStore () {
    const router = useRouter()
    console.log('router', router)
    return (
        <div className={styles.container}>
           <main className={styles.main}>
           <h1>Coffee Store Page {router.query.id}</h1>
            <Link href="/">
                Back to home
            </Link>
            <Link href="/coffee-store/dynamic">
                Go to a dynamic page
            </Link>
           </main>
        </div>
    )
}