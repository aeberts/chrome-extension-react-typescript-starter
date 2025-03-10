# Coding Workflow

- Only work on one feature at a time.
- When creating a user-facing feature, first search the project to see if there is an end to end test already written for it.
- If no test has been written, create the test first and ask the user to confirm that the test is correct.
- Once the test is written, use `bun run check` to run the type checker. Fix all type errors and ask the user for confirmation before moving on.
- Write only one test at a time and do not move forward until that test passes type checking and runs successfully.
- Run the relevant test with `bun run test` until the test passes. Do not move forward with other features until all tests pass.
- If the tests do not pass after 3 attempts to fix them stop and ask the user for directions.
