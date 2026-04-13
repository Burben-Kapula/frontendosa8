import { useState } from 'react'
import { useQuery } from '@apollo/client/react/index.js'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState('all genres')

  // Запит з фільтрацією на сервері
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre === 'all genres' ? null : genre }
  })

  // Запит для отримання всіх жанрів для кнопок
  const allBooksResult = useQuery(ALL_BOOKS)

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  // Отримуємо книги з результату запиту
  // Ми називаємо їх books, але в таблиці ви використовуєте filteredBooks
  const books = result.data ? result.data.allBooks : []
  
  // Щоб не переписувати JSX, просто створимо посилання:
  const filteredBooks = books 

  const genresOnly = [...new Set(allBooksResult.data.allBooks.flatMap(b => b.genres || []))]

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
          {/* Тепер filteredBooks визначено */}
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
        {genresOnly.map(g => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}
export default Books
