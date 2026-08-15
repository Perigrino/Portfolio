import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TerminalVersion from './versions/v1-terminal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TerminalVersion />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
