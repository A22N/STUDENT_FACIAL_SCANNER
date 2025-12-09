require('dotenv').config();
const axios = require('axios');

// Lấy API Key và Secret Key từ biến môi trường
const {
  ESMS_API_KEY,
  ESMS_SECRET_KEY,
  ESMS_BRANDNAME,
  ESMS_SANDBOX,
} = process.env;

// Chuẩn bị payload theo đúng cấu trúc yêu cầu của eSMS
const smsData = {
  ApiKey: ESMS_API_KEY,
  SecretKey: ESMS_SECRET_KEY,
  Content: "CODE la ma xac minh dang ky Baotrixemay cua ban",
  Phone: "0901234567",            // Số điện thoại nhận (ví dụ định dạng nội địa VN)
  Brandname: ESMS_BRANDNAME,       // Brandname thử nghiệm do eSMS cung cấp
  SmsType: "2",                   // 2 = CSKH/OTP
  IsUnicode: "0"                  // 0 = không dấu; đổi thành "1" nếu nội dung có dấu
  // Có thể thêm RequestId, CallbackUrl... nếu cần
};

// Gửi POST request đến API eSMS
axios.post('https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/', smsData, {
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    const res = response.data;
    console.log("CodeResult:", res.CodeResult);
    console.log("ErrorMessage:", res.ErrorMessage || "No error");
  })
  .catch(error => {
    console.error("Gửi SMS thất bại:", error.message);
  });


// Đoạn mã trên sẽ gửi yêu cầu HTTP POST tới **API eSMS** với nội dung JSON. Hãy thay `"0901234567"` bằng số điện thoại thực tế của bạn 
// (bao gồm mã quốc gia nếu cần, ví dụ số Việt Nam có thể dùng `84xxxxxxxxx` hoặc bắt đầu `0`). Khi chạy, nếu cấu hình đúng, bạn sẽ thấy kết quả 
// trong console: **CodeResult** (mã kết quả eSMS trả về) và **ErrorMessage** (thông báo lỗi nếu có). Mã **CodeResult = "100"** thường nghĩa 
// là yêu cầu đã được chấp nhận xử lý (success):contentReference[oaicite:8]{index=8}. Ngược lại, nếu khác "100", bạn nên kiểm tra **ErrorMessage** 
// để biết nguyên nhân (ví dụ "Brand name code is not exist" hoặc "Authorize Failed"...). Lưu ý: bạn có thể bật **Sandbox** (môi trường test) bằng 
// cách thêm trường `"Sandbox": "1"` trong payload để kiểm tra kết nối mà không thực gửi SMS (tin sẽ không bị trừ tiền và không gửi đến số nhận).
