import { FC, useState } from 'react';
import { Group, Collapse, Text, Button, Table, ThemeIcon, ActionIcon } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconLayoutList } from '@tabler/icons';
import Link from 'next/link';
import { useLayouts } from '../../pages/admin/layouts/useLayouts';

interface LayoutListItemProps {
    id: string
    name: string

}

const LayoutListItem: FC<LayoutListItemProps> = ({ id, name }) => {

    return (
        <tr key={id}>
            <td> <Text weight={500}>{name}</Text></td>
            <td>
                <Link href={{
                    pathname: '/admin/layouts/[id]',
                    query: {
                        id
                    }
                }}>
                    <Button component="a" variant="subtle">
                        Details
                    </Button>
                </Link>
            </td>
        </tr>

    );
}

export const LayoutList = () => {
    const { data, error } = useLayouts()
    const [opened, setOpen] = useState(false);

    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    if (data.length === 0) {
        return <div>No layouts found</div>
    }
    return (
        <Group direction="column" grow>
            <Group position="apart" >
                <Group noWrap>
                    <ThemeIcon>
                        <IconLayoutList />
                    </ThemeIcon>
                    <Text weight={700}>Layouts</Text>
                </Group>

                <ActionIcon onClick={() => setOpen((prev) => !prev)}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </Group>
            <Collapse in={opened}>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{data.map(e => <LayoutListItem key={e.id} {...e} />)}</tbody>
                </Table>
            </Collapse>
        </Group>
    );
}
