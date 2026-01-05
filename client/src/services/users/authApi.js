import { api } from "../axios";

// LOGIN
export const loginUser = async (
  data,
  reset,
  setUser,
  setUserToken,
  navigate
) => {
  try {
    const res = await api.post("/users/login", data);
    const { user, token } = res.data.data;

    if (!user || !token) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setUserToken(token);

    navigate("/");
  } catch (error) {
    console.error(
      error.response?.data?.message || error.message
    );
  } finally {
    reset();
  }
};


// SIGNUP
export const registerUser = async (data, reset, navigate) => {
    try {
        const res = await api.post("/users/register", data);
    const successMsg = res.data?.message;
    console.log(successMsg);
    navigate("/login");

    return res.data;
    } catch (error) {
        const err = error.response?.data.message || "Error occured";
        console.log(err);
    }
    finally{
        reset();
    }
};
