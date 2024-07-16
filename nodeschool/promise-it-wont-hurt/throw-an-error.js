const invalid = process.argv[2];

const parsePromised = (str) => {
  return new Promise((resolve) => {
    try {
      resolve(JSON.parse(str));
    } catch (error) {
      throw new Error(error.message);
    }
  });
};

parsePromised(invalid).catch((error) => console.log(error.message));
