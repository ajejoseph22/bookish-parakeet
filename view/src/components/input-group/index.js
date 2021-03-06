import styled from "styled-components";

const StyledInput = styled.input`
  width: 200px;
  margin-top: 5px;
`;

const InputGroup = ({ placeholder, name, onChange, isLoading }) => (
  <div>
    <label className="email-information-label" htmlFor={name}>
      {name}:{" "}
    </label>
    <StyledInput
      onChange={(e) => onChange(e.target.value)}
      name={name}
      placeholder={placeholder}
      disabled={isLoading}
      type="text"
    />
  </div>
);

export default InputGroup;
