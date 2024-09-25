import defaultUser from '../utils/default-user';
import { postToAPI } from './apicall';
import Cookies from "js-cookie";

export async function signIn(username, password) {
  try {
    const data = {username: username, password: password}
    const response  = await postToAPI('/login', data)
    if (response.rval > 0){
      Cookies.set("token", response.token);
      return {
        isOk: true,
        data: defaultUser
      };
    }
    else{
      return {
        isOk: false,
        message: response.message,
        data:undefined
      };
    } 
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser() {
  try {
    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(username, password) {
  try {
    console.log(username, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(username, recoveryCode) {
  try {
    // Send request
    console.log(username, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(username) {
  try {
    // Send request
    console.log(username);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
