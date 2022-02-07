import api from "./api";

const getListStudents = () => api.get(api.url.r2s).then((res) => res.data);

const getIdStudent = (id) =>
  api.get(`${api.url.r2s}/${id}`).then((res) => res.data);

const createStudent = (data) =>
  api.post(api.url.r2s, data).then((res) => res.data);

const studentService = {
  getListStudents,
  getIdStudent,
  createStudent,
};
export default studentService;
