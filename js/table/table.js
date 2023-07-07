// 初始化表格数据
const initialData = [
    {
        productName: "Product A",
        price: 100,
        companyName: "Company X",
        amount: 50,
        category: "Category 1",
        description: "Product A description"

    },
    {
        productName: "Product B",
        price: 150,
        companyName: "Company Y",
        amount: 30,
        category: "Category 2",
        description: "Product B description"
    },
    // 可以根据需要添加更多初始数据
];




// const addButton = document.getElementById('add-button');
//        addButton.addEventListener('click', () => {

//        });


// 获取元素


//const addButton = document.getElementById('add-button');
const dataTableBody = document.querySelector('#dataTable tbody');

//从添加商品的界面接收所发送的data
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dataJSON = urlParams.get('data');
  const inputData = JSON.parse(decodeURIComponent(dataJSON));
  initialData.push(inputData);

// 显示初始数据
function displayData() {
    dataTableBody.innerHTML = '';


    initialData.forEach((data, index) => {
        const newRow = createRow(data, index);
        dataTableBody.appendChild(newRow);
    });

}

// 创建表格行
function createRow(data, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.productName}</td>
        <td>${data.price}</td>
        <td>${data.companyName}</td>
        <td>${data.amount}</td>
        <td>${data.category}</td>
        <td>${data.description}</td>
        <td>

            <button class="updateButton btn btn-inverse-info btn-fw" data-index="${index}">Update</button>
            <button class="deleteButton btn btn-inverse-danger btn-fw" data-index="${index}">Delete</button>
        </td>
    `;

    // 添加删除按钮的点击事件监听器
    const deleteButton = row.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        initialData.splice(index, 1); // 从数据中删除项
        displayData(); // 重新显示表格数据
    });

    // 添加更新按钮的点击事件监听器
    const updateButton = row.querySelector('.updateButton');
    updateButton.addEventListener('click', () => {

         // 弹出模态框，允许用户编辑数据
        const updatedData = promptUserToUpdate(data);

        // 如果用户点击了取消按钮，则不执行更新逻辑
        if (!updatedData) {
            return;}

              // 更新数据集中的对应数据
        initialData[index] = updatedData;

        // 重新显示表格数据
        displayData();
    });
//
   return row;
}
//




//
// 弹出模态框以允许用户更新数据
//function promptUserToUpdate(data) {
//
//    const updatedData = {
//        productName: prompt("Enter Product Name", data.productName),
//        price: parseFloat(prompt("Enter Price", data.price)),
//        companyName: prompt("Enter Company Name", data.companyName),
//        amount: parseInt(prompt("Enter Amount", data.amount)),
//        category: prompt("Enter Category", data.category),
//        description: prompt("Enter Description", data.description),
//    };
//
//    // 如果用户点击了取消按钮，则返回null
//    if (Object.values(updatedData).some(value => value === null)) {
//        return null;
//    }
//
//    return updatedData;
//}

displayData();