import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Account() {

    const navigate = useNavigate();

    const [loans, setLoans] = useState([]); // State to store loan data
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query

    const redirect = () => {
      navigate('/');  // Redirects to the home page
    };

    useEffect(() => {
        const fetchLoans = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getLoans`);
            const fetchedLoans = response.data.loans;
            setLoans(fetchedLoans);
    
          } catch (error) {
            console.error("Error fetching loans in frontend", error);
          }
        };
    
        fetchLoans();
      }, []);

    const getStatusColor = (status) => {
        switch (status) {
          case "Pending":
            return "bg-yellow-500";
          case "Approved":
            return "bg-green-500";
          case "Under Review":
            return "bg-blue-500";
          case "Rejected":
            return "bg-red-500";
          default:
            return "bg-gray-200";
        }
      };
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      };

      const filteredLoans = loans.filter((loan) => {

        const name = loan.name.toLowerCase();
    
        const reason = loan.loanReason.toLowerCase();
    
        const query = searchQuery.toLowerCase();
    
        return name.includes(query) || reason.includes(query);
    
      });

    return (
        <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">CREDIT Account</h1>
            <div className="flex space-x-4">
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v-3a1 1 0 01-1-1h-3a1 1 0 01-1-1" />
                </svg>
                <span>Home</span>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Payments</span>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Budget</span>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Card</span>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a2 2 0 012-2h1a2 2 0 012 2v7.242A2.032 2.032 0 0121 18.595l-1.405-1.405M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>1</span>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 8v4m4 4h.01M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v-3a1 1 0 01-1-1h-3a1 1 0 01-1-1" />
                </svg>
            </button>
            <button className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c.547 0 1.07-.055 1.536-.154a4.471 4.471 0 01-.499-1.452c-.499-.955-1.275-1.684-2.071-2.246l.714-.714a2 2 0 00-2.828 0l-.714.714c-.796.562-1.575 1.291-2.071 2.246a4.471 4.471 0 01-.499 1.452c-.46.1-.928.154-1.536.154M8 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <span>User</span>
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </div>
        </div>
        <div className="flex justify-center space-x-10 items-center py-8">
            <div className="bg-green-100 rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold">DEFICIT</span>
            </div>
            <div className="text-4xl font-bold">₦ 0.0</div>
            </div>
            <div className="bg-green-100 rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2">
                <button onClick={redirect}>
                    Get A Loan
                </button>
            </div>
            </div>
        </div>
        <div className="flex justify-center space-x-4 py-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Borrow Cash</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Transact</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Deposit Cash</button>
        </div>
        <div className="flex justify-center py-4">
            <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input onChange={(e) => setSearchQuery(e.target.value)} className="ml-2 px-2 py-1 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Search for loans" />
            </div>
            </div>
        </div>
        <div className="py-8">
            <h2 className="text-xl font-bold">Applied Loans</h2>
            <div className="flex justify-between items-center py-4">
                <div className="flex justify-end items-center space-x-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.857 6.857A1 1 0 018.143 15.143l-4.586-4.586a1 1 0 01-.707-.293H4a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>Sort</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                    <span>Filter</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Applied Loans</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-center py-2"></th> {/* Name Column */}
                <th className="px-4 text-center py-2">Name</th> {/* Name Column */}
                <th className="px-4 text-center py-2">Loan Reason</th> {/* Loan Reason Column */}
                <th className="px-4 text-center py-2">Loan Amount</th> {/* Loan Amount Column */}
                <th className="px-4 text-center py-2">Date</th> {/* Loan Amount Column */}
                <th className="px-4 text-center py-2">Status</th> {/* Status Column */}
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan, index) => (
                <tr key={index}>
                <td className="border text-center px-4 py-2">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User"
                      className="h-10 w-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border text-center px-4 py-2">{loan.name}</td>
                  <td className="border text-center px-4 py-2">{loan.loanReason}</td>
                  <td className="border text-center px-4 py-2">{loan.loanAmount}</td>
                  <td className="border text-center px-4 py-2">{formatDate(loan.createdAt)}</td>
                  <td className={`border rounded-3xl text-center px-2 py-1.5 ${getStatusColor(loan.loanStatus)}`}>
                    {loan.loanStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        </div>
    );
}

export default Account;