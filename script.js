//TIME AND DATE FUNCTION
dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var day = dayOfWeek[date.getDay()];
    var dateNum = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    dateNum = updateDate(dateNum);
    month = updateDate(month);

    document.querySelector('#date').innerHTML = `${day}, ` +  `${dateNum}` + '/' + `${month}` + '/' + `${year}`;

    let hour = date.getHours();
    let min = date.getMinutes();
    
    let midday
    midday = (hour >= 12) ? "PM" : "AM";

    if (hour > 12) {
        hour = hour - 12;
    }

    hour = updateDate(hour);
    min = updateDate(min);

    document.querySelector('#time').innerHTML = `${hour}` + ':' + `${min}` + ` ${midday}`;

    var t = setTimeout(function(){ currentTime() }, 1000);
  }

function updateDate(e) {
    if (e < 10) {
        return "0" + e;
    } else {
        return e
    }
}

currentTime();

//TASK LIST FUNCTION

let dailyList = [];
let weeklyList = [];
let monthlyList = [];
let oneTimeList = [];
let goalList = [];

//constructors
class newDailyTask {
    constructor(task,completed,active) {
        this.task = task;
        this.completed = completed;
        this.active = active;
    }
}

class newWeeklyTask {
    constructor(task,completed,active) {
        this.task = task;
        this.completed = completed;
        this.active = active;
    }
}

class newMonthlyTask {
    constructor(task,completed,active) {
        this.task = task;
        this.completed = completed;
        this.active = active;
    }
}

class newOneTimeTask {
    constructor(task,completed,active,dueYear,dueMonth,dueDay) {
        this.task = task;
        this.completed = completed;
        this.active = active;
        this.dueYear = dueYear;
        this.dueMonth = dueMonth;
        this.dueDay = dueDay;
    }
}

class newGoal {
    constructor(task,active,steps,stepsCompleted,dueYear,dueMonth,dueDay) {
        this.task = task;
        this.active = active;
        this.steps = steps;
        this.stepsCompleted = stepsCompleted;
        this.dueYear = dueYear;
        this.dueMonth = dueMonth;
        this.dueDay = dueDay;
    }
}

//localStorage.clear();

let loadedDailyList = localStorage.getItem("DAILYTASKSTORAGE")
let loadedWeeklyList = localStorage.getItem("WEEKLYTASKSTORAGE")
let loadedMonthlyList = localStorage.getItem("MONTHLYTASKSTORAGE")
let loadedOneTimeList = localStorage.getItem("ONETIMETASKSTORAGE")
let loadedGoalList = localStorage.getItem("GOALSTORAGE")

loadedDailyList = JSON.parse(loadedDailyList);
loadedWeeklyList = JSON.parse(loadedWeeklyList);
loadedMonthlyList = JSON.parse(loadedMonthlyList);
loadedOneTimeList = JSON.parse(loadedOneTimeList);
loadedGoalList= JSON.parse(loadedGoalList);

if (loadedDailyList) {
    loadList(loadedDailyList);
}  else {
    dailyList = [];
}

if (loadedWeeklyList) {
    loadList(loadedWeeklyList);
 }  else {
    weeklyList = [];
 }

 if (loadedMonthlyList) {
    loadList(loadedMonthlyList);
 }  else {
    monthlyList = [];
 }

 if (loadedOneTimeList) {
    loadList(loadedOneTimeList);
 }  else {
    oneTimeList = [];
 }

 if (loadedGoalList) {
     loadList(loadedGoalList)
 } else {
     goalList = [];
 }

 function loadList(array){
    array.forEach(item => {
        if (array == loadedDailyList) {
            let newTask = new newDailyTask(item.task,item.completed,item.active);
            dailyList.push(newTask);
        } else if (array ==loadedWeeklyList) {
            let newTask = new newWeeklyTask(item.task,item.completed,item.active);
            weeklyList.push(newTask);
        } else if (array ==loadedMonthlyList) {
            let newTask = new newMonthlyTask(item.task,item.completed,item.active);
            monthlyList.push(newTask);
        } else if (array == loadedOneTimeList) {
            let newTask = new newOneTimeTask(item.task, item.completed,item.active,item.dueYear,item.dueMonth,item.dueDay);
            oneTimeList.push(newTask);
        } else if (array == loadedGoalList) {
            let newGoalTask = new newGoal(item.task,item.active,item.steps,item.stepsCompleted,item.dueYear,item.dueMonth,item.dueDay)
            goalList.push(newGoalTask);
            //constructor(task,active,steps,stepsCompleted,dueYear,dueMonth,dueDay)
        }
    })
 }


 //arrange complete and incompleted task 

function arrangeTask(tasklist){
    let completedTask = tasklist.filter(task => task.completed);
    let uncompletedTask = tasklist.filter(task => !task.completed)

    completedTask.forEach( function(item) {
        uncompletedTask.push(item);
    })

    tasklist = uncompletedTask;

    return tasklist
}

dailyList = arrangeTask(dailyList); 
weeklyList = arrangeTask(weeklyList);
monthlyList = arrangeTask(monthlyList);

 updateList(dailyList);
 updateList(weeklyList);
 updateList(monthlyList);
 updateList(oneTimeList);

//function to add new tasks
function addDailyTask(task) {
    let newTask = new newDailyTask(task,false,false);
    dailyList.push(newTask);
}

function addWeeklyTask(task) {
    let newTask = new newWeeklyTask(task,false,false);
    weeklyList.push(newTask);
}

function addMonthlyTask(task) {
    let newTask = new newMonthlyTask(task,false,false);
    monthlyList.push(newTask);
}


//capture enter key press to add task

let input =  document.querySelector('#addtask');

input.addEventListener("keyup",function(e){
    if(e.keyCode === 13) {
        addTask(input.value);
    } 
})

//check active task and put in the front page

function checkActive() {

    alltask = dailyList.concat(weeklyList,monthlyList,oneTimeList);
    active = alltask.filter(task => task.active == true);

    if(active.length == 0) {
        document.querySelector('#current-task-type').innerHTML ="NO ACTIVE TASK"
        document.querySelector('#current-task-text').innerHTML = "";
    } else {
    if (active[0].constructor == newDailyTask) {
        document.querySelector('#current-task-type').innerHTML ="DAILY TASK"
    } else if (active[0].constructor == newWeeklyTask) {
        document.querySelector('#current-task-type').innerHTML ="WEEKLY TASK"
    } else if (active[0].constructor == newMonthlyTask) {
        document.querySelector('#current-task-type').innerHTML ="MONTHLY TASK"
    } else if (active[0].constructor == newOneTimeTask) {
        document.querySelector('#current-task-type').innerHTML ="ONE TIME TASK"
    }

    document.querySelector('#current-task-text').innerHTML = active[0].task;

    }
    console.log(active);
}

checkActive();

//calculate percentage and return in an array
let percentage;

function calculatePercentage() {

    let dailyPercent;
    let weeklyPercent;
    let monthlyPercent;

    dailyPercent = reducer(dailyList) / dailyList.length * 100;
    weeklyPercent = reducer(weeklyList) / weeklyList.length * 100;;
    monthlyPercent = reducer(monthlyList) / monthlyList.length * 100;;


    percentage = [dailyPercent,weeklyPercent,monthlyPercent];
    return percentage;

}

calculatePercentage();

//update progress circle on mainpage
updateMainPercentage();

function updateMainPercentage() {
    document.querySelector(".dailycircle").style.strokeDashoffset = 440 - (440 * percentage[0]) / 100;
    document.querySelector(".weeklycircle").style.strokeDashoffset = 440 - (440 * percentage[1]) / 100;
    document.querySelector(".monthlycircle").style.strokeDashoffset = 440 - (440 * percentage[2]) / 100;

    document.querySelector('#dailypercentnum').innerHTML = `${Math.floor([percentage[0]])}%`;
    document.querySelector('#weeklypercentnum').innerHTML = `${Math.floor(percentage[1])}%`;
    document.querySelector('#monthlypercentnum').innerHTML = `${Math.floor(percentage[2])}%`;

}

//update progress circle in overlay 
function progressRingOverlay() {

    if (type == 'weekly') {
        y = percentage[1];
    }  else if (type == 'daily') {
        y = percentage[0];
    } else if (type =='monthly') {
        y = percentage[2];
    } else {
        return;
    }

    //let oldOffSet  = document.querySelector(".overlaycircle").style.strokeDashoffset
    //document.querySelector(".overlaycircle").style.setProperty('--dashoffset', `${oldOffSet}`)
    document.querySelector(".overlaycircle").style.strokeDashoffset = 440 - (440 * y) / 100;
    //document.querySelector(".overlaycircle").classList.add('percentanimate')
    document.querySelector('.number').childNodes[1].innerHTML = `${Math.floor(y)}%`;

}

// update list on main page
function updateList(tasklist) {
    
    if (tasklist == weeklyList) {
        document.querySelector('#weekly-task-list').innerHTML =""
        
        if (tasklist.length <= 5) {
            for (let x = 0; x < tasklist.length; x++) {
                
                document.querySelector('#weekly-task-list').insertAdjacentHTML ('beforeend',`
                <li class="b${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }

    
        } else {
            for (let x = 0; x < 5; x++) {
                
                document.querySelector('#weekly-task-list').insertAdjacentHTML ('beforeend',`
                <li class="b${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }

            document.querySelector('#weekly-task-list').insertAdjacentHTML ('beforeend',`
                <p>...${tasklist.length-5} more task pending.</p`)
            
        }
        
        checkCompleteMain(weeklyList);

    } else if (tasklist == dailyList){ 
        document.querySelector('#daily-task-list').innerHTML =""

        if (tasklist.length <= 5) {
            for (let x = 0; x < tasklist.length; x++) {
                
                document.querySelector('#daily-task-list').insertAdjacentHTML ('beforeend',`
                <li class="c${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }
    
        } else {
            for (let x = 0; x < 5; x++) {
                
                document.querySelector('#daily-task-list').insertAdjacentHTML ('beforeend',`
                <li class="c${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }

            document.querySelector('#daily-task-list').insertAdjacentHTML ('beforeend',`
                <p>...${tasklist.length-5} more task pending.</p`)
            
        }
    
        checkCompleteMain(dailyList);
        
    }  else if (tasklist == monthlyList) {
        document.querySelector('#monthly-task-list').innerHTML =""


        if (tasklist.length <= 5) {
            for (let x = 0; x < tasklist.length; x++) {
                
                document.querySelector('#monthly-task-list').insertAdjacentHTML ('beforeend',`
                <li class="d${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }

    
        } else {
            for (let x = 0; x < 5; x++) {
                
                document.querySelector('#monthly-task-list').insertAdjacentHTML ('beforeend',`
                <li class="d${x}">
                    <i class="far fa-square" onclick="completeToggleMain(this)"></i>
                    <p> ${tasklist[x].task}</p>
                </li>
                `)
            }

            document.querySelector('#monthly-task-list').insertAdjacentHTML ('beforeend',`
                <p>...${tasklist.length-5} more task pending.</p`)
            
        }

        checkCompleteMain(monthlyList);
    } else if (tasklist== oneTimeList) {
        document.querySelector('#one-time-list').innerHTML =""


        if (tasklist.length <= 5) {
            for (let x = 0; x < tasklist.length; x++) {
                
                document.querySelector('#one-time-list').insertAdjacentHTML ('beforeend',`
                <li class="${x}">
                <div>
                    <i class="far fa-square" onclick="openCompleteOTMain(this)"></i>
                    <p class="opensans"> ${oneTimeList[x].task}</p>
                    
                </div>
                    <p class= "opensans" style="margin-left:0">Due Date: ${oneTimeList[x].dueDay}/${oneTimeList[x].dueMonth}/${oneTimeList[x].dueYear}</p>
                    <p class= "opensans" style="margin-left:0">${calculateTimeleft(oneTimeList[x])}</p>
            </li>
                `)
            }

    
        } else {
            for (let x = 0; x < 5; x++) {
                
                document.querySelector('#one-time-list').insertAdjacentHTML ('beforeend',`
                <li class="${x}">
                <div>
                    <i class="far fa-square" onclick="openCompleteOTMain(this)"></i>
                    <p class="opensans"> ${oneTimeList[x].task}</p>
                    
                </div>
                    <p class= "opensans" style="margin-left:0">Due Date: ${oneTimeList[x].dueDay}/${oneTimeList[x].dueMonth}/${oneTimeList[x].dueYear}</p>
                    <p class= "opensans" style="margin-left:0">${calculateTimeleft(oneTimeList[x])}</p>
            </li>
                `)
            }

            document.querySelector('#monthly-task-list').insertAdjacentHTML ('beforeend',`
                <p>...${tasklist.length-5} more task pending.</p`)
            
        }

    }

}

//check complete on main list
function checkCompleteMain(tasklist) {

    let y 

    if (tasklist == weeklyList) {
        y = 'b'
    } else if (tasklist == dailyList) {
        y = 'c'
    } else if (tasklist == monthlyList) {
        y = 'd'
    }

    if (tasklist.length <= 5) {
        for (let x = 0; x < tasklist.length; x++) {
            if (tasklist[x].completed == true) {
                document.querySelector(`.${y}${x}`).classList.add('completed')
                document.querySelector(`.${y}${x}`).childNodes[1].classList.remove(`fa-square`)
                document.querySelector(`.${y}${x}`).childNodes[1].classList.add(`fa-check-square`)
            } else {
                document.querySelector(`.${y}${x}`).classList.remove('completed')
                document.querySelector(`.${y}${x}`).childNodes[1].classList.add(`fa-square`)
                document.querySelector(`.${y}${x}`).childNodes[1].classList.remove(`fa-check-square`)
            }
        }
    } else {
        for (let x = 0; x < 5; x++) {
            if (tasklist[x].completed == true) {
                document.querySelector(`.${y}${x}`).classList.add('completed')
                document.querySelector(`.${y}${x}`).childNodes[1].classList.remove(`fa-square`)
                document.querySelector(`.${y}${x}`).childNodes[1].classList.add(`fa-check-square`)
            } else {
                document.querySelector(`.${y}${x}`).classList.remove('completed')
                document.querySelector(`.${y}${x}`).childNodes[1].classList.add(`fa-square`)
                document.querySelector(`.${y}${x}`).childNodes[1].classList.remove(`fa-check-square`)
            }
        }
    }
    console.log(tasklist)
}
//toggle copmplete on main page

function completeToggleMain(e){
    
    let x = e.parentNode.classList[0].split("")[1]
    let y = e.parentNode.classList[0].split("")[0]

    if ( y == "b") {
        if (weeklyList[x].completed == false) {
            weeklyList[x].completed = true; 
        }else {
            weeklyList[x].completed = false; 
        }
        
        weeklyList = arrangeTask(weeklyList)
        updateList(weeklyList);
        //checkCompleteMain(weeklyList);
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    } else if ( y == "c") {
        if (dailyList[x].completed == false) {
            dailyList[x].completed = true; 
        }else {
            dailyList[x].completed = false; 
        }

        dailyList = arrangeTask(dailyList);
        updateList(dailyList);
        //checkCompleteMain(dailyList);
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if ( y == 'd') {
        if (monthlyList[x].completed == false) {
            monthlyList[x].completed = true; 
        }else {
            monthlyList[x].completed = false; 
        } 
        
        monthlyList= arrangeTask(monthlyList);
        updateList(monthlyList)
        //checkCompleteMain(monthlyList);
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    }

    calculatePercentage();
    updateMainPercentage();
}
//add task to the respective array

let oneTimeTaskText;

function addTask() {
    let x = document.querySelector('#addtask').value

    if (x == "") {
        alert("Text field must not be empty");
        return
    }

    if (type == 'weekly') {
        addWeeklyTask(x);
        generateList(weeklyList);
        updateList(weeklyList)
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
        document.querySelector('#addtask').value = ""
    }  else if (type == 'daily') {
        addDailyTask(x);
        generateList(dailyList);
        updateList(dailyList);
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
        document.querySelector('#addtask').value = ""
    } else if (type =='monthly') {
        addMonthlyTask(x);
        generateList(monthlyList);
        updateList(monthlyList);
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
        document.querySelector('#addtask').value = ""
    } else if (type == 'one-time') {
        oneTimeTaskText = x;
        openDate();
    }

}

//open date picker overlay when adding new one time task 
let selectedDate = new Date();

function openDate() {
    document.querySelector('#date-box-overlay').style.display = 'flex';
    
    let selectedDate = new Date();
    updateCalendar(selectedDate);

    return selectedDate;
}

//close date picker 

function closeDate() {
    document.querySelector('#date-box-overlay').style.display = 'none';
    
    selectedDate = new Date();

    return selectedDate;
}

//update calendar 

month = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

function updateCalendar(selectedDate) {
   document.querySelector('#monthYearSelected').innerHTML = `${month[selectedDate.getMonth()]} ${selectedDate.getFullYear()} `
    
    document.querySelector('#date-bottom').innerHTML = "";

    document.querySelector('#date-bottom').insertAdjacentHTML ('beforeend',`
        <p>SUN</p>
        <p>MON</p>
        <p>TUE</p>
        <p>WED</p>
        <p>THU</p>
        <p>FRI</p>
        <p>SAT</p>
            `)

    let firstDayofMonth = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()}`,1);
    console.log(firstDayofMonth.getDay()); 

    if ( firstDayofMonth.getDay() !== 0) {
        for (let x=0;x<firstDayofMonth.getDay();x++) {
            document.querySelector('#date-bottom').insertAdjacentHTML ('beforeend',`
            <p></p>
            `)
        }
    }

    let numOfDays = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`,0);
    console.log(numOfDays.getDate())
   
    let currentDate = new Date();

    if (selectedDate.getFullYear() == currentDate.getFullYear() && selectedDate.getMonth() == currentDate.getMonth()) {
        
        for (let x =0; x < currentDate.getDate()-1; x++) {
            document.querySelector('#date-bottom').insertAdjacentHTML ('beforeend',`
            <p style="color:grey">${x+1}</p>
            `)
        } 

        for (let x = currentDate.getDate()-1; x <numOfDays.getDate(); x++) {
            document.querySelector('#date-bottom').insertAdjacentHTML ('beforeend',`
            <p onclick="selectDay(this)">${x+1}</p>
            `)
        }

    } else {
        for (let x = 0; x < numOfDays.getDate();x++) {
        document.querySelector('#date-bottom').insertAdjacentHTML ('beforeend',`
            <p onclick="selectDay(this)">${x+1}</p>
            `)
        }
    }
    
    console.log(selectedDate)
}

//change to next month 

function nextMth(){
    selectedDate = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`)
    updateCalendar(selectedDate);
}

//change to prev month 

function prevMth(){

    let currentDate = new Date();

    if (selectedDate.getFullYear() == currentDate.getFullYear() && selectedDate.getMonth() == currentDate.getMonth()) {
        alert('Due date can not be set in previous month');
        return;        
    }

    selectedDate = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()-1}`)
    updateCalendar(selectedDate);
}

//select day 

let selectedDay =0;

function selectDay(e) {
    if (document.querySelector(".selectedDay") !== null) {
        document.querySelector(".selectedDay").classList.remove('selectedDay');
    }
    
    e.classList.add('selectedDay');

    selectedDay = e.innerHTML;
    return selectedDay
}

// add one time task from date picker overlay 

function addOneTimeTask() {

    if (selectedDay == 0) {
        alert('Please select a date')
        return
    }

    let newTask = new newOneTimeTask(oneTimeTaskText,false,false,`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`,`${selectedDay}`);

    oneTimeList.push(newTask);
    
    localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))

    closeDate();
    generateOneTimeList();
    updateList(oneTimeList);

    selectedDay = 0;

    console.log(oneTimeList)
    document.querySelector('#addtask').value = ""
    selectedDate = new Date();
    return selectedDay;
}

//add one time task due on the same day

function addOneTimeTaskToday() {
    let currentDate = new Date();
    let newTask = new newOneTimeTask(oneTimeTaskText,false,false,`${currentDate.getFullYear()}`,`${currentDate.getMonth()+1}`,`${currentDate.getDate()}`);

    oneTimeList.push(newTask);
    
    localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))

    closeDate();
    generateOneTimeList();
    updateList(oneTimeList);

    selectedDay = 0;

    console.log(oneTimeList)
    document.querySelector('#addtask').value = ""
    selectedDate = new Date();
    return selectedDay;
}

//close confirm overlay 

function closeConfirmOverlay() {
    document.querySelector('#confirm-box-overlay').style.display ="none";
    if (type == 'one-time') {
        document.querySelector('#confirm-complete-box-overlay').style.display ='none';
    }
}

//delete confirmation
let x 

function deleteConfirm(e) {

    if (type == 'one-time'){
        x = e.parentNode.parentNode.classList[0];
        document.querySelector('#confirm-box-overlay').style.display ="flex";
        return x
    }

    x = e.parentNode.classList[0].split("")[1];
    document.querySelector('#confirm-box-overlay').style.display ="flex";
    return x
}

//delete task in overlay mode
function deleteTask() {
    //let x = e.parentNode.classList[0].split("")[1];
    if (type == 'weekly') {
        weeklyList.splice(x,1);
        generateList(weeklyList);
        updateList(weeklyList)
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    }  else if (type == 'daily') {
        dailyList.splice(x,1);
        generateList(dailyList);
        updateList(dailyList);
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if (type =='monthly') {
        monthlyList.splice(x,1);
        generateList(monthlyList);
        updateList(monthlyList);
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    } else if (type =='one-time'){
        oneTimeList.splice(x,1);
        generateOneTimeList();
        updateList(oneTimeList);
        localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))
        document.querySelector('#confirm-complete-box-overlay').style.display = 'none';
    }

    document.querySelector('#confirm-box-overlay').style.display ="none";
}

// toggle complete task

function completeToggle(e) {

    let x = e.parentNode.parentNode.classList[0].split("")[1]
    if (type == 'weekly') {
        if (weeklyList[x].completed == false) {
            weeklyList[x].completed = true; 
        }else {
            weeklyList[x].completed = false; 
        }
        checkComplete(weeklyList);
        checkCompleteMain(weeklyList);
        weeklyList = arrangeTask(weeklyList);
        updateList(weeklyList);
        generateList(weeklyList);
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    }  else if (type == 'daily') {
        if (dailyList[x].completed == false) {
            dailyList[x].completed = true; 
        }else {
            dailyList[x].completed = false; 
        }
        checkComplete(dailyList);
        checkCompleteMain(dailyList);
        dailyList = arrangeTask(dailyList);
        updateList(dailyList);
        generateList(dailyList);
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if (type =='monthly') {
        if (monthlyList[x].completed == false) {
            monthlyList[x].completed = true; 
        }else {
            monthlyList[x].completed = false; 
        }
        
        checkComplete(monthlyList);
        checkCompleteMain(monthlyList);
        monthlyList = arrangeTask(monthList);
        updateList(monthlyList);
        generateList(monthlyList);
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    } 

    
    calculatePercentage();
    updateMainPercentage();
    progressRingOverlay();

}
//determine type of task when opening overlay

let type 

function determineType(e) {
    if (e.id == 'manage-weekly') {
        document.querySelector('#tasktype').innerHTML = "WEEKLY TASK";
        generateList(weeklyList)
        type = 'weekly'
    } else if (e.id =='manage-daily') {
        document.querySelector('#tasktype').innerHTML = "DAILY TASK";
        generateList(dailyList)
        type = 'daily'
    } else if (e.id =='manage-monthly') {
        document.querySelector('#tasktype').innerHTML = "MONTHLY TASK";
        generateList(monthlyList)
        type = 'monthly'
    }   else if (e.id == 'current-task-change') {
        document.querySelector('#tasktype').innerHTML = "SET ACTIVE TASK";
        document.querySelector('#tasktype').insertAdjacentHTML('beforeend',`
            <p style="font-size: 0.5em;">SET A TASK TO BE DISPLAYED AS ACTIVE</p>
        `)
        document.querySelector(".rings").style.display = 'none';
        document.querySelector("#content-box-bottom").style.display = 'none';
        generateAll();
        type="current"
    } else if (e.id == 'manage-onetime') {
        document.querySelector('#tasktype').innerHTML = "ONE-TIME TASK";
        document.querySelector(".rings").style.display = 'none';
        generateOneTimeList()
        type = 'one-time'
    
    }
}
//generate all tasks in 'set-active' 

function generateAll() {
    document.querySelector('#tasklist').innerHTML = "";

    incompleteDaily = dailyList.filter(item => item.completed == false)
    incompleteWeekly = weeklyList.filter(item => item.completed == false)
    incompleteMonthly = monthlyList.filter(item => item.completed == false)
    
    document.querySelector('#tasklist').insertAdjacentHTML('beforeend',`
        <h3>DAILY TASKS</h3>
    `)

    for (let x = 0; x < incompleteDaily.length; x++) {
            
        document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
        <li class="c${x}">
            <div>
                <i class="far fa-square" onclick="setActive(this)"></i>
                <p class="opensans"> ${incompleteDaily[x].task}</p>
            </div>
        </li>
        `)
    }

    document.querySelector('#tasklist').insertAdjacentHTML('beforeend',`
        <h3>WEEKLY TASKS</h3>
    `)

    for (let x = 0; x < incompleteWeekly.length; x++) {
            
        document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
        <li class="b${x}">
            <div>
                <i class="far fa-square" onclick="setActive(this)"></i>
                <p class="opensans"> ${incompleteWeekly[x].task}</p>
            </div>
        </li>
        `)
    }

    document.querySelector('#tasklist').insertAdjacentHTML('beforeend',`
        <h3>MONTHLY TASKS</h3>
    `)

    for (let x = 0; x < incompleteMonthly.length; x++) {
            
        document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
        <li class="d${x}">
            <div>
                <i class="far fa-square" onclick="setActive(this)"></i>
                <p class="opensans"> ${incompleteMonthly[x].task}</p>
            </div>
        </li>
        `)
    }

    document.querySelector('#tasklist').insertAdjacentHTML('beforeend',`
        <h3>ONE TIME TASKS</h3>
    `)

    for (let x = 0; x < oneTimeList.length; x++) {
            
        document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
        <li class="o${x}">
            <div>
                <i class="far fa-square" onclick="setActive(this)"></i>
                <p class="opensans"> ${oneTimeList[x].task}</p>
            </div>
        </li>
        `)
    }

    alltask = dailyList.concat(weeklyList,monthlyList);
    active = alltask.filter(task => task.active == true);

    if(active.length !== 0)  {
        if (active[0].constructor == newDailyTask) {
            x = dailyList.findIndex(item => item.active)
            y = 'c'
        } else if (active[0].constructor == newWeeklyTask) {
            x = weeklyList.findIndex(item => item.active)
            y = 'b'
        } else if (active[0].constructor == newMonthlyTask) {
            x = monthlyList.findIndex(item => item.active)
            y = 'd'
        } else if (active[0].constructor == newOneTimeTask) {
            x = oneTimeList.findIndex(item => item.active)
            y = 'o';
        }

        document.querySelector(`.${y+x}`).id = 'active'
        document.querySelector(`#active`).childNodes[1].childNodes[1].classList.remove(`fa-square`)
        document.querySelector(`#active`).childNodes[1].childNodes[1].classList.add(`fa-check-square`)

    }
    

}

//set task as active and inactivate any active task

function setActive(e){

    if (document.querySelector('#active')) { 
        document.querySelector(`#active`).childNodes[1].childNodes[1].classList.add(`fa-square`)
        document.querySelector(`#active`).childNodes[1].childNodes[1].classList.remove(`fa-check-square`)
        document.querySelector('#active').removeAttribute('id')
    }

    dailyList = removeActive(dailyList);
    weeklyList = removeActive(weeklyList);
    monthlyList = removeActive(monthlyList);
    oneTimeList = removeActive(oneTimeList);


    let x = e.parentNode.parentNode.classList[0].split("")[1]
    let y = e.parentNode.parentNode.classList[0].split("")[0]

    e.parentNode.parentNode.id = "active";
    document.querySelector(`#active`).childNodes[1].childNodes[1].classList.remove(`fa-square`)
    document.querySelector(`#active`).childNodes[1].childNodes[1].classList.add(`fa-check-square`)


    if (y == 'b') {
        weeklyList[x].active = true
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    } else if ( y == 'c') {
        dailyList[x].active = true
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if (y == 'd') {
        monthlyList[x].active = true
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    } else if (y == 'o') {
        oneTimeList[x].active = true
        localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))
    }


    checkActive();
}

console.log(oneTimeList)

function removeActive(tasklist){
    for ( i=0 ; i<tasklist.length;i++) {
        tasklist[i].active = false;
    }

    if (tasklist ==weeklyList) {
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    } else if ( tasklist == dailyList) {
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if (tasklist ==monthlyList) {
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    } else if (tasklist == oneTimeList) {
        localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))
    }
    
    return tasklist
}

//complete active task from main screen 

function completeActive(e){

    alltask = dailyList.concat(weeklyList,monthlyList,oneTimeList );
    active = alltask.filter(task => task.active == true);
    document.querySelector('#tasklist').innerHTML = "";

    if (active[0].constructor == newDailyTask) {
        x = dailyList.findIndex(item => item.active)
        dailyList[x].completed = true;
        dailyList[x].active = false
        dailyList = arrangeTask(dailyList);
        updateList(dailyList);
        localStorage.setItem("DAILYTASKSTORAGE",JSON.stringify(dailyList))
    } else if (active[0].constructor == newWeeklyTask) {
        x = weeklyList.findIndex(item => item.active)
        weeklyList[x].completed = true;
        weeklyList[x].active = false
        weeklyList = arrangeTask(weeklyList);
        updateList(weeklyList);
        localStorage.setItem("WEEKLYTASKSTORAGE",JSON.stringify(weeklyList))
    } else if (active[0].constructor == newMonthlyTask) {
        x = monthlyList.findIndex(item => item.active)
        monthlyList[x].completed = true;
        monthlyList[x].active = false;
        monthlyList = arrangeTask(monthlyList);
         updateList(monthlyList);
        localStorage.setItem("MONTHLYTASKSTORAGE",JSON.stringify(monthlyList))
    } else if (active[0].constructor == newOneTimeTask) {
        openCompleteOTMain(e)
    }

    checkActive();
    calculatePercentage();
    updateMainPercentage();

}
//generate the list in overlay mode
function generateList(tasklist) {
    document.querySelector('#tasklist').innerHTML = "";
    if (tasklist == 0) {
        document.querySelector('#tasklist').innerHTML = "No Task";
    } else {
        for (let x = 0; x < tasklist.length; x++) {
            
            document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
            <li class="a${x}">
                <div>
                    <i class="far fa-square" onclick="completeToggle(this)"></i>
                    <p class="opensans"> ${tasklist[x].task}</p>
                </div>
                <i class="fas fa-trash" id="deleteBtn" onclick="deleteConfirm(this)"></i>
            </li>
            `)
        }
    }
checkComplete(tasklist);
}

function generateOneTimeList() {
    document.querySelector('#tasklist').innerHTML = "";
    if (oneTimeList == 0) {
        document.querySelector('#tasklist').innerHTML = "No Task";
    } else {
        for (let x = 0; x < oneTimeList.length; x++) {
            
            document.querySelector('#tasklist').insertAdjacentHTML ('beforeend',`
            <li class="${x} oneTime">
                <div>
                    <div>
                        <i class="far fa-square" onclick="completeOneTimeToggle(this)"></i>
                        <p class="opensans"> ${oneTimeList[x].task}</p>
                    </div>
                    <i class="fas fa-trash" id="deleteBtn" onclick="deleteConfirm(this)"></i>
                </div>
                <div>
                    <p class= "opensans" style="margin-left:0">Due Date: ${oneTimeList[x].dueDay}/${oneTimeList[x].dueMonth}/${oneTimeList[x].dueYear}</p>
                    <p class= "opensans">${calculateTimeleft(oneTimeList[x])}</p>
                </div>
            </li>
            `)
        }
    }
}

//complete one time task toggle on overlay 

function completeOneTimeToggle(e) {
    x = e.parentNode.parentNode.parentNode.classList[0];
    document.querySelector('#confirm-complete-box-overlay').style.display = 'flex';
    return x;
}

//complete one time task toggle on mainpage

function openCompleteOTMain(e) {
    document.querySelector('#mainCompleteOneTimeTask').style.display = 'flex';

    if (e.id == "current-task-done") {
        x = oneTimeList.findIndex(item => item.active) 
    } else {
        x = e.parentNode.parentNode.classList[0];
    }

    console.log(x);
    return x;
}

function completeOTMain() {
    oneTimeList.splice(x,1);
    updateList(oneTimeList);
    localStorage.setItem("ONETIMETASKSTORAGE",JSON.stringify(oneTimeList))
    checkActive();
    document.querySelector('#mainCompleteOneTimeTask').style.display = 'none';
}

function closeCompleteOTMain() {
    document.querySelector('#mainCompleteOneTimeTask').style.display = 'none';
}
//calculate time left

function calculateTimeleft(item) {

    let currentDate = new Date();
    let dueDate = new Date(item.dueYear,`${item.dueMonth-1}`,item.dueDay)


    difference =  dueDate.getTime() - currentDate.getTime();

    days =  Math.ceil(difference / (1000 * 3600 * 24))
    if (days == 0 ) {
        text= 'Due today';
        return text;
    }
    text = `${days} days left`

    return text;

}

//check if task is completed

function checkComplete(tasklist) {
    for (let x = 0; x < tasklist.length; x++) {
        if (tasklist[x].completed == true) {
            document.querySelector(`.a${x}`).childNodes[1].classList.add('completed')
            document.querySelector(`.a${x}`).childNodes[1].childNodes[1].classList.remove(`fa-square`)
            document.querySelector(`.a${x}`).childNodes[1].childNodes[1].classList.add(`fa-check-square`)
        } else {
            document.querySelector(`.a${x}`).childNodes[1].classList.remove('completed')
            document.querySelector(`.a${x}`).childNodes[1].childNodes[1].classList.add(`fa-square`)
            document.querySelector(`.a${x}`).childNodes[1].childNodes[1].classList.remove(`fa-check-square`)
        }
    }
    
}

//calculate percentage done and display in progress ring

//reducer = find out how many is completed
function reducer(array) {
    let numberOfaccumulated = 0;
    
    for (let x = 0; x < array.length; x++) {
        if (array[x].completed) {
            numberOfaccumulated++
        }
    }

    return numberOfaccumulated;
}

//open overlay
function manageBtn(e) {
    determineType(e)
    progressRingOverlay();
    document.querySelector('#overlay').style.display = "flex";
}
//close overlay

function closeOverlay() {
    document.querySelector('#overlay').style.display = "none";
    document.querySelector(".rings").style.display = 'block';
    document.querySelector("#content-box-bottom").style.display = 'flex';
}

let numOfSteps = 1

//open goal overlay

function openGoal() {
    document.querySelector('#goalOverlay').style.display = 'flex';
    generateCurrentGoal()
}

//close goal overlay

function closeGoal() {
    document.querySelector('#goalOverlay').style.display = 'none';
    updateMainGoal()
}

//update goal in main page
updateMainGoal();

function updateMainGoal() {
   let index = findActiveGoal();

    if (index == 1337) {
        document.querySelector('#mainGoalName').innerHTML = 'No active Goal'

        document.querySelector('#goal-step').innerHTML = "Set a goal right now!"
    document.querySelector('#goal-step-text').innerHTML = ''

        document.querySelector('#actual-bar').style.width = `0`;
        document.querySelector('#main-goal-percent').innerHTML = ``
        document.querySelector('#main-goal-days-left').innerHTML = ``
        return;
    }

    let activeGoal = goalList[findActiveGoal()];
    let percentage = calculateGoalPercentage(activeGoal)
    document.querySelector('#mainGoalName').innerHTML = activeGoal.task;
    document.querySelector('#goal-step').innerHTML = `Step ${activeGoal.stepsCompleted.findIndex(stepsCompleted => stepsCompleted == false)} out of ${activeGoal.steps.length} Completed`
    document.querySelector('#goal-step-text').innerHTML = ` NEXT: ${activeGoal.steps[activeGoal.stepsCompleted.findIndex(stepsCompleted => stepsCompleted == false)]}`

    document.querySelector('#actual-bar').style.width = `${percentage}%`;
    document.querySelector('#main-goal-percent').innerHTML = `${percentage}% COMPLETED`
    document.querySelector('#main-goal-days-left').innerHTML = `${calculateTimeleft(activeGoal)}`

}

//view current goal in goal overlay;

function generateCurrentGoal() {

     if (document.querySelector('.activeGoalBtn ') !== null) {
        document.querySelector('.activeGoalBtn ').classList.remove('activeGoalBtn');
    } 

    document.querySelector('#goalBtnCurrent').classList.add ('activeGoalBtn');
    
    


    let activeGoal = goalList[findActiveGoal()];

    document.querySelector('#goalOverlay-content').innerHTML = "";
    document.querySelector('#goalOverlay-content').style.flexDirection = 'row';
    document.querySelector('#goalOverlay-content').innerHTML = `
    <div id="currentGoal-left">
        <h3 class="rubik">CURRENT GOAL</h3>
        <p class="rubik">${activeGoal.task}</p>
        <br>
        <ul id="currentGoal-list"></ul>
    </div>

    <div id="currentGoal-right">
        <div>
            <div>
                <div id="progressBar">
                    <div id="bar"></div>
                </div>
                <div id="progressBarText" class="rubik">
                    <p>${calculateGoalPercentage(activeGoal)}% COMPLETED</p>
                    <p style="text-transform: uppercase;">${calculateTimeleft(activeGoal)}</p>
                </div>
            </div>
            <br>
            <p class="rubik">Due date: ${activeGoal.dueDay}/${activeGoal.dueMonth}/${activeGoal.dueYear}</p>
            <p class="rubik">Step ${activeGoal.stepsCompleted.findIndex(stepsCompleted => stepsCompleted == false)} out of ${activeGoal.steps.length} completed</p>
        </div>
        <div>
            <button onclick="undoGoal(goalList[findActiveGoal()])">UNDO PREVIOUS STEP</button>
            <br><br>
            <button onclick="completeGoalNextStep(goalList[findActiveGoal()])">COMPLETE STEP</button>
        </div>
    </div>`

    for (let x = 0; x < activeGoal.steps.length; x++) {
        if ( activeGoal.stepsCompleted[x] == true) {
            document.querySelector('#currentGoal-list').insertAdjacentHTML ('beforeend',`
            <li>
                <i class="far fa-check-square" onclick="completeOneTimeToggle(this)"></i>
                <p class="opensans completed"> ${activeGoal.steps[x]}</p>
            <li>
            `)
        } else {
            document.querySelector('#currentGoal-list').insertAdjacentHTML ('beforeend',`
            <li>
                <i class="far fa-square" onclick="completeOneTimeToggle(this)"></i>
                <p class="opensans"> ${activeGoal.steps[x]}</p>
            <li>
            `)
        }
    }

    document.querySelector('#currentGoal-left').insertAdjacentHTML ('beforeend',`
            <div id="goalMobileBtn-div">
                <button onclick="undoGoal(goalList[findActiveGoal()])">UNDO PREVIOUS STEP</button>
                <br><br>
                <button onclick="completeGoalNextStep(goalList[findActiveGoal()])">COMPLETE STEP</button>
            </div>
            `)

    updateGoalBar(calculateGoalPercentage(activeGoal))
}

// display all goals 

function generateAllGoals() {

    if (document.querySelector('.activeGoalBtn ') !== null) {
        document.querySelector('.activeGoalBtn ').classList.remove('activeGoalBtn');
    } 

    document.querySelector('#goalBtnAll').classList.add ('activeGoalBtn');

    document.querySelector('#goalOverlay-content').innerHTML = "";
    document.querySelector('#goalOverlay-content').style.flexDirection = 'column';
    document.querySelector('#goalOverlay-content').innerHTML = `
    <h3 class="rubik">VIEW ALL GOALS</h3>
    <br>
    `
    
    for (let x = 0; x < goalList.length; x++) {
        document.querySelector('#goalOverlay-content').insertAdjacentHTML ('beforeend',`
            <div class="allGoals-div">
                <div class="allGoals-div-left">
                    <div>
                        <h3 class="rubik">${goalList[x].task}</h4>
                        <p class="rubik ${goalList[x].active? "goalsActive": "goalsInactive"}">${goalList[x].active? "ACTIVE": "INACTIVE"}</p>
                    </div>
                    <br>
                    <p class="rubik">${calculateGoalPercentage(goalList[x])}% DONE</p>
                    <span>
                        <p class="opensans">Due date: ${goalList[x].dueDay}/${goalList[x].dueMonth}/${goalList[x].dueYear}</p>
                        <p class="opensans">${calculateTimeleft(goalList[x])}</p>
                    </span>
                </div>

                <div class="allGoals-div-right goal${x}" >
                <button onclick="generateEditGoal(this)">EDIT</button>
                <button onclick="setActiveGoal(this)">SET ACTIVE</button>
                <button onclick="confirmDeleteGoal(this)">DELETE</button>
                </div>

            </div>
            `)
    }

}

//display add goal page 

function generateAddGoal() {

    if (document.querySelector('.activeGoalBtn ') !== null) {
        document.querySelector('.activeGoalBtn ').classList.remove('activeGoalBtn');
    } 

    document.querySelector('#goalBtnAdd').classList.add ('activeGoalBtn');

    numOfSteps = 1;
    document.querySelector('#goalOverlay-content').innerHTML = "";
    document.querySelector('#goalOverlay-content').style.flexDirection = 'column';
    document.querySelector('#goalOverlay-content').innerHTML = `
    <h3 class="rubik">ADD NEW GOAL</h3>
    <br>
    <div id="addGoal" style="height: 100%; display: flex;">
        <div id="addGoal-left" style="height: 100%;">
            <div class="form">
                <input type="text" name="goalName" autocomplete="off" required class="rubik" id="goalName">
                <label for="goalName" class="label-name">
                    <span class="content-name rubik">GOAL NAME</span>
                </label>
            </div>
            <br>
            <div id="numOfStepsDiv" style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <h4 class="rubik">Number of Steps</h4>
                <div style="display: flex; flex-direction: row; align-items: center;">
                    <svg onclick="minusSteps()" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 11V13H17V11H7Z" fill="black"/>
                    </svg>
                    <p id="numOfSteps" style="margin-left: 1em;margin-right: 1em;" class="rubik">${numOfSteps}</p>
                    <svg onclick="addSteps()"width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM17 11H13V7H11V11H7V13H11V17H13V13H17V11Z" fill="black"/>
                    </svg>
                </div>
            </div>
            <br>
            <div id="steps" style="overflow-y:scroll; height: 70%;">
                <div class="form">
                    <input id="step1" class="goalsteps" type="text" name="goalName" autocomplete="off" required class="rubik">
                    <label for="goalName" class="label-name">
                        <span class="content-name rubik">STEP 1</span>
                    </label>
                </div>
            </div>
        </div>

        <div id="addGoal-right" style="height: 100%; width:50%; padding: 1.5em;">
            <p class="rubik">DUE DATE</p>
                <div id="goal-date-top" style="display:flex; justify-content: space-between">
                       <div style="display: flex; align-items: center;">
                           <p id="goalmonthYearSelected" class="rubik">MARCH 2021</p>
                           <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.04175 12.2708L15.5001 18.7291L21.9584 12.2708H9.04175Z" fill="black" fill-opacity="0.54"/>
                            </svg>                            
                        </div>
                        <div>
                            <svg onclick="goalPrevMonth()" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 38.3334C9.87486 38.3334 1.66675 30.1253 1.66675 20.0001C1.66675 9.87486 9.87486 1.66675 20.0001 1.66675C30.1253 1.66675 38.3334 9.87486 38.3334 20.0001C38.3334 30.1253 30.1253 38.3334 20.0001 38.3334ZM20.0001 35.0001C28.2844 35.0001 35.0001 28.2844 35.0001 20.0001C35.0001 11.7158 28.2844 5.00008 20.0001 5.00008C11.7158 5.00008 5.00008 11.7158 5.00008 20.0001C5.00008 28.2844 11.7158 35.0001 20.0001 35.0001ZM28.3334 18.3335H17.357L21.1785 14.512L18.8215 12.155L10.9763 20.0001L18.8215 27.8453L21.1785 25.4883L17.357 21.6668H28.3334V18.3335Z" fill="black"/>
                            </svg>
                            <svg onclick="goalNextMonth()" style="margin-left:1em;" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 38.3334C9.87486 38.3334 1.66675 30.1253 1.66675 20.0001C1.66675 9.87486 9.87486 1.66675 20.0001 1.66675C30.1253 1.66675 38.3334 9.87486 38.3334 20.0001C38.3334 30.1253 30.1253 38.3334 20.0001 38.3334ZM20.0001 35.0001C28.2844 35.0001 35.0001 28.2844 35.0001 20.0001C35.0001 11.7158 28.2844 5.00008 20.0001 5.00008C11.7158 5.00008 5.00008 11.7158 5.00008 20.0001C5.00008 28.2844 11.7158 35.0001 20.0001 35.0001ZM11.6667 21.6668H22.6431L18.8216 25.4883L21.1786 27.8453L29.0238 20.0001L21.1786 12.155L18.8216 14.512L22.6431 18.3335H11.6667V21.6668Z" fill="black"/>
                            </svg>
                        </div>
                </div>

            <div id="goalDate-bottom" class="rubik">
            </div>
            <div  id="addGoalBtn-div"style="height:50%; position:relative">
                <button onclick="addNewGoal()" style="position:absolute; bottom:0px;right:0px;">ADD TASK</button>
            </div>
        </div>
    </div>
    `

    let selectedDate = new Date();
    updateGoalCalendar(selectedDate);

    return selectedDate;
}
// add goal 

function addNewGoal(){
    goalName = document.querySelector('#goalName').value;

    let steps = []
    let stepsCompleted = []

    for (x=1;x<numOfSteps+1;x++) {
        let value = document.querySelector(`#step${x}`).value
        steps.push(value);
    }

    for (x=1;x<numOfSteps+1;x++) {
        let value = false
        stepsCompleted.push(value);
    }

    if (selectedDay == 0) {
        alert('Please select a date')
        return
    }

    let newGoalTask = new newGoal(goalName,false,steps,stepsCompleted,`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`,`${selectedDay}`);
    goalList.push(newGoalTask);
    
    //constructor(task,active,steps,stepsCompleted,dueYear,dueMonth,dueDay)

    let allSteps =document.querySelectorAll('.goalsteps')
    allSteps.forEach(steps => steps.value = "")
    document.querySelector('#goalName').value = ""
    selectedDay = 0;
    document.querySelector(".selectedDay").classList.remove('selectedDay')
    alert('Goal Added!')

    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
}

function addSteps() {
    numOfSteps++; 
    document.querySelector('#steps').insertAdjacentHTML ('beforeend',`
    <div class="form">
        <input type="text" id="step${numOfSteps}" class="goalsteps" name="goalName" autocomplete="off" required class="rubik">
        <label for="goalName" class="label-name">
            <span class="content-name rubik">STEP ${numOfSteps}</span>
        </label>
    </div>
    `)

    document.querySelector('#numOfSteps').innerHTML = numOfSteps;
}

function minusSteps() {

    if(numOfSteps == 1) {
        return
    }

    let select = document.querySelector(`#step${numOfSteps}`).parentNode;
    select.remove();
    numOfSteps-- 
    document.querySelector('#numOfSteps').innerHTML = numOfSteps;
}

//generate edit goal page 

function generateEditGoal(e) {

    index = e.parentNode.classList[1];
    index = index.charAt(index.length-1);

    numOfSteps = goalList[index].steps.length;

    document.querySelector('#goalOverlay-content').innerHTML = "";
    document.querySelector('#goalOverlay-content').style.flexDirection = 'column';
    document.querySelector('#goalOverlay-content').innerHTML = `
    <h3 class="rubik">EDIT GOAL</h3>
    <br>
    <div id="editGoal" style="height: 100%; display: flex;">
        <div id="addGoal-left" style="height: 100%;">
            <div class="form">
                <input type="text" name="goalName" autocomplete="off" required class="rubik" id="goalName" value="${goalList[index].task}">
                <label for="goalName" class="label-name">
                    <span class="content-name rubik">GOAL NAME</span>
                </label>
            </div>
            <br>
            <div id="numOfStepsDiv" style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <h4 class="rubik">Number of Steps</h4>
                <div style="display: flex; flex-direction: row; align-items: center;">
                    <svg onclick="minusSteps()" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 11V13H17V11H7Z" fill="black"/>
                    </svg>
                    <p id="numOfSteps" style="margin-left: 1em;margin-right: 1em;" class="rubik">${goalList[index].steps.length}</p>
                    <svg onclick="addSteps()"width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM17 11H13V7H11V11H7V13H11V17H13V13H17V11Z" fill="black"/>
                    </svg>
                </div>
            </div>
            <br>
            <div id="steps" style="overflow-y:scroll; height: 70%;">
            </div>
        </div>

        <div id="addGoal-right" style="height: 100%; width:50%; padding: 1.5em;">
            <p class="rubik">DUE DATE</p>
                <div id="goal-date-top" style="display:flex; justify-content: space-between">
                       <div style="display: flex; align-items: center;">
                           <p id="goalmonthYearSelected" class="rubik">MARCH 2021</p>
                           <svg width="30" height="30" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.04175 12.2708L15.5001 18.7291L21.9584 12.2708H9.04175Z" fill="black" fill-opacity="0.54"/>
                            </svg>                            
                        </div>
                        <div>
                            <svg onclick="goalPrevMonth()" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 38.3334C9.87486 38.3334 1.66675 30.1253 1.66675 20.0001C1.66675 9.87486 9.87486 1.66675 20.0001 1.66675C30.1253 1.66675 38.3334 9.87486 38.3334 20.0001C38.3334 30.1253 30.1253 38.3334 20.0001 38.3334ZM20.0001 35.0001C28.2844 35.0001 35.0001 28.2844 35.0001 20.0001C35.0001 11.7158 28.2844 5.00008 20.0001 5.00008C11.7158 5.00008 5.00008 11.7158 5.00008 20.0001C5.00008 28.2844 11.7158 35.0001 20.0001 35.0001ZM28.3334 18.3335H17.357L21.1785 14.512L18.8215 12.155L10.9763 20.0001L18.8215 27.8453L21.1785 25.4883L17.357 21.6668H28.3334V18.3335Z" fill="black"/>
                            </svg>
                            <svg onclick="goalNextMonth()" style="margin-left:1em;" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 38.3334C9.87486 38.3334 1.66675 30.1253 1.66675 20.0001C1.66675 9.87486 9.87486 1.66675 20.0001 1.66675C30.1253 1.66675 38.3334 9.87486 38.3334 20.0001C38.3334 30.1253 30.1253 38.3334 20.0001 38.3334ZM20.0001 35.0001C28.2844 35.0001 35.0001 28.2844 35.0001 20.0001C35.0001 11.7158 28.2844 5.00008 20.0001 5.00008C11.7158 5.00008 5.00008 11.7158 5.00008 20.0001C5.00008 28.2844 11.7158 35.0001 20.0001 35.0001ZM11.6667 21.6668H22.6431L18.8216 25.4883L21.1786 27.8453L29.0238 20.0001L21.1786 12.155L18.8216 14.512L22.6431 18.3335H11.6667V21.6668Z" fill="black"/>
                            </svg>
                        </div>
                </div>

            <div id="goalDate-bottom" class="rubik">
            </div>
            <div id="addGoalBtn-div" style="height:50%; position:relative">
                <button onclick="editGoal(${index})" style="position:absolute; bottom:0px;right:0px;">EDIT TASK</button>
            </div>
        </div>
    </div>
    `
    for (x=0;x<goalList[index].steps.length;x++) {
        document.querySelector('#steps').insertAdjacentHTML ('beforeend',`
        <div class="form">
            <input type="text" id="step${x+1}" class="goalsteps" name="goalName" autocomplete="off" required class="rubik" value="${goalList[index].steps[x]}">
            <label for="goalName" class="label-name">
                <span class="content-name rubik">STEP ${x+1}</span>
            </label>
        </div>
    `)
    }
    /*<div class="form">
                    <input id="step1" class="goalsteps" type="text" name="goalName" autocomplete="off" required class="rubik">
                    <label for="goalName" class="label-name">
                        <span class="content-name rubik">STEP 1</span>
                    </label>
                </div>*/

                
    selectedDate = new Date(goalList[index].dueYear,goalList[index].dueMonth-1,goalList[index].dueDay)
    updateGoalCalendar(selectedDate);

    let goalDate = document.querySelector(`.num${goalList[index].dueDay}`);
    goalDate.classList.add('selectedDay');
    console.log(goalDate);
}

//edit goal

function editGoal(index){
    console.log(index)
   goalName = document.querySelector('#goalName').value;

    let steps = []
    let stepsCompleted = []

    for (x=1;x<numOfSteps+1;x++) {
        let value = document.querySelector(`#step${x}`).value
        steps.push(value);
    }

    for (x=1;x<numOfSteps+1;x++) {
        let value = false
        stepsCompleted.push(value);
    }

    if (selectedDay == 0) {
        alert('Please select a date')
        return
    }

    goalList[index].task = goalName;
    goalList[index].stepsCompleted = stepsCompleted;
    goalList[index].steps = steps;
    goalList[index].dueYear = selectedDate.getFullYear();
    goalList[index].dueMonth = selectedDate.getMonth()+1;
    goalList[index].dueDay = selectedDay
    
    //constructor(task,active,steps,stepsCompleted,dueYear,dueMonth,dueDay)

   /* let allSteps =document.querySelectorAll('.goalsteps')
    allSteps.forEach(steps => steps.value = "")
    document.querySelector('#goalName').value = ""
    selectedDay = 0;
    document.querySelector(".selectedDay").classList.remove('selectedDay')*/

    generateAllGoals();
    alert('Goal Edited!')

    updateMainGoal()
    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
}

//goal calendar 

function updateGoalCalendar(selectedDate) {
    document.querySelector('#goalmonthYearSelected').innerHTML = `${month[selectedDate.getMonth()]} ${selectedDate.getFullYear()} `
     
     document.querySelector('#goalDate-bottom').innerHTML = "";
 
     document.querySelector('#goalDate-bottom').insertAdjacentHTML ('beforeend',`
         <p>SUN</p>
         <p>MON</p>
         <p>TUE</p>
         <p>WED</p>
         <p>THU</p>
         <p>FRI</p>
         <p>SAT</p>
             `)
 
     let firstDayofMonth = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()}`,1);
     console.log(firstDayofMonth.getDay()); 
 
     if ( firstDayofMonth.getDay() !== 0) {
         for (let x=0;x<firstDayofMonth.getDay();x++) {
             document.querySelector('#goalDate-bottom').insertAdjacentHTML ('beforeend',`
             <p></p>
             `)
         }
     }
 
     let numOfDays = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`,0);
     console.log(numOfDays.getDate())
    
     let currentDate = new Date();
 
     if (selectedDate.getFullYear() == currentDate.getFullYear() && selectedDate.getMonth() == currentDate.getMonth()) {
         
         for (let x =0; x < currentDate.getDate()-1; x++) {
             document.querySelector('#goalDate-bottom').insertAdjacentHTML ('beforeend',`
             <p style="color:grey">${x+1}</p>
             `)
         } 
 
         for (let x = currentDate.getDate()-1; x <numOfDays.getDate(); x++) {
             document.querySelector('#goalDate-bottom').insertAdjacentHTML ('beforeend',`
             <p class="num${x+1}" onclick="selectDay(this)">${x+1}</p>
             `)
         }
 
     } else {
         for (let x = 0; x < numOfDays.getDate();x++) {
         document.querySelector('#goalDate-bottom').insertAdjacentHTML ('beforeend',`
             <p class="num${x+1}" onclick="selectDay(this)">${x+1}</p>
             `)
         }
     }
     
     console.log(selectedDate)
 }

//go to next month (goal page)

function goalNextMonth(){
    selectedDate = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()+1}`)
    updateGoalCalendar(selectedDate);
}

function goalPrevMonth(){
    let currentDate = new Date();

    if (selectedDate.getFullYear() == currentDate.getFullYear() && selectedDate.getMonth() == currentDate.getMonth()) {
        alert('Due date can not be set in previous month');
        return;        
    }

    selectedDate = new Date(`${selectedDate.getFullYear()}`,`${selectedDate.getMonth()-1}`)
    updateGoalCalendar(selectedDate);
}


//find active goal 

function findActiveGoal() { 

    for (x=0; x <= goalList.length; x++) {
        if (goalList[x].active == true ) {
            return x
        } else if (x == goalList.length - 1) {
            console.log('active null')
            value = 1337;
            return value
        }
    }

}

// calculate percentage done for goal

function calculateGoalPercentage(goal) {

    let completedSteps = goal.stepsCompleted.filter(stepsCompleted => stepsCompleted == true)
    let goalPercentage = Math.floor(completedSteps.length / goal.steps.length * 100);

    return goalPercentage;
}

// change goal bar width on overlay 

function updateGoalBar(e) {
    document.querySelector('#bar').style.width = `${e}%`
}

//undo previous goal step

function undoGoal(goal) {
    index = goal.stepsCompleted.findIndex(stepsCompleted => stepsCompleted == false) - 1;
    goal.stepsCompleted[index] = false;
    generateCurrentGoal()
    updateMainGoal()
    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
}

//complete goal next step

function completeGoalNextStep(goal) {
    index = goal.stepsCompleted.findIndex(stepsCompleted => stepsCompleted == false);

    if (index == goal.stepsCompleted.length -1) {
        openGoalComplete()
    } else {
        goal.stepsCompleted[index] = true;
    }

    generateCurrentGoal()
    updateMainGoal()
    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
}

//open goal complete overlay 

function openGoalComplete() {
    index = findActiveGoal();

    document.querySelector('#goalBlackoverlay').style.display = 'flex'
    document.querySelector('#goalBlackOverlayWin').innerHTML = `
    <p class="rubik">Congratulations, have you met your goal?</p>
    <p class="opensans" style="font-size: 0.8em">The goal would be deleted upon confirmation</p>
    <br>
    <div style="display: flex; justify-content: space-around; width: 100%">
        <button onclick="completeGoal(${index})" style="width: 30%">Yes</button>
        <button onclick="closeGoalComplete()" style="width: 30%">No</button>
    </div>
    `
}

//close goal complete overlay

function closeGoalComplete() {
    document.querySelector('#goalBlackoverlay').style.display = 'none'
    document.querySelector('#goalBlackOverlayWin').innerHTML = ``
}
//complete goal

function completeGoal(index) {
    goalList.splice(index,1);
    closeGoalComplete();
    generateAllGoals();
    updateMainGoal();
}

//set goal as active

function setActiveGoal(e) {
    for ( i=0 ; i<goalList.length;i++) {
        goalList[i].active = false;
    }

    index = e.parentNode.classList[1];
    index = index.charAt(index.length-1);
    goalList[index].active = true;
    generateAllGoals();
    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
    updateMainGoal()
}
//delete goal (temp)

function deleteGoal(index) {
    goalList.splice(index,1);
    generateAllGoals();
    localStorage.setItem("GOALSTORAGE",JSON.stringify(goalList));
    document.querySelector('#goalBlackoverlay').style.display = 'none'
    generateAllGoals();
}

//confirm delete goal

function confirmDeleteGoal(e) {

    index = e.parentNode.classList[1];
    index = index.charAt(index.length-1);

    document.querySelector('#goalBlackoverlay').style.display = 'flex'
    document.querySelector('#goalBlackOverlayWin').innerHTML = `
    <p class="rubik">Are you sure you want to delete your goal?</p>
    <p class="opensans" style="font-size: 0.8em">The goal would be deleted upon confirmation</p>
    <br>
    <div style="display: flex; justify-content: space-around; width: 100%">
        <button onclick="deleteGoal(${index})" style="width: 30%">YES</button>
        <button onclick="closeGoalComplete()" style="width: 30%">NO</button>
    </div>
    `
}