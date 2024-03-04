export default {
  username: {
    length: "Username must be between 3 and 10 characters",
  },
  imageUrl: {
    invalid_string: "Invalid URL",
  },
  name: {
    too_small: "Name can not be empty",
  },
  description: {
    too_small: "Description can not be empty",
  },
  email: {
    invalid: "Invalid email",
  },
  password: {
    length: "Password must be at least 8 characters",
  },
} as const
