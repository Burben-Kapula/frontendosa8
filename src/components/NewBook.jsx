// library-frontend/src/components/NewBook.jsx
import { useState } from 'react'
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(CREATE_BOOK, {
  refetchQueries: [ 
    { query: ALL_BOOKS, variables: { genre: null } }, // Оновити "all genres"
    // Якщо ви хочете бути дуже прискіпливими, можна додати запит ME, 
    // але зазвичай достатньо оновлення загального списку
  ],
  onError: (error) => {
    console.log(error.graphQLErrors[0].message)
  }
})
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS }
    ]
  })

  const submit = async (event) => {
    event.preventDefault()
    await createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (!genre) return
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={e => setPublished(e.target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
          <button type="button" onClick={addGenre}>add genre</button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
