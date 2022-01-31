import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { EventList } from '../components/EventList/EventList'

const Home: NextPage = () => {

  return (
    
    <Link href={{
      pathname: '/events',
  }}>
      <Button component="a" variant="gradient" gradient={{ from: 'orange', to: 'red' }} style={{ marginTop: 14 }}>
          Go To Events
      </Button>
  </Link>
  )
}

export default Home
