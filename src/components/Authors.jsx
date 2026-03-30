// library-frontend/src/components/Authors.jsx
// src/components/Authors.jsx
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from '../queries'

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS)

  if (loading) return <div>loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
