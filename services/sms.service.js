// services/sms.service.js
const axios = require("axios");

const {
  ESMS_API_KEY,
  ESMS_SECRET_KEY,
  ESMS_BRANDNAME,
  ESMS_SANDBOX,
} = process.env;

async function sendSMS(phone, message) {
  
  if (!ESMS_API_KEY || !ESMS_SECRET_KEY) {
    return {
      success: false,
      error: {
        CodeResult: "NO_CREDENTIALS",
        ErrorMessage: "Missing ESMS_API_KEY or ESMS_SECRET_KEY",
      },
    };
  }

  const url = "https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/";

  const payload = {
    ApiKey: ESMS_API_KEY,
    SecretKey: ESMS_SECRET_KEY,
    Phone: phone,
    Content: message,
    Brandname: ESMS_BRANDNAME,
    SmsType: "2",
    IsUnicode: "0",
    Sandbox: ESMS_SANDBOX || "0",
  };

  console.log("\n======================================");
  console.log("📤 ĐANG GỬI SMS...");
  console.log("➡️ URL:", url);
  console.log("➡️ PAYLOAD GỬI LÊN:", payload);

  try {
    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("📥 RESPONSE NHẬN VỀ:", res.data);

    // Nếu eSMS trả CodeResult != 100 → lỗi
    if (res.data.CodeResult !== "100") {
      console.error("❌ eSMS BÁO LỖI:", res.data);
      return { success: false, error: res.data };
    }

    console.log("✅ SMS gửi THÀNH CÔNG!");
    return { success: true, data: res.data };

  } catch (error) {
    console.error("\n🔥 LỖI AXIOS KHI GỌI API eSMS");
    console.error(error?.response?.data || error.message || error);
    return { success: false, error };
  }
}

module.exports = { sendSMS };
