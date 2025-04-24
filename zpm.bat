call npm config set registry https://registry.npmmirror.com
echo %*
call %*
call npm config set registry https://registry.npmjs.org/