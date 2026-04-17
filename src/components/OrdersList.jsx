// import { useLoaderData } from 'react-router-dom';
// import day from 'dayjs';
// import advancedFormat from 'dayjs/plugin/advancedFormat';
// day.extend(advancedFormat);

// const OrdersList = () => {
//   // const { orders, meta } = useLoaderData();
//   const { orders, count } = useLoaderData();


//   return (
//     <div className='mt-8'>
//       <h4 className='mb-4 capitalize'>
//         total orders : {count}
//       </h4>
//       <div className='overflow-x-auto'>
//         <table className='table table-zebra'>
//           {/* head */}
//           <thead>
//             <tr>
//               <th>Products</th>
//               <th>Cost</th>
//               <th>Date</th>
//               <th className='hidden sm:block'>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => {
//               const id = order.id;
//                const { _id, total, createdAt, orderItems } = order;
//               const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
//               return (
//                 <tr key={_id}>
//                   <td>{orderItems.length}</td>
//                   <td>{total}</td>
//                   <td className='hidden sm:block'>{date}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// export default OrdersList;

// -----------------------


import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, count } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">
        total orders : {count}
      </h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Products</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const { _id, total, createdAt, orderItems } = order;

              const date = day(createdAt).format(
                'hh:mm a - MMM Do, YYYY'
              );

              return (
                <tr key={_id}>
                  <td>{orderItems.length}</td>
                  <td>{total}</td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
