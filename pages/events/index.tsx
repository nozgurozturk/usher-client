import type { NextPage, NextPageContext } from 'next'
import { SWRConfig } from 'swr'
import { EventList } from '../../components/EventList/EventList'
import { getEvents } from './useEvents'

type FB = {
    [key:string]: any
}
interface Props {
    fallback: FB
}

const Events: NextPage<Props> = ({fallback}) => {

  return (
      <SWRConfig value={{fallback}}>
          <EventList />
      </SWRConfig>
  )
}
export async function getServerSideProps(context:NextPageContext) {
    const path = '/api/v1/events'
    const events = await getEvents(path)
    return {
      props: {
        fallback: {
          [path]: events
        }
      }
    }
  }

export default Events
