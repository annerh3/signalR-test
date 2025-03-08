import { attendanceApi } from "../config/api"


export const getStudentsList = async () => {
    try {
        const { data } = await attendanceApi.get("/students");
        return data;
    } catch (error) {
        console.error(error);
        return error?.response?.data;
    }
}