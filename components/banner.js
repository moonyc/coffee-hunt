import Image from 'next/image'
import styles from './banner.module.css'

export default function Banner (props) {
    return( 
    <div className={styles.container}>

    {/* Title */}
      <div className={styles.titleContainer}>
      <h1 className={styles.title}>
          SILVESTRO'S
          <br></br>
          <span  className={styles.titleSpan}>
            TRAVEL GUIDE
          </span>
        </h1>
       <p className={styles.subTitle}>Discover the local coffee shops</p>
       <div className={styles.buttonWrapper}>
       <button 
          className={styles.button}
          onClick={props.handleOnClick}
          >
          {props.buttonText}
          </button>
       </div>
      </div>

      {/* Hero  */}
      <div className={styles.heroContainer}>
      <div className={styles.heroImage}>
        <Image src="/static/hero.png" width={500} height={500} alt="hero" priority/>
        </div>
      </div>
       
    </div>
)
}