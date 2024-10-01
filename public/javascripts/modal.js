function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  resetModal();
  modal.style.display = 'none';
}

function resetModal() {
  modalHeader.textContent = 'DEFAULT';
  modalBody.innerHTML = '';
  modalFooter.innerHTML = '';
}

closeButton.onclick = closeModal;

// window.onclick = function (event) {
//   if (event.target == modal) closeModal();
// };
