# Test Driven Development Workflow

- Only work on one feature at a time.
- When creating a user-facing feature, first search the project to see if there are end to end tests already written for it.
- If no tests has been written, create the test first and ask the user to run the test to ensure that the code and test complile.
- Write the failing test for the feature that we are working on and use `bun run check` to run the type checker. Before moving on, make sure to fix all type errors and ask the user for confirmation before moving on.
- Write the simplest test possible in TypeScript that will make the failing test pass.
- Run the type checker with `bun run check` to make sure that there are no type errors.
- Run the relevant test with `bun run test` until the test for this feature passes. Do not move forward with other features until all tests pass.
- Refactor the code to make it better if necessary without changing the behavior of the code.
- If the tests do not pass after 3 attempts to fix them stop and ask the user for directions.
