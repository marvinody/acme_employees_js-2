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
  // if (employeesArr.find(curr => employee["managerId"] === curr["id"])) {
  return employeesArr.filter(curr => employee["managerId"] === curr["id"]);
  // } else {
  // return employee;
  // }
}

function findCoworkersFor(employee, employeesArr) {
  // employee = findEmployeeByName(employee, employeesArr);
  return employeesArr.filter(curr => {
    findManagerFor(curr, employeesArr) ===
      findManagerFor(employee, employeesArr);
  });
}

function findManagementChainForEmployee(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr);
  let returnArr = [];
  let idToFind = employee[0]["managerId"];
  for (let i = 0; idToFind > 0; i++) {
    for (let j = 0; j < employeesArr.length; j++) {
      if (employeesArr[j]["id"] === idToFind) {
        if (idToFind === 1) {
          returnArr.push(employeesArr[j]);
          idToFind--;
        } else {
          idToFind = employeesArr[j]["managerId"];
          returnArr.push(employeesArr[j]);
        }
      }
    }
  }
  return returnArr.reverse();
  // if (returnArr[0]) {
  //   if (returnArr[0]["id"] === 1) return returnArr;
  // }
  // returnArr.unshift(
  //   employeesArr.find(curr => {
  //     curr["id"] === employee["managerId"];
  //   })
  // );
  // employee = employeesArr.find(curr => {
  //   curr["id"] === employee["managerId"];
  // });
  // return returnArr.concat(
  //   findManagementChainForEmployee(employee, employeesArr)
  // );
}

// [
//   { id: 1, name: 'moe' },
//   { id: 2, name: 'larry', managerId: 1 },
//   { id: 4, name: 'shep', managerId: 2 }
// ]
// console.log(findManagementChainForEmployee("shep Jr.", employees));
//
//
//
//
function generateManagementTree(arr) {
  const boss = arr.find(curr => curr["managerId"] === undefined);

  function findReporters(currEmployee, arr) {
    currEmployee["reports"] = [];
    const reporters = arr.filter(employee => {
      return employee["managerId"] === currEmployee["id"];
    });

    if (reporters === "undefined") {
      return currEmployee.reports.concat([]);
    }

    currEmployee["reports"] = reporters;
    reporters.forEach(rep => findReporters(rep, arr));
    return currEmployee;
  }
  findReporters(boss, arr);
  return boss;
}
console.log(JSON.stringify(generateManagementTree(employees), null, 2));

function displayManagementTree(tree) {
  let returnStr = "";
  function findInTree(obj, str) {
    if (tree["name"] === obj["name"]) {
      str += tree["name"];
      // if ()
      return str;
    }
    str += "-";
    return str + obj["reports"].forEach(curr => findInTree(curr, str));
  }
  findInTree(tree, returnStr);
  return returnStr;
}
console.log(Object.entries(generateManagementTree(employees), null, 2));

console.log(displayManagementTree(generateManagementTree(employees)));
