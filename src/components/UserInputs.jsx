import useInputStore from "../stores/useInputStore";

import { UserForm, UserLabel, UserInput } from "../style/UserInputsStyle";

const UserInputs = () => {
  const { name, setName } = useInputStore();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <UserForm>
      <UserLabel>
        <p className="name-rule">
          Name must be <span>between 1 and 20 </span>
          characters.{" "}
        </p>
      </UserLabel>
      <UserInput value={name} onChange={handleChange} />
    </UserForm>
  );
};

export default UserInputs;
