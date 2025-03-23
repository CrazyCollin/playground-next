import React from 'react';

// 这是一个简单的包装函数，使用浏览器原生的确认对话框
export function showDeleteConfirmation(
    title: string = '确认删除',
    description: string = '您确定要删除这个项目吗？此操作无法撤销。'
): boolean {
    return window.confirm(`${title}\n${description}`);
}

// 为了保持兼容性，我们保留一个空组件
export function DeleteConfirmDialog() {
    return null;
} 