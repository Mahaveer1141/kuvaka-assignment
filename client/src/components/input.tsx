import { ChangeEvent } from "react";
import "@/styles/input.scss";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Input({ value, onChange, placeholder }: IProps) {
  return (
    <div>
      <input
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
