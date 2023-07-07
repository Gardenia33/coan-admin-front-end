//加载表格数据
let initialData =[];


document.addEventListener('DOMContentLoaded', () => {
    // 页面加载时执行以下操作

    // 发送GET请求到后端API
    fetch('http://localhost:8080/manager/showproduct')
        .then(response => response.json())
        .then(data => {
            // 数据请求成功后执行以下操作

             initialData=data.data;
            console.log(initialData);
            renderDataToTable(initialData);

        })
        .catch(error => console.error('Error:', error));
});

const dataTableBody = document.querySelector('#dataTable tbody');
function renderDataToTable(data) {

    // 遍历数据并渲染到表格中
    displayData();

}


//  const id = data.productId;
//  console.log(id);
//  console.log(initialData.productId);

// 创建表格行
function createRow(data, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.company}</td>
        <td>${data.turnover}</td>
        <td>${data.category}</td>
        <td>${data.description}</td>
        <td>

            <button class="updateButton btn btn-inverse-info btn-fw" data-index="${index}">Update</button>
            <button class="deleteButton btn btn-inverse-danger btn-fw" data-index="${index}">Delete</button>
        </td>
    `;
    //添加删除按钮的点击事件监听器
    const deleteButton = row.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
    initialData.splice(index, 0); // 从数据中删除项
    const id =initialData[index].productId;
  //console.log(initialData.productId);
       //
        deleteProduct(id);
        displayData(); // 重新显示表格数据
        location.reload();

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

    return row;
    }


    //显示表格数据
     function displayData() {
         dataTableBody.innerHTML = '';
         initialData.forEach((data, index) => {
             const newRow = createRow(data, index);
             dataTableBody.appendChild(newRow);
         });

     }


     //
     // 弹出模态框以允许用户更新数据
     function promptUserToUpdate(data) {

         const updatedData = {
             productName: prompt("Enter Product Name", data.productName),
             price: parseFloat(prompt("Enter Price", data.price)),
             companyName: prompt("Enter Company Name", data.companyName),
             amount: parseInt(prompt("Enter Amount", data.amount)),
             category: prompt("Enter Category", data.category),
             description: prompt("Enter Description", data.description),
         };

         // 如果用户点击了取消按钮，则返回null
         if (Object.values(updatedData).some(value => value === null)) {
             return null;
         }

         return updatedData;
     }

     function deleteProduct(id) {
         // Send a delete request to the backend API endpoint
         fetch('http://localhost:8080/manager/deleteproduct/'+id, {
             method: 'DELETE' })
         .then(response => {
             if (response.ok) {

                initialData.splice(index, 1); // 从数据中删除项
             } else {
                 // Handle error response
                 console.log('Delete request failed');
             }
         })
         .catch(error => {
             // Handle network or fetch error
             console.error('Error deleting product:', error);
         });
     }
