
import { Auth } from './components/Auth/Auth'
import { Subreddit } from './components/Subreddit/Subreddit'

export default function IndexPage() {
  return <>
    <Auth/>
    <Subreddit/>
  </>
}

export const metadata = {
  title: '99 co Test',
}
