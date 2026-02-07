function openModal(type) {
  const overlay = document.getElementById("modalOverlay");
  const title = document.getElementById("modalTitle");
  const btn = $("#actionBtn");

  overlay.style.display = "flex";

  btn.off("click");

  if (type === "update") {
    title.innerText = "Update Customer";
    btn.text("Update Changes");
    btn.css("background", "var(--warning)");
    btn.click(function () {
      // updateCustomer();
    });
  } else {
    title.innerText = "Add New Customer";
    btn.text("Save Customer");
    btn.css("background", "var(--primary)");
    btn.click(function () {
      saveCustomer();
    });
  }
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}
window.onload = function () {
  // getAllCustomers();
};
const BASE_URL = "http://localhost:8080/api/v1/customer";

$("#actionBtn").click(function () {
  saveCustomer();
});

/* ================== SAVE CUSTOMER ==================*/
function saveCustomer() {
  const cid = $("#customer_id").val();
  const cname = $("#customer_name").val();
  const caddress = $("#customer_address").val();

  $.ajax({
    url: BASE_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      cId: cid,
      cName: cname,
      cAddress: caddress,
    }),
    success: function (response) {
      alert("Successfully Saved");
      closeModal();
      clearInputFealds();
      console.log(response);
      // getAllCustomers();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

/* ================== CLEAR FIELDS ==================*/
function clearInputFealds() {
  $("#customer_id").val("");
  $("#customer_name").val("");
  $("#customer_address").val("");
}

/* ================== GET ALL CUSTOMER ==================*/
//   function getAllCustomers() {
//     $.ajax({
//       url: BASE_URL,
//       method: "GET",
//       success: function (response) {
//         $("#customerTable").empty();
//         response.forEach((customer) => {
//           const row = `
// <tr>
//     <td>${customer.cid}</td>
//     <td>${customer.cname}</td>
//     <td>${customer.caddress}</td>
//     <td>
//         <div class="action-btns">
//             <button class="icon-btn edit-btn" onclick="editCustomer('${customer.cid}', '${customer.cname}', '${customer.caddress}')">
//                 <i class="fas fa-pen"></i>
//             </button>
//             <button class="icon-btn delete-btn" onclick="deleteCustomer('${customer.cid}')">
//                 <i class="fas fa-trash"></i>
//             </button>
//         </div>
//     </td>
// </tr>`;
//           $("#customerTable").append(row);
//         });
//       },
//       error: function (error) {
//         console.error("Error loading customers:", error);
//       },
//     });
//   }
/* ================== EDIT CUSTOMER ==================*/
//   function editCustomer(id, name, address) {
//     $("#customer_id").val(id);
//     $("#customer_name").val(name);
//     $("#customer_address").val(address);

//     openModal("update");
//   }

/* ================== UPDATE CUSTOMER ==================*/
//   function updateCustomer() {
//     const data = {
//       cid: $("#customer_id").val(),
//       cname: $("#customer_name").val(),
//       caddress: $("#customer_address").val(),
//     };

//     $.ajax({
//       url: BASE_URL,
//       method: "PUT",
//       contentType: "application/json",
//       data: JSON.stringify(data),
//       success: function (response) {
//         alert("Customer Updated Successfully!");
//         closeModal();
//         getAllCustomers();
//       },
//       error: function (error) {
//         console.error(error);
//         alert("Update failed !");
//       },
//     });
//   }

/* ================== fill the input fields ==================*/
//   $("#customerTable").on("click", "tr", function () {
//     let id = $(this).children(":eq(0)").text();
//     let name = $(this).children(":eq(1)").text();
//     let address = $(this).children(":eq(2)").text();

//     $("#customer_id").val(id);
//     $("#customer_name").val(name);
//     $("#customer_address").val(address);
//   });

/* ================== DELETE CUSTOMER ==================*/
//   function deleteCustomer(id) {
//     if (confirm("Are you sure you want to delete customer " + id + " ?")) {
//       $.ajax({
//         url: BASE_URL + "?id=" + id,
//         method: "DELETE",
//         success: function (response) {
//           alert("Customer Deleted Successfully");
//           getAllCustomers();
//           clearInputFealds();
//         },
//         error: function (error) {
//           console.log(error);
//           alert("Delete failed! Check if ID exists.");
//         },
//       });
//     }
//   }
