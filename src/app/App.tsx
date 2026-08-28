import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { BranchDetailPage } from '../branches/BranchDetailPage'
import { DomainOverviewPage } from '../domains/DomainOverviewPage'
import { HomePage } from '../domains/HomePage'
import { AppShell } from './AppShell'

export function App() {
  return (
    <BrowserRouter basename="/vantage">
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="domains/:domainId" element={<DomainOverviewPage />} />
          <Route path="domains/:domainId/branches/:branchId" element={<BranchDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
