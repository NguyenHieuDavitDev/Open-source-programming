const { getProvinces, getPlatesByProvince } = require('../models/platesModel');

const fetchProvinces = (req, res) => {
    getProvinces((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

const fetchPlates = (req, res) => {
    const { provinceId } = req.params;
    getPlatesByProvince(provinceId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

module.exports = { fetchProvinces, fetchPlates };
