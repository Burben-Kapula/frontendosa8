import { useQuery } from '@apollo/client/react/index.js'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const user = userResult.data ? userResult.data.me : null
  const books = booksResult.data ? booksResult.data.allBooks : []

  // Якщо користувач не залогінений, нічого не показуємо
  if (!user) {
    return <div>Please log in to see recommendations.</div>
  }

  const favoriteGenre = user.favoriteGenre
  const recommendedBooks = books.filter(b => 
    b.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map((b) => (
            <tr key={b.title}>
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

export default Recommendations