import React from "react"
import { PreviewAlert } from "components/preview-alert"
import Header from "./Header/Header"
import { Footer } from "components/Footer/Footer"
import Newsletter from "./Newsletter/Newsletter"

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <Header />
      <div className="mx-auto">
        <main className="container-xxl py-auto">{children}</main>
      </div>
      <Newsletter />
      <Footer />
    </>
  )
}
