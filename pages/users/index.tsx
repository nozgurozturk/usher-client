import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useUsers } from './useUsers'

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
    <>
      {data.map(user => (
        <div key={user.id}>
          <Link href={{
            pathname: '/users/[id]',
            query: {
              id: user.id
            }
          }} >
            <a>{user.name}</a>
          </Link>
        </div>
      ))}
    </>)

}

export default Users
