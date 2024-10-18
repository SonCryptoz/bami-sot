export const isJSONString = (data) => {
    if (!data) return false; // Kiểm tra nếu data là null hoặc undefined
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
};
