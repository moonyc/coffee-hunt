import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
     <Component {...pageProps} />
     <footer>
      <p>© 2023 sashacorp </p>
     </footer>
  </>)
}

export default MyApp
