
const url = 'AttendanceRegister.json'

function report(){
    fetch(url).then(response => response.json())
    .then((data) => {
        displayAttendance(data)
    }).catch(error => console.log(error)) 
}

attendanceReport = document.querySelector(".details")

function timeDiff(start,end) {
    hoursDifference = parseInt(end / 100 - start/100 -1);
    minutesDifference = parseInt(end % 100 + (60 - start%100));
    if(minutesDifference >= 60){
        hoursDifference++;
        minutesDifference -= 60;
    }
    if(minutesDifference == 0){
        totalDifference = (hoursDifference).toString() + ':' + "00"+' hrs';
    }
    else{
        totalDifference = (hoursDifference).toString() + ':' + (minutesDifference).toString()+' hrs';
    }
    
    return totalDifference;
}

    


function displayAttendance(data) {
    attendanceTable = document.querySelector(".attendance-table")
    attendanceTable.innerHTML=""
    const header = document.createElement('tr');
    const nameHead = document.createElement('th');
    nameHead.textContent = 'Employee Name';
    const dateHead = document.createElement('th');
    dateHead.textContent = 'Date';
    const inHead = document.createElement('th');
    inHead.textContent = 'CheckIn Time';
    const outHead = document.createElement('th');
    outHead.textContent = 'CheckOut Time';
    const deptHead = document.createElement('th');
    deptHead.textContent = 'Department';
    const workHrsHead = document.createElement('th');
    workHrsHead.textContent = 'Working Hours';
    header.appendChild(nameHead);
    header.appendChild(dateHead);
    header.appendChild(inHead);
    header.appendChild(outHead);
    header.appendChild(deptHead);
    header.appendChild(workHrsHead);
    attendanceTable.appendChild(header);

    var empName = document.getElementById('search-emp').value;
    empName = empName.toLowerCase();
    for(i = 0;i < data.length; i++){
        if(data[i]['employeName'].toLowerCase()===empName){
            const emp = document.createElement("li");
            var startTime = data[i]['checkinTime'];
            var endTime = data[i]['checkouttime'];
            startTime = startTime.replace(":","");
            endTime = endTime.replace(":","");
            var workingHours = timeDiff(parseInt(startTime),parseInt(endTime));
            //console.log(startTime,endTime);
            const empi = document.createElement("tr");
            const name = document.createElement("td");
            name.textContent = `${data[i]['employeName']}`
            const date = document.createElement('td');
            date.textContent = `${data[i]['date']}`
            const checkIn = document.createElement('td');
            checkIn.textContent = `${data[i]['checkinTime']}`
            const checkOut = document.createElement('td');
            checkOut.textContent = `${data[i]['checkouttime']}`
            const department = document.createElement('td');
            department.textContent = `${data[i]['dept']}`
            const workingH = document.createElement('td');
            workingH.textContent = workingHours;
            empi.appendChild(name);
            empi.appendChild(date);
            empi.appendChild(checkIn);
            empi.appendChild(checkOut);
            empi.appendChild(department);
            empi.appendChild(workingH);
            attendanceTable.appendChild(empi);

        }
       
    }
}