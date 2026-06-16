1. 当天前100 ip
>grep "$(date '+%d/%b/%Y')" /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 100

2. 查看ip访问url
> grep "146.148.119.16" /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -nr