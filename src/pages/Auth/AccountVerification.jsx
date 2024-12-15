import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { path } from '~/utils/constants'

function AccountVerification() {
  // Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])

  // Tạo 1 biến state để biết được đã verify tài khoản thành công hay chưa
  const [verified, setVerified] = useState(false)

  // Gọi API để verify tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  // Nếu URL có vấn đề, không tồn tại 1 trong 2 email và token thì đá ra trang 404
  if (!email || !token) {
    return <Navigate to='/404' />
  }

  // Nếu chưa verify xong thì hiện loading
  if (!verified) {
    return <PageLoadingSpinner caption='Verifying your account...' />
  }

  // Verify thành công điều hướng về trang login với verifiedEmail
  return <Navigate to={`${path.login}?verifiedEmail=${email}`} />
}

export default AccountVerification
