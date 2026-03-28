# Multi-Step Form

一个基于 React + TypeScript 构建的多步骤表单应用，支持主题切换与多语言。

## 功能特性

- 四步骤表单流程：个人信息 → 选择套餐 → 附加服务 → 摘要确认
- 5 套主题切换（浅蓝、日落、森林、薰衣草、暗夜），基于 Tailwind CSS v4 CSS 变量实现
- 三语言支持（简体中文、繁體中文、English），基于 i18next
- 表单状态持久化（localStorage）
- MobX 全局状态管理

## 技术栈

| 技术 | 版本 |
|------|------|
| React | 19 |
| TypeScript | 5.9 |
| Tailwind CSS | 4.2 |
| MobX | 6 |
| i18next | 25 |
| React Router | 7 |
| Vite | 8 |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
src/
├── assets/data/        # 静态数据（套餐、附加服务等）
├── components/         # 公共组件（ThemeSwitcher、LanguageSwitcher）
├── hooks/              # 自定义 hooks
├── i18n/               # 国际化翻译文件（en / zh-CN / zh-TW）
├── layout/             # 页面布局
├── pages/steps/        # 各步骤页面组件
├── stores/             # MobX Store（form、theme）
├── types/              # TypeScript 类型定义
└── index.css           # 全局样式 & 主题变量
```

## 主题系统

主题基于 Tailwind CSS v4 的 `@theme` CSS 变量实现，切换主题时只需在 `<html>` 上切换 class：

| Class | 主题 |
|-------|------|
| 默认（无 class） | 浅蓝渐变 |
| `.theme-sunset` | 日落橙粉 |
| `.theme-forest` | 森林翠绿 |
| `.theme-purple` | 薰衣草紫 |
| `.dark` | 暗夜深色 |

在组件中使用主题变量：

```tsx
<div className="bg-[var(--color-surface)] text-[var(--color-text-base)]">
  <button className="bg-[var(--color-primary)]">确认</button>
</div>
```
