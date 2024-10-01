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

