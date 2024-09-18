import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoanApplicationForm from './components/ApplicationForm';
import CreditAppDashboard from './components/AdminDashboard';
import Account from './components/Account';
import logo from '../public/creditsea_logo.jpeg'
import VerifierDashboard from './components/Verifier';
// import MyLoans from './components/MyLoans';

// Create a Homepage Component with Navigation Buttons
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* Header with Logo and Tagline */}
      <header className="w-full bg-[#0A512F] py-6">
        <div className="container mx-auto flex flex-col items-center">
          <img src={logo} alt="CreditSea Logo" className="h-16 w-auto mb-2" />
          <h1 className="text-white text-4xl font-bold">
            CreditSea | Your Gateway to Swift Financial Relief
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-grow space-y-6">
        <h2 className="text-3xl font-semibold text-[#0A512F]">
          Welcome to the Loan Application System
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-lg">
          Apply for a loan quickly and easily, track your applications, and manage your account all in one place.
        </p>
        <div className="space-y-4 space-x-4">
          <button
            onClick={() => navigate('/apply')}
            className="px-8 py-3 bg-[#0A512F] text-white rounded-md hover:bg-green-700 shadow-lg"
          >
            Apply for Loan
          </button>
          <button
            onClick={() => navigate('/account')}
            className="px-8 py-3 bg-[#0A512F] text-white rounded-md hover:bg-green-700 shadow-lg"
          >
            My Account
          </button>
          <button
            onClick={() => navigate('/admin')}
            className="px-8 py-3 bg-[#0A512F] text-white rounded-md hover:bg-green-700 shadow-lg"
          >
            Admin
          </button>
          <button
            onClick={() => navigate('/verifier')}
            className="px-8 py-3 bg-[#0A512F] text-white rounded-md hover:bg-green-700 shadow-lg"
          >
            Verifier
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0A512F] py-4">
        <div className="container mx-auto text-center text-white">
          <p>© 2024 CreditSea. All rights reserved.</p>
          <p className="text-sm">
            Your trusted partner in financial solutions. For assistance, call 1-800-123-4567 or email support@creditsea.com.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<LoanApplicationForm />} />
        <Route path="/admin" element={<CreditAppDashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
