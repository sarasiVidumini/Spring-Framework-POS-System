// ==============================
// ORDER PAGE JS (Complete)
// ==============================

const CUST_URL = "http://localhost:8080/api/v1/customer"; // no trailing space
const ITEM_URL = "http://localhost:8080/api/v1/item";
const ORDER_URL = "http://localhost:8080/api/v1/orders";

let cart = [];
let customers = [];
let items = [];

$(document).ready(function () {
  // set current date
  $("#orderDate").val(new Date().toISOString().split("T")[0]);

  loadAllIds();
  generateOrderId();

  // discount change -> recalc total
  $("#discount").on("input", function () {
    renderCart();
  });
});

// 1) Load customers + items
function loadAllIds() {
  // ---------- Customers ----------
  $.ajax({
    url: CUST_URL,
    method: "GET",
    success: function (resp) {
      console.log("CUSTOMERS RESP =>", resp);

      customers = Array.isArray(resp) ? resp : resp?.data || [];

      $("#selectCustomer")
        .empty()
        .append(`<option value="">Select Customer</option>`);

      customers.forEach((c) => {
        // ✅ based on your console output: cId, cName, cAddress
        $("#selectCustomer").append(
          `<option value="${c.cId}">${c.cId}</option>`
        );
      });
    },
    error: function (xhr) {
      console.log("CUSTOMERS ERROR =>", xhr);
      alert("Customers load failed: " + (xhr.responseText || xhr.status));
    },
  });

  // ---------- Items ----------
  $.ajax({
    url: ITEM_URL,
    method: "GET",
    success: function (resp) {
      console.log("ITEMS RESP =>", resp);

      items = Array.isArray(resp) ? resp : resp?.data || [];

      $("#selectItem").empty().append(`<option value="">Select Item</option>`);

      items.forEach((i) => {
        $("#selectItem").append(
          `<option value="${i.code}">${i.code}</option>`
        );
      });
    },
    error: function (xhr) {
      console.log("ITEMS ERROR =>", xhr);
      alert("Items load failed: " + (xhr.responseText || xhr.status));
    },
  });
}

// 2) Customer select -> fill ✅ (uses cId/cName/cAddress)
$("#selectCustomer").change(function () {
  const id = $(this).val();
  const customer = customers.find((c) => c.cId === id);

  if (customer) {
    $("#custName").val(customer.cName || "");
    $("#custAddress").val(customer.cAddress || "");
  } else {
    $("#custName").val("");
    $("#custAddress").val("");
  }
});

// 2b) Item select -> fill
$("#selectItem").change(function () {
  const code = $(this).val();
  const item = items.find((i) => i.code === code);

  if (!item) {
    $("#itemDesc").val("");
    $("#itemPrice").val("");
    $("#qtyOnHand").val("");
    return;
  }

  $("#itemDesc").val(item.description || "");
  $("#itemPrice").val(item.unitPrice ?? "");

  // handle both qtyOnHand / qtyonHand from backend
  const qoh = item.qtyOnHand ?? item.qtyonHand ?? 0;
  $("#qtyOnHand").val(qoh);
});

// 3) Add to cart
$(".btn-add").click(function () {
  const code = $("#selectItem").val();
  const item = items.find((i) => i.code === code);

  const qty = parseInt($("#orderQty").val());

  if (!item || !code) {
    alert("Please select an item.");
    return;
  }
  if (isNaN(qty) || qty <= 0) {
    alert("Enter a valid quantity.");
    return;
  }

  const price = Number(item.unitPrice);
  const availableQty = Number(item.qtyOnHand ?? item.qtyonHand ?? 0);

  // current qty already in cart
  const existing = cart.find((x) => x.itemCode === code);
  const already = existing ? existing.qty : 0;

  if (qty + already > availableQty) {
    alert("Insufficient stock available!");
    return;
  }

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      itemCode: code,
      description: item.description || "",
      unitPrice: price,
      qty: qty,
    });
  }

  $("#orderQty").val(""); // clear input
  renderCart();
});

// Render cart + totals (with discount)
function renderCart() {
  $("#orderTableBody").empty();

  let subTotal = 0;

  cart.forEach((it, index) => {
    const lineTotal = it.unitPrice * it.qty;
    subTotal += lineTotal;

    $("#orderTableBody").append(`
      <tr>
        <td>${it.itemCode}</td>
        <td>${it.description}</td>
        <td>${Number(it.unitPrice).toFixed(2)}</td>
        <td>${it.qty}</td>
        <td>${lineTotal.toFixed(2)}</td>
        <td>
          <button class="icon-btn delete-btn" onclick="removeItem(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `);
  });

  // discount
  const discountPercent = Number($("#discount").val() || 0);
  const discount = (subTotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subTotal - discount);

  $("#grandTotal").text(`Rs. ${grandTotal.toFixed(2)}`);
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// 4) Place order
$(".btn-place-order").click(function () {
  if (cart.length === 0) {
    alert("Please add at least one item to the cart.");
    return;
  }

  const customerId = $("#selectCustomer").val();
  if (!customerId) {
    alert("Please select a customer.");
    return;
  }

  // ✅ backend DTO needs only itemCode, qty, unitPrice
  const orderDetails = cart.map((x) => ({
    itemCode: x.itemCode,
    qty: x.qty,
    unitPrice: x.unitPrice,
  }));

  const orderData = {
    orderId: $("#orderIdDisplay").text().replace("#", "").trim(),
    date: $("#orderDate").val(),
    customerId: customerId, // will be cId value (C001, C002...)
    orderDetails: orderDetails,
  };

  $.ajax({
    url: ORDER_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(orderData),
    success: function () {
      alert("Order Placed Successfully! ✅");
      location.reload();
    },
    error: function (err) {
      const msg =
        err?.responseJSON?.message || err?.responseText || "Unknown error";
      alert("Order Placement Failed: " + msg);
    },
  });
});

// temp order id generator
function generateOrderId() {
  const id = "ORD-" + String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  $("#orderIdDisplay").text("#" + id);
}
