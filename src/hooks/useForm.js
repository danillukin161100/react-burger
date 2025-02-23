import { useState } from "react";

export function useForm(inputValues = {}, afterChangeHandler = null) {
	const [formData, setFormData] = useState(inputValues);

	const changeHandler = (event) => {
		const { value, name } = event.target;
		setFormData({ ...formData, [name]: value });

		if (typeof afterChangeHandler === "function") afterChangeHandler();
	};
	return { formData, changeHandler, setFormData };
}
