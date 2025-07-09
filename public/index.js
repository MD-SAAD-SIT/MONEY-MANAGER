const balance = document.querySelector('.balance');
const bank = document.querySelector('.bank');
const cash = document.querySelector('.cash');
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (localStorage.getItem("shouldReload") === "yes") {
      localStorage.removeItem("shouldReload");
      window.location.reload();
    }
  }
});
  
const showBalance = async () => {
    try {
        const {
            data: { bal }
        } = await axios.get('/api/v1/money');
        const formatter = new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 2,
        });

        balance.innerHTML = `BALANCE : ₹ ${formatter.format(bal.BALANCE)}`;
        bank.innerHTML = `BANK : ₹ ${formatter.format(bal.BANK)}`;
        cash.innerHTML = `CASH : ₹ ${formatter.format(bal.CASH)}`;
        
        
    } catch (error) {
        balance.innerHTML = `BALANCE : ERROR`;
        bank.innerHTML = `BANK : ERROR`;
        cash.innerHTML = `CASH : ERROR`;
    }
}
showBalance();