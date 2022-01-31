import { Center, Container } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Event } from '../../components/Event/Event'
import { Layout } from '../../components/Layout/Layout'
import { Seat } from '../../components/Layout/Seat'
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

  const  { location, ...event } = data

  return (
    <>
    <Event {...event} />
    <Center>
      <Layout hall={location} />
    </Center>
    </>

  )
}

export default EventDetail
