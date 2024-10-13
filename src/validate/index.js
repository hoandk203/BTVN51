export const validate = (taskName) => {
    if (taskName === "") {
        alert("Vui lòng nhập tên công việc");
        return false;
    }
    if (taskName.length > 50) {
        alert("Tên công việc không được quá 50 ký tự");
        return false;
    }
    return true;
};
