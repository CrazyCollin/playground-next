import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Edit, Trash, Eye } from 'lucide-react';

// 模拟文章数据
const articles = [
    { id: 1, title: '如何使用 Next.js 构建现代 Web 应用', category: '教程', status: '已发布', date: '2023-06-15' },
    { id: 2, title: 'TypeScript 高级技巧与最佳实践', category: '技术', status: '草稿', date: '2023-06-10' },
    { id: 3, title: 'React 性能优化指南', category: '教程', status: '已发布', date: '2023-06-05' },
    { id: 4, title: 'CSS Grid 与 Flexbox 完全指南', category: '教程', status: '已发布', date: '2023-05-28' },
    { id: 5, title: '使用 Tailwind CSS 加速开发流程', category: '技术', status: '草稿', date: '2023-05-20' },
];

export default function ContentPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
                    <p className="text-muted-foreground">
                        管理网站文章、页面和其他内容。
                    </p>
                </div>
                <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>新建文章</span>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>文章列表</CardTitle>
                    <CardDescription>
                        系统中共有 {articles.length} 篇文章。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="搜索文章..."
                                className="pl-8 w-full md:w-[300px]"
                            />
                        </div>
                        <select
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="all">所有分类</option>
                            <option value="tutorial">教程</option>
                            <option value="tech">技术</option>
                            <option value="news">新闻</option>
                        </select>
                        <select
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="all">所有状态</option>
                            <option value="published">已发布</option>
                            <option value="draft">草稿</option>
                        </select>
                    </div>

                    <div className="rounded-md border">
                        <div className="grid grid-cols-6 border-b bg-muted/50 p-2 text-sm font-medium">
                            <div className="col-span-2">标题</div>
                            <div>分类</div>
                            <div>状态</div>
                            <div>发布日期</div>
                            <div className="text-right">操作</div>
                        </div>

                        {articles.map((article) => (
                            <div key={article.id} className="grid grid-cols-6 items-center p-4 hover:bg-muted/50">
                                <div className="col-span-2 font-medium">{article.title}</div>
                                <div>{article.category}</div>
                                <div>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${article.status === '已发布'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                        }`}>
                                        {article.status}
                                    </span>
                                </div>
                                <div>{article.date}</div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">查看</span>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">编辑</span>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash className="h-4 w-4" />
                                        <span className="sr-only">删除</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            显示 1-{articles.length} 条，共 {articles.length} 条
                        </div>
                        <div className="flex gap-1">
                            <Button variant="outline" size="sm" disabled>
                                上一页
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                                下一页
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 