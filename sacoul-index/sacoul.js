let logoImg = document.querySelector(".img-responsive");
console.log(logoImg);
logoImg.src =
  "https://lh3.googleusercontent.com/pw/AP1GczMNXhKBwniYeFsobgYKIWAg1Qpag-u_qahdgPU0rglaZ_kOL89i3mBOgj5DaldtqwI5jtFc_Rpqn15xQ8X7tWU6KQqlaARBddqgoXmxBDPSKeEzW19jnz0BxDdwfLcTrn38VWR79b388nvY7-bilrNVg3jVBPt_-gwweNW28JOl1nOKTpPjjOPFDy4ctE4tjYnOI83O99l3J62hjiTy2OwJm7-DK9fVYxYvuUKvTnsVA27bn0w_Fp_BuqWpRsRekCS_Xt4908qAZxpU2KaZI7JtecfJeSJCq_KhryolFQjoUwgk8GV_riuSjvNbGGLSobWkt5ofyljbCPFyrI-2Ls6SUMYKfme49cpd-BQ6xJmBIs5f2d7SXzP0gK85vdTvcxet8be-4RfoFALBfpQHFiKaWv0iw8O5b-RTZz4iPE23tUa6z-jMwl_76x3rC8pM8Cbwzi9csvHjYDgZ9CIXs7VJhIAH9eRDMt78NWeLTKfe9ucCiqwfUELS14HNyHMLJRgSk5Hk791Ewm4MDoL_kILTDjYb5HZs2IqhBpkji1nlE0RbSqtruLhMrOpNwLf4pfgGF9MZDGBN3FW8zwFykZ_sr5IjweRqewNQzKvVLQu4mZUt9PFpakj8anD-kqrF2NAvb0fMyhXkpTaP5oXA-m0xolLJgN8PYehDc96GshX2z3dWXR9otJvAlnnw4-CGK-wcYQunp10NGQYvYWRYTJsRUXo8qDBHyPgxODvzii9NBaboUYdyj_zeYV02g-IbcX8m5VN0NZGVWQ0WNYHrB6nS91Vg4fEGzOTBhgOphuiYKOdPntGwBebyU3UUfIFB3QlEuSzNnyiU6CpDVxdDypzDb99xXqFJREEEz25J82zCKyTD5atwC1lrF4vi1O_cxFUEKRXflsTCZes_q-oys8iMiy9NDguQzd-d65IgMDuchBIjuCrHmp88QHA=w400-h225-s-no-gm?authuser=0";

const logoContainer = document.querySelector(".logo-h");
logoContainer.classList.remove("col-sm-2", "col-xs-12");
logoContainer.classList.add("col-sm-4");
const row = document.querySelector(".top-head.container-h");
row.classList.add("pl-2");
console.log(row);

const searchContainer = document.querySelector(
  ".col-sm-4.col-xs-7.main.search-form-box"
);
searchContainer.classList.remove("col-xs-7", "col-sm-4");
searchContainer.classList.add("col-xs-4");
console.log(searchContainer);

const rightMenu = document.querySelector(".col-xs-5.acount-section");
rightMenu.classList.remove("col-xs-5");
rightMenu.classList.add("col-xs-4");
console.log(rightMenu);

const mainHeader = document.querySelector(".main-header");
console.log(mainHeader);

// Temporary hide the search button and get the other items to the right
const iconsContainer = document.querySelector(".acount-section.col-xs-4");
console.log(iconsContainer);
iconsContainer.classList.add("col-lg-8");

// Unhide wishlist
const wishlist = document.querySelector(".wishlist-header.hide");
wishlist.classList.remove("hide");

// clean search form
