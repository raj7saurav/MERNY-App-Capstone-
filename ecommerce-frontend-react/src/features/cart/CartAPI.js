export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
};

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export function updateCart(update) {
  // console.log(update);
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });

    await response.json();
    // console.log(data);
    resolve({ data: { id: itemId } }); // yaha se deleteItemFromCartAsync iss function ko jisne ise call kiya hai cart ke item ko delete karne ke liye use response me itemId di ja ri hai jise wo delete kar dega.
  });
}

export async function resetCart() {
  try {
    const itemsResponse = await fetchItemsByUserId();
    const items = itemsResponse.data;

    // Use Promise.all to wait for all delete operations to complete
    await Promise.all(
      items.map(async (item) => {
        await deleteItemFromCart(item.id);
      })
    );

    return { status: "success" };
  } catch (error) {
    console.error("Error resetting cart:", error);
    throw error; // Propagate the error
  }
}
