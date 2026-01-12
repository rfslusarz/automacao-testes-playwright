export const TestData = {
  credentials: {
    valid: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    invalid: {
      username: 'invalid_user',
      password: 'wrong_password',
    },
    invalidPassword: {
      username: 'standard_user',
      password: 'wrong_password',
    },
    invalidUsername: {
      username: 'invalid_user',
      password: 'secret_sauce',
    },
  },
  checkout: {
    firstName: 'João',
    lastName: 'Silva',
    postalCode: '12345-678',
  },
  products: {
    sauceLabsBackpack: 'Sauce Labs Backpack',
    sauceLabsBikeLight: 'Sauce Labs Bike Light',
    sauceLabsBoltTShirt: 'Sauce Labs Bolt T-Shirt',
  },
  errorMessages: {
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    requiredUsername: 'Epic sadface: Username is required',
    requiredPassword: 'Epic sadface: Password is required',
  },
  successMessages: {
    orderComplete: 'Thank you for your order!',
  },
};
