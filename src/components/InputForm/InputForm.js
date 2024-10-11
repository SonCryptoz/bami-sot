import { Input } from "antd";

function InputForm({ placeholder, onChange, ...props }) {
    return <Input placeholder={placeholder} value={props.value} type={props.type} onChange={onChange} {...props} />;
}

export default InputForm;
