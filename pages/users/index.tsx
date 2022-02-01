import { Paper, Button, Table } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useUsers } from '../../services/public/user/useUsers'

const Users: NextPage = () => {
  const { data, error } = useUsers()

  if (!!error) {
    return <div>Error {JSON.stringify(error)}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  if (data.length === 0) {
    return <div>No users</div>
  }
  return (
    <Paper>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link href={{
                  pathname: '/users/[id]',
                  query: {
                    id: user.id
                  }
                }} >{user.name}
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

    </Paper>)

}

export default Users
