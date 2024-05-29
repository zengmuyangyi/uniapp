#!/bin/bash
pnpm -r --filter @yijiyou/miniapp run dev:mp-weixin_luyao &
sleep 5 ; npm run preview:dev

##########################################################################
##################### 预览工具 weapp-ide-cli 设置步骤 #####################
# - 右键`微信开发者工具`->`打开文件所在的位置`
# - 找到路径，比如`C:\soft\Tencent\微信web开发者工具`
# - `npm i -g weapp-ide-cli`
# - 检查微信开发者工具->设置->安全设置，确保打开了`服务端口`
# - 输入`weapp-ide-cli`，首次会要求设置微信`cli`路径：

# > 请设置微信web开发者工具 cli 的路径
# > 提示：命令行工具默认所在位置：
# > - MacOS: <安装路径>/Contents/MacOS/cli
# > - Windows: <安装路径>/cli.bat
# > 请输入微信web开发者工具cli路径：

# - 例如，输入`C:\soft\Tencent\微信web开发者工具\cli.bat`

# 之后可以在`C:\Users\admin\.weapp-ide-cli\config.json`可以看到配置，比如：
# ```json
# {
#   "cliPath": "C:\\soft\\Tencent\\微信web开发者工具\\cli.bat"
# }
# ```
# 这样就设置好了，具体路径以自己电脑为准。
##########################################################################