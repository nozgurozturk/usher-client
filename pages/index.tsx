import { Button, Group, Center } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
      <Center>
    <Group>
      <Link href={{
        pathname: '/events',
      }}>
        <Button component="a" variant="gradient" gradient={{ from: 'orange', to: 'red' }} style={{ marginTop: 14 }}>
          Events
        </Button>
      </Link>
      <Link href={{
        pathname: '/users',
      }}>
        <Button component="a" variant="gradient" gradient={{ from: 'red', to: 'pink' }} style={{ marginTop: 14 }}>
          Users
        </Button>
      </Link>
      <Link href={{
        pathname: '/admin',
      }}>
        <Button component="a" variant="gradient" gradient={{ from: 'pink', to: 'grape' }} style={{ marginTop: 14 }}>
          Admin Dashboard
        </Button>
      </Link>
    </Group>
      </Center>
  )
}

export default Home
