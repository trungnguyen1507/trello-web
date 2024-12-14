import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Board from '~/pages/Boards/BoardDetail'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards'
import { history } from './helpers'
import { path } from '~/utils/constants'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to={path.login} replace={true} />
  return <Outlet />
}

const PublicRoute = ({ user }) => {
  if (user) return <Navigate to={path.boards} replace={true} />
  return <Outlet />
}

function App() {
  history.navigate = useNavigate()
  history.location = useLocation()

  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path={path.home}
        element={
          // Ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Browser
          <Navigate to={path.boards} replace={true} />
        }
      />

      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path={path.boardDetail} element={<Board />} />
        <Route path={path.boards} element={<Boards />} />

        {/* User Settings */}
        <Route path={path.accountSettings} element={<Settings />} />
        <Route path={path.securitySettings} element={<Settings />} />
      </Route>

      <Route element={<PublicRoute user={currentUser} />}>
        {/* Authentication */}
        <Route path={path.login} element={<Auth />} />
        <Route path={path.register} element={<Auth />} />
        <Route path={path.accountVerification} element={<AccountVerification />} />
      </Route>

      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
