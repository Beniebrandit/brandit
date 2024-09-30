export function authHeader(leaveBlank) {

const token = localStorage.getItem("authToken");

  let result = {
    Authorization: "Bearer " + token || undefined,
    Accept: "application/json",
  };
  if (!leaveBlank) {
    result["Content-Type"] = "application/json";
  }
  return result;
}
