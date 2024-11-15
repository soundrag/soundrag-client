import useInputStore from "../stores/useInputStore";

import { UserForm, UserLabel, UserInput } from "../style/UserInputsStyle";

const UserInputs = () => {
	const { name, setName } = useInputStore();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	return (
		<UserForm>
			<UserLabel>
				<p className="name-rule">
					이름은 <span>1 - 20</span> 자 이내로 입력하세요.
				</p>
			</UserLabel>
			<UserInput value={name} onChange={handleChange} />
		</UserForm>
	);
};

export default UserInputs;
