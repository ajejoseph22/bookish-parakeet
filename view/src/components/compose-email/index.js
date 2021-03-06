import { useState, createContext } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import styled from "styled-components";
import EmailInformation from "./email-information";
import { apiUrl } from "../../util/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-markdown-editor-lite/lib/index.css";
import "react-toastify/dist/ReactToastify.css";

const mdParser = new MarkdownIt();

const StyledButton = styled.button`
  width: 60px;
  height: 40px;
  padding: 5px;
  margin: 5px 0;
  background: #282c34;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  float: right;
`;

export const ComposeEmailContext = createContext(undefined);

const ComposeEmail = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const validateEmail = () => {
    if (!subject) {
      throw new Error("please enter a subject");
    }

    if (!receiver) {
      throw new Error("please enter a receiver");
    }

    if (!content) {
      throw new Error("please enter some content");
    }
  };

  const handleSendEmail = async () => {
    try {
      validateEmail();

      setIsLoading(true);

      await axios.post(`${apiUrl}/email/send`, {
        subject,
        receiver,
        content,
      });

      toast("Successfully sent email");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h2>Compose Email</h2>
      <ComposeEmailContext.Provider value={{ setSubject, setReceiver, isLoading }}>
        <EmailInformation />
      </ComposeEmailContext.Provider>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <StyledButton disabled={isLoading} onClick={handleSendEmail}>
        Send
      </StyledButton>
    </>
  );
};

export default ComposeEmail;
