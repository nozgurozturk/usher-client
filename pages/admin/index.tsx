import { Container, Paper, ThemeIcon } from '@mantine/core'
import { IconLayoutList } from '@tabler/icons'
import type { NextPage } from 'next'

import { LayoutList } from '../../components/LayoutList/LayoutList'



const Admin: NextPage = () => {
    return (
        <Container>
            <Paper padding="lg" mt="xl" ml="xl" radius="lg">
                <LayoutList />
            </Paper>
        </Container>

    )
}

export default Admin
