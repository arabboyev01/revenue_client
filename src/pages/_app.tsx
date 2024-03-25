import React from 'react'
import { AppProps } from 'next/app'
import '../main.css'
import "bulma/css/bulma.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default MyApp
