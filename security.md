## 👉COMPROMISED DATABASE

    ✔ Strongly encrypt passwords with salt and hash(bycrypt)
    ✔ Strong encrypt password reset tokens (SHA 256)

## 👉BRUTFORCE ATTACKS

    ✔ Use bycrypt(to make login requests slow)
    ↪ Implement rate limiting (express-rate-limit)
    ⚛ Implement maximum login attempts

## 👉CROSS-SITE SCRIPTING (XSS) ATTACKS

    👉  Store JWT in HTTPOnly cookies
    👉  Sanitize user input data
    👉  Set special HTTP headers (helmet package)

## 👉DENIAL-OF-SERVICE (DOS) ATTACK

    ✔ Implement rate limiting (express-rate-limit)
    ✔ Limit body payload(in body-parser)
    ✔ Avoid evil reqular expressions

## NOSQL QUERY INJECTION

    ✔ Use mongoose for MongoDb(because of SchemaTypes)
    ✔ Sanitize user input data

## 👉OTHER BEST PRACTICES AND SUGGESTIONS

    ✔ Always use HTTPS
    ✔ Create random password rest tokens with expiry date
    ✔ Deny acces to JWT after password change
    ❌  Don't commit sensitive config data to git
    ❌ Don't send error details to clients
    ⚛ Prevent Cross-Site Request Forgery (csurf package)
    ⚛ Require re-authentication before a high-value action
    ⚛ Implement a blacklist of untrusted JWT
    ⚛ Confirm user email address after first creating account
    ⚛ Keep user logged in with refresh tokens
    ⚛ Implement two-factor authentication
    🗯 Prevent parameter pollution causing Uncaught Exceptions
