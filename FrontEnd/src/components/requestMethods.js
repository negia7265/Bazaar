import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjZlNWY4NWE0MGNhZjkwZjFkNTYyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTAyNzg2NSwiZXhwIjoxNjg3MDc1ODY1fQ.r7Mn2-bPUDuyPF9Dmr5GrUVLqixXOxQfnm7uwbd2zLo";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
