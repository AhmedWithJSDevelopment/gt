// import { Link, useLoaderData } from 'react-router-dom';
// import { formatPrice } from '../utils';

// const ProductsList = () => {
//   const { products } = useLoaderData();

//   return (
//     <div className='mt-12 grid gap-y-8'>
//       {products.map((product) => {
//         const { _id, name, price, image, company } = product;
//         const dollarsAmount = formatPrice(price);
//         return (
//           <Link
//             key={_id}
//             to={`/products/${_id}`}
//             className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
//           >
//             <img
//               src={image}
//               alt={name}
//               className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
//             />
//             <div className='ml-0 sm:ml-16'>
//               <h3 className='capitalize font-medium text-lg'>{name}</h3>
//               <h4 className='capitalize text-md text-neutral-content'>
//                 {company}
//               </h4>
//             </div>
//             <p className='font-medium ml-0 sm:ml-auto text-lg'>
//               {dollarsAmount}
//             </p>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };
// export default ProductsList;




// ------------------------------













import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsList = () => {
  const data = useLoaderData();

  // ✅ حماية في حال البيانات غير موجودة
  const products = data?.products || [];

  // ❌ إذا لا يوجد منتجات
  if (products.length === 0) {
    return (
      <div className="mt-12 text-center text-xl">
        No products found...
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        // ✅ حماية لكل منتج
        const {
          _id,
          name,
          price,
          image,
          company,
        } = product || {};

        const dollarsAmount = formatPrice(price || 0);

        return (
          <Link
            key={_id}
            to={`/products/${_id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            {/* IMAGE */}
            <img
              src={image || '/placeholder.png'}
              alt={name || 'product'}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />

            {/* INFO */}
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">
                {name || 'No Name'}
              </h3>

              <h4 className="capitalize text-md text-neutral-content">
                {company || 'Unknown'}
              </h4>
            </div>

            {/* PRICE */}
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
