import { Header } from './components/Header'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Home } from './components/Home'
import { RegisterPage } from './components/pages/RegisterPage'
import { LoginPage } from './components/pages/LoginPage'
import { UserContextProvider } from './components/UserContext'
import { CreatePost } from './components/pages/CreatePost'
import PostPage from './components/pages/PostPage'
import EditPost from './components/pages/EditPost'
import PageNotFound from './components/pages/PageNotFound'


function App() {

  return (
    <>
      <main className = 'app-main'>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route index element = {<Home />} />
            <Route path = '/login' element = {<LoginPage />} />    
            <Route path = '/register' element = {<RegisterPage />} />    
            <Route path = '/create-new-post' element = {<CreatePost />} />
            <Route path = '/post/:id' element = {<PostPage />} />
            <Route path = '/edit/:id' element = {<EditPost />} />
            <Route path='/*' element = {<PageNotFound />} />
          </Routes>
        </UserContextProvider>
      </main>
    </>
  )
}
export default App;
