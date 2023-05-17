import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'


export default function Home() {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

 
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
       { matchesMD &&
        <div className={styles.heroContainer}>
      <div className={styles.heroImage}>
        <Image src="/static/hero.png" width={500} height={500} alt="hero" priority/>
        </div>
      </div>}
        </section>
      </main>
    </div>
  )
}
