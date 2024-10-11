import { Input } from "antd";
import { useState } from "react";

function InputForm({ placeholder, ...props }) {
    const [valueInput, setValueInput] = useState("");

    return <Input placeholder={placeholder} valueInput={valueInput} {...props} />;
}

export default InputForm;
