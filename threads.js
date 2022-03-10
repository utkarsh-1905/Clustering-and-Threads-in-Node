// Changing the threadpool size

process.env.UV_THREADPOOL_SIZE = 8;

// Since i have a hexacore cpu, i need to increase the number of processes

const crypto = require("crypto");

const start = Date.now();

// Testing for single thread processing

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});
// Results
//1:460

// Dual Threading
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});
// Results
// 1:460
// 2:465

// One thread pool consists of four threads and can handle four processes at a time

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

// Results
// 2: 618
// 4: 638
// 1: 691
// 3: 709
// Time increased due to multithreading in my pc

// Giving additional task to the thread pool

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

// Results
// 1: 528
// 4: 570
// 3: 577
// 2: 580
// 5: 995
// The last process gets executed when the thread pool is fully executed

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("6:", Date.now() - start);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("7:", Date.now() - start);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("8:", Date.now() - start);
});

// Results when running the code with 8 process in thread pool size of 4
// 4: 533
// 1: 604
// 2: 624
// 3: 631
// 5: 1102
// 6: 1136
// 8: 1158
// 7: 1182
