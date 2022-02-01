import { Container } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../../components/Layout/Layout'
import { useLayout } from '../../../services/admin/layout/useLayout'



const EventDetail: NextPage = () => {
    const { query } = useRouter()
    const { data, error } = useLayout(query.id as string)
    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <Container>
            <Layout hall={data} />
        </Container>

    )
}

export default EventDetail
