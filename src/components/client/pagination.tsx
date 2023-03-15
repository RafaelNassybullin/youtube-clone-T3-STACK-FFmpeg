import { cardPerPage } from "@/config";
import usePagination from "@/hooks/usePaginate";
import Link from "next/link";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  link: string;
  firstPage: string;
};

export const dotts = ". . .";

export const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = cardPerPage,
  link,
  firstPage,
}: PaginationProps) => {
  
  const pages = usePagination(totalItems, currentPage, itemsPerPage);

  return (
    <>
      {pages.length > 1 ? (
        <>
          {pages.map((pageNumber, i) =>
            pageNumber === dotts ? (
              <div
                key={i}
                className={`grid h-[49px] w-[49px] place-items-center rounded-[10px] bg-[var(--color-card-dark)] text-[27px] text-[color:var(--color-text-orange)]`}
              >
                {pageNumber}
              </div>
            ) : (
              <Link
                key={i}
                href={
                  pageNumber !== 1 ? `/${link}${pageNumber}` : `/${firstPage}`
                }
              >
                <div
                  className={`grid h-[49px] w-[49px] cursor-pointer place-items-center rounded-[10px] border-[1px] border-[color:var(--color-text-orange)] text-[27px] ${
                    pageNumber !== currentPage
                      ? "bg-[var(--color-card-dark)] text-[color:var(--color-text-orange)]"
                      : "bg-[var(--color-logo-orange)]"
                  } text-[color:var(--color-just-white)]`}
                >
                  {pageNumber}
                </div>
              </Link>
            )
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};
