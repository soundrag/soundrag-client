import { UserForm, UserLabel, UserInputTag } from "../style/UserInputStyle";

import type { UserInputProps } from "../types/components";

const UserInput = ({ value, setValue }: UserInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <UserForm>
      <UserLabel>
        <p className="name-rule">
          이름은 <span>1 - 20</span> 자 이내로 입력하세요.
        </p>
      </UserLabel>
      <UserInputTag value={value} onChange={handleChange} maxLength="20" />
    </UserForm>
  );
};

export default UserInput;
