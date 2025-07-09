const bankInput = document.querySelector("#bank-amount");
const cashInput = document.querySelector("#cash-amount");
const editBtn = document.getElementById("edit");

editBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputBank = bankInput.value.trim();
  const inputCash = cashInput.value.trim();
  if (inputBank === "" || inputCash === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Enter a value!",
    });
    return;
  }
  if (isNaN(inputBank) || isNaN(inputCash)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please enter a valid number!",
    });
    return;
  }
  const BANK = Number(inputBank);
  const CASH = Number(inputCash);
  const BALANCE = BANK + CASH;
  try {
    const p = await axios.patch("/api/v1/money", { BALANCE, BANK, CASH });
    localStorage.setItem("shouldReload", "yes");

    Swal.fire({
      icon: "success",
      title: "✅ Balance updated!",
      html: `
          <b>New Balance:</b> ₹ ${Number(p.data.BALANCE).toLocaleString(
            "en-IN"
          )}<br>
          <b>Bank:</b> ₹ ${Number(p.data.BANK).toLocaleString("en-IN")}<br>
          <b>Cash:</b> ₹ ${Number(p.data.CASH).toLocaleString("en-IN")}
        `,
      confirmButtonColor: "#facc15",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error updating balance!",
      text: error.response?.data?.msg || error.message,
    });
  }
});
