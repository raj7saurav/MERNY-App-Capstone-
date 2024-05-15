export function createProduct(product) {
  console.log(product);
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

// for get products from database..
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category" : ["smartphone", "laptop"]}        // aane wala data kuchh iss tarah ka hoga..
  // sort = { _sort: "price", _order="desc"}
  // pagination = {_page: 1, _limit=10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key]; // ye user per depend karta hai ki usne filter object me kon si key me click kiya hai. fir uske baad 'filter' object mein current key ke sath associated values ka array lein. kyuki humne filter[key] kiya hai to hame uss key ki sari values mil jayengi jo ki ek array hai... to hame wo poora array mil jayega..
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`; // http://localhost:3000/products?category=laptops....
      // console.log(queryString);
    }
  }

  for (let key in sort) {
    //  --> sort = {_sort: 'price', _order: 'asc'}
    queryString += `${key}=${sort[key]}&`; // queryString kuchh aisi ho jayegi --> _sort=price&_order=desc& --> ye aise URL me add ho jayega..
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; // queryString kuchh aisi ho jayegi --> _page=1&_limit=10 -> ye aise URL me add ho jayega..
  }

  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/products?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count"); // ye 'X-Total-Count' hame json-server hi deta hai response me jo ki ye batata hai ki kitne products abhi available hain.
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

// update the product
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${update.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(update),
    });

    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
