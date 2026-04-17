// import { redirect, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { customFetch } from '../utils';
// import {
//   OrdersList,
//   ComplexPaginationContainer,
//   SectionTitle,
// } from '../components';

// const ordersQuery = (params, user) => {
//   return {
//     queryKey: [
//       'orders',
//       user.username,
//       params.page ? parseInt(params.page) : 1,
//     ],
//     queryFn: () =>
//       customFetch.get('/orders', {
//         params,
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       }),
//   };
// };

// export const loader =
//   (store, queryClient) =>
//   async ({ request }) => {
//     const user = store.getState().userState.user;

//     if (!user) {
//       toast.warn('You must logged in to view orders');
//       return redirect('/login');
//     }
//     const params = Object.fromEntries([
//       ...new URL(request.url).searchParams.entries(),
//     ]);
//     try {
//       const response = await queryClient.ensureQueryData(
//         ordersQuery(params, user)
//       );

//       return { orders: response.data.data, meta: response.data.meta };
//     } catch (error) {
//       console.log(error);
//       const errorMessage =
//         error?.response?.data?.error?.message ||
//         'there was an error placing your order';
//       toast.error(errorMessage);
//       if (error?.response?.status === 401 || 403) return redirect('/login');
//       return null;
//     }
//   };

// const Orders = () => {
//   const { meta } = useLoaderData();
//   if (meta.pagination.total < 1) {
//     return <SectionTitle text='please make an order' />;
//   }
//   return (
//     <>
//       <SectionTitle text='Your Orders' />
//       <OrdersList />
//       <ComplexPaginationContainer />
//     </>
//   );
// };
// export default Orders;
// ---------------------




// import { redirect, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { customFetch } from '../utils';
// import { OrdersList, SectionTitle } from '../components';

// // ✅ loader الصحيح بدون React Query وبدون pagination
// export const loader =
//   (store) =>
//   async () => {
//     const user = store.getState().userState.user;

//     // ✅ حماية الصفحة
//     if (!user) {
//       toast.warn('You must be logged in to view orders');
//       return redirect('/login');
//     }

//     try {
//       const response = await customFetch.get(
//         '/orders/showAllMyOrders',
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );

//       // ✅ الشكل الصحيح من الباك اند
//       return {
//         orders: response.data.orders,
//         count: response.data.count,
//       };
//     } catch (error) {
//       console.log(error);

//       const errorMessage =
//         error?.response?.data?.msg ||
//         'there was an error fetching orders';

//       toast.error(errorMessage);

//       // ✅ تصحيح الشرط
//       if (
//         error?.response?.status === 401 ||
//         error?.response?.status === 403
//       ) {
//         return redirect('/login');
//       }

//       return null;
//     }
//   };

// const Orders = () => {
//   const { count } = useLoaderData();

//   // ✅ إذا ماكو طلبات
//   if (count < 1) {
//     return <SectionTitle text="please make an order" />;
//   }

//   return (
//     <>
//       <SectionTitle text="Your Orders" />
//       <OrdersList />
//     </>
//   );
// };

// export default Orders;


// -------------------------  
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import {
  OrdersList,
  SectionTitle,
} from '../components';

export const loader =
  (store) =>
  async () => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to view orders');
      return redirect('/login');
    }

    try {
      const response = await customFetch.get('/orders/showAllMyOrders');

      return {
        orders: response.data.orders,
        count: response.data.count,
      };
    } catch (error) {
      console.log(error);

      const errorMessage =
        error?.response?.data?.msg ||
        'there was an error fetching orders';

      toast.error(errorMessage);

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect('/login');
      }

      return null;
    }
  };

const Orders = () => {
  const { count } = useLoaderData();

  if (count < 1) {
    return <SectionTitle text="please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
    </>
  );
};

export default Orders;
