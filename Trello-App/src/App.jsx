import Board from '~/pages/Boards/_id'
import {Routes, Route, Navigate} from 'react-router-dom'
import Notfound from './pages/404/Notfound'
import Auth from './pages/Auth/Auth'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards/687b8f1633496ea77eb074a5' replace={true} />} />
      <Route path='/boards/:boardId' element={<Board/>}/>
      <Route path='*' element={<Notfound />} />

{      /* Authentication Routes */
}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
    </Routes>
  )
}

export default App
