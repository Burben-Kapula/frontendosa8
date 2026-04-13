import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS } from './queries' 
import { useQuery } from '@apollo/client/react'
import { useApolloClient } from '@apollo/client/react'

//компоненти
import NewBook from './components/NewBook' // Назва файлу без .jsx
import Books from './components/Books' // Назва файлу без .jsx
import Authors from './components/Authors' // Назва файлу без .jsx
import Recommendations from './components/Recommendations' // Новий компонент
const App = () => {
  // 1. Стан токена (зчитуємо з localStorage при першому рендері)
  const [page, setPage] = useState('authors') // за замовчуванням показуємо авторів
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
  
      <div>
          <nav>
            <button onClick={() => setPage('authors')}>Authors</button>
            <button onClick={() => setPage('books')}>Books</button>
            <button onClick={() => setPage('add')}>Add Book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>            
            <button onClick={logout}>Logout</button>
          </nav>

          <h1>Library App</h1>

          {/* Рендеримо ТІЛЬКИ компоненти. Вони самі знають, що показувати */}
          {page === 'authors' && <Authors />} 
          {page === 'books' && <Books />}
          {page === 'add' && <NewBook />}
          {/* Нова сторінка рекомендацій */}
          {page === 'recommend' && <Recommendations />}
        </div>

      
      {/* Навігація залишається зверху */}


      {page === 'authors' && (
        <div>
          {/* Тут буде твій список авторів */}
        </div>
      )}

      {page === 'books' && (
        <div>
          <ul>
            {result.data.allBooks.map(b => (
              <li key={b.id}><strong>{b.title}</strong> by {b.author.name}</li>
            ))}
          </ul>
        </div>
      )}

      {page === 'add' && (
        <div>
          {/* Тут буде твоя форма додавання книги */}
        </div>
      )}
    </div>
  )
}

export default App