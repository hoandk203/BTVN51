export const validate = (taskName) => {
    if (taskName === "") {
        return "Vui lòng nhập tên công việc";
    }
    if (taskName.length > 50) {
        return "Tên công việc không được quá 50 ký tự";
    }
    return false;
};
