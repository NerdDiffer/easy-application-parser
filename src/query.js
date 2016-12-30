// return a pseudo-random integer between 0 (inclusive) and max (exclusive)
const getRandomInt = max => Math.floor(Math.random() * max);

module.exports.randomLine = (data) => {
  const randomIndex = getRandomInt(data.length);
  return data[randomIndex];
};
