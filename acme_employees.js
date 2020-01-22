const employees = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 },
  { id: 3, name: 'curly', managerId: 1 },
  { id: 5, name: 'groucho', managerId: 3 },
  { id: 6, name: 'harpo', managerId: 5 },
  { id: 8, name: 'shep Jr.', managerId: 4 },
  { id: 99, name: 'lucy', managerId: 1 }
]
//
//
//
//
//
function findEmployeeByName(name, employeesArr) {
  return employeesArr.filter(curr => curr.name === name)
}
//
//
//
//
//
function findManagerFor(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr)
  const manager = employeesArr.filter(
    curr => employee.managerId === curr.id
  )
  if (manager.length > 0) return manager
  return employee
}
//
//
//
//
//
function findCoworkersFor(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr)
  return employeesArr.filter(curr => {
    findManagerFor(curr, employeesArr) ===
      findManagerFor(employee, employeesArr)
  })
}
//
//
//
//
//
function findManagementChainForEmployee(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr)
  let returnArr = []
  let idToFind = employee[0].managerId
  for (let i = 0; idToFind > 0; i++) {
    for (let j = 0; j < employeesArr.length; j++) {
      if (employeesArr[j].id === idToFind) {
        if (idToFind === 1) {
          returnArr.push(employeesArr[j])
          idToFind--
        } else {
          idToFind = employeesArr[j].managerId
          returnArr.push(employeesArr[j])
        }
      }
    }
  }
  return returnArr.reverse()
  //     (attempted with recursion)
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
//
//
//
function generateManagementTree(arr) {
  const boss = arr.find(curr => curr.managerId === undefined)

  function findReporters(currEmployee, arr) {
    currEmployee.reports = []
    const reporters = arr.filter(employee => {
      return employee.managerId === currEmployee.id
    })

    if (reporters === 'undefined') {
      return currEmployee.reports.concat([])
    }

    currEmployee.reports = reporters
    reporters.forEach(rep => findReporters(rep, arr))
    return currEmployee
  }
  findReporters(boss, arr)
  return boss
}

console.log(JSON.stringify(generateManagementTree(employees), null, 2))

const tree = {
  id: 1,
  name: 'moe',
  reports: [
    {
      id: 2,
      name: 'larry',
      managerId: 1,
      reports: [
        {
          id: 4,
          name: 'shep',
          managerId: 2,
          reports: [
            {
              id: 8,
              name: 'shep Jr.',
              managerId: 4,
              reports: []
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'curly',
      managerId: 1,
      reports: [
        {
          id: 5,
          name: 'groucho',
          managerId: 3,
          reports: [
            {
              id: 6,
              name: 'harpo',
              managerId: 5,
              reports: []
            }
          ]
        }
      ]
    },
    {
      id: 99,
      name: 'lucy',
      managerId: 1,
      reports: []
    }
  ]
}

// function displayManagementTree(tree) {
//   let returnStr = `${tree["name"]}\n`;
//   if (tree["reports"].length === 0) return returnStr;
//   return (
//     returnStr +
//     `${tree["reports"].forEach(curr => {
//       returnStr += "-";
//       return displayManagementTree(curr);
//     })}`
//   );
// }
// NOT WORKING. Couldn't do it.
// console.log(displayManagementTree(tree));
