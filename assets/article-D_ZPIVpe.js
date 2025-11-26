const n=`---
title: 'Git开发（入门）'
date: '2025-09-20'
tags: ['学习', '开发', 'Git']
snippet: 'Git的切换分支、提交pr等操作'
imageUrl: '/articles/study/2025-09-20/创建pr完成.png'
---

## 一、前言

为了避免开发过程中多人协作时发生冲突，导致代码管理混乱，需要"一个功能一条分支"，开发完成后将分支提交至远端，再合并进主分支。

**前提：需要安装git（[下载地址](https://git-scm.com/)）**

下文所有命令均在 Git Bash 里执行（Windows 用户可在文件夹空白处右键 -> "显示更多选项" -> "Open Git Bash here"）。

只要最终效果一致，步骤可按自己习惯调整。

## 二、把远程仓库克隆到本地

1. **打开 GitHub 仓库，点击绿色 Code 按钮，复制 HTTPS 地址（格式：https://github.com/用户名/仓库名.git）。**

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/cloneaddress.png">
      <em>复制仓库的git地址</em>
    </div>

2. **进入你想放代码的本地文件夹，空白处右键 -> 显示更多选项 -> Open Git Bash here**

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/打开gitbash.png">
      <em>在项目文件夹打开git bash</em>
    </div>

3. **执行克隆（⚠️ 不要下 ZIP 压缩包，那是一份"快照"，无法与远程仓库同步）：**

    输入 git clone ，然后右键选择paste粘贴刚刚复制的git仓库地址，最后的完整命令为：

    \`\`\`
    git clone https://github.com/XXX/XXX.git
    \`\`\`

    按下回车进行克隆，克隆完成后，会在当前目录出现与仓库同名的文件夹，里面已是完整的 Git 仓库，后续所有操作都基于它。

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/clone仓库.png">
      <em>clone 仓库</em>
    </div>


## 三、开始开发：一条分支一个功能

1. **创建新功能分支**

    **原则：任何新代码都写在独立分支，方便追溯与回滚。**

    进入刚克隆的项目根目录，空白处右键 -> 显示更多选项 -> Open Git Bash here。

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/打开gitbash2.png">
      <em>在仓库代码文件夹中，打开git bash</em>
    </div>

    输入：
    \`\`\`
    git checkout -b task1
    \`\`\`
    
    其中checkout是切换，-b表示如果不存在名为task1的分支，则创建并切换。

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/切换分支.png">
      <em>切换分支</em>
    </div>
 
    出现Switched to a new branch 'task1'表示切换成功，这样就切换到了task1分支上。

2. **现在就可以在代码编辑器里编写新功能代码了。**

3. **当新功能代码编写完毕后，使用git status查看改动以及git是否跟踪了刚刚修改的文件。**

<div class="figure-center">
  <img src="/articles/study/2025-09-20/查看工作区改动.png">
  <em>查看工作区改动（红色=未暂存，绿色=已暂存）</em>
</div>

4. **把改动加入暂存区（二选一）**
    \`\`\`
    git add 文件名              # 只添加指定文件

    git add .                   # 添加全部改动（慎用，先确认 status，不要添加日志、密钥等文件）
    \`\`\`

5. **将改动的代码提交到本地仓库的task1分支中**

    \`\`\`
    git commit -m "feat: 完成商品列表接口"
    \`\`\`

    -m 后面跟的是提交记录，是给自己和同事看的，描述请用“做了什么”，而非“正在做什么”。

    英文冒号+空格是通用写法，方便自动生成 ChangeLog。

6. **推到远程仓库的task1分支中**

    \`\`\`
    git push -u origin task1    # 第一次加 -u，后续直接 git push 即可
    \`\`\`
    


以上2~6步骤可以重复执行多次，一个功能可以 add -> commit -> push 多次，自己的分支想怎么写历史都行。

**另外，请在开发过程中定期同步主分支最新代码：git pull origin main来拉取主分支中的最新代码，避免运行的是他人代码是过时代码。**

## 四、把功能合并回主分支（Pull Request）

当自己分支负责开发的小功能完成后，就可以合并进主分支了。

1. **发起 PR（网页操作）**

    浏览器打开仓库，点击仓库上方的Pull requests，然后点击New pull request

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/newpullrequest.png">
      <em>New pull request</em>
    </div>

2. **为自己的分支创建pr**

    点击自己的分支

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/选择分支.png">
      <em>选择分支</em>
    </div>

    创建pr

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/创建pr.png">
      <em>创建pr</em>
    </div>

    填写 PR 模板

    \`\`\`
    标题：feat: 商品列表接口
    描述：
    （做了什么）
    - 完成 \`/api/products\` 分页接口
    - 添加单元测试 12 条

    （如何验证）
    1. \`npm run test:ci\` 全部通过
    2. 访问 \`http://localhost:3000/api/products?page=2\` 可拿到 20 条数据
    \`\`\`

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/填写pr信息.png">
      <em>填写pr信息</em>
    </div>

    点击Create pull request创建pr即可，之后不需要进行任何操作，等待 Code Review 即可。
    
3. **之后会在以下页面能够看到自己刚刚提交的pr**

    <div class="figure-center">
      <img src="/articles/study/2025-09-20/创建pr完成.png">
      <em>创建pr完成</em>
    </div>

    随后会有仓库 Maintainer 来进行Code review，判断该分支是否**需要修改**或能够**直接合并进主分支**。

    只要分支还没被合并进主分支，都是可以一直进行开发、修改、提交的。

4. **当分支被合并进主分支后，请不要在已合并的分支上继续开发，创建新的分支开发**

    仓库 Maintainer 会点击 Squash and Merge pull request 将代码合并进 main 分支，随后 Delete branch 把远端 task1 删掉，防止有人误继续提交。

5. **自己的分支被合并后**

    \`\`\`
    git checkout main   # 本地切换到main分支
    git pull            # 由于task1分支被合并进了main，所以本地需要拉取main分支的最新代码
    git fetch --prune   # 同步远端的分支信息（由于远端刚刚删除了task1分支，故该命令会自动删除本地的task1分支）
    git checkout -b task2  # 创建新分支进行新的功能开发，循环往复
    \`\`\`

<br/>
<span style="font-size: 30px; font-weight: bold;">END</span>`;export{n as default};
