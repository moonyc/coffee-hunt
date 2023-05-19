import { useRouter } from 'next/router'
import Link from "next/link"
import styles from '../../styles/CoffeeStore.module.css'
import Head from 'next/head'
import Image from 'next/image'

import cls from 'classnames'

import coffeeStoresData from '../../data/coffee-stores.json'


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore : coffeeStoresData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id
            })
        }
    }
}

export function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
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
    const { address, name, neighborhood, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {}
    return (
        <div className={styles.layout}>
           <h1>Coffee Store Page {router.query.id}</h1>
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
                       src={imgUrl}
                       width={600}
                       height={360}
                       className={styles.storeImg}
                       alt={name} 
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image 
                             src="/static/icons/places.svg"
                             width="24"
                             height="24"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/static/icons/nearMe.svg"
                            width="24"
                            height="24"
                        />
                        <p className={styles.text}>{neighborhood}</p>
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