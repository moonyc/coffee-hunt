import styles from './banner.module.css'

export default function Banner (props) {
    return( 
    <div className={styles.container}>
       <h1 className={styles.title}>
          SILVESTRO'S
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
)
}