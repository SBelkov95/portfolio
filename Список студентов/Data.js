let students = [
    {
        name: "Вася",
        surname : "Пупкин",
        middlename : "Викторович",
        birthday: new Date(2001, 0, 4),
        faculty : 'ИВТ',
        Date : 2019,
        EndDate: 2023,
     },
     {
        name: "Викория",
        surname : "Попова",
        middlename : "Александровна",
        birthday: new Date(2002, 3, 26),
        faculty : 'Экономика',
        Date : 2020,
        EndDate: 2024
     },
     {
        name: "Александр",
        surname : "Друзь",
        middlename : "Фёдорович",
        birthday: new Date(2000, 4, 15),
        faculty : 'ИВТ',
        Date : 2018,
        EndDate: 2023,
     },
     {
        name: "Мария",
        surname : "Шишкина",
        middlename : "Константиновна",
        birthday: new Date(1999, 5, 23),
        faculty : 'ИВТ',
        Date : 2017,
        EndDate: 2021,
     },
     {
        name: "Сергей",
        surname : "Пушкин",
        middlename : "Андреевич",
        birthday: new Date(2000, 3, 22),
        faculty : 'Менеджмент',
        Date : 2018,
        EndDate: 2022,
     },
]
//Функция расчёта возраста студентов
//Исправил неиспользуемые аргументы
function calculateAge () {
    let birthDate = new Date(obj.birthday);
    let otherDate = new Date();
    const years = (otherDate.getFullYear() - birthDate.getFullYear());
    if (otherDate.getMonth() < birthDate.getMonth() ||
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
}
//Функция формата даты
function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }
  let sortColumnFlag = 'fio';
//Функция создания элементов ДОМ
    function Newstudent(obj){
        const tr = document.createElement("tr")
        const tdFIO = document.createElement("td")
        const tdBirthday = document.createElement("td")
        const tdfaculty = document.createElement("td")
        const tdDate = document.createElement("td")
        tdFIO.textContent = `${obj.surname} ${obj.name} ${obj.middlename}`
        tdBirthday.textContent = `${formatDate(obj.birthday)} ${calculateAge()} ${"лет"}`
        tdfaculty.textContent = obj.faculty
        let finishDate
        if(obj.Date>=2019){
            finishDate = 2023-obj.Date + " Курс"
        }else{
            finishDate = 'Закончил(а)';
        }
        tdDate.textContent = `${obj.Date}-${(obj.Date)+4} ${finishDate}`
        tr.append(tdFIO, tdBirthday, tdfaculty, tdDate)
        return tr
    }
    //Функция отрисовки
    function render(arr) {
    let copyArr = [...arr]
        //Сортировка
        copyArr = copyArr.sort(function(a,b){
            if(a[sortColumnFlag] < b[sortColumnFlag]) return -1
        })
        //Фильтрация
        let filterFio = document.getElementById("filter_fio")
        let filterFakulty = document.getElementById("filter_fakulty")
        let filterStartYear = document.getElementById("filter_start_year")
        let filterEndYear = document.getElementById("filter_end_year")
        if(filterFio.value.trim() !== ""){
        for(const oneUser of copyArr){
            copyArr = copyArr.filter(function(oneUser) {
                if((oneUser.name.toLowerCase().includes(filterFio.value.toLowerCase().trim()))
                ||(oneUser.surname.toLowerCase().includes(filterFio.value.toLowerCase().trim()))
                ||(oneUser.middlename.toLowerCase().includes(filterFio.value.toLowerCase().trim()))){
                return true
                }
            });
            }
        }
    if(filterFakulty.value.trim() !== ""){
        for(const oneUser of copyArr){
            copyArr = copyArr.filter(function(oneUser) {
                if(oneUser.faculty.toLowerCase().includes(filterFakulty.value.toLowerCase().trim())){
                return true
                }
            });
        }
    }
    if(filterStartYear.value.trim() !== ""){
        for(const oneUser of copyArr){
            copyArr = copyArr.filter(function(oneUser) {
                if(oneUser.Date.toString().includes(filterStartYear.value.trim())){
                return true
                }
            });
        }
    }
    if(filterEndYear.value.trim() !== ""){
        for(const oneUser of copyArr){
            copyArr = copyArr.filter(function(oneUser) {
                if(oneUser.EndDate.toString().includes(filterEndYear.value.trim())){
                return true
                }
            });
        }
    }    
    const idstudents = document.getElementById("idstudents")
    idstudents.innerHTML = ''
    for(obj of copyArr) {
        const newTr = Newstudent(obj)
        idstudents.append(newTr)
    }
    }
    render(students)
//Функция внесения в список студетов
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault()
        //Валидация
        if(document.getElementById("name-inp").value.trim()==""){
            alert("Нет значения в поле имя!")
            return
        }
        if(document.getElementById("family-inp").value.trim()==""){
            alert("Нет значения в поле фамилия!")
            return
        }
        if(document.getElementById("surname-inp").value.trim()==""){
            alert("Нет значения в поле отчество!")
            return
        }
        if(document.getElementById("bithday").value.trim()==""){
            alert("Нет значения в поле день рождения!")
            return
        }
        if(document.getElementById("fakultet").value.trim()==""){
            alert("Нет значения в поле факультет!")
            return
        }
        if(document.getElementById("year").value.trim()==""){
            alert("Нет значения в поле дата поступления!")
            return
        }
        if(document.getElementById("bithday").value.trim() >= new Date(1900,1,1)){
            alert("Не корректное значение даты рождения!")
            return
        }
        if(Number(document.getElementById("year").value.trim()) <= 2000){
            alert("Не корректное значение даты поступления!")
            return
        }
        let addStudentObj = {
            name: document.getElementById("name-inp").value.trim(),
            surname : document.getElementById("family-inp").value.trim(),
            middlename : document.getElementById("surname-inp").value.trim(),
            birthday: new Date(document.getElementById("bithday").value.trim()),
            faculty : document.getElementById("fakultet").value.trim(),
            Date : Number(document.getElementById("year").value),
            EndDate : Number(document.getElementById("year").value)+4
        }
        students.push(addStudentObj)
        console.log(addStudentObj)
        render(students)
        form.reset();
    })
    let sortFIOBtn = document.getElementById("btn_sort_FIO")
    let sortAgeBtn = document.getElementById("btn_sort_Birthday")
    let sortFakultyBtn = document.getElementById("btn_sort_fakulty")
    let sortYearBtn = document.getElementById("btn_sort_year")
    //создание клик
    sortFIOBtn.addEventListener('click', function(){
        sortColumnFlag = 'surname'
        render(students)
    })
    sortAgeBtn.addEventListener('click', function(){
        sortColumnFlag = 'birthday'
        render(students)
    })
    sortFakultyBtn.addEventListener('click', function(){
        sortColumnFlag = 'faculty'
        render(students)
    })
    sortYearBtn.addEventListener('click', function(){
        sortColumnFlag = 'Date'
        render(students)
    })

    //фильтрация
    let filterFormid = document.getElementById("filter_form")
    let filterFio = document.getElementById("filter_fio")
    let filterFakulty = document.getElementById("filter_fakulty")
    let filterStartYear = document.getElementById("filter_start_year")
    let filterEndYear = document.getElementById("filter_end_year")
   filterFormid.addEventListener("submit", function(event) {
        event.preventDefault()
    })
    filterFio.addEventListener('input', function(){
        render(students)
    })
    filterFakulty.addEventListener('input', function(){
        render(students)
    })
    filterStartYear.addEventListener('input', function(){
        render(students)
    })
    filterEndYear.addEventListener('input', function(){
        render(students)
    })