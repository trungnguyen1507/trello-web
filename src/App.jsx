import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/BoardDetail'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

const PublicRoute = ({ user }) => {
  if (user) return <Navigate to='/boards/65af25940fb19081d2cd07b5' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path='/'
        element={
          // Ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Browser
          <Navigate to='/boards/65af25940fb19081d2cd07b5' replace={true} />
        }
      />

      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:boardId' element={<Board />} />
        <Route path='/boards' element={<Boards />} />

        {/* User Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      <Route element={<PublicRoute user={currentUser} />}>
        {/* Authentication */}
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/account/verification' element={<AccountVerification />} />
      </Route>

      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
