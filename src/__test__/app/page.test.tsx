import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import Home from "@/app/page";
import { CONTACT_LIST } from "@/helper/queries/list";

import { AppRouterContextProviderMock } from "../setup/useRouterMockup";
import { contactListMock } from "../setup/data";

describe("home page test", () => {
  it("should have page title", async () => {
    const push = jest.fn();
    const mock:
      | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
      | undefined = [
      {
        request: {
          query: CONTACT_LIST,
          variables: {},
        },
        result: {
          data: {
            contact: contactListMock,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppRouterContextProviderMock router={{ push }}>
          <Home />
        </AppRouterContextProviderMock>
      </MockedProvider>
    );

    await waitFor(() => {
      const title = screen.getByText("Phone Book");
      expect(title).toBeInTheDocument();
    });
  });
});
