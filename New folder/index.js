const checkTax = (taxNumber,ele) => {
    let boxShow = document.querySelector(ele);
    let tax = document.querySelector("." + taxNumber).value;
    const apiUrl = `https://api.vietqr.io/v2/business/${tax}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                boxShow.innerHTML = "Xảy ra lỗi rồi " + response.status;
            }
            return response.json();
        })
        .then(data => {
            let dataSend = data;
            let htmlSend = "";
            if (data.code == "00") {
                dataSend = data.data;
                htmlSend = `<div class="result-group" style="display: flex; align-items: center; gap: 10px;">
                                            <label style="margin: 0">Mã số thuế: </label>
                                            <p style="margin: 0; font-size: 15px; color: green; font-weight: bold">${dataSend.id}</p>
                                        </div>
                                        <div class="result-group" style="display: flex; align-items: center; gap: 10px;">
                                            <label style="margin: 0">Tên công ty: </label>
                                            <p style="margin: 0; font-size: 15px; color: green; font-weight: bold">${dataSend.name}</p>
                                        </div>
                                        <div class="result-group" style="display: flex; align-items: center; gap: 10px;">
                                            <label style="margin: 0">Địa chỉ: </label>
                                            <p style="margin: 0; font-size: 15px; color: green; font-weight: bold">${dataSend.address}</p>
                                        </div>`;

            } else {
                htmlSend = `
                                            <label style="margin: 0">Không tìm thấy: </label>
                                            <p style="margin: 0; font-size: 15px; color: red; font-weight: bold">${dataSend.desc}</p>
                                        </div>`;
            }
            boxShow.innerHTML = htmlSend;
        })
        .catch(error => {
            boxShow.innerHTML = "Xảy ra lỗi rồi1 " + error;
        });
}

