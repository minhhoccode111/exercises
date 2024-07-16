function all(p1, p2) {
  return new Promise((resolve) => {
    const counter = [];
    [p1, p2].forEach((p, i) => {
      p.then((result) => {
        counter[i] = result;
        if (counter.every((r) => r !== undefined) && counter.length === 2) resolve(counter);
      });
    });
  });
}

all(getPromise1(), getPromise2()).then(console.log);
