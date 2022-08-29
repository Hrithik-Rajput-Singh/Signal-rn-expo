import { AUTH_KEY } from "../key";
export const LOGIN = "LOGIN";

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      let message = "something went wrong";
      const errorlogin = await response.json();
      const errorMsg = errorlogin.error.message;

      if (errorMsg === "EMAIL_NOT_FOUND") {
        message = "email not found";
      } else if (errorMsg === "INVALID_PASSWORD") {
        message = "wrong password";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: LOGIN,
      email: email,
      password: password,
    });

    //we have combine it so these token and id will go to authentic then it will sendto reducer to update id and token above dipatch will also work
  };
};
