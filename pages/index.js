import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '../components/card'
import coffeeStores from '../data/coffee-stores.json'

export default function Home() {
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

 
  const handleBannerOnClick = () => {
    console.log('hi, banner button')
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
            buttonText="View stores nearby" 
            handleOnClick={handleBannerOnClick}
        />
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
        <section className={styles.cardLayout}>
          {coffeeStores.map(({id, name, imgUrl, websiteUrl, address, neighbourhood}) => {
          
           return (
            <Card 
            key={id}
           name={name}
           imgUrl={imgUrl}
           href= {`/coffee-store/${id}`}
           address={address}
           neighbourhood={neighbourhood}
           className={styles.card}
          />
          )})}
        </section>
      </main>
    </div>
  )
}
