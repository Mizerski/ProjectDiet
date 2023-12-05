import React from "react";
import { render } from "@testing-library/react-native";
import { Dropdown } from "../src/Components/Dropdown";

describe("Dropdown", () => {
  it("renders correctly", () => {
    const items = [
      { label: "Item 1", value: "1" },
      { label: "Item 2", value: "2" },
    ];
    const { getByTestId } = render(
      <Dropdown items={items} value="1" onValueChange={() => {}} t={() => ""} />
    );
    expect(getByTestId("dropdown")).toBeTruthy();
  });
});

describe("Dropdown Performance", () => {
  it("measures performance", async () => {
    const items = [
      { label: "Item 1", value: "1" },
      { label: "Item 2", value: "2" },
    ];
    const t0 = performance.now();
    render(
      <Dropdown items={items} value="1" onValueChange={() => {}} t={() => ""} />
    );
    const t1 = performance.now();
    console.log(`Dropdown took ${t1 - t0} milliseconds to render`);
  });
});
