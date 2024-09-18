import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanApplicationForm from './components/ApplicationForm';
import CreditAppDashboard from './components/AdminDashboard';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanApplicationForm />} />
        <Route path="/admin" element={<CreditAppDashboard />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
