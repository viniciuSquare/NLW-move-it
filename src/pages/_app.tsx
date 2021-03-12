import '../styles/global.css'

//context API
import { ChallengesProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return( 
    // all the application have access to this context's data
      <Component {...pageProps} />

  )
}

export default MyApp
