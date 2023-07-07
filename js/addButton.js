//增加商品页面js
    const dataForm = document.getElementById('add-form');
           dataForm.addEventListener('submit', (event) => {
             //  event.preventDefault(); // 阻止表单默认提交行为

            // 在这里你可以获取用户输入的数据并将其传递到下一个页面
            const inputData = {
                // 获取输入数据
                data: {
                    productName: document.getElementById('exampleInputName').value,
                    price: parseFloat(document.getElementById('exampleInputprice').value),
                    company: document.getElementById('examplecompanyname').value,
                    category: document.getElementById('exampleSelectGender').value,
                    smfile: document.getElementById('smfile').value,
                    turnover: document.getElementById('exampleInputCity1').value,
                    description: document.getElementById('exampleTextarea1').value,


                    // 其他输入字段类似获取
                }
            };

            // 将数据转为 JSON 字符串
            const dataJSON = JSON.stringify(inputData);

            // 将数据作为 URL 参数传递给下一个页面
            window.location.href = '../products/productmanagement.html?data=${encodeURIComponent(dataJSON)}'
           ;
        });

