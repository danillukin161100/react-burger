import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch, useForm } from "../../hooks";
import { updateUser } from "../../services/user/actions";
import { User } from "../../utils/types";
import styles from "./profile-login.module.css";

export const ProfileLogin = () => {
	const { email, name } = useAppSelector((state) => state.user);
	const initialFormData: User = {
		password: "",
		email: typeof email === "string" ? email : "",
		name: typeof name === "string" ? name : "",
	};
	const [isChanged, setIsChanged] = useState(false);
	const dispatch = useAppDispatch();
	const { formData, changeHandler, setFormData } = useForm(initialFormData, () => {
		setIsChanged(true);
	});

	useEffect(() => {
		if (typeof formData === "object") setFormData({ ...formData, email, name });
	}, [email, name]);

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(updateUser(formData));
		setIsChanged(false);
	};

	const resetHandler = () => {
		setFormData(initialFormData);
		setIsChanged(false);
	};

	return (
		<form onSubmit={submitHandler}>
			<Input type="text" placeholder="Имя" name="name" value={formData.name || ""} onChange={changeHandler} extraClass="mb-6" />
			<EmailInput name="email" placeholder="Логин" value={formData.email || ""} onChange={changeHandler} extraClass="mb-6" />
			<PasswordInput name="password" value={formData.password || ""} onChange={changeHandler} />

			{isChanged && (
				<div className={styles.footer}>
					<Button htmlType="button" type="secondary" onClick={resetHandler}>
						Отменить
					</Button>
					<Button htmlType="submit" type="primary">
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
