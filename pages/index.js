import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '../components/card'
import { fetchCoffeeStore } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import { useEffect, useState, useContext } from 'react'
import { ACTION_TYPES, StoreContext } from './_app'

// SSG

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStore()

  return {
    props: {
      coffeeStores,
    }
  }
}


export default function Home(props) {
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const { handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation()

  // const [coffeeStores, setCoffeeStores] = useState(props.coffeeStores)
  const [coffeeStoresError, setCoffeeStoresError] = useState("")

  const { dispatch, state } = useContext(StoreContext)

  const {coffeeStores, latLong} = state
 
  useEffect(() => {
     async function setCoffeeStoresByLocation () {
      if(latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStore(latLong, 30, "cafe")
          //setCoffeeStores(fetchedCoffeeStores)
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores
            }
          })
        } catch (error) {
          setCoffeeStoresError(error.msg)
        }
       }
  }
  setCoffeeStoresByLocation()

}, [latLong])

  const handleBannerOnClick = () => {
   
    handleTrackLocation()
    
  }

 
  return (
    <div className={styles.container}>
      <Head>
        <title>Silvestro</title>
        <meta name="description" content="First nextjs application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <section className={styles.welcomeSectionContainer}>
        <div className={styles.bannerContainer}>
        <Banner 
            buttonText={isFindingLocation ? `Locating...` : `View stores nearby`}
            handleOnClick={handleBannerOnClick}
        />
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        </div>
        
        {/* Hero  */}
       { matchesLG &&
        <div className={styles.heroContainer}>
        <div className={styles.heroImage}>
        <Image src="/static/hero.png" width={600} height={600} alt="hero" priority/>
        </div>
      </div>}
        </section>
        {/* Cards */}
        <div className={styles.sectionWrapper}>
        {coffeeStores.length > 0 && (
          <>
            <div className={styles.secondHeadingContainer}>
            <h2 className={styles.heading2}>{"Stores near you"}</h2>
            </div>
           
            <section className={styles.cardLayout}>
          {coffeeStores.map(({id, name, imgUrl, address, locality}) => {
          
           return (
            <Card 
            key={id}
           name={name}
           imgUrl={ imgUrl }
           href= {`/coffee-store/${id}`}
           address={address}
           neighbourhood={locality}
           className={styles.card}
          />
          )})}
        </section>
          </>
        )}
        </div>
        {/* Cards Static*/}
        <div className={styles.sectionWrapper}>
        {props.coffeeStores.length > 0 && (
          <>
            <div className={styles.secondHeadingContainer}>
            <h2 className={styles.heading2}>{"Manhattan stores"}</h2>
            </div>
           
            <section className={styles.cardLayout}>
          {props.coffeeStores.map(({id, name, imgUrl, address, locality}) => {
          
           return (
            <Card 
            key={id}
           name={name}
           imgUrl={ imgUrl }
           href= {`/coffee-store/${id}`}
           address={address}
           neighbourhood={locality}
           className={styles.card}
          />
          )})}
        </section>
          </>
        )}
        </div>
      </main>
    </div>
  )
}
