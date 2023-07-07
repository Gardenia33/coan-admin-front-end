const ip = '192.168.1.104';
var productName = [];
var description = [];
var price = [];
var category;
var company = [];
var imageUrl = [];
var turnover = [];
function getData(){
    $.ajax({
        "url": 'http://'+ ip +':8080/normalproperty/showproduct',
        "method": "GET",
        "data": {

        },
    })
    .done(function(response){
        console.log(response)
        for(var i = 0;i<response.data.length&&i<5;i++){
            productName.push(response.data[i].name)
            description.push(response.data[i].description)
            price.push(response.data[i].price)
            company.push(response.data[i].company)
            imageUrl.push(response.data[i].imageUrl)
            turnover.push(response.data[i].turnover)
            addElement(i);
        }
    })
    .fail(function(jqXHR){
        console.log(jqXHR);
    })
    document.getElementById('targe').innerHTML += 
    "<div class=\"w-auto\"> \
        <div class=\"card\"> \
            <div class=\"card-header\"> \
                <span class=\"number\">余量"+ 
                533 +"份</span></div></div></div>"
}

function addElement(i){
    document.getElementById('targe').innerHTML += 
    "<div class=\"w-auto\"> \
        <div class=\"card\"> \
            <div class=\"card-header\"> \
                <span class=\"number\">余量"+ turnover[i] +"份</span> \
                <img class=\"w-100\" src=\""+imageUrl[i]+"\" alt=\"\" /> \
                <a class=\"buy-btn\" href=\"GameAssetDetail.html\">现在购买</a> \
            </div> \
            <div class=\"card-body\"> \
                <div class=\"card-title\"> \
                    <span>"+productName[i]+"</span> \
                    <img src=\"img_2.png\" alt=\"\" /> \
                </div> \
                <p class=\"card-number\">"+i+"</p> \
                <p class=\"card-price\">¥"+price[i]+" <small>起</small></p> \
            </div> \
        </div> \
    </div>"
}