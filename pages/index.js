import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '../components/card'
import { fetchCoffeeStore } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'

// SSG

export async function getStaticProps(context) {
  
  const coffeeStores = await fetchCoffeeStore()
  return {
    props: {
      coffeeStores: coffeeStores
    }
  }
}
export default function Home({ coffeeStores }) {
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation} = useTrackLocation()

  console.log({latLong, locationErrorMsg})
  const handleBannerOnClick = () => {
    console.log('hi, banner button')
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
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
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
        {coffeeStores.length > 0 && (
          <>
            <div className={styles.secondHeadingContainer}>
            <h2 className={styles.heading2}>Manhattan Stores</h2>
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
      </main>
    </div>
  )
}
