const employee = {
  First_Name: "",
  Last_Name: "",
  Badge: {
    In: [{}], //push data -> "badgeType : dateTime"
    Out: [{}],
  },
};

const employeeData = [employee];

let i = 0;
function createEmployee(data) {
  data.forEach((row) => {
    // console.log(`row${++i}`, row);

    for (const key in row) {
      //   console.log("key data: ", `${row["First Name"]}`, `${row["Last Name"]}`);
      var temp = employee;
      temp.First_Name = row["First Name"];
      temp.Last_Name = row["Last Name"];
      temp.Badge.In.Source = row["Source"];
      temp.Badge.In.Date_Time = row["Panel Date"];

      employeeData.push(temp);
    }
  });
  console.log("employee data: ", employeeData);
}
