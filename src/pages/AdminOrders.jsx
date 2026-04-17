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

      if (
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        return redirect('/login');
      }

      return null;
    }
  };

const AdminOrders = () => {
  const { orders, count } = useLoaderData();

  // ✅ هنا أضفنا الدالة
  const updateOrder = async (id) => {
    try {
      await customFetch.patch(`/orders/${id}`, {
        paymentIntentId: 'fakePayment',
      });

      toast.success('Order updated');

      // ❌ بدل reload الأفضل (لكن أبقيتها حسب طلبك)
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error('Update failed');
    }
  };

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

                  {/* ✅ زر التحديث */}
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
