import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../components/requestMethods";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:5000/api/login",
      user
    );
    console.log(user);
    if (!user.password || !user.username) dispatch(loginFailure());
    else dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
