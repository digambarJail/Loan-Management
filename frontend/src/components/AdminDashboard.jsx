import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CreditAppDashboard() {
  const [loans, setLoans] = useState([]); // State to store loan data
  const [borrowersCount, setBorrowersCount] = useState(0); // State to store unique borrowers count
  const [loansCount, setLoansCount] = useState(0); // State to store loans count
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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

  const handleStatusChange = async (loanId, newStatus,index) => {
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/updateLoanStatus`, {
        loanId,
        loanStatus: newStatus,
      });
      if (response.status === 200) {
        // Update local loan data after a successful status change
        setLoans(loans.map(loan => 
          loan._id === loanId ? { ...loan, loanStatus: newStatus } : loan
        ));

        toggleDropdown(index);
      }
    } catch (error) {
      console.error("Error updating loan status", error);
    }
  };

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

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">CREDIT APP</h1>
          <div>
          <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_29_341)">
          <path d="M22.5 4.25C12.15 4.25 3.75 12.65 3.75 23C3.75 33.35 12.15 41.75 22.5 41.75C32.85 41.75 41.25 33.35 41.25 23C41.25 12.65 32.85 4.25 22.5 4.25ZM22.5 9.875C25.6125 9.875 28.125 12.3875 28.125 15.5C28.125 18.6125 25.6125 21.125 22.5 21.125C19.3875 21.125 16.875 18.6125 16.875 15.5C16.875 12.3875 19.3875 9.875 22.5 9.875ZM22.5 36.5C17.8125 36.5 13.6688 34.1 11.25 30.4625C11.3063 26.7313 18.75 24.6875 22.5 24.6875C26.2313 24.6875 33.6938 26.7313 33.75 30.4625C31.3313 34.1 27.1875 36.5 22.5 36.5Z" fill="#ADCF1A"/>
          </g>
          <defs>
          <clipPath id="clip0_29_341">
          <rect width="45" height="45" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
          </defs>
          </svg>
          <p className="mt-4">John Doe</p>
          </div>
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div className="bg-green-900 h-full py-5 px-4">
              <svg width="51" height="36" viewBox="0 0 51 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.84575 15.9512C10.6399 15.9512 12.9115 13.7046 12.9115 10.9414C12.9115 8.17821 10.6399 5.93164 7.84575 5.93164C5.05166 5.93164 2.77997 8.17821 2.77997 10.9414C2.77997 13.7046 5.05166 15.9512 7.84575 15.9512ZM43.3063 15.9512C46.1004 15.9512 48.3721 13.7046 48.3721 10.9414C48.3721 8.17821 46.1004 5.93164 43.3063 5.93164C40.5122 5.93164 38.2405 8.17821 38.2405 10.9414C38.2405 13.7046 40.5122 15.9512 43.3063 15.9512ZM45.8392 18.4561H40.7734C39.3803 18.4561 38.1218 19.0118 37.2036 19.912C40.3935 21.642 42.6572 24.7652 43.148 28.4756H48.3721C49.7731 28.4756 50.905 27.3562 50.905 25.9707V23.4658C50.905 20.7026 48.6333 18.4561 45.8392 18.4561ZM25.576 18.4561C30.4756 18.4561 34.4412 14.5343 34.4412 9.68896C34.4412 4.84358 30.4756 0.921875 25.576 0.921875C20.6765 0.921875 16.7109 4.84358 16.7109 9.68896C16.7109 14.5343 20.6765 18.4561 25.576 18.4561ZM31.655 20.9609H30.998C29.3516 21.7437 27.5232 22.2134 25.576 22.2134C23.6289 22.2134 21.8083 21.7437 20.154 20.9609H19.4971C14.4629 20.9609 10.3786 25.0001 10.3786 29.9785V32.2329C10.3786 34.3073 12.0804 35.9902 14.178 35.9902H36.974C39.0716 35.9902 40.7734 34.3073 40.7734 32.2329V29.9785C40.7734 25.0001 36.6891 20.9609 31.655 20.9609ZM13.9484 19.912C13.0303 19.0118 11.7717 18.4561 10.3786 18.4561H5.31286C2.51876 18.4561 0.24707 20.7026 0.24707 23.4658V25.9707C0.24707 27.3562 1.37896 28.4756 2.77997 28.4756H7.99615C8.49481 24.7652 10.7586 21.642 13.9484 19.912Z" fill="white"/>
              </svg>
            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">100 ACTIVE USERS</h3> {/* Dynamically rendering loan count */}
            </div>

          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="39" height="32" viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.0312 13.5461H26.4062C25.8734 13.5461 25.4375 13.9829 25.4375 14.5167V16.458C25.4375 16.9919 25.8734 17.4286 26.4062 17.4286H38.0312C38.5641 17.4286 39 16.9919 39 16.458V14.5167C39 13.9829 38.5641 13.5461 38.0312 13.5461ZM13.8125 16.458C18.0932 16.458 21.5625 12.9819 21.5625 8.69287C21.5625 4.40385 18.0932 0.927734 13.8125 0.927734C9.53184 0.927734 6.0625 4.40385 6.0625 8.69287C6.0625 12.9819 9.53184 16.458 13.8125 16.458ZM19.2375 18.3993H18.2264C16.8822 19.0181 15.3867 19.3699 13.8125 19.3699C12.2383 19.3699 10.7488 19.0181 9.39863 18.3993H8.3875C3.89492 18.3993 0.25 22.0513 0.25 26.5527V29.0764C0.25 30.684 1.55176 31.9883 3.15625 31.9883H24.4688C26.0732 31.9883 27.375 30.684 27.375 29.0764V26.5527C27.375 22.0513 23.7301 18.3993 19.2375 18.3993Z" fill="white"/>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">{borrowersCount} BORROWERS</h3> {/* Dynamically rendering unique borrowers */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12.5H46V36.5H10V12.5ZM28 18.5C29.5913 18.5 31.1174 19.1321 32.2426 20.2574C33.3679 21.3826 34 22.9087 34 24.5C34 26.0913 33.3679 27.6174 32.2426 28.7426C31.1174 29.8679 29.5913 30.5 28 30.5C26.4087 30.5 24.8826 29.8679 23.7574 28.7426C22.6321 27.6174 22 26.0913 22 24.5C22 22.9087 22.6321 21.3826 23.7574 20.2574C24.8826 19.1321 26.4087 18.5 28 18.5ZM18 16.5C18 17.5609 17.5786 18.5783 16.8284 19.3284C16.0783 20.0786 15.0609 20.5 14 20.5V28.5C15.0609 28.5 16.0783 28.9214 16.8284 29.6716C17.5786 30.4217 18 31.4391 18 32.5H38C38 31.4391 38.4214 30.4217 39.1716 29.6716C39.9217 28.9214 40.9391 28.5 42 28.5V20.5C40.9391 20.5 39.9217 20.0786 39.1716 19.3284C38.4214 18.5783 38 17.5609 38 16.5H18ZM2 20.5H6V40.5H38V44.5H2V20.5Z" fill="white"/>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">100 CASH DISBURSED</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_29_383)">
          <path d="M14 36.5V14.604C13.9999 14.1386 14.1543 13.6864 14.439 13.3184C14.7238 12.9503 15.1227 12.6873 15.5732 12.5705C16.0237 12.4538 16.5002 12.49 16.9278 12.6734C17.3555 12.8569 17.7101 13.1772 17.936 13.584L30.064 35.416C30.2899 35.8228 30.6445 36.1431 31.0722 36.3266C31.4998 36.51 31.9763 36.5462 32.4268 36.4295C32.8773 36.3127 33.2762 36.0497 33.561 35.6816C33.8457 35.3136 34.0001 34.8614 34 34.396V12.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 20.5H38" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 28.5H38" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <filter id="filter0_d_29_383" x="-4" y="0.5" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29_383"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_29_383" result="shape"/>
          </filter>
          </defs>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">0 CASH RECEIVED</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.8333 15.9702H38.6821C38.0404 14.5612 37.1071 13.3143 35.9549 12.2716L37.3331 6.95264H34.9997C32.8559 6.95264 30.96 7.90371 29.6766 9.36907C29.1224 9.29157 28.5755 9.20703 27.9994 9.20703H18.6657C13.0218 9.20703 8.31847 13.0818 7.23197 18.2246H4.08185C3.00264 18.2246 2.14948 17.2735 2.36824 16.1957C2.52866 15.3925 3.3089 14.843 4.15477 14.843H4.22768C4.46832 14.843 4.6652 14.6528 4.6652 14.4203V13.0113C4.6652 12.7788 4.46832 12.5886 4.22768 12.5886C2.14948 12.5886 0.297326 14.0258 0.0348159 16.0125C-0.28603 18.4219 1.65363 20.479 4.08185 20.479H6.99862C6.99862 24.1565 8.85078 27.3901 11.6655 29.4473V35.1326C11.6655 35.7525 12.1905 36.2598 12.8322 36.2598H17.499C18.1407 36.2598 18.6657 35.7525 18.6657 35.1326V31.751H27.9994V35.1326C27.9994 35.7525 28.5245 36.2598 29.1661 36.2598H33.833C34.4747 36.2598 34.9997 35.7525 34.9997 35.1326V29.4473C35.8601 28.8203 36.6258 28.0805 37.2821 27.2422H40.8333C41.4749 27.2422 42 26.7349 42 26.115V17.0974C42 16.4775 41.4749 15.9702 40.8333 15.9702ZM31.4996 20.479C30.8579 20.479 30.3329 19.9718 30.3329 19.3518C30.3329 18.7318 30.8579 18.2246 31.4996 18.2246C32.1413 18.2246 32.6663 18.7318 32.6663 19.3518C32.6663 19.9718 32.1413 20.479 31.4996 20.479ZM18.6657 6.95264H27.9994C28.3932 6.95264 28.7797 6.98082 29.1588 7.009C29.1588 6.98786 29.1661 6.97377 29.1661 6.95264C29.1661 3.2188 26.0306 0.189453 22.1659 0.189453C18.3011 0.189453 15.1656 3.2188 15.1656 6.95264C15.1656 7.10058 15.2021 7.24148 15.2094 7.38943C16.3177 7.11467 17.4699 6.95264 18.6657 6.95264Z" fill="white"/>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">100 SAVINGS</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="43" height="34" viewBox="0 0 43 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.05 17C19.8001 17 23.65 13.1949 23.65 8.5C23.65 3.80508 19.8001 0 15.05 0C10.2998 0 6.45 3.80508 6.45 8.5C6.45 13.1949 10.2998 17 15.05 17ZM21.07 19.125H19.948C18.4564 19.8023 16.7969 20.1875 15.05 20.1875C13.3031 20.1875 11.6503 19.8023 10.152 19.125H9.02999C4.04468 19.125 0 23.1227 0 28.05V30.8125C0 32.5723 1.44453 34 3.225 34H26.875C28.6555 34 30.1 32.5723 30.1 30.8125V28.05C30.1 23.1227 26.0553 19.125 21.07 19.125ZM42.7715 10.5984L40.9037 8.73242C40.5947 8.42031 40.0908 8.42031 39.775 8.72578L32.7337 15.632L29.6767 12.5906C29.3676 12.2785 28.8637 12.2785 28.548 12.584L26.66 14.4367C26.3442 14.7422 26.3442 15.2402 26.6533 15.5523L32.1425 21.0176C32.4515 21.3297 32.9554 21.3297 33.2712 21.0242L42.7648 11.7141C43.0739 11.402 43.0806 10.9039 42.7715 10.5984Z" fill="white"/>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">{loansCount} REPAID LOANS</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.1406 0.193656C18.9508 0.0673742 18.7279 0 18.5 0C18.2721 0 18.0492 0.0673742 17.8594 0.193656L0.515688 11.7563C0.30929 11.894 0.152628 12.0943 0.0688412 12.3278C-0.0149452 12.5613 -0.0214127 12.8156 0.0503939 13.053C0.122201 13.2905 0.268474 13.4986 0.467607 13.6465C0.666741 13.7945 0.908176 13.8744 1.15625 13.8746H5.49219V30.0624H3.46875C3.16209 30.0624 2.868 30.1842 2.65116 30.4011C2.43432 30.6179 2.3125 30.912 2.3125 31.2187C2.3125 31.5253 2.43432 31.8194 2.65116 32.0363C2.868 32.2531 3.16209 32.3749 3.46875 32.3749H33.5312C33.8379 32.3749 34.132 32.2531 34.3488 32.0363C34.5657 31.8194 34.6875 31.5253 34.6875 31.2187C34.6875 30.912 34.5657 30.6179 34.3488 30.4011C34.132 30.1842 33.8379 30.0624 33.5312 30.0624H31.5078V13.8746H35.8438C36.0918 13.8744 36.3333 13.7945 36.5324 13.6465C36.7315 13.4986 36.8778 13.2905 36.9496 13.053C37.0214 12.8156 37.0149 12.5613 36.9312 12.3278C36.8474 12.0943 36.6907 11.894 36.4843 11.7563L19.1406 0.193656ZM28.6172 13.8746V30.0624H25.7266V13.8746H28.6172ZM22.8359 13.8746V30.0624H19.9453V13.8746H22.8359ZM17.0547 13.8746V30.0624H14.1641V13.8746H17.0547ZM11.2734 13.8746V30.0624H8.38281V13.8746H11.2734ZM18.5 9.24955C17.8867 9.24955 17.2985 9.00591 16.8648 8.57223C16.4311 8.13854 16.1875 7.55034 16.1875 6.93701C16.1875 6.32369 16.4311 5.73549 16.8648 5.3018C17.2985 4.86812 17.8867 4.62448 18.5 4.62448C19.1133 4.62448 19.7015 4.86812 20.1352 5.3018C20.5689 5.73549 20.8125 6.32369 20.8125 6.93701C20.8125 7.55034 20.5689 8.13854 20.1352 8.57223C19.7015 9.00591 19.1133 9.24955 18.5 9.24955ZM1.15625 34.6875C0.849593 34.6875 0.555497 34.8093 0.338658 35.0261C0.121819 35.243 0 35.5371 0 35.8437C0 36.1504 0.121819 36.4445 0.338658 36.6613C0.555497 36.8782 0.849593 37 1.15625 37H35.8438C36.1504 37 36.4445 36.8782 36.6613 36.6613C36.8782 36.4445 37 36.1504 37 35.8437C37 35.5371 36.8782 35.243 36.6613 35.0261C36.4445 34.8093 36.1504 34.6875 35.8438 34.6875H1.15625Z" fill="white"/>
          </svg>

            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">100 OTHER ACCOUNTS</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="bg-green-900 h-full py-5 px-4">
          <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8 14.8149H18.9V9.07458C18.9 8.78626 18.6986 8.55273 18.45 8.55273H17.6861C17.4195 8.55273 17.1591 8.64406 16.9374 8.81562L16.0751 9.48228C16.0259 9.52025 15.9837 9.56909 15.9508 9.62601C15.9179 9.68292 15.895 9.74679 15.8834 9.81398C15.8718 9.88116 15.8718 9.95034 15.8832 10.0176C15.8947 10.0848 15.9175 10.1487 15.9502 10.2057L16.4497 11.0739C16.4825 11.131 16.5246 11.1799 16.5737 11.2181C16.6228 11.2562 16.6778 11.2828 16.7358 11.2962C16.7937 11.3097 16.8534 11.3098 16.9113 11.2965C16.9693 11.2832 17.0244 11.2568 17.0736 11.2187L17.1 11.1985V14.8149H16.2C15.9514 14.8149 15.75 15.0485 15.75 15.3368V16.3805C15.75 16.6688 15.9514 16.9023 16.2 16.9023H19.8C20.0486 16.9023 20.25 16.6688 20.25 16.3805V15.3368C20.25 15.0485 20.0486 14.8149 19.8 14.8149ZM34.2 0.203125H1.8C0.806062 0.203125 0 1.13789 0 2.29053V23.1646C0 24.3172 0.806062 25.252 1.8 25.252H34.2C35.1939 25.252 36 24.3172 36 23.1646V2.29053C36 1.13789 35.1939 0.203125 34.2 0.203125ZM2.7 22.1208V17.946C4.68844 17.946 6.3 19.8149 6.3 22.1208H2.7ZM2.7 7.50903V3.33423H6.3C6.3 5.64016 4.68844 7.50903 2.7 7.50903ZM18 20.0334C15.0176 20.0334 12.6 16.7621 12.6 12.7275C12.6 8.69233 15.0176 5.42163 18 5.42163C20.9824 5.42163 23.4 8.69233 23.4 12.7275C23.4 16.7634 20.9812 20.0334 18 20.0334ZM33.3 22.1208H29.7C29.7 19.8149 31.3116 17.946 33.3 17.946V22.1208ZM33.3 7.50903C31.3116 7.50903 29.7 5.64016 29.7 3.33423H33.3V7.50903Z" fill="white"/>
          </svg>
            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold text-gray-700">{loansCount} LOANS</h3> {/* Dynamically rendering loan count */}
            </div>
          </div>

        </div>

        {/* Applied Loans Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Applied Loans</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-center py-2">User Photo</th> {/* User Photo Column */}
                <th className="px-4 text-center py-2">Name</th> {/* Name Column */}
                <th className="px-4 text-center py-2">Loan Reason</th> {/* Loan Reason Column */}
                <th className="px-4 text-center py-2">Loan Amount</th> {/* Loan Amount Column */}
                <th className="px-4 text-center py-2">Date</th> {/* Date Column */}
                <th className="px-4 text-center py-2">Status</th> {/* Status Column */}
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={index}>
                  {/* Add random user photo */}
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

                  {/* Status column displaying the loan status */}
                  <td className="border text-center px-4 py-2 relative">
                    {/* Display the current loan status */}
                    <span className={`rounded-3xl px-4 py-2 ${getStatusColor(loan.loanStatus)}`}>
                      {loan.loanStatus}
                    </span>

                    {/* Three-dot menu to change the status */}
                    <div className="inline-block text-left relative">
                      <button
                        className="ml-2"
                        id={`menu-button-${index}`}
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => toggleDropdown(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-700 hover:text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 6v6M6 6v6m6-6v6m6-6v6"
                          />
                        </svg>
                      </button>

                      {/* Dropdown for loan status change */}
                      {dropdownOpen[index] && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby={`menu-button-${index}`}
                        >
                          <div className="py-1" role="none">
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleStatusChange(loan._id, 'Pending',index)}
                            >
                              Pending
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleStatusChange(loan._id, 'Approved',index)}
                            >
                              Approve
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleStatusChange(loan._id, 'Under Review',index)}
                            >
                              Under Review
                            </button>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleStatusChange(loan._id, 'Rejected',index)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </main>
    </div>
    </>
  );
}
