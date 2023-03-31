const GET_USER = async (req, res) => {
  try {
    res.json(req.readFile("users"));
  } catch (err) {
    if (err) return console.log(err);
  }
};

export { GET_USER };
