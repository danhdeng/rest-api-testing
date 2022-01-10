testing strategies

Data Flow:

Routes ---> Middleware --> Controller -- Services ---> Model ---> MongoDB

# run jest with detectOpenHandles Force exiting Jest: Have you considered using `--detectOpenHandles` to detect async operations that kept running after all tests finished

# --watchAll to watch all change and restart the test

jest --watchAll --detectOpenHandles

# to generate the public key and private key for jwt generation

Generate new keys: https://travistidwell.com/jsencrypt/demo/
Base64 encode the keys: https://www.base64encode.org/
