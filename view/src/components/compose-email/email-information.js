import { useContext } from "react";
import InputGroup from "../input-group";
import styled from "styled-components";
import { ComposeEmailContext } from "./index";

const EmailInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const EmailInformation = () => {
  const { setReceiver, setSubject, isLoading } = useContext(
    ComposeEmailContext
  );

  return (
    <EmailInformationWrapper>
      <InputGroup
        onChange={setSubject}
        placeholder="Enter email Subject"
        isLoading={isLoading}
        name="Subject"
      />
      <InputGroup
        onChange={setReceiver}
        placeholder="Enter receiver email"
        isLoading={isLoading}
        name="To"
      />
    </EmailInformationWrapper>
  );
};

export default EmailInformation;
