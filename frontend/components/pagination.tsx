import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="btn">
          Précédent
        </Link>
      )}
      <span>Page {currentPage} sur {totalPages}</span>
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="btn">
          Suivant
        </Link>
      )}
    </div>
  )
}
