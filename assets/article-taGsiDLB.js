const r=`---\r
title: 'Git开发（入门）'\r
date: '2025-09-20'\r
tags: ['学习', '开发', 'Git']\r
snippet: 'Git的切换分支、提交pr等操作'\r
imageUrl: '/articles/study/2025-09-20/创建pr完成.png'\r
---\r
\r
## 一、前言\r
\r
为了避免开发过程中多人协作时发生冲突，导致代码管理混乱，需要"一个功能一条分支"，开发完成后将分支提交至远端，再合并进主分支。\r
\r
**前提：需要安装git（[下载地址](https://git-scm.com/)）**\r
\r
下文所有命令均在 Git Bash 里执行（Windows 用户可在文件夹空白处右键 -> "显示更多选项" -> "Open Git Bash here"）。\r
\r
只要最终效果一致，步骤可按自己习惯调整。\r
\r
## 二、把远程仓库克隆到本地\r
\r
1. **打开 GitHub 仓库，点击绿色 Code 按钮，复制 HTTPS 地址（格式：https://github.com/用户名/仓库名.git）。**\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/cloneaddress.png">\r
      <em>复制仓库的git地址</em>\r
    </div>\r
\r
2. **进入你想放代码的本地文件夹，空白处右键 -> 显示更多选项 -> Open Git Bash here**\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/打开gitbash.png">\r
      <em>在项目文件夹打开git bash</em>\r
    </div>\r
\r
3. **执行克隆（⚠️ 不要下 ZIP 压缩包，那是一份"快照"，无法与远程仓库同步）：**\r
\r
    输入 git clone ，然后右键选择paste粘贴刚刚复制的git仓库地址，最后的完整命令为：\r
\r
    \`\`\`\r
    git clone https://github.com/XXX/XXX.git\r
    \`\`\`\r
\r
    按下回车进行克隆，克隆完成后，会在当前目录出现与仓库同名的文件夹，里面已是完整的 Git 仓库，后续所有操作都基于它。\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/clone仓库.png">\r
      <em>clone 仓库</em>\r
    </div>\r
\r
\r
## 三、开始开发：一条分支一个功能\r
\r
1. **创建新功能分支**\r
\r
    **原则：任何新代码都写在独立分支，方便追溯与回滚。**\r
\r
    进入刚克隆的项目根目录，空白处右键 -> 显示更多选项 -> Open Git Bash here。\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/打开gitbash2.png">\r
      <em>在仓库代码文件夹中，打开git bash</em>\r
    </div>\r
\r
    输入：\r
    \`\`\`\r
    git checkout -b task1\r
    \`\`\`\r
    \r
    其中checkout是切换，-b表示如果不存在名为task1的分支，则创建并切换。\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/切换分支.png">\r
      <em>切换分支</em>\r
    </div>\r
 \r
    出现Switched to a new branch 'task1'表示切换成功，这样就切换到了task1分支上。\r
\r
2. **现在就可以在代码编辑器里编写新功能代码了。**\r
\r
3. **当新功能代码编写完毕后，使用git status查看改动以及git是否跟踪了刚刚修改的文件。**\r
\r
<div class="figure-center">\r
  <img src="/articles/study/2025-09-20/查看工作区改动.png">\r
  <em>查看工作区改动（红色=未暂存，绿色=已暂存）</em>\r
</div>\r
\r
4. **把改动加入暂存区（二选一）**\r
    \`\`\`\r
    git add 文件名              # 只添加指定文件\r
\r
    git add .                   # 添加全部改动（慎用，先确认 status，不要添加日志、密钥等文件）\r
    \`\`\`\r
\r
5. **将改动的代码提交到本地仓库的task1分支中**\r
\r
    \`\`\`\r
    git commit -m "feat: 完成商品列表接口"\r
    \`\`\`\r
\r
    -m 后面跟的是提交记录，是给自己和同事看的，描述请用“做了什么”，而非“正在做什么”。\r
\r
    英文冒号+空格是通用写法，方便自动生成 ChangeLog。\r
\r
6. **推到远程仓库的task1分支中**\r
\r
    \`\`\`\r
    git push -u origin task1    # 第一次加 -u，后续直接 git push 即可\r
    \`\`\`\r
    \r
\r
\r
以上2~6步骤可以重复执行多次，一个功能可以 add -> commit -> push 多次，自己的分支想怎么写历史都行。\r
\r
**另外，请在开发过程中定期同步主分支最新代码：git pull origin main来拉取主分支中的最新代码，避免运行的是他人代码是过时代码。**\r
\r
## 四、把功能合并回主分支（Pull Request）\r
\r
当自己分支负责开发的小功能完成后，就可以合并进主分支了。\r
\r
1. **发起 PR（网页操作）**\r
\r
    浏览器打开仓库，点击仓库上方的Pull requests，然后点击New pull request\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/newpullrequest.png">\r
      <em>New pull request</em>\r
    </div>\r
\r
2. **为自己的分支创建pr**\r
\r
    点击自己的分支\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/选择分支.png">\r
      <em>选择分支</em>\r
    </div>\r
\r
    创建pr\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/创建pr.png">\r
      <em>创建pr</em>\r
    </div>\r
\r
    填写 PR 模板\r
\r
    \`\`\`\r
    标题：feat: 商品列表接口\r
    描述：\r
    （做了什么）\r
    - 完成 \`/api/products\` 分页接口\r
    - 添加单元测试 12 条\r
\r
    （如何验证）\r
    1. \`npm run test:ci\` 全部通过\r
    2. 访问 \`http://localhost:3000/api/products?page=2\` 可拿到 20 条数据\r
    \`\`\`\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/填写pr信息.png">\r
      <em>填写pr信息</em>\r
    </div>\r
\r
    点击Create pull request创建pr即可，之后不需要进行任何操作，等待 Code Review 即可。\r
    \r
3. **之后会在以下页面能够看到自己刚刚提交的pr**\r
\r
    <div class="figure-center">\r
      <img src="/articles/study/2025-09-20/创建pr完成.png">\r
      <em>创建pr完成</em>\r
    </div>\r
\r
    随后会有仓库 Maintainer 来进行Code review，判断该分支是否**需要修改**或能够**直接合并进主分支**。\r
\r
    只要分支还没被合并进主分支，都是可以一直进行开发、修改、提交的。\r
\r
4. **当分支被合并进主分支后，请不要在已合并的分支上继续开发，创建新的分支开发**\r
\r
    仓库 Maintainer 会点击 Squash and Merge pull request 将代码合并进 main 分支，随后 Delete branch 把远端 task1 删掉，防止有人误继续提交。\r
\r
5. **自己的分支被合并后**\r
\r
    \`\`\`\r
    git checkout main   # 本地切换到main分支\r
    git pull            # 由于task1分支被合并进了main，所以本地需要拉取main分支的最新代码\r
    git fetch --prune   # 同步远端的分支信息（由于远端刚刚删除了task1分支，故该命令会自动删除本地的task1分支）\r
    git checkout -b task2  # 创建新分支进行新的功能开发，循环往复\r
    \`\`\`\r
\r
<br/>\r
<span style="font-size: 30px; font-weight: bold;">END</span>`;export{r as default};
