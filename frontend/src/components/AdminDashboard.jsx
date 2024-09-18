import { useEffect, useState } from "react";
import axios from "axios";

export default function CreditAppDashboard() {
  const [loans, setLoans] = useState([]); // State to store loan data
  const [borrowersCount, setBorrowersCount] = useState(0); // State to store unique borrowers count
  const [loansCount, setLoansCount] = useState(0); // State to store loans count

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getLoans`);
        console.log('respo',response.data.loans)
        const fetchedLoans = response.data.loans;
        setLoans(fetchedLoans);

        // Calculate the number of unique borrowers
        const uniqueBorrowers = new Set(fetchedLoans.map(loan => loan.name)).size;
        setBorrowersCount(uniqueBorrowers);

        // Set the number of loans
        setLoansCount(fetchedLoans.length);
      } catch (error) {
        console.error("Error fetching loans in frontend", error);
      }
    };

    fetchLoans();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">CREDIT APP</h1>
          <p className="mt-4">John Okoh</p>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Dashboard</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Borrowers</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Loans</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Repayments</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Loan Parameters</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Reports</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Settings</a>
            </li>
            <li className="px-6 py-2 hover:bg-green-800">
              <a href="#" className="block">Sign Out</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard Loans</h2>
          <div className="flex items-center space-x-4">
            <span className="text-green-600">Verifier</span>
            <button className="relative">
              <span className="bg-red-500 text-white rounded-full h-2 w-2 absolute top-0 right-0"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405M4 4h16M5 5v.01M5 11v2m1 6v-2m7-5l-3 3m0 0l-3-3m3 3v12m0-12l3-3M13 7H6m6 6l3 3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{borrowersCount} ACTIVE USERS</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{borrowersCount} BORROWERS</h3> {/* Dynamically rendering unique borrowers */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h2v6m2-6h2v6m-8 0h-2v6m2-6h2m-4-10V4m0 10h2M4 4v16" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">0 CASH DISBURSED</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">0 CASH RECEIVED</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">0 SAVINGS</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{loansCount} REPAID LOANS</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{loansCount} OTHER ACCOUNTS</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{loansCount} LOANS</h3> {/* Dynamically rendering loan count */}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
            </svg>
          </div>

        </div>

        {/* Applied Loans Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Applied Loans</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-center py-2">Name</th> {/* Name Column */}
                <th className="px-4 text-center py-2">Loan Reason</th> {/* Loan Reason Column */}
                <th className="px-4 text-center py-2">Loan Amount</th> {/* Loan Amount Column */}
                <th className="px-4 text-center py-2">Date</th> {/* Loan Amount Column */}
                <th className="px-4 text-center py-2">Status</th> {/* Status Column */}
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={index}>
                  <td className="border text-center px-4 py-2">{loan.name}</td>
                  <td className="border text-center px-4 py-2">{loan.loanReason}</td>
                  <td className="border text-center px-4 py-2">{loan.loanAmount}</td>
                  <td className="border text-center px-4 py-2">{formatDate(loan.createdAt)}</td> {/* Formatted date */}
                  <td className="border text-center px-4 py-2">{loan.loanStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
