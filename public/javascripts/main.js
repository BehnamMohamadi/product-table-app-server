renderTable();

// Rendering Functions
async function renderTable() {
  const response = await fetch('http://localhost:3001/users-data')
  const users = await response.json()

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const tableColumns = ["No.", ...tablePattern]
    .map((column) => {
      if (column === "id") {
        return `<th>${"productID"}</th>`;
      }

      return `<th>${column}</th>`;
    })
    .join("");

  thead.innerHTML = `<tr>${tableColumns}</tr>`;

  for (const [index, product] of products.entries()) {
    tbody.innerHTML += `
    <tr onclick="renderReadProduct(${product.id})">
      <td>${index + 1}</td>
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.rating}</td>
      <td>${product.stock}</td>
      <td>${product.brand}</td>
      <td>${product.category}</td>
    </tr>`;
  }
}

async function renderReadProduct(id) {
  //  const user = await findUser(id);
  const product = products.find((product) => product.id === id);

  modalHeader.textContent = "Product Info";

  modalBody.innerHTML = Object.keys(product)
    .map(
      (property) => `<p><strong>${property}:</strong> ${product[property]}</p>`
    )
    .join("");

  modalFooter.innerHTML = `
     <button class="button" onclick="renderUpdateProduct(${id})">Update</button>
     <button class="button" onclick="deleteProduct(${id})">delete</button>`;

  openModal();
}

function renderCreateProduct() {
  modalHeader.textContent = "Add new Product";

  modalBody.innerHTML = tablePattern
    .map((property) => {
      if (property === "id") {
        return `<input type="number" min="0" id="${property}"  class="create-inputs" value="" placeholder="${property}" />`;
      }

      return `<input type="text" id="${property}"  class="create-inputs" value="" placeholder="${property}" />`;
    })
    .join("");

  modalFooter.innerHTML = `
    <button class="button" onclick="createProduct()">Save</button>
    <button class="button" onclick="modalClose()">Cancel</button>`;

  openModal();
}

async function renderUpdateProduct(id) {
  // const response = await fetch("http://localhost:3001/users-data");
  // const products = await response.json();

  const product = products.find((product) => product.id === id);

  modalHeader.textContent = "Edit product Info";

  modalBody.innerHTML = Object.keys(product)
    .map((property) => {
      if (property === "id") {
        return `<input type="text" id="${property}"  class="update-inputs" value="${product[property]}" placeholder="${property}" disabled />`;
      }
      return `<input type="text" id="${property}"  class="update-inputs" value="${product[property]}" placeholder="${property}" />`;
    })
    .join("");

  modalFooter.innerHTML = `
    <button class="button" onclick="updateProduct(${id})">Save</button>
    <button class="button" onclick="renderReadproduct(${id})">Cancel</button>`;
}

// // Operational Functions
async function createProduct() {
  const createInputs = document.querySelectorAll(".create-inputs");

  for (const input of createInputs) {
    if (input.value.trim() === "") return alert("invalid input");
  }

  const data = Array.from(createInputs).map((input) => ({
    id: input.id,
    value: input.value,
  }));
  console.log(data);

  // await fetch("http://localhost:3001/table", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     action: "create",
  //     uid: uid,
  //     data: data,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  const newProduct = {};
  for (const property of data) {
    newProduct[property.id] = property.value;
  }
  products.push(newProduct);

  closeModal();
  renderTable();
}

async function updateProduct(id) {
  const updateInputs = document.querySelectorAll(".update-inputs");

  for (const input of updateInputs) {
    if (input.value.trim() === "") return alert("invalid input");
  }

  const data = Array.from(updateInputs).map((input) => ({
    id: input.id,
    value: input.value,
  }));

  // await fetch("http://localhost:3001/table", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     action: "update",
  //     uid: uid,
  //     data: data,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  console.log(data);
  const newInfo = {};
  for (const property of data) {
    newInfo[property.id] = property.value;
  }
  const indexOfProduct = products.indexOf((product) => product.id === id);
  products.toSpliced(indexOfProduct, 1, newInfo);

  closeModal();
  renderTable();
}

async function deleteUser(uid) {
  await fetch("http://localhost:3001/table", {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      uid: uid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  closeModal();
  renderTable();
}

function deleteAllUsers() {
  usersData = [];

  renderTable();
}

// async function findUser(uid) {
//   const response = await fetch("http://localhost:3001/users-data");
//   const users = await response.json();

//   return users.find((user) => user.uid === uid);
// }