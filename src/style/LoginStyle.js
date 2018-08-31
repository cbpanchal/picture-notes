import styled from "styled-components";
import googleLogo from "./logos/google.svg";

export const LoginFormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
`;

export const LoginForm = styled.div`
  width: 100%;
  max-width: 530px;
  padding: 50px;
  text-align: left;
  margin: auto;

  > span {
    font-size: 18px;
  }

  > span a {
    color: #298fca;
  }

  h1 {
    font-weight: 700;
    font-size: 2.1rem;
  }

  > form label,
  > form > * {
    width: 100%;
    float: left;
  }

  > form {
    padding: 1.2em 0;
  }

  > form > div {
    margin: 0 0 1.2em 0;
  }

  input[type="email"],
  input[type="password"] {
    background-color: #edeff0;
    color: #4d4d4d;
    border-radius: 4px;
    border: 1px solid #cdd2d4;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.5em;
    width: 100%;
    float: left;
    border-radius: 3px;
    margin: 0.4em 0 0 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #4d4d4d !important;
  }

  input[type="email"]:hover,
  input[type="password"]:hover {
    border-color: #b6bbbf;
  }

  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: #a5acb0;
    outline: none
    box-shadow: 0 0 6px #cdd2d4;
  }

  button {
    width: 100%;
    height: 42px;
    border-radius: 3px;
    display: inline-block;
    font-weight: bold;
    position: relative;
    text-decoration: none;
    border: 0;
    cursor: pointer;
    text-align: center;
  }

  button:focus,
  button:hover {
    outline: none;
  }

  > form button[type="submit"] {
    background-color: #61bd4f;
    color: #fff;
    box-shadow: 0 2px 0 #3f6f21;
    padding: 0.6em 1.3em;
  }

  button[type="button"] {
    margin-top: 2.4em;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.54);
    box-shadow: none;
    border: 2px solid #cdd2d4;
  }

  > form button[type="submit"]:focus,
  > form button[type="submit"]:hover {
    background-color: #5aac44;
  }

  button[type="button"]:focus,
  button[type="button"]:hover {
    background-color: #eee;
    border: 2px solid #cdd2d4;
  }

  > form > button[disabled]:focus,
  > form > button[disabled]:hover,
  > form > button[disabled] {
    background: #e2e4e6;
    box-shadow: none;
    color: #8c8c8c;
    cursor: default;
  }

  i.google-logo {
    background: url(${googleLogo}) no-repeat;
    display: inline-block;
    border-radius: 1px;
    vertical-align: sub;
    width: 20px;
    height: 20px;
    background-position: center;
    margin-right: 20px;
  }
`;

export const ErrorText = styled.span`
  border: none;
  font-weight: 700;
  color: #700;
`;
