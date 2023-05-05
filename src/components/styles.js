import Swal from "sweetalert2";

const styles = {
  pageWrapper:
    "h-screen max-h-screen h-min-screen w-screen bg-blend-multiply  text-white select-none flex flex-col justify-between",
  //Main
  mainWrapper:
    "w-screen flex items-center justify-center gap-40 grid place-items-center",
  uppercontainer:
    "grid grid-cols-3 gap-30 px-2 font-semibold text-xl bg-[#191B1F] w-[50rem] rounded-2xl p-5",
  infocontainer: "gap-4 grid place-items-center",
  content: "bg-[#191B1F] w-[50rem] rounded-2xl p-5 mb-20",
  formHeader: "px-2 flex items-center justify-between font-semibold text-xl",
  transferPropContainer:
    "bg-[#20242A] my-3 rounded-2xl p-4 text-3xl border border-[#20242A] hover:border-[#41444F] flex justify-between",
  transferPropInput:
    "text-left m-2 bg-transparent border-transparent placeholder:text-[#B2B9D2] mb-2 w-full text-4xl",
  currencySelector: "flex w-1/4",
  currencySelectorContent:
    "w-full h-min flex justify-between text-xl font-medium p-2",
  currencySelectorIcon: "flex items-center",
  currencySelectorTicker: "-mx-2",
  currencySelectorArrow: "text-lg",
  inputImage: "hidden h-8 w-auto lg:block ml-6",
  buttonsContainer: "grid grid-cols-2 place-items-center",
  confirmButton:
    "bg-[#6091EB] border-[#6091EB] hover:border-[#FFF1F5] my-4 rounded-2xl py-3 px-14 text-2xl font-semibold flex items-center justify-center cursor-pointer border",
  //Navbar
  navBg: "bg-[#09121D] px-2 sm:px-4 py-2.5 rounded",
  navWrapper: "container flex flex-wrap justify-between items-center mx-auto",
  navItemsContainer:
    "flex items-center justify-center sm:items-stretch sm:justify-start",
  navItem: "flex flex-shrink-0 items-center text-xl font-extrabold mr-8",
  navImage: "hidden h-8 w-auto lg:block mr-2 ",
  accountContainer: "hidden w-full md:block md:w-auto",
  userContainer: "text-xl flex items-center font-bold",
  navButton:
    "bg-[#6091EB] border-[#6091EB] hover:border-[#FFF1F5] rounded-xl py-1 px-2 text-2xl font-bold cursor-pointer border",
  spinner:
    "inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300",

  //Footer
  footerWrapper: `font-extrabold flex place-content-center -ml-32 text-xl mb-2 text-white`,
};

//Swal Configurations
export const Toast = Swal.mixin({
  color: "white",
  background: "#69546E",
  toast: true,
  position: "top-start",
  timer: "4500",
  timerProgressBar: true,
  showConfirmButton: false,
});

export default styles;
