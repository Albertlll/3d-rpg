import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
	return (
		<input
			{...props}
			className=" bg-card-bg border-2 border-card-border rounded-xl text-3xl p-2 text-text box-content outline-0"
		/>
	);
}

export default Input;
