---
title: '在银河麒麟OS上离线运行Pyqt6大模型应用程序'
date: '2025-11-23'
tags: ['项目', '操作系统', '大模型']
snippet: '前往某研究院，使用银河麒麟操作系统，离线部署本地大模型，运行Python程序'
imageUrl: '/articles/record/2025-11-23/外来设备.jpg'
---

原先是准备用docker一键打包环境和模型的，但是由于通过docker启动Pyqt6桌面应用、弹出窗口容易踩坑，故还是选择单独部署大模型、配置Python环境。

由于院内机器无法联网，我们需要提前准备好所需的大模型、代码等文件，避免因重复拷贝而浪费时间。

将文件拷贝到离线机有两种方式：

- 使用刻录机：先将联网机中的内容刻录到光盘，再将光盘插入离线机读取。但一张光盘最多只能刻录4GB内容，且刻录1GB大约需要10分钟，速度非常慢。刻录过程中任何抖动都会导致刻录内容损坏。
- PE盘启动方式：通过PE启动盘引导系统，开机时按F12进入BIOS，选择UEFI模式启动。进入PE系统后，插入U盘并将内容复制到本地硬盘。传输完成后关机，拔除U盘、PE盘，重启系统，即可正常进入银河麒麟。该方式传输速度快，且不会触发系统对U盘插拔的监控记录。

## 预先准备

**我们这里选用Ollama部署大模型，让Python程序访问本地11434端口来获取模型响应。**

银河麒麟的大多数命令跟Ubuntu类似，所以可以当成Ubuntu22.04来处理。

查看离线机的**Python**版本、**Cuda**（通过nvidia-smi查看）版本，**cpu架构**(x86_64 or aarch64，通过uname -m查看)，我的离线机：Python3.11，Cuda12.6，x86_64，4090(24GB)×2。

在联网机（**Windows11**）上，下载离线机对应的文件：

**模型：**
- Ollama Linux 离线安装包：[ollama-linux-amd64.tgz](https://ollama.com/download/ollama-linux-amd64.tgz)
- GCC 升级包：银河麒麟自带 GCC 版本较旧，建议提前备好 [gcc-8.3.0.tar.gz](http://ftp.gnu.org/gnu/gcc/gcc-8.3.0/gcc-8.3.0.tar.gz)
- Qwen3:14b 模型文件：在联网机上执行 `ollama pull qwen3:14b`，拷贝 blobs、manifests 两个文件夹。相比 huggingface 的 GGUF，这种方式无需手写 Modelfile，能省去 autogen 工具调用场景下的配置Modelfile的时间
- BAAI/bge-small-zh-v1.5 嵌入模型：用 huggingface CLI 提前下载拷贝

**Python：**
- 项目代码
- Python包的轮子文件，在联网机上通过`uv pip freeze > requirements.txt`，导出依赖，剔除win上特有的包（如pywin32）后，通过
`pip download -r requirements.txt --dest ./offline_python_whls --platform manylinux2014_x86_64 --python-version 3.11 --implementation cp --abi cp311 --only-binary=:all: `
下载requirements.txt中依赖的whl格式，保存至./offline_python_whls文件夹中
- nltk_data：`pip install nltk`后通过命令行下载nltk：
  ```
  python -c "import nltk, os, zipfile, tarfile, pathlib, shutil
  dst = pathlib.Path('./nltk_data')
  dst.mkdir(exist_ok=True)
  nltk.download('all', download_dir=str(dst))"
  ```

## 部署模型

1. 解压ollama离线安装包，运行Ollama
    ```
    tar -zxvf ollama-linux-amd64.tgz -C ~/ollama
    cd ~/ollama/bin
    chmod +x ollama
    ```
    ollama会自动启动，并且开机自启，可以通过`systemctl status ollama`查看
2. 如果ollama没有成功运行，且提示需要更新GCC，则查看这篇[博客](https://blog.csdn.net/qq_46302361/article/details/146565963)
3. 运行qwen3:14b模型
    将blob和manifests中的内容拷贝到ollama的models对应目录下
    ```
    cp -r blobs/* /usr/share/ollama/.ollama/models/blobs/
    cp -r manifests/* /usr/share/ollama/.ollama/models/manifests/
    ```
    重启ollama，运行模型
    ```
    systemctl restart ollama
    ollama list
    ollama run qwen3:14b
    ```
    
4. 将Embedding模型整个文件夹拷到~目录下。

## Python环境

1. cd到offline_python_whls目录下，执行`pip install --no-index --find-links=. *`即可在当前 Python 环境中一次性离线安装所有 wheel 包（如遇依赖冲突或包缺失，需在联网机补全缺失版本后再次拷贝）。

    提示：Windows 端本项目用 uv 管理依赖，但 uv (0.6.11) 尚不支持“在 Windows 上直接下载 Linux 版本依赖包”，故无法实现`在 Windows 上 uv 下好 Linux 依赖包，再将 .venv 目录移动至银河麒麟OS中`，如有更简便方式欢迎邮箱交流。

2. 修改代码中api地址
    ```
    super().__init__(
        model="qwen3:14b",
        base_url="http://localhost:11434/v1",
        api_key="ollama",
        **kwargs
    )
    ```

<br/>
<span style="font-size: 30px; font-weight: bold;">END</span>