/* Components */
import { Providers } from '../lib/providers'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>

            <main className={styles.main}>{props.children}</main>

          </section>
        </body>
      </html>
    </Providers>
  )
}
