"use server";
import { isSuccess } from "@/utils";
import { apiRequest } from "@/utils/service";


export async function registerUser(payload: {
  email: string;
  password: string;
  user_type: string;
}) {
  try {
    const res = await apiRequest("auth/signup", {
      method: "POST",
      body: payload,
      protect: false,
    });

      return {
      success: isSuccess(res.code),
      message: res.message,
      data: res.data,
    };
  } catch (error) {
    console.error("Registration error:", error);
  }
}

export async function validateOTP(payload: {
  email: string;
  otp: string;
}) {
  try {
    const data = await apiRequest("auth/verify-otp", {
      method: "POST",
      body: payload,
      protect: false,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("validation error:", error);
  }
}

export async function resendOTP(email: string) {
  try {
    const data = await apiRequest(
      `soa/re-send-otp/${email}`,
      {
        method: "GET",
      }
    );

    return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("error:", error);
  }
}

export async function completeSoaRegistration(payload: {
  email: string;
  region: string;
  login: boolean;
}) {
  try {
    const data = await apiRequest("auth/complete-soa-registration", {
      method: "POST",
      body: payload,
      protect: false,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("registration error:", error);
  }
}

export const getGoogleProfileAction = async (accessToken: string) => {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    const data = await res.json();
    return { success: true, data: data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export async function requestOTP() {
  try {
    const data = await apiRequest("soa/password/request-otp", {
      method: "POST",
      body: {},
      protect: true,
    });
      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("registration error:", error);
  }
}

export async function verifyOTP( payload: {otp:string}) {
  try {
    const data = await apiRequest("soa/password/verify-otp", {
      method: "POST",
      body: payload,
      protect: true,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("registration error:", error);
  }
}

export async function verifyPassword( payload: {password:string}) {
  try {
    const data = await apiRequest("soa/validate-password", {
      method: "POST",
      body: payload,
      protect: true,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("registration error:", error);
  }
}

export async function changePassword( payload: {oldPassword:string, newPassword:string}) {
  try {
    const data = await apiRequest("soa/password/change", {
      method: "PUT",
      body: payload,
      protect: true,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("registration error:", error);
  }
}

export async function resetPassword( payload: {email:string, newPassword:string}) {
  try {
    const data = await apiRequest("soa/password/reset", {
      method: "PUT",
      body: payload,
      protect: true,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("error:", error);
  }
}




export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/auth/login";
  } else {
    alert("Logout failed.");
  }
};

export async function deleteUser(payload: string) {
  try {
    const data = await apiRequest("auth/remove-user", {
      method: "POST",
      body: { reason: payload } ,
    });

      return {
      success: isSuccess(data.code),
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Registration error:", error);
  }
}
