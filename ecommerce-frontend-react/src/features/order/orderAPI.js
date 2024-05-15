export function createOrder(order) {
  console.log(order);
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateOrder(order) {
  console.log(order);
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  // filter = {"category" : ["smartphone", "laptop"]}        // aane wala data kuchh iss tarah ka hoga..
  // sort = { _sort: "price", _order="desc"}
  // pagination = {_page: 1, _limit=10}

  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;     // jaise hi /admin/orders/ page render hoga to useeffect chalega aur jab useEffect chalega to wo ek action dispatch karega jo ki ye function hoga fetchAllOrdersAsync({ sort, pagination }) --> iss function ko handle karne ka kaam orderSlice karega jo ki fetchAllOrders() function ko call karea jo ki iss page me defined hai, yahi wo function hai jo json-server se data fetch karke layega all orders ka pagination ke hisab se aur sorting ke base pe. admin page ke render hone baad se sorting apply kar sakta hai, page jab render hoga to usme sorting apply nahi hogi, sorting baad me apply hogi jab admin table ke uss heading per click karega jisme sorting ka logic likha hua hai. first me ye function pagination ke hisab se data fetch karke layega. jab admin sort karke data ko acess karne chahega tab dobara se useEffect chalega aur fir jo data aayega wo sorting ke base per aayega. kyuki uss time queryString change ho jayegi..
    // console.log(queryString);                     // _page=1&_limit=10&  
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;    // isme key wo hogi jo sort object me available hogi... jab koi cheej sort karte hain to usme useEffect se pagination ka data bhi aayega.. ki kon se page me sort karna hai...
    // console.log(queryString);              // _sort=&_order='asc'
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/orders?" + queryString);

    const data = await response.json();
    // console.log(data);
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function RemoveOrder(orderID){
  return new Promise(async (resolve) => {
    const response = await fetch(``)
  })
}