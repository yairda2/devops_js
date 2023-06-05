describe("Test suite 1:", () => {
  test("test 1: ", async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  test("test 2: ", async () => {
    const res = await request(app).get('/1234');
    expect(res.statusCode).toEqual(400);
  });
});
