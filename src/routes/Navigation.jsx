import { NotFound } from '../components/NotFound'
import { ProtectedRoutes } from './ProtectedRoutes'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// !URLs
import { authUrls } from './urls/authUrls'
import { chatUrls } from './urls/chatUrls'
import { accountUrls } from './urls/accountUrls'

// !Pages
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { PasswordResetPage } from '../features/auth/pages/PasswordResetPage'
import { PrivacyPolicyPage } from '../features/auth/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from '../features/auth/pages/TermsOfServicePage'
import { ChatPage } from '../features/chat/pages/ChatPage'
import { ProfilePage } from '../features/account/pages/ProfilePage'
import { SecurityPage } from '../features/account/pages/SecurityPage'
import { ChatWebSocketDemoPage } from '../features/chat/pages/ChatWebSocketDemoPage'

// !Layouts
import { AccountLayout } from '../features/account/layouts/AccountLayout'

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/' element={<Navigate to={authUrls.login} />} />
        <Route path={authUrls.login} element={<LoginPage />} />
        <Route path={authUrls.register} element={<RegisterPage />} />
        <Route path={authUrls.passwordReset} element={<PasswordResetPage />} />
        <Route path={authUrls.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={authUrls.termsOfService} element={<TermsOfServicePage />} />

        {/* Chat Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path={chatUrls.conversation} element={<ChatPage />} />
          <Route path={`${chatUrls.conversation}/:chatUuid`} element={<ChatPage />} />
          <Route path={`${chatUrls.conversation}/demo`} element={<ChatWebSocketDemoPage />} />
          {/* Nueva ruta */}
          {/* Account Routes (using AccountLayout as parent) */}
          <Route path={accountUrls.base} element={<AccountLayout />}>
            <Route index element={<Navigate to={accountUrls.profile} />} />
            <Route path={accountUrls.profile} element={<ProfilePage />} />
            <Route path={accountUrls.security} element={<SecurityPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
