import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS } from './queries' 
import { useQuery } from '@apollo/client/react'
import { useApolloClient } from '@apollo/client/react'
const App = () => {
  // 1. Стан токена (зчитуємо з localStorage при першому рендері)
  const [token, setToken] = useState(() => 
    localStorage.getItem('phonenumbers-user-token')
  )
  
  const client = useApolloClient()

  // 2. Запит даних (виконується автоматично)
  const result = useQuery(ALL_BOOKS)

  // 3. Функція виходу
  const logout = async () => {
    setToken(null)
    localStorage.removeItem('phonenumbers-user-token')
    // Очищаємо кеш Apollo, щоб видалити приватні дані
    await client.resetStore() 
  }

  // 4. Функція після успішного логіну
  const onLogin = (newToken) => {
    setToken(newToken)
    localStorage.setItem('phonenumbers-user-token', newToken)
  }

  // 5. Стан завантаження (якщо запит ще триває)
  if (result.loading) {
    return <div>loading...</div>
  }

  // 6. Якщо користувач не залогінений — показуємо форму входу
  if (!token) {
    return (
      <div>
        <h2>Login to use the application</h2>
        <LoginForm setToken={onLogin} />
      </div>
    )
  }

  // 7. Основний контент для авторизованого користувача
  return (
    <div>
      <nav style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '5px' }}>
        <button onClick={() => console.log('Show Authors')}>Authors</button>
        <button onClick={() => console.log('Show Books')}>Books</button>
        <button onClick={() => console.log('Show Add Book')}>Add Book</button>
        <button onClick={logout} style={{ marginLeft: '20px', color: 'red' }}>Logout</button>
      </nav>

      <h1>Library App</h1>
      
      <div>
        <h3>Books in database:</h3>
        <ul>
          {result.data.allBooks.map(b => (
            <li key={b.id}>
              <strong>{b.title}</strong> by {b.author.name} ({b.published})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App