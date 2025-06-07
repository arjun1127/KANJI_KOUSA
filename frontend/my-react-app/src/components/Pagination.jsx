import React, { useEffect } from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full font-medium border transition duration-300
          ${currentPage === 1
            ? 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
            : 'bg-gray-800 text-cyan-300 border-gray-600 hover:bg-cyan-700 hover:text-white'
          }`}
      >
        Previous
      </button>

      {pageNumbers.map((number, idx) =>
        number === '...' ? (
          <span key={idx} className="px-3 py-2 text-cyan-400">...</span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 rounded-full font-medium border transition duration-300
              ${currentPage === number
                ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-400/40'
                : 'bg-gray-800 text-cyan-300 border-gray-600 hover:bg-cyan-700 hover:text-white'
              }`}
          >
            {number}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full font-medium border transition duration-300
          ${currentPage === totalPages
            ? 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
            : 'bg-gray-800 text-cyan-300 border-gray-600 hover:bg-cyan-700 hover:text-white'
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
