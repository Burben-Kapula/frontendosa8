import { useState } from 'react'
import { useQuery } from '@apollo/client/react/index.js'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data ? result.data.allBooks : []

  const genresOnly = [...new Set(books.flatMap(b => b.genres || []))]
  const allGenres = [...genresOnly, 'all genres']

  const filteredBooks = genre === 'all genres'
    ? books
    : books.filter(b => b.genres && b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      
      {genre !== 'all genres' && (
        <p>in genre <strong>{genre}</strong></p>
      )}

      <table>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b.id || b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        {allGenres.map(g => (
          <button key={g} onClick={() => setGenre(g)} style={{ marginRight: '5px' }}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books