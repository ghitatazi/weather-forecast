import { jest } from "@jest/globals";
import * as mocks from "../mocks";
import { fetchForecastFromServer } from "../utils/forecast";

/* Note: I could have used msw instead of Jest mocks for testing fetch */

describe("Fetch forecast values from server", function () {
  it("with success", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mocks.forecastMock),
      })
    );

    const data = await fetchForecastFromServer();
    expect(data.list).toHaveLength(30);
  });

  it("with failure", async () => {
    const serverError = "Not able to fetch from server";

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(serverError),
      })
    );

    try {
      await fetchForecastFromServer();
    } catch (e) {
      expect(fetch).toHaveBeenCalled();
      expect(e).toEqual(serverError);
    }
  });
});
