export default function () {
  //4XX - URLs not found
  return function customRaiseUrlNotFoundError(req, res, next) {
    res.send("Url not found", function (err) {
      if (err) {
        console.error(err);
        res.status(err.status).end();
      }
    });
  };
}
