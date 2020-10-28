forEach 使用async 出现 await 不会等待

```
原因是因为闭包问题，在不同的作用域里面等待不了。
```

