"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2 flex-row-reverse">
      
      {/* Next (يمين في العربي) */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        التالي
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Previous (شمال في العربي) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        السابق
      </button>
    </div>
  );
}