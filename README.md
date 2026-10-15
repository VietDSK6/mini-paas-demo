# Mini PaaS Demo App

Repository mẫu độc lập để thử chức năng **Tạo Web Service**.

## Chạy cục bộ

```bash
npm start
curl http://127.0.0.1:3000/health
curl http://127.0.0.1:3000/version
```

## Đưa lên GitHub

Tạo một repository công khai trống dưới owner đã được Mini PaaS cho phép, sau đó chạy:

```bash
git remote add origin git@github.com:VietDSK6/mini-paas-demo-app.git
git push -u origin main
```

Trong Mini PaaS nhập:

- Tên: `Mini PaaS Demo App`
- Slug: `demo-app`
- Repository: URL repository vừa tạo
- Build context: `.`

Ứng dụng lắng nghe biến `PORT=3000` và cung cấp `/health`, `/version` theo hợp đồng MVP.
