function newEmployee(first, last) {
  return {
    "First Name": first,
    "Last Name": last,
    Badge: {},
  };
}

//
function createEmployees(data) {
  //let i = 0;
  const employees = [];

  data.forEach((row) => {
    const first = row["First Name"];
    const last = row["Last Name"];

    if (!first || !last) {
      return;
    }
    if (
      /\bcontractor\b/i.test(first) ||
      /\btemporary\b/i.test(first) ||
      /\bemployee\b/i.test(last)
    )
      return;

    let temp = null;

    for (const employeeCount in employees) {
      const person = employees[employeeCount];

      if (person["First Name"] === first && person["Last Name"] === last)
        temp = person;
    }

    if (!temp) {
      temp = newEmployee(first, last);
      employees.push(temp);
    }

    const badgeType = row["Source"];
    const dateTime = row["Panel Date"];

    if (!temp.Badge[badgeType]) {
      temp.Badge[badgeType] = [];
    }

    const entry = {};
    entry[badgeType] = dateTime;
    temp.Badge[badgeType].push(entry);
  });
  console.log("Employees: ", employees);
  return employees;
}

function calculateHours(data) {}
