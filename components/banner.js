import styles from './banner.module.css'

export default function Banner (props) {
    return( 
    <div className={styles.container}>
       <h1 className={styles.title}>
          <span className={styles.title1}>Coffee</span> 
          <span className={styles.title2}> Hunt</span>
        </h1>
       <p className={styles.subtitle}>Discover yout local coffee shops!</p>
       <button 
       className={styles.button}
       onClick={props.handleOnClick}
       >{props.buttonText}</button>
    </div>
)
}