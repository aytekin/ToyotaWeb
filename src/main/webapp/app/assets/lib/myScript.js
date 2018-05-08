//https://stackoverflow.com/questions/22317951/export-html-table-data-to-excel-using-javascript-jquery-is-not-working-properl
function fnExcelReport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('exportToExcel'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++)
    {
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));


    return (sa);
}
var date = Date.now();
function formatDate(date, i) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + i),
        year = d.getFullYear();

    var ayKacCekti = new Date(year, month, 0).getDate();
    var dates = parseInt(day);
    var monts = parseInt(month);
    if(dates>ayKacCekti)
    {
        day=''+dates-ayKacCekti;
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
function  nowDate() {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year,month,day].join('-');
}
function tempx(date) {
    var year="";
    var month="";
    var day ="";
    if(date!=null)
    {
         year = date.substring(0,4);
         month = date.substring(5,7);
         day = date.substring(8,10);
    }

    return [year,month,day].join(',');
}

function differance(date1,date2) {
    var diffDays=0;
    var month1=0;
    var month2=0;
    var day1 =0;
    var day2 =0;
    if(date1!=null&&date2!=null)
    {
        month1 = parseInt(date1.substring(5,7));
        day1 = parseInt(date1.substring(8,10));
        month2 = parseInt(date2.substring(5,7));
        day2 = parseInt(date2.substring(8,10));
    }
    if(month1==month2)
        diffDays=day2-day1;
    else
    {
        diffDays=day2+30-day1;
    }

    return diffDays;
}



