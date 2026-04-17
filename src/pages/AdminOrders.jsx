import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { SectionTitle } from '../components';
import day from 'dayjs';

export const loader =
  (store) =>
  async () => {
    const user = store.getState().userState.user;

    // ❌ ليس مسجل دخول
    if (!user) {
      toast.warn('You must be logged in');
      return redirect('/login');
    }

    // ❌ ليس أدمن
    if (user.role !== 'admin') {
      toast.error('Unauthorized access');
      return redirect('/');
    }

    try {
      const response = await customFetch.get('/orders');

      return {
        orders: response.data.orders,
        count: response.data.count,
      };
    } catch (error) {
      console.log(error);

      toast.error('Error fetching admin orders');

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect('/login');
      }

      return null;
    }
  };

const AdminOrders = () => {
  const { orders, count } = useLoaderData();

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
