/* ================== CONFIG ================== */
const BASE_URL = "http://localhost:8080/api/v1/customer";

/* ================== MODAL ================== */
function openModal(type) {
  const overlay = document.getElementById("modalOverlay");
  const title = document.getElementById("modalTitle");
  const btn = $("#actionBtn");

  overlay.style.display = "flex";

  // remove old click handlers
  btn.off("click");

  if (type === "update") {
    title.innerText = "Update Customer";
    btn.text("Update Changes");
    btn.css("background", "var(--warning)");
    btn.on("click", function () {
      updateCustomer();
    });
  } else {
    title.innerText = "Add New Customer";
    btn.text("Save Customer");
    btn.css("background", "var(--primary)");
    btn.on("click", function () {
      saveCustomer();
    });
  }
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

/* ================== LOAD ================== */
window.onload = function () {
  getAllCustomers();
};

/* ================== HELPERS ================== */
function clearInputFealds() {
  $("#customer_id").val("");
  $("#customer_name").val("");
  $("#customer_address").val("");
}

// HTML attributes වල quotes break වෙන්න බැරි වෙන්න escape
function escapeAttr(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/'/g, "\\'").replace(/"/g, '\\"');
}

/* ================== SAVE CUSTOMER ================== */
function saveCustomer() {
  const cid = $("#customer_id").val().trim();
  const cname = $("#customer_name").val().trim();
  const caddress = $("#customer_address").val().trim();

  if (!cid || !cname || !caddress) {
    alert("Please fill all fields!");
    return;
  }

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
      getAllCustomers();
    },
    error: function (error) {
      console.log(error);
      alert("Save failed!");
    },
  });
}

/* ================== GET ALL CUSTOMER ================== */
function getAllCustomers() {
  $.ajax({
    url: BASE_URL,
    method: "GET",
    success: function (response) {
      const $table = $("#customerTable");
      $table.empty();

      // response array check
      if (!Array.isArray(response)) {
        console.log("Unexpected response:", response);
        alert("Invalid customer list response!");
        return;
      }

      response.forEach((customer) => {
        // ✅ Correct keys: cId, cName, cAddress
        const id = customer.cId;
        const name = customer.cName;
        const address = customer.cAddress;

        const row = `
          <tr data-id="${escapeAttr(id)}" data-name="${escapeAttr(
          name
        )}" data-address="${escapeAttr(address)}">
            <td>${id ?? ""}</td>
            <td>${name ?? ""}</td>
            <td>${address ?? ""}</td>
            <td>
              <div class="action-btns">
                <button class="icon-btn edit-btn" data-action="edit" type="button">
                  <i class="fas fa-pen"></i>
                </button>
                <button class="icon-btn delete-btn" data-action="delete" type="button">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `;

        $table.append(row);
      });
    },
    error: function (error) {
      console.error("Error loading customers:", error);
      alert("Failed to load customers!");
    },
  });
}

/* ================== TABLE EVENTS (EDIT / DELETE) ================== */
$("#customerTable").on("click", "tr", function (e) {
  if ($(e.target).closest("button").length) return;

  const id = $(this).data("id");
  const name = $(this).data("name");
  const address = $(this).data("address");

  $("#customer_id").val(id);
  $("#customer_name").val(name);
  $("#customer_address").val(address);
});

// Edit/Delete buttons
$("#customerTable").on("click", "button", function () {
  const action = $(this).data("action");
  const $tr = $(this).closest("tr");

  const id = $tr.data("id");
  const name = $tr.data("name");
  const address = $tr.data("address");

  if (action === "edit") {
    editCustomer(id, name, address);
  } else if (action === "delete") {
    deleteCustomer(id);
  }
});

/* ================== EDIT CUSTOMER ================== */
function editCustomer(id, name, address) {
  $("#customer_id").val(id);
  $("#customer_name").val(name);
  $("#customer_address").val(address);

  openModal("update");
}

/* ================== UPDATE CUSTOMER ================== */
function updateCustomer() {
  const data = {
    cId: $("#customer_id").val().trim(),
    cName: $("#customer_name").val().trim(),
    cAddress: $("#customer_address").val().trim(),
  };

  if (!data.cId || !data.cName || !data.cAddress) {
    alert("Please fill all fields!");
    return;
  }

  $.ajax({
    url: BASE_URL,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      alert("Customer Updated Successfully!");
      closeModal();
      clearInputFealds();
      getAllCustomers();
    },
    error: function (error) {
      console.error(error);
      alert("Update failed!");
    },
  });
}

/* ================== DELETE CUSTOMER ================== */
function deleteCustomer(cId) {
  if (!cId) {
    alert("Invalid ID!");
    return;
  }

  if (confirm("Are you sure you want to delete customer " + cId + " ?")) {
    $.ajax({
      url: BASE_URL + "/" + cId, // PathVariable: /{customerId}
      method: "DELETE",
      success: function (response) {
        alert("Customer Deleted Successfully");
        clearInputFealds();
        getAllCustomers();
      },
      error: function (error) {
        console.log(error);
        alert("Delete failed! Check if ID exists.");
      },
    });
  }
}
