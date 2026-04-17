import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { SectionTitle } from '../components';
import day from 'dayjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('You must be logged in');
    return redirect('/login');
  }

  if (user.role !== 'admin') {
    toast.error('Unauthorized');
    return redirect('/');
  }

  return null; // React Query سيجلب البيانات
};

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem('user'));

  // 🔥 React Query fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await customFetch.get('/orders');
      return res.data;
    },
  });




  const ordersQuery = (user) => ({
  queryKey: ['orders'],
  queryFn: () =>
    customFetch.get('/orders', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }),
});
  // 🔥 تحديث الطلب
  const updateOrder = async (id) => {
    try {
      await customFetch.patch(`/orders/${id}`, {
        paymentIntentId: 'fakePayment',
      });

      toast.success('Order updated');

      // 🔥 تحديث تلقائي بدون reload
      queryClient.invalidateQueries(['orders']);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;

  const { orders, count } = data;

  if (count < 1) {
    return <SectionTitle text="No orders found" />;
  }

  return (
    <>
      <SectionTitle text="All Orders (Admin)" />

      <div className="mt-8 overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const {
                _id,
                total,
                status,
                createdAt,
                orderItems,
                user,
              } = order;

              const date = day(createdAt).format(
                'hh:mm a - MMM Do, YYYY'
              );

              return (
                <tr key={_id}>
                  <td>{user}</td>
                  <td>{orderItems.length}</td>
                  <td>{total}</td>
                  <td>{status}</td>
                  <td>{date}</td>

                  <td>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => updateOrder(_id)}
                    >
                      Mark Paid
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrders;
