// const spacer = text => {
//   if (!text) {
//     return console.log("");
//   }
//   const stars = new Array(5).fill("*").join("");
//   console.log(`${stars} ${text} ${stars}`);
// };
// spacer("segiewgiuerg");
const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 }
];

function findEmployeeByName(name, employeesArr) {
  return employeesArr.filter(curr => curr["name"] === name);
}

function findManagerFor(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr);
  return employeesArr.filter(curr => employee["managerId"] === curr["id"]);
}

function findCoworkersFor(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr);
  return employeesArr.filter(curr => {
    findManagerFor(curr, employeesArr) ===
      findManagerFor(employee, employeesArr);
  });
}

function findManagementChainForEmployee(employee, employeesArr) {
  let returnArr = [];
  employee = findEmployeeByName(employee, employeesArr);
  if (returnArr[0]) {
    if (returnArr[0]["id"] === 1) return returnArr;
  }
  returnArr.unshift(
    employeesArr.find(curr => {
      curr["id"] === employee["managerId"];
    })
  );
  employee = returnArr[0];
  return returnArr.concat(
    findManagementChainForEmployee(employee, employeesArr)
  );
}

console.log(
  findManagementChainForEmployee(
    findEmployeeByName("shep Jr.", employees),
    employees
  )
);
// console.log(findEmployeeByName("shep", employees));
