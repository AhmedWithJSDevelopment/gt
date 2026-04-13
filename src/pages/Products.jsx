import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';
const url = '/products';

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

// export const loader =
//   (queryClient) =>
//   async ({ request }) => {
//     const params = Object.fromEntries([
//       ...new URL(request.url).searchParams.entries(),
//     ]);

//     const response = await queryClient.ensureQueryData(
//       allProductsQuery(params)
//     );
//     const product = response.data.product;
//     const meta = response.data.count;
//     return { products, meta, params };
//   };

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    // ✅ البيانات الصحيحة من الباك اند
    const products = response.data.products;

    // ✅ بدل meta (نعمل بديل بسيط)
    const meta = {
      total: response.data.count,
    };

    return { products, meta, params };
  };

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
