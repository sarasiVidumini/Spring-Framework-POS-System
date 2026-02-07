function openModal(type) {
        const overlay = document.getElementById("modalOverlay");
        const title = document.getElementById("modalTitle");
        const btn = $("#actionBtn");

        overlay.style.display = "flex";

        btn.off("click");

        if (type === "update") {
          title.innerText = "Update Item";
          btn.text("Update Changes");
          btn.css("background", "var(--warning)");
          btn.click(function () {
            // updateItem();
          });
        } else {
          title.innerText = "Add New Item";
          btn.text("Save Item");
          btn.css("background", "var(--primary)");
          btn.click(function () {
            // saveItem();
          });
        }
      }

      function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
      }

//  const BASE_URL =
//         "http://localhost:8080/Backend_pos_monorepo_war_exploded/api/v1/items";

//       window.onload = function () {
//         getAllItems();
//       };
//       $("#actionBtn").click(function () {
//         saveItem();
//       });

      /*================== SAVE Item ==================*/
    //   function saveItem() {
    //     const code = $("#itemCode").val();
    //     const description = $("#itemDescription").val();
    //     const unitPrice = $("#ItemUnitPrice").val();
    //     const qty = $("#itemQty").val();

    //     $.ajax({
    //       url: BASE_URL,
    //       method: "POST",
    //       contentType: "application/json",
    //       data: JSON.stringify({
    //         code: code,
    //         description: description,
    //         unitPrice: parseFloat(unitPrice),
    //         qtyOnHand: parseInt(qty),
    //       }),
    //       success: function (response) {
    //         alert("Item Saved Successfully!");
    //         getAllItems();
    //         closeModal();
    //       },
    //       error: function (error) {
    //         console.error(error);
    //         alert("Failed to save item.");
    //       },
    //     });
    //   }

      /* ================== GET ALL ITEMS ==================*/
    //   function getAllItems() {
    //     $.ajax({
    //       url: BASE_URL,
    //       method: "GET",
    //       success: function (response) {
    //         $("#itemTable").empty();
    //         response.forEach((item) => {
    //           const row = `
    //                 <tr>
    //                     <td>${item.code}</td>
    //                     <td>${item.description}</td>
    //                     <td>${item.unitPrice}</td>
    //                     <td>${item.qtyOnHand}</td>
    //                     <td>
    //                         <div class="action-btns">
    //                             <button class="icon-btn edit-btn" onclick="editItem('${item.code}', '${item.description}', ${item.unitPrice}, ${item.qtyOnHand})">
    //                                 <i class="fas fa-pen"></i>
    //                             </button>
    //                             <button class="icon-btn delete-btn" onclick="deleteItem('${item.code}')">
    //                                 <i class="fas fa-trash"></i>
    //                             </button>
    //                         </div>
    //                     </td>
    //                 </tr>`;
    //           $("#itemTable").append(row);
    //         });
    //       },
    //       error: function (error) {
    //         console.error("Error load items");
    //       },
    //     });
    //   }

      /* ================== UPDATE CUSTOMER ==================*/
    //   function updateItem() {
    //     const data = {
    //       code: $("#itemCode").val(),
    //       description: $("#itemDescription").val(),
    //       unitPrice: $("#ItemUnitPrice").val(),
    //       qtyOnHand: $("#itemQty").val(),
    //     };
    //     $.ajax({
    //       url: BASE_URL,
    //       method: "PUT",
    //       data: JSON.stringify(data),
    //       success: function (response) {
    //         alert("item details update successfully");
    //         closeModal();
    //         getAllItems();
    //       },
    //       error: function (error) {
    //         console.log(error);
    //         alert("Failed to upadte this details");
    //       },
    //     });
    //   }

    //   function editItem(code, description, unitPrice, qtyOnHand) {
    //     $("#itemCode").val(code);
    //     $("#itemDescription").val(description);
    //     $("#ItemUnitPrice").val(unitPrice);
    //     $("#itemQty").val(qtyOnHand);
    //     openModal("update");
      }

      /* ================== fill the input fields ==================*/
    //   $("#itemTable").on("click", "tr", function () {
    //     let code = $(this).children(":eq(0)").text();
    //     let description = $(this).children(":eq(1)").text();
    //     let unitPrice = $(this).children(":eq(2)").text();
    //     let qtyOnHand = $(this).children(":eq(3)").text();

    //     $("#itemCode").val(code);
    //     $("#itemDescription").val(description);
    //     $("#ItemUnitPrice").val(unitPrice);
    //     $("#itemQty").val(qtyOnHand);
    //   });

      /* ================== DELETE ITEM ==================*/
    //   function deleteItem(code) {
    //     if (confirm("Are you sure delete this item details ? ")) {
    //       $.ajax({
    //         url: BASE_URL + "?code=" + code,
    //         method: "DELETE",
    //         success: function (response) {
    //           console.log(response);
    //           alert("Successfully delete item details");
    //           getAllItems();
    //         },
    //         error: function (error) {
    //           console.log(error);
    //           alert("Delete failed! Check if ID exists.");
    //         },
    //       });
    //     }
    //   }