import { useRouter } from 'next/router'
import Link from "next/link"
import styles from '../../styles/CoffeeStore.module.css'
import Head from 'next/head'
import Image from 'next/image'

import cls from 'classnames'

import coffeeStoresData from '../../data/coffee-stores.json'
import { fetchCoffeeStore } from '../../lib/coffee-stores'


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStore()
    return {
        props: {
            coffeeStore : coffeeStores.find((coffeeStore) => {
                return coffeeStore.fsq_id.toString() === params.id
            })
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStore()
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString(),
            }
        }
    })
  return {
    paths,
    fallback: true
  }
}

export default function CoffeeStore (props) {
    const router = useRouter()
    if(router.isFallback) {
        return <div>Loading</div>
    }

    // Coffee store props
    const { location, name, imgUrl } = props.coffeeStore;
    
    const handleUpvoteButton = () => {}
    return (
        <div className={styles.layout}>
           <Head>
            <title>{name}</title>
           </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            Back to home
                        </Link>
                    </div>

                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>
                            {name}
                        </h1>
                    </div>
                    <Image
                       src={imgUrl || '/static/cat.webp'}
                       width={600}
                       height={360}
                       className={styles.storeImg}
                       alt={name} 
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    {(location.address || location.formatted_address) && (
                    <div className={styles.iconWrapper}>
                        <Image 
                             src="/static/icons/places.svg"
                             width="24"
                             height="24"
                        />
                        <p className={styles.text}>{location.address || location.formatted_address}</p>
                    </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/static/icons/nearMe.svg"
                            width="24"
                            height="24"
                        />
                        <p className={styles.text}>{location.locality} {location.cross_street}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/static/icons/star.svg"
                            width="24"
                            height="24"
                        />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                        Up 
                    </button>
                </div>
            </div>
        </div>
    )
}