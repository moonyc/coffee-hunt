import Head from 'next/head'

import Banner from '../components/banner'
import styles from '../styles/Home.module.css'

export default function Home() {
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
        
        <Banner 
            buttonText="View stores nearby" 
            handleOnClick={handleBannerOnClick}
        />
        
        
      </main>
    </div>
  )
}
