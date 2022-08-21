import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

// `it` should be from Jest, not from Mocha
it("renders button", () => {
  render(<Button>Button</Button>);

  const buttonElement = screen.getByText(/button/i);

  // `expect` should be from Jest, not from Chai
  expect(buttonElement).toBeInTheDocument();
});

it("handles click", () => {
  const handleClick = jest.fn();

  render(
    <Button data-testid="button" onClick={handleClick}>
      Button
    </Button>
  );

  const buttonElement = screen.getByTestId(/button/i);

  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);

  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(2);

  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(3);
});
