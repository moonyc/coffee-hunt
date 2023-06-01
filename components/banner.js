
import styles from './banner.module.css'

export default function Banner (props) {
    return( 
    <div className={styles.container}>

    {/* Title */}
      
      <h1 className={styles.title}>
      <span className={styles.title1}>
          SILVESTRO&apos;S
      </span>
      <span className={styles.title2}>
          <strong className={styles.strong}>TRAVEL GUIDE</strong>
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
)
}