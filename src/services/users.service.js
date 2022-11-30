import { transformRequest } from "./base";

export async function getUsers() {
  return transformRequest({
    method: "get",
    url: `users`,
  });
}

export async function createUser(data) {
  return await transformRequest({
    method: "post",
    url: `users`,
    data,
  });
}

export async function deleteUser(id) {
  return await transformRequest({
    method: "delete",
    url: `users/${id}`,
  });
}
