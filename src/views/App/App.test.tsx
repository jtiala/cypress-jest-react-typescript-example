import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// `it` should be from Jest, not from Mocha
it("increases and resets the counter", () => {
  render(<App />);

  const increaseButton = screen.getByTestId("increase-button");
  const resetButton = screen.getByTestId("reset-button");

  // `expect` should be from Jest, not from Chai
  expect(increaseButton).toHaveTextContent(/click me/i);
  fireEvent.click(increaseButton);
  expect(increaseButton).toHaveTextContent(/1 time/i);
  fireEvent.click(increaseButton);
  expect(increaseButton).toHaveTextContent(/2 times/i);
  fireEvent.click(resetButton);
  expect(increaseButton).toHaveTextContent(/click me/i);
});
