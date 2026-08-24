const PHIVANCHUYEN = 30000;
let priceFinal = document.getElementById("checkout-cart-price-final");
// Trang thanh toan
function thanhtoanpage(option,product) {
    // Xu ly ngay nhan hang
    let today = new Date();
    let ngaymai = new Date();
    let ngaykia = new Date();
    ngaymai.setDate(today.getDate() + 1);
    ngaykia.setDate(today.getDate() + 2);
    let dateorderhtml = `<a href="javascript:;" class="pick-date active" data-date="${today}">
        <span class="text">Hôm nay</span>
        <span class="date">${today.getDate()}/${today.getMonth() + 1}</span>
        </a>
        <a href="javascript:;" class="pick-date" data-date="${ngaymai}">
            <span class="text">Ngày mai</span>
            <span class="date">${ngaymai.getDate()}/${ngaymai.getMonth() + 1}</span>
        </a>

        <a href="javascript:;" class="pick-date" data-date="${ngaykia}">
            <span class="text">Ngày kia</span>
            <span class="date">${ngaykia.getDate()}/${ngaykia.getMonth() + 1}</span>
    </a>`
    document.querySelector('.date-order').innerHTML = dateorderhtml;
    let pickdate = document.getElementsByClassName('pick-date')
    for(let i = 0; i < pickdate.length; i++) {
        pickdate[i].onclick = function () {
            document.querySelector(".pick-date.active").classList.remove("active");
            this.classList.add('active');
        }
    }

    let totalBillOrder = document.querySelector('.total-bill-order');
    let totalBillOrderHtml;
    // Xu ly don hang
    switch (option) {
        case 1: // Truong hop thanh toan san pham trong gio
            // Hien thi don hang
            showProductCart();
            // Tinh tien
            totalBillOrderHtml = `<div class="priceFlx">
            <div class="text">
                Tiền hàng 
                <span class="count">${getAmountCart()} món</span>
            </div>
            <div class="price-detail">
                <span id="checkout-cart-total">${vnd(getCartTotal())}</span>
            </div>
        </div>
        <div class="priceFlx chk-ship">
            <div class="text">Phí vận chuyển</div>
            <div class="price-detail chk-free-ship">
                <span>${vnd(PHIVANCHUYEN)}</span>
            </div>
        </div>`;
            // Tong tien
            priceFinal.innerText = vnd(getCartTotal() + PHIVANCHUYEN);
            break;
        case 2: // Truong hop mua ngay
            // Hien thi san pham
            showProductBuyNow(product);
            // Tinh tien
            totalBillOrderHtml = `<div class="priceFlx">
                <div class="text">
                    Tiền hàng 
                    <span class="count">${product.soluong} món</span>
                </div>
                <div class="price-detail">
                    <span id="checkout-cart-total">${vnd(product.soluong * product.price)}</span>
                </div>
            </div>
            <div class="priceFlx chk-ship">
                <div class="text">Phí vận chuyển</div>
                <div class="price-detail chk-free-ship">
                    <span>${vnd(PHIVANCHUYEN)}</span>
                </div>
            </div>`
            // Tong tien
            priceFinal.innerText = vnd((product.soluong * product.price) + PHIVANCHUYEN);
            break;
    }

    // Tinh tien
    totalBillOrder.innerHTML = totalBillOrderHtml;

    // Xu ly hinh thuc giao hang
    let giaotannoi = document.querySelector('#giaotannoi');
    let tudenlay = document.querySelector('#tudenlay');
    let tudenlayGroup = document.querySelector('#tudenlay-group');
    let chkShip = document.querySelectorAll(".chk-ship");
    
    tudenlay.addEventListener('click', () => {
        giaotannoi.classList.remove("active");
        tudenlay.classList.add("active");
        chkShip.forEach(item => {
            item.style.display = "none";
        });
        tudenlayGroup.style.display = "block";
        switch (option) {
            case 1:
                priceFinal.innerText = vnd(getCartTotal());
                break;
            case 2:
                priceFinal.innerText = vnd((product.soluong * product.price));
                break;
        }
    })

    giaotannoi.addEventListener('click', () => {
        tudenlay.classList.remove("active");
        giaotannoi.classList.add("active");
        tudenlayGroup.style.display = "none";
        chkShip.forEach(item => {
            item.style.display = "flex";
        });
        switch (option) {
            case 1:
                priceFinal.innerText = vnd(getCartTotal() + PHIVANCHUYEN);
                break;
            case 2:
                priceFinal.innerText = vnd((product.soluong * product.price) + PHIVANCHUYEN);
                break;
        }
    })

    // Su kien khi nhan nut dat hang
    document.querySelector(".complete-checkout-btn").onclick = () => {
        switch (option) {
            case 1:
                xulyDathang();
                break;
            case 2:
                xulyDathang(product);
                break;
        }
    }
}

// Hien thi hang trong gio
function showProductCart() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'));
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = '';
    currentuser.cart.forEach(item => {
        let product = getProduct(item);
        listOrderHtml += `<div class="food-total">
        <div class="count">${item.soluong}x</div>
        <div class="info-food">
            <div class="name-food">${product.title}</div>
        </div>
    </div>`
    })
    listOrder.innerHTML = listOrderHtml;
}

// Hien thi hang mua ngay
function showProductBuyNow(product) {
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = `<div class="food-total">
        <div class="count">${product.soluong}x</div>
        <div class="info-food">
            <div class="name-food">${product.title}</div>
        </div>
    </div>`;
    listOrder.innerHTML = listOrderHtml;
}

//Open Page Checkout
let nutthanhtoan = document.querySelector('.thanh-toan')
let checkoutpage = document.querySelector('.checkout-page');
nutthanhtoan.addEventListener('click', () => {
    checkoutpage.classList.add('active');
    thanhtoanpage(1);
    closeCart();
    body.style.overflow = "hidden"
})

// Đặt hàng ngay
function dathangngay() {
    let productInfo = document.getElementById("product-detail-content");
    let datHangNgayBtn = productInfo.querySelector(".button-dathangngay");
    datHangNgayBtn.onclick = () => {
        if(localStorage.getItem('currentuser')) {
            let productId = datHangNgayBtn.getAttribute("data-product");
            let soluong = parseInt(productInfo.querySelector(".buttons_added .input-qty").value);
            let notevalue = productInfo.querySelector("#popup-detail-note").value;
            let ghichu = notevalue == "" ? "Không có ghi chú" : notevalue;
            let products = JSON.parse(localStorage.getItem('products'));
            let a = products.find(item => item.id == productId);
            a.soluong = parseInt(soluong);
            a.note = ghichu;
            checkoutpage.classList.add('active');
            thanhtoanpage(2,a);
            closeCart();
            body.style.overflow = "hidden"
        } else {
            toast({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
        }
    }
}

// Close Page Checkout
function closecheckout() {
    checkoutpage.classList.remove('active');
    body.style.overflow = "auto"
}

// 🌟 HÀM XỬ LÝ ĐẶT HÀNG DUY NHẤT - ĐÃ LỌC SẠCH SẼ LỖI CÚ PHÁP
function xulyDathang(product) {
    let diachinhan = "";
    let hinhthucgiao = "";
    let thoigiangiao = "";
    let giaotannoi = document.querySelector("#giaotannoi");
    let tudenlay = document.querySelector("#tudenlay");
    let giaongay = document.querySelector("#giaongay");
    let giaovaogio = document.querySelector("#deliverytime");
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));

    // Hinh thuc giao & Dia chi nhan hang
    if(giaotannoi.classList.contains("active")) {
        diachinhan = document.querySelector("#diachinhan") ? document.querySelector("#diachinhan").value.trim() : "";
        hinhthucgiao = giaotannoi.innerText;
    }
    if(tudenlay.classList.contains("active")){
        let chinhanh1 = document.querySelector("#chinhanh-1");
        let chinhanh2 = document.querySelector("#chinhanh-2");
        if(chinhanh1 && chinhanh1.checked) {
            diachinhan = "273 An Dương Vương, Phường 3, Quận 5";
        }
        if(chinhanh2 && chinhanh2.checked) {
            diachinhan = "04 Tôn Đức Thắng, Phường Bến Nghé, Quận 1";
        }
        hinhthucgiao = tudenlay.innerText;
    }

    // Thoi gian nhan hang
    if(giaongay && giaongay.checked) {
        thoigiangiao = "Giao ngay khi xong";
    }
    if(giaovaogio && giaovaogio.checked) {
        thoigiangiao = document.querySelector(".choise-time") ? document.querySelector(".choise-time").value : "Giao vào giờ đã chọn";
    }

    // Lấy thông tin Tên và SĐT người nhận từ giao diện
    let tenKhach = document.querySelector("#tennguoinhan") ? document.querySelector("#tennguoinhan").value.trim() : "";
    let sdtKhach = document.querySelector("#sdtnhan") ? document.querySelector("#sdtnhan").value.trim() : "";

    if(tenKhach === "" || sdtKhach === "" || diachinhan === "") {
        toast({ title: 'Chú ý', message: 'Vui lòng nhập đầy đủ thông tin người nhận!', type: 'warning', duration: 4000 });
        return;
    }

    // Xử lý danh sách món ăn động và tổng tiền động gửi lên MongoDB
    let chuoiMonAn = "";
    let tongTienSo = 0;

    if (product == undefined) {
        // Trường hợp 1: Đặt mua các món trong giỏ hàng
        if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
            chuoiMonAn = currentUser.cart.map(item => {
                let detailSP = getProduct(item); 
                let name = detailSP ? detailSP.title : "Món ăn";
                let price = detailSP ? detailSP.price : getpriceProduct(item.id);
                return `${name} (SL: ${item.soluong}) - Đơn giá: ${vnd(price)}`;
            }).join(', ');
        }

        // 🌟 SỬA LỖI CHÊNH 30K: Tính tổng tiền giống hệt hàm hiển thị thanhtoanpage gốc của cậu
        // Nếu chọn giao tận nơi thì lấy tổng tiền hàng + phí vận chuyển, ngược lại (tự đến lấy) thì chỉ lấy tiền hàng
        if (giaotannoi && giaotannoi.classList.contains("active")) {
            tongTienSo = getCartTotal() + PHIVANCHUYEN;
        } else {
            tongTienSo = getCartTotal();
        }

    } else {
        // Trường hợp 2: Bấm nút Đặt hàng ngay 1 món lẻ
        let name = product.title || "Món ăn";
        let price = product.price || getpriceProduct(product.id);
        chuoiMonAn = `${name} (SL: ${product.soluong}) - Đơn giá: ${vnd(price)}`;

        // Tính tổng tiền cho mua ngay 1 món lẻ
        if (giaotannoi && giaotannoi.classList.contains("active")) {
            tongTienSo = (product.soluong * price) + PHIVANCHUYEN;
        } else {
            tongTienSo = product.soluong * price;
        }
    }

    // Gom dữ liệu sạch đẹp gửi lên MongoDB (ĐÃ BỎ STATUS)
    const thongTinDonHangMongo = {
        customerName: tenKhach,
        phone: sdtKhach,
        address: diachinhan,
        cartItems: chuoiMonAn || "Chưa có món ăn",
        totalPrice: tongTienSo // Con số chuẩn đét không bao giờ lệch ship nữa
    };

    // 🚀 THỰC THI GỬI SANG BACKEND NODEJS LƯU LÊN MONGODB
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(thongTinDonHangMongo)
    })
    .then(response => response.json())
    .then(data => {
        console.log("MongoDB lưu thành công:", data);
    })
    .catch(error => {
        console.error("Lỗi gửi dữ liệu lên MongoDB:", error);
    });

    // --- GIỮ NGUYÊN LOGIC LƯU LOCALSTORAGE GỐC CỦA ĐỒ ÁN ĐỂ KHÔNG LỖI HỆ THỐNG ---
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
    let order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let madon = createId(order);
    let tongtien = 0;

    if(product == undefined) {
        currentUser.cart.forEach(item => {
            item.madon = madon;
            item.price = getpriceProduct(item.id);
            tongtien += item.price * item.soluong;
            orderDetails.push(item);
        });
    } else {
        product.madon = madon;
        product.price = getpriceProduct(product.id);
        tongtien += product.price * product.soluong;
        orderDetails.push(product);
    }   

    let donhang = {
        id: madon,
        khachhang: currentUser.phone,
        hinhthucgiao: hinhthucgiao,
        ngaygiaohang: document.querySelector(".pick-date.active").getAttribute("data-date"),
        thoigiangiao: thoigiangiao,
        ghichu: document.querySelector(".note-order") ? document.querySelector(".note-order").value : "Không có ghi chú",
        tenguoinhan: tenKhach,
        sdtnhan: sdtKhach,
        diachinhan: diachinhan,
        thoigiandat: new Date(),
        tongtien: tongtien,
        trangthai: 0
    }

    order.unshift(donhang);
    if(product == null || product == undefined) {
        currentUser.cart.length = 0;
    }

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("currentuser", JSON.stringify(currentUser));
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    
    toast({ title: 'Thành công', message: 'Đặt hàng thành công !', type: 'success', duration: 1000 });
    setTimeout((e)=>{
        window.location = "/Webbanhang-main/index.html";
    }, 2000);  
}

function getpriceProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let sp = products.find(item => {
        return item.id == id;
    })
    return sp ? sp.price : 0;
}