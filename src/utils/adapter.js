// 🔁 تحويل Product
export const adaptProduct = (product) => {
    return {
      id: product._id,
      attributes: {
        name: product.name,
        price: product.price,
        description: product.description,
        image: {
          data: {
            attributes: {
              url: product.image,
            },
          },
        },
        category: product.category,
        company: product.company,
        colors: product.colors,
        featured: product.featured,
        freeShipping: product.freeShipping,
        inventory: product.inventory,
        averageRating: product.averageRating,
        numOfReviews: product.numOfReviews,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  };
  
  // 🔁 تحويل قائمة Products
  export const adaptProducts = (products) => {
    return {
      data: products.map(adaptProduct),
    };
  };
  
  // 🔁 تحويل Order
  export const adaptOrder = (order) => {
    return {
      id: order._id,
      attributes: {
        total: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        shippingFee: order.shippingFee,
        status: order.status,
        orderItems: order.orderItems,
        createdAt: order.createdAt,
      },
    };
  };
  
  // 🔁 تحويل User
  export const adaptUser = (user) => {
    return {
      id: user.userId,
      attributes: {
        name: user.name,
        role: user.role,
      },
    };
  };