import axios from 'axios';

const productionUrl = ' https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

// --------------------

// import axios from 'axios';

// 🔥 رابط السيرفر مالك
// const productionUrl = 'https://node-course-e-commerce-n20s.onrender.com/api/v1'; 
// أو رابط Render إذا رافع السيرفر

// export const customFetch = axios.create({
  // baseURL: productionUrl,
  // withCredentials: true, // مهم للكوكيز
// });

// =========================
// 🔁 Adapter Functions
// =========================

// const adaptProduct = (product) => {
//   return {
//     id: product._id,
//     attributes: {
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       image: {
//         data: {
//           attributes: {
//             url: product.image,
//           },
//         },
//       },
//       category: product.category,
//       company: product.company,
//       colors: product.colors,
//       featured: product.featured,
//       freeShipping: product.freeShipping,
//       inventory: product.inventory,
//       averageRating: product.averageRating,
//       numOfReviews: product.numOfReviews,
//     },
//   };
// };

// const adaptProducts = (products) => {
//   return {
//     data: products.map(adaptProduct),
//   };
// };

// =========================
// 🔥 Interceptor (السحر هنا)
// =========================

// customFetch.interceptors.response.use(
//   (response) => {
//     const url = response.config.url;

    // 📦 كل المنتجات
    // if (url.includes('/products') && response.data.products) {
    //   response.data = adaptProducts(response.data.products);
    // }

    // 📦 منتج واحد
//     if (url.includes('/products/') && response.data.product) {
//       response.data = {
//         data: adaptProduct(response.data.product),
//       };
//     }

//     return response;
//   },
//   (error) => Promise.reject(error)
// );

// =========================
// 🧾 أدواتك القديمة (لا تتغير)
// =========================

// export const formatPrice = (price) => {
//   const dollarsAmount = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format((price / 100).toFixed(2));
//   return dollarsAmount;
// };

// export const generateAmountOptions = (number) => {
//   return Array.from({ length: number }, (_, index) => {
//     const amount = index + 1;
//     return (
//       <option key={amount} value={amount}>
//         {amount}
//       </option>
//     );
//   });
// };
