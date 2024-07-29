const unixTimeNow = Math.floor(Date.now() / 1000);
console.log({ unixTimeNow });

const min = 1;
const max = 9999;
let randomNumberFloat = Math.random() * (max - min) + min;
const random = Math.round(randomNumberFloat);
console.log({ random });

export const signUpOTPVerificationEvent = () => {
  window.fbq("track", "SignUp-OTP-Verification");
};

export const signUpPhoneNumberEvent = () => {
  window.fbq("track", "SignUp-PhoneNumber-Entered");
};

export const landingPageEvent = () => {
  window.fbq("track", "Lead-LandingPage");
};

export const kycUploadEvent = () => {
  window.fbq("track", "KYC-Upload");
};

export const leadEvent = async (data) => {
  window.fbq("track", "Lead", {
    advertiser_tracking_enabled: 1,
    application_tracking_enabled: 1,
    value: data.value ? data.value : 0,
    currency: "USD",
    event_time: data.date ? data.date : unixTimeNow,
    external_id: data.external_id ? data.external_id.toString() : "user123",
    client_ip_address: data.client_ip_address,
    client_user_agent:
      data.client_user_agent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    fbclid: data.fbclid, // Include fbclid if available
  });
};

// export const purchaseEvent = async () => {
//   fbc("track", "Purchase");
// };

// sent data={value, data,external_id, fbclid, client_ip_address }
export const purchaseEvent = async (data) => {
  window.fbq("track", "Purchase", {
    advertiser_tracking_enabled: 1,
    application_tracking_enabled: 1,
    value: data.value ? data.value : 10,
    currency: "USD",
    event_time: data.date ? data.date : unixTimeNow,
    external_id: data.external_id ? data.external_id.toString() : "user123",
    client_ip_address: data.client_ip_address,
    client_user_agent:
      data.client_user_agent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    fbclid: data.fbclid, // Include fbclid if available
  });
};

// sent data={value, data,external_id, fbclid, client_ip_address }
export const purchaseEventStandard = async () => {
  window.fbq(
    "track",
    "Purchase",
    // begin parameter object data
    {
      value: 10.0,
      currency: "USD",
      contents: [
        {
          id: "301",
          quantity: 1,
        },
        {
          id: "401",
          quantity: 2,
        },
      ],
      content_type: "product",
    }
    // end parameter object data
  );
};
