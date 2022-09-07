import {
  StatusCodes
} from 'http-status-codes';

export const MEMBERS = {
  UNKNOWN_EMAIL: {
    email: "unkown@graasp.org",
    password: "test",
    statusCode: StatusCodes.NOT_FOUND,
  },
  UNKNOWN_PASSWORD: {
    email: "graasp@graasp.org",
    password: "test",
    statusCode: StatusCodes.NOT_ACCEPTABLE,
  },
  WRONG_PASSWORD: {
    email: Cypress.env("TEST_EMAIL"),
    password: "wrong",
    statusCode: StatusCodes.UNAUTHORIZED,
  },
  TEST_USER: {
    email: Cypress.env("TEST_EMAIL"),
    password: Cypress.env("TEST_PASSWORD"),
    statusCode: StatusCodes.SEE_OTHER,
  },
};

export const SIGN_IN_FIXTURES = [{
  UNKNOWN_EMAIL_FIXTURE: {
    ...MEMBERS.UNKNOWN_EMAIL,
    id: "id1",
    name: "unkown_email",
    emailValid: false,
    passwordValid: false,
  },
  UNKNOWN_PASSWORD_FIXTURE: {
    ...MEMBERS.UNKNOWN_PASSWORD,
    id: "id2",
    name: "unkown_password",
    emailValid: true,
    passwordValid: false,
  },
  WRONG_PASSWORD_FIXTURE: {
    ...MEMBERS.WRONG_PASSWORD,
    id: "id3",
    name: "wrong_password",
    emailValid: true,
    passwordValid: false,
  },
  TEST_USER_FIXTURE: {
    ...MEMBERS.TEST_USER,
    id: "id4",
    name: "test_user",
    emailValid: true,
    passwordValid: true,
  }
}]
