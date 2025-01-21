CREATE DATABASE vehicle_lookup;

USE vehicle_lookup;

CREATE TABLE provinces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE plates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    province_id INT NOT NULL,
    plate VARCHAR(20) NOT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

INSERT INTO provinces (name) VALUES
('An Giang'),
('Bà Rịa - Vũng Tàu'),
('Bắc Giang'),
('Bắc Kạn'),
('Bạc Liêu'),
('Bắc Ninh'),
('Bến Tre'),
('Bình Định'),
('Bình Dương'),
('Bình Phước'),
('Bình Thuận'),
('Cà Mau'),
('Cần Thơ'),
('Cao Bằng'),
('Đà Nẵng'),
('Đắk Lắk'),
('Đắk Nông'),
('Điện Biên'),
('Đồng Nai'),
('Đồng Tháp'),
('Gia Lai'),
('Hà Giang'),
('Hà Nam'),
('Hà Nội'),
('Hà Tĩnh'),
('Hải Dương'),
('Hải Phòng'),
('Hậu Giang'),
('Hòa Bình'),
('Hưng Yên'),
('Khánh Hòa'),
('Kiên Giang'),
('Kon Tum'),
('Lai Châu'),
('Lâm Đồng'),
('Lạng Sơn'),
('Lào Cai'),
('Long An'),
('Nam Định'),
('Nghệ An'),
('Ninh Bình'),
('Ninh Thuận'),
('Phú Thọ'),
('Phú Yên'),
('Quảng Bình'),
('Quảng Nam'),
('Quảng Ngãi'),
('Quảng Ninh'),
('Quảng Trị'),
('Sóc Trăng'),
('Sơn La'),
('Tây Ninh'),
('Thái Bình'),
('Thái Nguyên'),
('Thanh Hóa'),
('Thừa Thiên Huế'),
('Tiền Giang'),
('TP. Hồ Chí Minh'),
('Trà Vinh'),
('Tuyên Quang'),
('Vĩnh Long'),
('Vĩnh Phúc'),
('Yên Bái');


INSERT INTO plates (province_id, plate) VALUES
(1, '67'), -- An Giang
(2, '72'), -- Bà Rịa - Vũng Tàu
(3, '98'), -- Bắc Giang
(4, '97'), -- Bắc Kạn
(5, '94'), -- Bạc Liêu
(6, '99'), -- Bắc Ninh
(7, '71'), -- Bến Tre
(8, '77'), -- Bình Định
(9, '61'), -- Bình Dương
(10, '93'), -- Bình Phước
(11, '86'), -- Bình Thuận
(12, '69'), -- Cà Mau
(13, '65'), -- Cần Thơ
(14, '11'), -- Cao Bằng
(15, '43'), -- Đà Nẵng
(16, '47'), -- Đắk Lắk
(17, '48'), -- Đắk Nông
(18, '27'), -- Điện Biên
(19, '39'), -- Đồng Nai
(20, '66'), -- Đồng Tháp
(21, '81'), -- Gia Lai
(22, '23'), -- Hà Giang
(23, '90'), -- Hà Nam
(24, '29'), -- Hà Nội (bao gồm 30, 31, 32, 33)
(25, '38'), -- Hà Tĩnh
(26, '34'), -- Hải Dương
(27, '15'), -- Hải Phòng (bao gồm 16)
(28, '95'), -- Hậu Giang
(29, '28'), -- Hòa Bình
(30, '89'), -- Hưng Yên
(31, '79'), -- Khánh Hòa
(32, '68'), -- Kiên Giang
(33, '82'), -- Kon Tum
(34, '25'), -- Lai Châu
(35, '49'), -- Lâm Đồng
(36, '12'), -- Lạng Sơn
(37, '24'), -- Lào Cai
(38, '62'), -- Long An
(39, '18'), -- Nam Định
(40, '37'), -- Nghệ An
(41, '35'), -- Ninh Bình
(42, '85'), -- Ninh Thuận
(43, '19'), -- Phú Thọ
(44, '78'), -- Phú Yên
(45, '73'), -- Quảng Bình
(46, '92'), -- Quảng Nam
(47, '76'), -- Quảng Ngãi
(48, '14'), -- Quảng Ninh
(49, '74'), -- Quảng Trị
(50, '83'), -- Sóc Trăng
(51, '26'), -- Sơn La
(52, '70'), -- Tây Ninh
(53, '17'), -- Thái Bình
(54, '20'), -- Thái Nguyên
(55, '36'), -- Thanh Hóa
(56, '75'), -- Thừa Thiên Huế
(57, '63'), -- Tiền Giang
(58, '41'), -- TP. Hồ Chí Minh (bao gồm 50 - 59)
(59, '84'), -- Trà Vinh
(60, '22'), -- Tuyên Quang
(61, '64'), -- Vĩnh Long
(62, '88'), -- Vĩnh Phúc
(63, '21'); -- Yên Bái

INSERT INTO plates (province_id, plate) VALUES
(24, '30'),
(24, '31'),
(24, '32'),
(24, '33');


select * from provinces;
select * from plates;


DROP TABLE IF EXISTS plates;
DROP TABLE IF EXISTS provinces;




