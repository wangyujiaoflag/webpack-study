import { useState } from "react";

export const Input = () => {
  let [value, setValue] = useState("");
  function changeValue(e: any) {
    setValue(e.target.value);
  }
  return <input value={value} onChange={changeValue} />;
};
