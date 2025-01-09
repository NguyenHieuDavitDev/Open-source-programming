# I. Cài đặt môi trường

## 1. Khởi tạo dự án Node.js

### a. Cài đặt môi trường

```bash
mkdir backend
cd backend
npm init -y
npm install express mysql body-parser cors nodemon
```

### b. Thiết lập nodemon trong `package.json`

```json
"scripts": {
    "start": "nodemon index.js"
}
```

## 2. Tạo database bằng MySQL

```sql
CREATE DATABASE userdb;
USE userdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## 3. Xử lý lỗi: "webpack compiled with 1 error"

Một trong những phụ thuộc của bạn, `babel-preset-react-app`, đang nhập gói `@babel/plugin-proposal-private-property-in-object` mà không khai báo trong các phụ thuộc của nó. Điều này hiện đang hoạt động vì `@babel/plugin-proposal-private-property-in-object` đã có trong thư mục `node_modules` của bạn vì lý do không liên quan, nhưng nó có thể bị hỏng bất cứ lúc nào.

`babel-preset-react-app` là một phần của dự án `create-react-app`, hiện không còn được bảo trì nữa. Do đó, rất khó để lỗi này được sửa. Để khắc phục lỗi này, bạn cần thêm `@babel/plugin-proposal-private-property-in-object` vào `devDependencies`. Điều này sẽ giúp loại bỏ thông báo này.

Để xử lý những lỗi trên, bạn cần cài đặt:

### a. Cài đặt web-vitals

```bash
npm install web-vitals
```

### b. Cài đặt @babel/plugin-proposal-private-property-in-object

```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

### c. Cập nhật CRA

```bash
npx npm-check-updates -u
npm install
```

## 4. Chạy dự án

### a. Chạy backend

```bash
npm start
```

### b. Chạy frontend

```bash
npm start
```

Truy cập vào link [http://localhost:3000/login](http://localhost:3000/login)
