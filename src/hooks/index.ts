import { SyntheticEvent, useState } from "react";
import { AppDispatch, AppStore, RootState } from "../utils/types";
import { useDispatch, useSelector, useStore } from "react-redux";

export function useForm<T>(inputValues: T, afterChangeHandler: null | Function = null) {
	const [formData, setFormData] = useState(inputValues);

	const changeHandler = (event: SyntheticEvent<HTMLInputElement>) => {
		if (typeof formData !== "object") return;
		const target = event.target as HTMLInputElement;
		const { value, name } = target;
		setFormData({ ...formData, [name]: value });

		if (typeof afterChangeHandler === "function") afterChangeHandler();
	};
	return { formData, changeHandler, setFormData };
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
