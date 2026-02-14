export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;

  const { page, totalPages, hasPrevPage, hasNextPage, limit, total } = meta;

  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  const goPrev = () => hasPrevPage && onPageChange(page - 1);
  const goNext = () => hasNextPage && onPageChange(page + 1);

  // Calculate showing range
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  // Generate page numbers (simple version)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-4">
      {/* Showing info */}
      <div className="text-muted mb-2">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
        <strong>{total}</strong> results
      </div>

      <nav>
        <ul className="pagination justify-content-between align-items-center mb-0">
          {/* Prev */}
          <li className={`page-item ${!hasPrevPage ? "disabled" : ""}`}>
            <button className="page-link" onClick={goPrev}>
              ← Prev
            </button>
          </li>

          {/* Page Numbers */}
          <div className="d-flex gap-1">
            {pages.map((p) => (
              <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(p)}>
                  {p}
                </button>
              </li>
            ))}
          </div>

          {/* Next */}
          <li className={`page-item ${!hasNextPage ? "disabled" : ""}`}>
            <button className="page-link" onClick={goNext}>
              Next →
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}