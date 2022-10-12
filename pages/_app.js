import '../styles/globals.css'
import {Fragment} from 'react'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return <Fragment>
      <Header/>
      <Component {...pageProps} />
    </Fragment>
}

export default MyApp
