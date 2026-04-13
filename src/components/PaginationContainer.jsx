// import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

// const PaginationContainer = () => {
//   const { meta } = useLoaderData();
//   const { pageCount, page } = meta.pagination;

//   const pages = Array.from({ length: pageCount }, (_, index) => {
//     return index + 1;
//   });
//   const { search, pathname } = useLocation();
//   const navigate = useNavigate();
//   const handlePageChange = (pageNumber) => {
//     const searchParams = new URLSearchParams(search);
//     searchParams.set('page', pageNumber);
//     navigate(`${pathname}?${searchParams.toString()}`);
//   };

//   if (pageCount < 2) return null;

//   return (
//     <div className='mt-16 flex justify-end'>
//       <div className='join'>
//         <button
//           className='btn btn-xs sm:btn-md join-item'
//           onClick={() => {
//             let prevPage = page - 1;
//             if (prevPage < 1) prevPage = pageCount;
//             handlePageChange(prevPage);
//           }}
//         >
//           Prev
//         </button>
//         {pages.map((pageNumber) => {
//           return (
//             <button
//               key={pageNumber}
//               onClick={() => handlePageChange(pageNumber)}
//               className={`btn btn-xs sm:btn-md border-none join-item ${
//                 pageNumber === page ? 'bg-base-300 border-base-300 ' : ''
//               }`}
//             >
//               {pageNumber}
//             </button>
//           );
//         })}
//         <button
//           className='btn btn-xs sm:btn-md join-item'
//           onClick={() => {
//             let nextPage = page + 1;
//             if (nextPage > pageCount) nextPage = 1;
//             handlePageChange(nextPage);
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
// export default PaginationContainer;

// ------------------
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const data = useLoaderData();

  // ✅ حماية شاملة لكل أشكال الـ API
  const pagination =
    data?.meta?.pagination ||
    data?.pagination ||
    {};

  const pageCount = pagination?.pageCount ?? 1;
  const page = pagination?.page ?? 1;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // ❌ لا تعرض إذا صفحة واحدة أو بيانات ناقصة
  if (!pageCount || pageCount < 2) return null;

  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">

        {/* PREV */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === page ? 'bg-base-300 border-base-300' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* NEXT */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;



