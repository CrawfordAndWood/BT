function EmailTemplates(options) {
  this.selectedTemplate = options.selectedTemplate;

  //SECTION - MESSAGES

  //new account
  this.NEW_ACCOUNT_MESSAGE =
    `<h2>Hello ` +
    options.name +
    `,</h2> 
      <p>Welcome to Brox Technology. A new account has been setup for you. </p>
      <p>Your Username is ` +
    options.email +
    `</p>
      <p>Click ` +
    `<a href=${options.url}>` +
    `Here </a> to access your account</p>`;

  //Password reset
  this.PASSWORD_RESET =
    `<h2>Hello ` +
    options.name +
    `,</h2> 
  <p>Your password has been reset. </p>
  <p>Your new password is ` +
    options.password +
    ` </p>`;

  //FINAL
  (this.to = options.email),
    (this.subject = options.subject),
    (this.message = this.configureEmail());
}

EmailTemplates.prototype.configureEmail = function () {
  switch (this.selectedTemplate) {
    case "NEW_ACCOUNT_MESSAGE":
      return this.NEW_ACCOUNT_MESSAGE;
    case "PASSWORD_RESET":
      return this.PASSWORD_RESET;
    default:
      return null;
  }
};

module.exports = EmailTemplates;
