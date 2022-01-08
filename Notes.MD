testing strategies

Data Flow:

Routes ---> Middleware --> Controller -- Services ---> Model ---> MongoDB

# run jest with detectOpenHandles Force exiting Jest: Have you considered using `--detectOpenHandles` to detect async operations that kept running after all tests finished

# --watchAll to watch all change and restart the test

jest --watchAll --detectOpenHandles
