// library-frontend/src/components/SetBirthyear.jsx
import { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const SetBirthyear = () => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (loading) return <div>loading...</div>

  const submit = async (event) => {
    event.preventDefault()
    if (!name) return
    await editAuthor({
      variables: { name, setBornTo: Number(born) }
    })
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <select
            value={name}
            onChange={e => setName(e.target.value)}
          >
            <option value="">select author</option>
            {data.allAuthors.map(a => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={e => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
