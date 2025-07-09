const bankInput = document.querySelector("#bank-amount");
const cashInput = document.querySelector("#cash-amount");
const messageInput = document.querySelector("#message");
const withdrawBtn = document.getElementById("withdraw");

withdrawBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputBank = bankInput.value.trim();
  const inputCash = cashInput.value.trim();
  const message = messageInput.value.trim();
  if (inputBank === "" || inputCash === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Enter a value!",
    }).then(() => {
      location.reload();
    });
    return;
  }
  if (isNaN(inputBank) || isNaN(inputCash)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please enter a valid number!",
    }).then(() => {
      location.reload();
    });
    return;
  }
  const bank = Number(inputBank);
  const cash = Number(inputCash);
  const action = "WITHDRAW";
  try {
    const payload = { action, bank, cash };
    if (message !== "") {
      payload.message = message;
    }
    const p = await axios.post("/api/v1/money/transactions", payload);
    const { transactionPhase: withdrawn, newBal: bal } = p.data;
    localStorage.setItem("shouldReload", "yes");
    Swal.fire({
      icon: "success",
      title: "✅ Amount withdrawn!",
      html: `
            <b>Withdrawn Amount :</b> ₹ ${(
              Number(withdrawn.bank) + Number(withdrawn.cash)
            ).toLocaleString("en-IN")}<br>
            <b>New Balance :</b> ₹ ${Number(bal.BALANCE).toLocaleString(
              "en-IN"
            )}
          `,
      confirmButtonColor: "#facc15",
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error in withdrawing amount!",
      text: error.response?.data?.msg || error.message,
    }).then(() => {
      location.reload();
    });
  }
});
