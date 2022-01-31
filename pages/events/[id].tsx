import { Container } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'


const EventDetail: NextPage = () => {
    const {query} = useRouter()
  return (
    
      <div>
        {query.id}
      </div>
    
  )
}

export default EventDetail
