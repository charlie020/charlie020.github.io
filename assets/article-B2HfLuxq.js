const r=`---\r
title: 'Git开发规范（简要）'\r
date: '2025-09-20'\r
tags: ['学习', '开发', 'Git']\r
snippet: 'Git的切换分支、提交pr、合并等操作'\r
imageUrl: '/articles/study/2025-09-20/4.png'\r
---\r
\r
## 前言\r
\r
为了避免开发中遇到冲突，导致代码管理混乱，每一个小功能都需在自己的分支上面进行开发，开发完成后合并进主分支。\r
\r
前提：需要安装git（[地址](https://git-scm.com/)），在git bash或pycharm或powershell（不是cmd）中执行下面的命令（这只是我的习惯，只要最终效果一样，步骤可以不同）。\r
\r
\r
## 开发\r
\r
1、在开始编写自己负责功能的代码之前，需切换分支（为了所有提交都可溯，即便是一个写小功能也要切换）\r
\r
![打开git bash](/articles/study/2025-09-20/1.png){.image-center}\r
\r
\r
![切换分支](/articles/study/2025-09-20/2.png){.image-center}\r
 \r
这样就切换到了task1分支上。\r
\r
2、现在可以开始编写代码。\r
\r
3、当代码编写完毕后，使用git status查看git是否跟踪了刚刚修改的文件。\r
\r
![查看工作区改动](/articles/study/2025-09-20/3.png){.image-center}\r
\r
4、git add file1来把file1添加到暂存区，便于后续提交commit，也可以git add . 来添加所有修改的文件。\r
\r
5、git add之后需要git commit -m “description”，提交到自己的分支上（即task1），其中-m后面的内容是你对本次提交的描述。\r
\r
6、git commit之后，使用git push origin task1，将本地task1分支同步到远程的task1分支。\r
\r
以上2~6步骤可以重复执行多次，即开发一个小功能的时候，可以在自己的分支上面进行多次commit和push，因为是自己的分支，所以可以随便commit、push。\r
\r
另外，请在开发过程中，及时的git pull origin main来拉取主分支中的最新代码，避免使用的他人代码是过时代码。\r
\r
## 合并\r
当自己分支负责开发的小功能已完成，确定可以合并进主分支了，开始执行以下操作\r
\r
1、点击Pull requests，New pull request\r
\r
![new pr](/articles/study/2025-09-20/4.png){.image-center}\r
\r
2、选择自己的分支，创建pr\r
\r
![选择分支](/articles/study/2025-09-20/5.png){.image-center}\r
\r
![创建pr](/articles/study/2025-09-20/6.png){.image-center}\r
\r
![填写pr信息](/articles/study/2025-09-20/7.png){.image-center}\r
\r
在“Add a description”中填写自己本分支的描述后，点击Create pull request即可，之后不需要进行任何操作，只需要在以下页面能够看到自己刚刚提交的pr：\r
\r
![创建pr完成](/articles/study/2025-09-20/8.png){.image-center}\r
\r
随后会有人来进行代码审核，判断是否需要修改或合并进主分支。\r
\r
<br/>\r
<span style="font-size: 30px; font-weight: bold;">END</span>`;export{r as default};
