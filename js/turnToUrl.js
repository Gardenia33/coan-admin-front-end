const ip = "192.168.1.104"
function getToken(){
    $.ajax({
        url: "https://sm.ms/api/v2/token",
        type: "POST",
        data: {
            username: "Crush-0",
            password: "dcy204616",
        },
        dateType:"json",
        success: function(params){
            console.log(params.data.token)
        }
    })
}


var url;
var uid;
var aiPic;
function turnToUrl(){
    var uploadFile = document.getElementById('fileUpload').files[0];
    var formData = new FormData();
    console.log(uploadFile);
    formData.append("smfile",uploadFile);
    console.log(formData);
    fetch('http://'+ip+':8080/normalproperty/return',{
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    .then(result =>{
            url=result.data;
            console.log(url); 
        console.log('success',result)
    })
    .catch(error =>{
        console.log("error",error)
    })
}




var dataUid ="{\"task\":\"img2img.sd\", \
\"params\": \
{\"model\":\"anime\", \
\"text\":\"NFT,cartoon\",\
\"url\":\"{{{url}}}\"}"

function getUid(){
    $.ajax({
        "url":"https://23329.o.apispace.com/aigc/img2img",
        "method": "POST",
        "headers": {
            "X-APISpace-Token":"te5wxqsd1odty2b5zazvsnru9zb5tfat",
            "Authorization-Type":"apikey",
            "Content-Type":"application/json"
        },
        "data": dataUid,
        "crossDomain": true
    })
        .done(function(response){
            uid = response.data.uid;
            if(uid){
                console.log("getuid")
            }
            else{
                console.log("something wrong")
            }
            console.log(uid);
            console.log(response.code)
        })
        .fail(function(jqXHR){
            console.log(jqXHR)
        })
}

function getPicture(){
    $.ajax({
        "url": "https://23329.o.apispace.com/aigc/query-image",
        "method": "POST",
        "headers": {
            "X-APISpace-Token":"te5wxqsd1odty2b5zazvsnru9zb5tfat",
            "Authorization-Type":"apikey",
            "Content-Type":"json"
        },
        "data": {
            "uid": uid,
        },
        "crossDomain": true
    })
        .done(function(response){
            aiPic = response.data.cdn
            console.log(response.code)
            console.log(aiPic)
        })
        .fail(function(jqXHR){
            console.log(jqXHR)
        })
}

function getPic(){
    turnToUrl();
    getUid();
    getPicture();
}