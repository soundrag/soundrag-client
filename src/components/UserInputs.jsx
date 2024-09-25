import useInputStore from "../stores/useInputStore";

import { UserForm, UserLabel, UserInput } from "../style/UserInputsStyle";

const UserInputs = () => {
  const { name, description, setName, setDescription } = useInputStore();

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  return (
    <UserForm>
      <UserLabel>Name: </UserLabel>
      <UserInput
        value={name}
        onChange={(event) => handleChange(event, setName)}
      />
      <UserLabel>Description: </UserLabel>
      <UserInput
        value={description}
        onChange={(event) => handleChange(event, setDescription)}
      />
    </UserForm>
  );
};

export default UserInputs;
