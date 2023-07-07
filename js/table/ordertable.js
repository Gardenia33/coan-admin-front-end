const initialData = [
  {
    productName: "Product 1",
    orderId: 1,
    sellerId: "Seller 1",
    buyerId: "Buyer 1",
    createTime: "2023-07-01",
    status: "Active"
  },
  {
    productName: "Product 2",
    orderId: 2,
    sellerId: "Seller 2",
    buyerId: "Buyer 2",
    createTime: "2023-07-02",
    status: "Active"
  },
  {
    productName: "Product 3",
    orderId: 3,
    sellerId: "Seller 3",
    buyerId: "Buyer 3",
    createTime: "2023-07-03",
    status: "Inactive"
  },
  {
    productName: "Product 4",
    orderId: 4,
    sellerId: "Seller 4",
    buyerId: "Buyer 4",
    createTime: "2023-07-04",
    status: "Active"
  },
  {
    productName: "Product 5",
    orderId: 5,
    sellerId: "Seller 5",
    buyerId: "Buyer 5",
    createTime: "2023-07-05",
    status: "Inactive"
  },
  {
    productName: "Product 6",
    orderId: 6,
    sellerId: "Seller 6",
    buyerId: "Buyer 6",
    createTime: "2023-07-06",
    status: "Active"
  },
  {
    productName: "Product 7",
    orderId: 7,
    sellerId: "Seller 7",
    buyerId: "Buyer 7",
    createTime: "2023-07-07",
    status: "Active"
  },
  {
    productName: "Product 8",
    orderId: 8,
    sellerId: "Seller 8",
    buyerId: "Buyer 8",
    createTime: "2023-07-08",
    status: "Inactive"
  },
  {
    productName: "Product 9",
    orderId: 9,
    sellerId: "Seller 9",
    buyerId: "Buyer 9",
    createTime: "2023-07-09",
    status: "Active"
  },
  {
    productName: "Product 10",
    orderId: 10,
    sellerId: "Seller 10",
    buyerId: "Buyer 10",
    createTime: "2023-07-10",
    status: "Active"
  }
];





// const addButton = document.getElementById('add-button');
//        addButton.addEventListener('click', () => {

//        });


// 获取元素


//const addButton = document.getElementById('add-button');
const dataTableBody = document.querySelector('#dataTable tbody');

//从添加商品的界面接收所发送的data
//  const queryString = window.location.search;
//  const urlParams = new URLSearchParams(queryString);
//  const dataJSON = urlParams.get('data');
//  const inputData = JSON.parse(decodeURIComponent(dataJSON));
//  initialData.push(inputData);

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
        <td>${data.orderId}</td>
        <td>${data.sellerId}</td>
        <td>${data.buyerId}</td>
        <td>${data.createTime}</td>
        <td>${data.status}</td>

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