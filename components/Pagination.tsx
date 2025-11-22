'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = [];
  const showPages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 flex-wrap px-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-4 py-2 text-sm sm:text-base bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-2 sm:px-4 py-2 text-sm sm:text-base bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors min-w-[36px] sm:min-w-[44px]"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500 px-1">...</span>}
        </>
      )}
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors min-w-[36px] sm:min-w-[44px] ${
            page === currentPage
              ? 'bg-[#c9a76f] text-black font-semibold'
              : 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:bg-[#2a2a2a]'
          }`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500 px-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 sm:px-4 py-2 text-sm sm:text-base bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors min-w-[36px] sm:min-w-[44px]"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-4 py-2 text-sm sm:text-base bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
      </button>
    </div>
  );
}
