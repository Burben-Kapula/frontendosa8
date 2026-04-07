import { useState, useEffect } from 'react' // ДОДАЙ ЦЕЙ РЯДОК
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries' // Спробуй додати .js або перевір, чи немає там папки graphql
const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => { 
      // Додамо перевірку, щоб не "падало", якщо помилка пуста
      console.log(error.graphQLErrors[0]?.message || error.message) 
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data, setToken]) // Додаємо залежності для useEffect

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm