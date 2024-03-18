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
    invalid_string: "Invalid email",
  },
  password: {
    too_small: "Password must be at least 8 characters",
    regex:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  },
  lastName: {
    too_small: "Last name can not be empty",
  },
  firstName: {
    too_small: "First name can not be empty",
  },
} as const
