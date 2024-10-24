export const isJSONString = (data) => {
    if (!data) return false; // Kiểm tra nếu data là null hoặc undefined
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
