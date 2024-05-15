export function fetchLoggedInUserOrders() {    
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/own`); 
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`/users/own`);
    const data = response.json();
    // console.log({ data });
    resolve({ data });
  });
}

// its for user which is edit himself profile...
export function updateUser(update) {
  // console.log(update);
  return new Promise(async (resolve) => {
    const response = await fetch(`/users/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}
