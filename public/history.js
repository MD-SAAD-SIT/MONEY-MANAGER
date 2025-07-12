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
        const color = colors[action];
        const amount = bank + cash;
        return `<div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded hover:bg-gray-100">
    <span class="text-sm font-semibold text-${color}-600">${action}</span>
    <span class="text-right text-sm sm:text-lg font-bold text-gray-800">₹ ${amount}</span>
    <span class="text-right text-sm text-gray-500">${date}</span>
    <span class="col-span-3 text-sm text-gray-700">
        ${message}
    </span>
</div>`;
      })
      .reverse()
      .join("");
    box.innerHTML = allTrans;
  } catch (error) {
    box.innerHTML = `<div class="flex justify-center p-4 bg-gray-50 rounded hover:bg-gray-100">
    <span class="text-sm text-gray-700">
        There was an error fetching history....Try again...
    </span>
</div>`;
  }
};
getTransactions();
