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
// great variable names
function findEmployeeByName(name, employeesArr) {
  // I like seeing array methods, but take note of what the method is supposed to return
  // and what you're actually returning
  return employeesArr.filter(curr => curr.name === name)
}
//
//
//
//
//
function findManagerFor(employee, employeesArr) {
  // and in this function, the first parameter IS already the object
  // so you actually are doing extra work!
  employee = findEmployeeByName(employee, employeesArr)
  const manager = employeesArr.filter(
    curr => employee.managerId === curr.id
  )
  // similar idea here, what does filter return and what do we want
  if (manager.length > 0) return manager
  return employee
}
//
//
//
//
//
// I like the idea of the approach, filtering based on similar managers!
function findCoworkersFor(employee, employeesArr) {
  employee = findEmployeeByName(employee, employeesArr)
  return employeesArr.filter(curr => { // <- having that bracket MEANS you need an explicit return
    // be wary of implicit and explicit returns with arrow functions
    findManagerFor(curr, employeesArr) ===
      findManagerFor(employee, employeesArr)
  })
}

console.log(findManagementChainForEmployee(employees[6].name, employees))
//
//
//
//
//
// I never thought of doing this iteratively! wow!!
// I think this could be optimized slightly, but great!
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

// so this is written by mutating the array
// would it be possible to write it without mutations?
// we can talk about why that may or may not be a cool thing to do during office hours if you want
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

// I like the recursive idea here and adding some kind of '-'
// good base case too!
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
