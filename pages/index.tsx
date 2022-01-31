import { Button, Group } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <Group>
      <Link href={{
        pathname: '/events',
      }}>
        <Button component="a" variant="gradient" gradient={{ from: 'orange', to: 'red' }} style={{ marginTop: 14 }}>
          Go To Events
        </Button>
      </Link>
      <Link href={{
        pathname: '/users',
      }}>
        <Button component="a" variant="gradient" gradient={{ from: 'red', to: 'pink' }} style={{ marginTop: 14 }}>
          Go To Users
        </Button>
      </Link>
    </Group>
  )
}

export default Home
