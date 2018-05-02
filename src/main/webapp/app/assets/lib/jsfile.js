
var date = Date.now();
function formatDate(date, i) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + i),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
function formatDateTree(date, i) {
    console.log(date);
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + i),
        year = d.getFullYear();
    var ayKacCekti = new Date(year, month, 0).getDate();
    var dates = parseInt(day);
    var monts = parseInt(month);
    if(dates>ayKacCekti)
    {
        day = '' + (dates-ayKacCekti);
        monts++;
        month =''+ monts;
    }
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

function formatDate2(date, i) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + i),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year,month,day].join('-');
}

function ChangeDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()),
        year = d.getFullYear();

    var ayKacCekti = new Date(year, month, 0).getDate();

    if(ayKacCekti < (d.getDate() + 7)){

        month = '' + (parseInt(month) + 1);
        day = '' +(7 - (ayKacCekti - parseInt(day)));
    }else{
        day = '' + (d.getDate() + 7);
    }


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year,month,day].join('-');
}


