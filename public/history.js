const box = document.getElementById("transBox");

const getTransactions = async () => {
  try {
    const p = await axios.get("/api/v1/money/history");
    const { getAll: transactions } = p.data;
    if (transactions.length < 1) {
      box.innerHTML = `<div class="flex justify-center p-4 bg-gray-50 rounded hover:bg-gray-100">
    <span class="text-sm text-gray-700">
        History is empty
    </span>
</div>`;
      return;
    }
    const colors = {
      ADD: "green",
      WITHDRAW: "red",
      BORROW: "blue",
      LEND: "purple",
    };
    const allTrans = transactions
      .map((data) => {
        const { action, bank, cash, date, message } = data;
        const { _id: id } = data;
        const color = colors[action];
        const am1 = bank + cash;
        const amount = am1.toLocaleString("en-IN");
        return `<div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded hover:bg-gray-100">
    <span class="text-sm font-semibold text-${color}-600">${action}</span>
    <span class="text-right text-sm sm:text-lg font-bold text-gray-800">₹ ${amount}</span>
    <span class="text-right text-sm text-gray-500">${date}</span>
    <span class="col-span-2 text-sm text-gray-700">
        ${message}
    </span>
    <span class="font-bold inline-block text-xs sm:text-sm px-2 py-1 cursor-pointer rounded bg-red-600 text-center text-white hover:bg-red-700" onclick ="deleteTransaction('${id}')">DELETE</span>
</div>`;
      })
      .reverse()
      .join("");
    box.innerHTML = allTrans;
    document.getElementById(
      "clearHistory"
    ).outerHTML = `<div class="mt-6 flex justify-center">
        <a class=" font-bold cursor-pointer inline-block text-center px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm sm:text-base" onclick="deleteHistory()">
            CLEAR HISTORY
        </a>
    </div>`;
  } catch (error) {
    box.innerHTML = `<div class="flex justify-center p-4 bg-gray-50 rounded hover:bg-gray-100">
    <span class="text-sm text-gray-700">
        There was an error fetching history....Try again...
    </span>
</div>`;
  }
};
getTransactions();

const deleteTransaction = async (id) => {
  try {
    await axios.delete(`/api/v1/money/transactions/${id}`);
    location.reload();
    localStorage.setItem("shouldReload", "yes");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error in deleting transaction!",
      text: error.response?.data?.msg || error.message,
    });
  }
};

const deleteHistory = async () => {
  try {
    await axios.delete("/api/v1/money/transactions");
    location.reload();
    localStorage.setItem("shouldReload", "yes");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error in deleting transaction!",
      text: error.response?.data?.msg || error.message,
    }).then(() => {
      location.reload();
      localStorage.setItem("shouldReload", "yes");
    });
  }
};
