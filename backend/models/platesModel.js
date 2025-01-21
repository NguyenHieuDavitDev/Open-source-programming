const db = require('../database/connection');

const getProvinces = (callback) => {
    const query = 'SELECT id, name FROM provinces';
    db.query(query, callback);
};

const getPlatesByProvince = (provinceId, callback) => {
    const query = 'SELECT plate FROM plates WHERE province_id = ?';
    db.query(query, [provinceId], callback);
};

module.exports = { getProvinces, getPlatesByProvince };
