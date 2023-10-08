describe('/crypt', () => {
  // I used this to measure time
  // This still does not test concurrent load, only the speed of handling a single request at a time
  it('should make 1000 requests to the server and wait for responses', async () => {
    for (let i = 0; i < 1000; i++) {
      const response = await fetch('http://localhost:3000/crypt/100', {
        method: 'GET',
      });
      await response.text();
      expect(response.status).toStrictEqual(200);
    }
  });

  it('should make 1000 concurrent requests and wait for the response', async () => {
    await Promise.all(
      range(1000).map(async () => {
        const response = await fetch('http://localhost:3000/crypt/100', {
          method: 'GET',
        });
        await response.text();
        expect(response.status).toStrictEqual(200);
      }),
    );
  });
});

function range(start: number, end?: number, step: number = 1) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}
