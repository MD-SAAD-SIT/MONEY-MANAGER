const box = document.getElementById("transBox");
const head = document.getElementById("mainHead");
const params = window.location.search;
const action = new URLSearchParams(params).get("action");
head.innerHTML = `${action} HISTORY`;
const getTransactions = async () => {
  try {
    const p = await axios.get("/api/v1/money/transactions", {
      params: { action },
    });
    const { transactions } = p.data;
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
        const { bank, cash, date, message, fullfilled } = data;
        const { _id: id } = data;
        const color = colors[action];
        const am1 = bank + cash;
        const amount = am1.toLocaleString("en-IN");
        let fullfill = "";
        if (action == "BORROW" || action == "LEND") {
          if (fullfilled == "YES") {
            fullfill = `<span class="text-center self-center inline-block text-xs sm:text-sm px-2 py-0.5 rounded bg-gray-500 text-white opacity-80 cursor-not-allowed select-none">FULLFILLED</span>`;
          } else {
            fullfill = `<span class="text-center self-center inline-block text-xs sm:text-sm bg-slate-800 px-2 py-0.5 rounded text-white font-semibold hover:bg-slate-900 cursor-pointer transition select-none fullfillButton" onclick="fullfillTrans('${id}')">CLICK TO FULLFILL</span>`;
          }
        }
        return `<div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded hover:bg-gray-100">
  <span class="text-sm font-semibold text-${color}-600">${action}</span>
  <span class="text-right text-sm sm:text-lg font-bold text-gray-800">₹ ${amount}</span>
  <span class="text-right text-sm text-gray-500">${date}</span>
  ${
    action === "BORROW" || action === "LEND"
      ? `
      <span class="text-sm text-gray-700 break-all max-w-xs">
        ${message || "No message provided."}
      </span>
      ${fullfill}
      <span class="self-center font-bold inline-block text-xs sm:text-sm px-2 py-0.5 cursor-pointer rounded bg-red-600 text-center text-white hover:bg-red-700" onclick="deleteTransaction('${id}')">
        DELETE
      </span>
    `
      : `
      <span class="text-sm text-gray-700 break-all max-w-xs col-span-2">
        ${message || "No message provided."}
      </span>
      <span class="self-center font-bold inline-block text-xs sm:text-sm px-2 py-1 cursor-pointer rounded bg-red-600 text-center text-white hover:bg-red-700" onclick="deleteTransaction('${id}')">
        DELETE
      </span>
    `
  }
</div>`;
      })
      .reverse()
      .join("");
    box.innerHTML = allTrans;
    document.getElementById(
      "clearHistory"
    ).outerHTML = `<div class="mt-6 flex justify-center">
        <a class=" font-bold cursor-pointer inline-block text-center px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm sm:text-base" onclick="deleteHistory()">
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

const fullfillTrans = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to mark this transaction as FULLFILLED?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, fullfill it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.patch(`/api/v1/money/transactions/${id}`, {
          fullfilled: "YES",
        });

        Swal.fire(
          "Fullfilled!",
          "Your transaction has been marked as fullfilled.",
          "success"
        ).then(() => {
          localStorage.setItem("shouldReload", "yes");
          location.reload();
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error in fullfilling transaction!",
          text: error.response?.data?.msg || error.message,
        });
      }
    }
  });
};

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
    await axios.delete(`/api/v1/money/transactions/action/${action}`);
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
