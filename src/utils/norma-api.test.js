import { describe, it, expect } from "vitest";
import { checkResponse } from "./norma-api";

describe("check checkResponse function", () => {
	it("should be successful", async () => {
		const testData = {
			status: 200,
			ok: true,
			json: async () => ({ result: "ok" }),
		};

		const result = await checkResponse(testData);

		expect(result).toEqual({ result: "ok" });
	});

	it("should be error", async () => {
		const testData = {
			status: 500,
			ok: false,
		};

		await expect(checkResponse(testData)).rejects.toMatch("Error 500");
	});
});
