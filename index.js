// Your code here
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord)
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date
    })
    return employeeRecord
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date
    })
    return employeeRecord
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date)
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0)
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPay, employeeRecord) => totalPay + allWagesFor(employeeRecord), 0)
  }