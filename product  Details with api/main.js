function submitForm() {

  if (!editFormData)
    addUser(); // if the editFormData is undefined then call addUser()
  else editData();
}
document.getElementById('submit').addEventListener('click', function () {
  document.querySelector(".card").style.display = "none";


})
document.getElementById('submit2').addEventListener('click', function () {

  document.querySelector(".card2").style.display = "none";

})



if (
  document.getElementById('Product').addEventListener('click', function () {
    document.querySelector(".card").style.display = "block";
    document.querySelector(".card2").style.display = "none";
  })
);
else (document.getElementById('editproduct').addEventListener('click', function () {
  // document.querySelector(".card2").style.display = "block";
  // document.querySelector(".card").style.display = "none";

}))




// base 64 image---

// function encodeImageFileAsURL(element) {
//   var file = element.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function() {
//     console.log('RESULT', reader.result)
//   }
//   reader.readAsDataURL(file);
// }
// var srcData;
// function newimage() {
  



// fileinput.addEventListener("change", e=>{
//   const file=fileinput.files[0];
//   const reader= new FileReader();
  
//   reader.addEventListener("load",()=>{
//     console.log(reader.result);
//   })
//   reader.readAsDataURL(file);
// })
// }



var reader = "";
var file;
// const fileinput= document.getElementById('image1');

  function encodeImageFileAsURL() {
  
   file = document.querySelector(
      'input[type=file]')['files'][0];
 
 reader = new FileReader();
  console.log("next");
    
  reader.onload = function () {
      base64String = reader.result.replace("data:", "")
          .replace(/^.+,/, "");

      imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      console.log(base64String);
  }

 if (file) {
    reader.readAsDataURL(file);
}


  // reader.readAsDataURL(file);

 
  }


const URL = "http://192.168.1.56:5000/products/"

var globaluid;
var quantity ;
// var _id ;


function getData() {
  fetch(URL).then(
    (res) => res.json()
  ).then((response) => {

    var tmpData = "";

    response.forEach((user) => {

      quantity = user.quantity
      // console.log(user)

      tmpData += `<tr>
      <td  > ${user.name} </td>
      <td style='color:${user.quantity < 20 ? "red" : "#000"}' > ${ user.quantity } </td>
      <td> ${ user.price } </td>
      <td> ${ user.manufacturer } </td>
      <td>     <img class ="image" src="${user.image}"></td>
      <td><button class='w3-button w3-red' onclick='deleteData("${user.uid}")'>Delete</button></td>
      <td  ><button   class="w3-button w3-blue"   onclick='editDataCall("${user.uid}")'>Edit</button></td></tr>`

      // tmpData += "</tr>";


      // _id++;

    })

    document.getElementById("tbData").innerHTML = tmpData;//dom element
    
    


    // console.log(color_quantity)
    // if (quantity < 0) {
    //   // console.log(quantity)
    //   color_quantity.style.backgroundColor = "red";
    //   // let va= document.getElementById("table").rows[i].cells[j].innerText;
    //   // console.log(va)
    // }
    // }
    


    // console.log(quantity)










  })
}

getData();

function addUser() {
  let payload = getFormData();
  // let payload;
  payload['name'] = document.getElementById('name_card1').value;
  payload['quantity'] = document.getElementById('quantity_card1').value;
  payload['price'] = document.getElementById('price_card1').value;
  payload['manufacturer'] = document.getElementById('manufacturer_card1').value;
  payload['image']=reader.result;

  // console.log(encodeImageFileAsURL)

  console.log(payload)

  fetch(URL, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",

    },
    body: JSON.stringify(payload)
  }).then((res) => res.json()).then((response) => {

    getData(); // reload table 

  })

}
var editFormData;

function getFormData() {
  return {
    name: document.getElementById("name_card1").value,
    quantity: document.getElementById("quantity_card1").value,
    price: document.getElementById("price_card1").value,
    manufacturer: document.getElementById("manufacturer_card1").value,
    // image: document.getElementById("image1").files,
  }
  

}

function editedFormData() {
  return {
    name: document.getElementById("name").value,
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value,
    manufacturer: document.getElementById("manufacturer").value,
    image:reader.result,
  }
}

// edit data 
function editData() {
  var formData = editedFormData();
  console.log(formData)
  // formData['globaluid']=editFormData.globaluid;
  // formData=editFormData.globaluid;
  fetch(URL + globaluid, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",

    },
    body: JSON.stringify(formData)
  }).then((res) => res.json()).then((response) => {


    console.log(response)
    // setSuccessMessage(response.message)
    resetForm(); // clear the form field
    getData(); // reload the table
  })








}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  document.getElementById("manufacturer").value = "";
  // document.getElementById("image").files = "";

}

function editDataCall(guid) {
  // alert(guid)

  document.querySelector(".card2").style.display = "block";
  document.querySelector(".card").style.display = "none";
  // console.log({guid,index});
  globaluid = guid;
  console.log(globaluid)
  // call get user details by id API

  fetch(URL, {
    method: "GET"
  }).then((res) => res.json()).then((response) => {


    {


      editFormData = response.find(item => item.uid === guid);
      setFormData(editFormData.name, editFormData.quantity, editFormData.price, editFormData.manufacturer,editFormData.image)

    }
    







  })

}

function setFormData(name, quantity, price, manufacturer,image) {
  document.getElementById("name").value = name;
  document.getElementById("quantity").value = quantity;
  document.getElementById("price").value = price;
  document.getElementById("manufacturer").value = manufacturer;
  // document.getElementById("image1").files=image  

}

function addformdata(name, quantity, price, manufacturer ,image) {
  document.getElementById("name_card1").value = name;
  document.getElementById("quantity_card1").value = quantity;
  document.getElementById("price_card1").value = price;
  document.getElementById("manufacturer").value = manufacturer;
  // document.getElementById("image1").files=image
}

// delete data
function deleteData(uid) {
  console.log(uid)

  if (confirm('Do you want to delete this record?')) {
    fetch(URL + uid, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

      },
      // body:JSON.stringify(uid)

    }).then((res) => res.json()).then(
      (response) => {

        getData();

      }
    )

  }

}
