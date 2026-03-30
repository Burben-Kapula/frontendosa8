// library-frontend/src/components/Books.jsx
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS)

  if (loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
