const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

const modalHeader = document.querySelector(".modal-header > h2");
const modalBody = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");

const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];
const modalButton = document.getElementById("myBtn");

const tablePattern = [
  "id",
  "title",
  "price",
  "rating",
  "stock",
  "brand",
  "category",
];

const products = [
  {
    id: 1,
    title: "iPhone 9",
    price: 549,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
  },
  {
    id: 2,
    title: "iPhone X",
    price: 899,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    price: 1249,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
  },
  {
    id: 4,
    title: "OPPOF19",
    price: 280,
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    category: "smartphones",
  },
  {
    id: 5,
    title: "Huawei P30",
    price: 499,
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    category: "smartphones",
  },
];
