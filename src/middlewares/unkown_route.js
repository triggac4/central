const unknownRoute = (req, res) => {
  return res.status(404).json({ msg: 'unknown route' });
};

export default unknownRoute;
