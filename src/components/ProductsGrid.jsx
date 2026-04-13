import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const { _id, name, price, image } = product;
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            key={_id}
            to={`/products/${_id}`}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={name}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{name}</h2>
              <span className='text-secondary'>{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
