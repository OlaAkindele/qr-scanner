import { supabase } from "../configs/index";

const new_supabase = supabase();

 
// @==========  update user data
export async function updateUserMeta(payload) {
  let { email, otp } = payload; 
  return new_supabase
    .from("project")
    .update([{ otp: otp }])
    .eq("email", email)
    .then((res) => {
      console.log(res);
      if (res.body == null) {
        if (res.error.message == "JWT expired") {
          return {
            success: false,
            message: "auth error",
          };
        } else {
          return {
            success: false,
            message: "A network error occured",
          };
        }
      } else {
        return {
          success: true,
          message: "successful",
          data:res.body[0].otp
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error,
      };
    });
}

