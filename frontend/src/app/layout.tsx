import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Score App',
  description: 'Chấm điểm bài viết',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
