const apis = require("../apis")

test("verify getData function throws bad request when parameters bad values", async () => {
  try {
    await apis.getData("asff","asfdsafs")
  }catch(error) {
    expect(error.name).toBe("BadRequest")
    expect(error.statusCode).toBe(400)
  }

});

test("verify getData function throws bad request when parameters are not provided", async () => {
  try {
    await apis.getData()
  }catch(error) {
    expect(error.name).toBe("BadRequest")
    expect(error.statusCode).toBe(400)
  }
});

test("verify getData function throws bad request when only date is provided", async () => {
  try {
    await apis.getData('sydney')
  }catch(error) {
    expect(error.name).toBe("BadRequest")
    expect(error.statusCode).toBe(400)
  }
});

test("verify getData function throws bad request when only location is provided", async () => {
  try {
    await apis.getData(undefined,'12/12/2020')
  }catch(error) {
    expect(error.name).toBe("BadRequest")
    expect(error.statusCode).toBe(400)
  }
});


