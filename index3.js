

/** @param {p3[]} params */
const name = (params) => {


  params.p3_2.then(data => {
    return callMethod(data);
  })
  .catch(console.error)

}