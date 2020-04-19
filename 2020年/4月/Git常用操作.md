# Git常用操作

最基础的用法

```
git add .
git commit -m"提交到本地仓库"
git pull  // 先更新一下代码 pull 的内部操作其实是把远程仓库取到本地后（使用的是 fetch），再用一次 merge 来把远端仓库的新 commits 合并到本地
git push // 将本地的 commits一起提交上去。
```



#### 掌握核心概念

##### 	commit是什么？

​	他就是我们每次执行 `git commit -m"xxx"`的时候产生的一个记录。他的作用就是记录当前commit最新改动。

​	但是我说这个太生硬，晦涩难懂。我想说的是每次我们 `commit` 的时候，会产生一个 SHA-1 值，但是这个值呢，不好整。于是每次  `commit` 的时候，都默认用commit 算了。 可以通过git log/git reflog 查看

​	我们可以 git checkout SHA-1值 来进行切换代码。

> ​	场景： 当我们某个版本的代码出现问题。 就可以通过git checkout SHA-1 可以回滚代码



##### 	HEAD是什么？

​		他相当于仓库当前操作的位置。不过有一个注意点，远程仓库的HEAD 和本地仓库的HEAD是有区别的。

​		`远程仓库的HEAD`：永远指向master

​		`本地仓库HEAD`：根据commit的变化，变化当前的HEAD指向，提交本地仓库到远程仓库并不会将HEAD提交，只会将commits合并一起提交到远程仓库。

​		共同点：指向当前 `commit` 的引用，它具有唯一性，每个仓库中只有一个 `HEAD`。在每次提交时它都会自动向前移动到最新的 `commit` 。

##### 	

##### 	branch是什么？

​		这是分支，但是他可以这么理解，也是有一些问题的。我们可以这么理解，我说不同点的时候，只是当这个时候不能这么理解，其他条件还是理解 `分支`

当我们删除分支的时候，并不会把branch一条分支删掉。 只是把branch这个引用删掉，他这个分支包含的commits 会经过一段的时间会被git的垃圾回收机制回收。

正确的说法是：branch只是一个引用，仅仅是一个引用，不好理解吧。

- 分支提交到远程仓库

  ```
  git branch feature1 // 创建分支
  git checkout feature1 // 签出分支到feature1
  
  git checkout -b feature1 // 一步到位
  git push origin feature1 // 将本地的分支更新到远程仓库
  
  git branch -d feature1 // 删除分支 会失败 -D 就好了
  
  注意点：当有人删了分支feature2，然后又新建了feature2放在远程仓库上面，但是里面的内容已经不一样了（不管一样还是不一样），这时候我们的分支需要更新，不然本地仓库这条分支是有问题的。
  git fetch origin --prune
  ```

  

  ##### merge是什么？

  ​	合并。合并commits。实际上很多地方都会出现merge。

  > 场景：当我们合并分支的时候，都需要切换回主分支，然后 git merge 分支名
  >
  > 他的原理是什么呢？
  >
  > ​	主分支的commit 和 分支上面的commit 然后合并一个新的commit 在主分支上

  ```
  当我们合并分支的时候出现了，不可恢复，或者比较难处理的时候，
  git merge feature1 // 有时候当我们HEAD在commit的后面，也是需要用到的，当git checkout 'SHA-1值'，就可以用到 这种操作有一个专有称谓，叫做 "fast-forward"（快速前移）。
  
  git merge --abort // 恢复到git merge feature1前的状态 
  ```

  

  ##### 想看看提交记录？

  ```
  git log  // 看日志 -p 是 `--patch` 的缩写，通过 `-p` 参数，你可以看到具体每个 `commit` 的改动细节：
  
  git log --stat // 这个看到的就是具体哪个文件，增删了多少行
  
  git show // 查看当前commit 的变化
  
  git status // 查看当前本地仓库的改动
  ```

#### checkout （签出）

`checkout` 并不止可以切换 `branch`。`checkout` 本质上的功能其实是：签出（ checkout ）指定的 `commit`。

```
git checkout branch2
git checkout HEAD^^
git checkout master~5
git checkout 78a4bc
git checkout 78a4bc^
```

1.有时候签出会导致 HEAD detached at 某个commit（ac44870），这时候的操作就是切换到这个commit上面新建分支，加进缓存区，commit 一下。切回来想要的分支上面，合并分支。删除刚刚新建的分支即可

```
1.git branch temp ac44870
2.git add .
3.git commit -m"提交代码"
4.git checkout master // 别看我这个master 我在练手
5.git merge temp
6.git branch -d temp
```



#### reset

​	reset的原理是什么？

​	实质上，`reset` 这个指令虽然可以用来撤销 `commit` ，但它的实质行为并不是撤销，而是移动 `HEAD` ，并且「捎带」上 `HEAD` 所指向的 `branch`（如果有的话）。也就是说，`reset` 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 `HEAD` 以及它所指向的 `branch` 的位置的。

#### 	注意点

```
当你准备使用reset的时候，
	1.记得加上缓存区。免得丢失的东西，只能重写。
	2.如果使用了相关的重置命令，但是啥也没动，发现自己弄错了，记住把所有的操作撤销回来，git pull。又回到初始状态。
	3.git push 会报错 ，当你回退后怎么提交呢 ？ 
		这个错误是因为本地与远程的版本(文件)不相同，你可以先 pull 本地即可。
	 具体流程 撤销commit无论远程还是本地，优先本地撤销，然后再到远程撤销。 然后提交的时候需要先拉下来。再提交
    git reset --hard HEAD^
    git pull origin 分支名操作 // 如果不放心可以先拉下来看看异同点，在提交也是可以的
   	// 1.也可以巧用看完没啥问题 git merge --abort，直接执行下面命令硬推上去
   	// 2.自己手动解决，采用当前更改。 然后push上去也是可以的，反而这种更受别人欢迎，更加安全。
  	git push origin 分支名操作 -f
	
```

 ##### 	项目回滚

 `reset --hard HEAD^` 之所以起到了撤销 `commit` 的效果，是因为它把 `HEAD` 和它所指向的 `branch` 一起移动到了当前 `commit` 的父 `commit` 上，从而起到了「撤销」的效果：

```
  git reset --hard 目标commit // 退回来具体的commit
  git reset --hard HEAD^ // 退回上一个commit
  // 需要注意的是 前面的commit 还是存在的，我们如果记得SH-A值就可以去返回回去
  
  参数的不同。
  1. 当没有参数的情况， 默认值 --mixed 
  reset 不加参数：保留工作目录，并清空暂存区
		reset 如果不加参数，那么默认使用 --mixed 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 reset 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」。
		白话文：现在有两个commit 。暂存区还有东西没有commit。这时候 git reset HEAD^，就会把最新的commit 保存起来，暂存区的东西还是放在暂存区。内容基本不变，上一个commit。但是代码不变
  
  2. reset --hard：重置工作目录（个人感觉用处最大。）
		reset --hard 会在重置 HEAD 和 branch 的同时，重置工作目录里的内容。当你在 reset 后面加了 --hard 参数时，你的工作目录里的内容会被完全重置为和 HEAD 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。
		白话文：现在有两个commit 。暂存区还有东西没有commit。这时候 git reset --hard HEAD^，就会把最新的commit 和暂存区的东西丢掉。恢复到第一条commit所做的修改。
		
	3. reset --soft：保留工作目录
	reset --soft 会在重置 HEAD 和 branch 时，保留工作目录和暂存区中的内容，并把重置 HEAD 所带来的新的差异放进暂存区。
	白话文：现在有两个commit 。暂存区还有东西没有commit。这时候 git reset --soft HEAD^，就会把最新的commit 保存起来，暂存区的东西还是放在暂存区。内容基本不变，代码回去了上一个commit的代码。
```

##### revert（恢复）

​	git revert 撤销 某次操作，此次操作之前和之后的commit会保留，并且把这次撤销作为一次最新的提交。

​	git revert是提交一个新的版本，将需要revert的版本的内容再反向修改回去，
​	版本会递增，不影响之前提交的内容

```
git revert HEAD // 撤销前一次 commit
git revert HEAD^ //	 撤销前前一次 commit

```

### revert和reset区别

- git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。 
- . git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。
- 那么结论是不是revert 更加安全？

###   拓展

##### gitflow工作流

`Gitflow`工作流定义了一个围绕项目发布的严格分支模型。虽然比[功能分支工作流](https://github.com/oldratlee/translations/blob/master/git-workflows-and-tutorials/workflow-feature-branch.md)复杂几分，但提供了用于一个健壮的用于管理大型项目的框架。

`Gitflow`工作流没有用超出功能分支工作流的概念和命令，而是为不同的分支分配一个很明确的角色，并定义分支之间如何和什么时候进行交互。 除了使用功能分支，在做准备、维护和记录发布也使用各自的分支（Production 分支、Develop 分支、Feature 分支、Release分支、Hotfix分支）。 当然你可以用上功能分支工作流所有的好处：`Pull Requests`、隔离实验性开发和更高效的协作。

##### feature branching 工作流（功能分支工作流）

每个新功能都新建一个 `branch`，目前世界上最流行的工作流。

原因：这种工作流由于功能强大，而且概念和使用方式都很简单

##### 中央式版本控制系统（Centralized VCS） VS 分布式版本控制系统（Distributed VCS）

中央式版本控制系统 : 每次commit的代码都是放到**中央仓库**。

分布式版本控制系统 ：中央仓库 每个开发者也有自己的仓库，开发者在需求没做完之前，可以提交到本地仓库，完成之后再提交到远程仓库。开发者相互不影响，更加符合开发标准。







