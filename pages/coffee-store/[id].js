import { useRouter } from 'next/router'
import Link from "next/link"
import styles from '../../styles/CoffeeStore.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

import cls from 'classnames'

import { fetchCoffeeStore } from '../../lib/coffee-stores'
import { StoreContext } from '../../store/store-context'
import { fetcher, isEmpty } from '../../utils'

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    
    const coffeeStores = await fetchCoffeeStore()
    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id
    })
    return {
        props: {
            coffeeStore : findCoffeeStoreById ? findCoffeeStoreById : {},
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStore()
    const paths = coffeeStores.map((coffeeStore) => {
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

export default function CoffeeStore (initialProps) {
    const router = useRouter()
    // if(router.isFallback) {
    //     return <div>Loading</div>
    // } 

    // Coffee store props
    const id = router.query.id

    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore || {})
    const [voting, setVoting] = useState(0)
    const { state: { coffeeStores }, } = useContext(StoreContext) 
    



    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, address, formattedAddress, locality, crossStreet, imgUrl, voting} = coffeeStore
            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    address,
                    formattedAddress,
                    locality,
                    crossStreet,
                    imgUrl,
                    voting: 0
                })
            })
            
            const dbCoffeeStore = await response.json()
            
            
        } catch (err) {
            console.error("Couldn't create a coffee store", err)
        }
    }

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if ( coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id
                })
                setCoffeeStore(findCoffeeStoreById)
                
            }
        } 
    }, [id, initialProps.coffeeStore, coffeeStores])

    const { name , address, formattedAddress, locality, crossStreet, imgUrl } = coffeeStore;

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)
    useEffect(() => {
        if(data && data.length > 0) {
            console.log("Data from SWR:", data)
            setCoffeeStore(data[0])
            setVoting(data[0].voting)
        }
    }, [data])
    
    const handleAddToDBButton = () => {
        if (isEmpty(initialProps.coffeeStore)) {
            if ( coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id
                })
                
                handleCreateCoffeeStore(findCoffeeStoreById)
                
            }
        } else {
            handleCreateCoffeeStore(initialProps.coffeeStore)
        }
        
    }

    const handleUpVoteButton = async () => {
        try {
            const response = await fetch("/api/favoriteCoffeeStoreById", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            })

            const dbCoffeeStore = await response.json()

            if (dbCoffeeStore && (dbCoffeeStore.length > 0)) {
                
                return setVoting(voting + 1)
            }
        } catch (error) {
            console.log("Error upvoting the coffee store", error)
        }
    }

    if (error) {
        return <div> Something went wrong while trying to retrieve the coffee store page.</div>
    }
    return (
        <div className={styles.layout}>
           <Head>
            <title>{name}</title>
           </Head>
           <div className={styles.titleAndBackToHomeWrapper}>
           <div className={styles.backToHomeLink}>
                        <Link href="/">
                         ← Back to home
                        </Link>
                    </div>

                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>
                            {name}
                        </h1>
                    </div>
           </div>
            <div className={styles.container}>
                <div className={styles.col1}>
                    
                    <Image
                       src={imgUrl || '/static/cat.webp'}
                       width={600}
                       height={360}
                       className={styles.storeImg}
                       alt={name || 'name'}  
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    
                    {(address|| formattedAddress) && (
                    <div className={styles.iconWrapper}>
                        <Image 
                             src="/static/icons/places.svg"
                             width="24"
                             height="24"
                             alt='address'
                        />
                        <p className={styles.text}>{address|| formattedAddress}</p>
                    </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/static/icons/nearMe.svg"
                            width="24"
                            height="24"
                            alt="near me"
                        />
                        <p className={styles.text}>{locality} {crossStreet}</p>
                    </div>
                    <div className={styles.iconWrapperVoting}>
                        <Image 
                            src="/static/icons/star.svg"
                            width="24"
                            height="24"
                            alt="vote"
                        />
                        <p className={styles.text}>{voting}</p>
                        <div className={styles.buttonGroup}>
                          <button className={styles.buttonUpDown} onClick={handleUpVoteButton}> ↑ </button>
                          {/* <button className={styles.buttonUpDown} onClick={() =>  voting > 0 ? setVoting(voting - 1) : null }> ↓  </button> */}
                        </div>
                    </div>
                    <button className={styles.button} onClick={handleAddToDBButton}>
                        Start Voting!
                    </button>
                </div>
            </div>
        </div>
    )
}