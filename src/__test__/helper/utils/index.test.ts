import { transformObject } from "@/helper/utils";

describe("utils global functions", () => {
  it("should transform object correctly", () => {
    const obj = {
      name: "Nizar",
      addres: null,
      phone: null,
      wa: undefined,
      status: "active",
      vehicle: "",
    };
    const expectedObj = {
      name: "Nizar",
      status: "active",
    };

    expect(transformObject(obj, [null, undefined, ""])).toStrictEqual(
      expectedObj
    );
  });
});
