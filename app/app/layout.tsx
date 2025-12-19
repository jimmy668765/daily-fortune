```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日运势——您的八字专属版",
  description: "基于WebCal协议的八字运势订阅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```
**操作：** 提交。

---

### **📄 文件 4：`app/globals.css` (样式)**

**文件名输入：** `app/globals.css`
**内容粘贴：**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #F2F2F7;
}
```
