function testFunc(mainNumber) {
  return mainNumber?.id + 5;
}

// const testFunc = function (mainNumber) {
//   return mainNumber?.id + 5;
// };

// const fatArroFunction = (mainNumber) => {
//   return mainNumber?.id + 5;
// };

module.exports = function () {
  return { testFunc: testFunc };
};
