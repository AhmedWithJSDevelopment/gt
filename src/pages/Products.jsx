// import { Filters, PaginationContainer, ProductsContainer } from '../components';
// import { customFetch } from '../utils';
// const url = '/products';

// const allProductsQuery = (queryParams) => {
//   const { search, category, company, sort, price, shipping, page } =
//     queryParams;

//   return {
//     queryKey: [
//       'products',
//       search ?? '',
//       category ?? 'all',
//       company ?? 'all',
//       sort ?? 'a-z',
//       price ?? 100000,
//       shipping ?? false,
//       page ?? 1,
//     ],
//     queryFn: () =>
//       customFetch(url, {
//         params: queryParams,
//       }),
//   };
// };

// // export const loader =
// //   (queryClient) =>
// //   async ({ request }) => {
// //     const params = Object.fromEntries([
// //       ...new URL(request.url).searchParams.entries(),
// //     ]);

// //     const response = await queryClient.ensureQueryData(
// //       allProductsQuery(params)
// //     );
// //     const product = response.data.product;
// //     const meta = response.data.count;
// //     return { products, meta, params };
// //   };

// export const loader =
//   (queryClient) =>
//   async ({ request }) => {
//     const params = Object.fromEntries([
//       ...new URL(request.url).searchParams.entries(),
//     ]);

//     const response = await queryClient.ensureQueryData(
//       allProductsQuery(params)
//     );

//     // ✅ البيانات الصحيحة من الباك اند
//     const products = response.data.products;

//     // ✅ بدل meta (نعمل بديل بسيط)
//     const meta = {
//       total: response.data.count,
//     };

//     return { products, meta, params };
//   };

// const Products = () => {
//   return (
//     <>
//       <Filters />
//       <ProductsContainer />
//       <PaginationContainer />
//     </>
//   );
// };
// export default Products;



// --------------------------





import {
  Filters,
  PaginationContainer,
  ProductsContainer,
} from '../components';
import { customFetch } from '../utils';

const url = '/products';

// ✅ QUERY (React Query)
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

// ✅ LOADER (متوافق مع الباك اند الجديد)
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await queryClient.ensureQueryData(
        allProductsQuery(params)
      );

      const products = response?.data?.products || [];

      // ✅ دعم pagination الحقيقي من الباك اند
      const meta = {
        pagination: response?.data?.pagination || {
          page: 1,
          pageCount: 1,
        },
        total: response?.data?.count || 0,
      };

      return { products, meta, params };
    } catch (error) {
      console.log(error);

      // ✅ fallback في حال الخطأ
      return {
        products: [],
        meta: {
          pagination: {
            page: 1,
            pageCount: 1,
          },
          total: 0,
        },
        params,
      };
    }
  };

// ✅ PAGE COMPONENT
const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
