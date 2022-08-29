export const MEMBERS = {
  UNKNOWN_EMAIL: {
    id: "id1",
    name: "unkown_email",
    email: "unkown@graasp.org",
    password: "test",
    emailValid: false,
    passwordValid: false,
    statusCode: 404,
  },
  UNKNOWN_PASSWORD: {
    id: "id2",
    name: "unkown_password",
    email: "graasp@graasp.org",
    password: "test",
    emailValid: true,
    passwordValid: false,
    statusCode: 406,
  },
  WRONG_PASSWORD: {
    id: "id3",
    name: "wrong_password",
    email: "test_user@graasp.org",
    password: "wrong",
    emailValid: true,
    passwordValid: false,
    statusCode: 401,
  },
};
