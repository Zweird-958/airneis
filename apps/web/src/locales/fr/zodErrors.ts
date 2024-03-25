export default {
  username: {
    length: "Le nom d'utilisateur doit être entre 3 et 10 caractères",
  },
  imageUrl: {
    invalid_string: "Lien invalide",
  },
  name: {
    too_small: "Le nom ne peut pas être vide",
  },
  description: {
    too_small: "La description ne peut pas être vide",
  },
  email: {
    invalid_string: "Email invalide",
  },
  password: {
    too_small: "Votre mot de passe doit contenir au moins 8 caractères",
    regex:
      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
  },
  lastName: {
    too_small: "Le nom ne peut pas être vide",
  },
  firstName: {
    too_small: "Le prénom ne peut pas être vide",
  },
} as const
