import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
	return (
		<button
			{...props}
			type="button"
			className="bg-card-border hover:bg-card-bg/99 rounded-xl text-3xl p-2 text-text box-content outline-0"
		>
			{props.children}
		</button>
	);
}

export default Button;
