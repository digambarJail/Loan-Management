import { useState } from 'react';
import axios from 'axios';

export default function LoanApplicationForm() {
  // State for form fields
  const [name, setName] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanReason, setLoanReason] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [employerAddress, setEmployerAddress] = useState('');
  const [consent, setConsent] = useState(false); // State for consent checkbox
  const [error, setError] = useState('');

  // Function to handle form submission
  const applyForLoan = async (e) => {
    e.preventDefault();

    // Check if consent is given
    if (!consent) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    try {
      // Clear any previous error
      setError('');

      // Prepare data to be sent
      const loanData = {
        name,
        loanAmount,
        loanReason,
        employmentStatus,
        employerAddress,
      };

      // Send POST request to server
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/apply`, loanData);

      if (response.status === 201) {
        alert('Loan application submitted successfully.');
      }

      setName('');
      setLoanAmount(0);
      setLoanReason('');
      setEmploymentStatus('');
      setEmployerAddress('');
      setConsent(false);
    } catch (error) {
      console.error('Error applying for loan:', error);
      setError('An error occurred while submitting the loan application.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Apply for a Loan</h2>


        <form onSubmit={applyForLoan}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full name as it appears on bank account"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="loanAmount">
              How much do you need?
            </label>
            <input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Amount in ₹"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="loanReason">
              Reason for Loan
            </label>
            <textarea
              id="loanReason"
              value={loanReason}
              onChange={(e) => setLoanReason(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Explain the reason for loan"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="employmentStatus">
              Employment Status
            </label>
            <input
              id="employmentStatus"
              type="text"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Employment status"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="employerAddress">
              Employment Address
            </label>
            <input
              id="employerAddress"
              type="text"
              value={employerAddress}
              onChange={(e) => setEmployerAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Address of your employer"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="consent" className="text-gray-700">
              I have read the <a href="#" className="text-green-500">terms and conditions</a> and agree to provide my personal information.
            </label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
