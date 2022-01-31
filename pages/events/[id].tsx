import { Center, Container, Group, Paper } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Event } from '../../components/Event/Event'
import { Layout } from '../../components/Layout/Layout'
import { ReservationForm } from '../../components/ReservationForm/ReservationForm'
import { useEvent } from './useEvent'


const EventDetail: NextPage = () => {
  const { query } = useRouter()
  const { data, error } = useEvent(query.id as string)
  if (!!error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const { location, ...event } = data

  return (
    <Container>
      <Event {...event} />
        <Group mt="lg" spacing="lg" align="flex-start" grow>
          <Layout hall={location} />
          <Paper padding="lg" mt="xl" ml="xl" radius="lg">
            <ReservationForm />
          </Paper>
        </Group>
      
    </Container>

  )
}

export default EventDetail
