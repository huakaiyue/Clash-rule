// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  "p1": {
    "type": "http",
    // 订阅 链接
    "url": "https://xn--cp3a08l.com/api/v1/client/subscribe?token=eedeaaff95481aef275f9fffb7d8452d",
    // 自动更新时间 86400(秒) / 3600 = 24小时
    "interval": 86400,
    "override": {
      // 节点名称前缀 p1，用于区别机场节点
      "additional-prefix": "|"
    }
  },
}

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = typeof originalProviders === "object" ? Object.keys(originalProviders).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 合并而非覆盖
  config["proxy-providers"] = {
    ...originalProviders,  // 保留原有配置
    ...proxyProviders       // 合并新配置（同名则覆盖）
  };
  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  // 覆盖原配置中的代理组
  config["proxy-groups"] = proxyGroupConfig;
  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  //覆盖通用配置
  config["mixed-port"] = 7890;
  config["allow-lan"] = true;
  config["bind-address"] = "*";
  config["ipv6"] = true;
  config["unified-delay"] = true;
  // 返回修改后的配置
  return config;
}
// DNS配置
const dnsConfig = {
  "enable": true,
  "ipv6": true,
  "listen": ":53",
  "prefer-h3": false,
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "use-hosts": false,
  "use-system-hosts": false,
  "nameserver": ["https://1.1.1.1/dns-query", "https://dns.google/dns-query"], // 默认的域名解析服务器
  "default-nameserver": ["tls://223.5.5.5", "tls://119.29.29.29"],  //默认DNS 用于解析 DNS服务器 的域名
  "proxy-server-nameserver": ['https://doh.pub/dns-query'],
  "direct-nameserver": ['https://doh.pub/dns-query','https://dns.alidns.com/dns-query'],   //用于 direct 出口域名解析的 DNS 服务器
};
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.gstatic.com/generate_204",
  "max-failed-times": 3,
  "hidden": false
};
// 代理组规则
const proxyGroupConfig = [
  {
    ...groupBaseOption,
    "name": "Proxy",
    "type": "select",
    "proxies": ["自动选择", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT", "REJECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
  },
  {
    ...groupBaseOption,
    "name": "自动选择",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png"
  },
  /*{
    ...groupBaseOption,
    "name": "Apple",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "REJECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
  },*/
  {
    ...groupBaseOption,
    "name": "Telegram",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT", "REJECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
  },
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT", "REJECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
  },
  {
    ...groupBaseOption,
    "name": "BiliBili",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
  },
  {
    ...groupBaseOption,
    "name": "OpenAI",
    "type": "select",
    "proxies": ["Proxy", "美国", "台湾", "日本", "韩国", "香港", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
  },
 /* {
    ...groupBaseOption,
    "name": "Gemini",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/guaishouxiaoqi/icons@master/Color/Gemini.png"
  },
  {
    ...groupBaseOption,
    "name": "Claude",
    "type": "select",
    "proxies": ["Proxy", "美国", "台湾", "日本", "韩国", "香港", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/ke1ewang/Qi@master/Claude.png"
  },*/
  {
    ...groupBaseOption,
    "name": "TikTok",
    "type": "select",
    "proxies": ["Proxy", "台湾", "香港", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png"
  },
 /* {
    ...groupBaseOption,
    "name": "Spotify",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png"
  },
  {
    ...groupBaseOption,
    "name": "Netflix",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
  },
  {
    ...groupBaseOption,
    "name": "Disney",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Disney.png"
  },*/
  {
    ...groupBaseOption,
    "name": "Google",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google.png"
  },
 /* {
    ...groupBaseOption,
    "name": "OneDrive",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
  },
  {
    ...groupBaseOption,
    "name": "Microsoft",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
  },*/
  {
    ...groupBaseOption,
    "name": "Twitter",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png"
  },
  {
    ...groupBaseOption,
    "name": "Steam",
    "type": "select",
    "proxies": ["Proxy", "香港", "DIRECT", "台湾", "日本", "韩国", "美国", "德国", "新加坡", "法国", "英国"],
    "include-all": true,
    "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|扣费|X5",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Steam.png"
  },
  {
    ...groupBaseOption,
    "name": "香港",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "香港|HK|🇭🇰",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
  },
  {
    ...groupBaseOption,
    "name": "台湾",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "台湾|TW|🇹🇼",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
  },
  {
    ...groupBaseOption,
    "name": "日本",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "日本|JP|🇯🇵",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
  },
  {
    ...groupBaseOption,
    "name": "韩国",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "韩国|KR|🇰🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"
  },
  {
    ...groupBaseOption,
    "name": "美国",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "美国|US|🇺🇸",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
  },
  {
    ...groupBaseOption,
    "name": "德国",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "德国|DE|🇩🇪",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png"
  },
  {
    ...groupBaseOption,
    "name": "新加坡",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "新加坡|SG|🇸🇬",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
  },
  {
    ...groupBaseOption,
    "name": "法国",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "法国|FR|🇫🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/France.png"
  },
  {
    ...groupBaseOption,
    "name": "英国",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "英国|GB|🇬🇧",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png"
  }
];


// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "Proxy"
};
// 规则集配置
const ruleProviders = {
 /* "Apple": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple_Classical.yaml",
    "path": "./ruleset/Apple.yaml"
  },*/
  "Telegram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml",
    "path": "./ruleset/Telegram.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/YouTube.yaml"
  },
  "BiliBili": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.yaml",
    "path": "./ruleset/BiliBili.yaml"
  },
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/TikTok.yaml"
  },
  /*"Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml",
    "path": "./ruleset/Spotify.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml",
    "path": "./ruleset/Netflix.yaml"
  },
  "Disney": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Disney/Disney.yaml",
    "path": "./ruleset/Disney.yaml"
  },*/
  "Google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/Google.yaml"
  },
  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/OpenAI.yaml"
  },
 /* "Microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/Microsoft.yaml"
  },*/
  "Twitter": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Twitter/Twitter.yaml",
    "path": "./ruleset/Twitter.yaml"
  },
  "Steam": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
    "path": "./ruleset/Steam.yaml"
  },
 /* "OneDrive": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OneDrive/OneDrive.yaml",
    "path": "./ruleset/OneDrive.yaml"
  },
  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml",
    "path": "./ruleset/Gemini.yaml"
  },
  "Claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/Claude.yaml"
  },*/
  "Github": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub_No_Resolve.yaml",
    "path": "./ruleset/Github.yaml"
  },
};

// 规则
const rules = [
  // 自定义规则
  'GEOIP,private,DIRECT',
  'GEOIP,CN,DIRECT',
  'DOMAIN-SUFFIX,yunaq.com,DIRECT',
  'DOMAIN-SUFFIX,jiashule.com,DIRECT',
  'DOMAIN-SUFFIX,linux.do,DIRECT',
  'DOMAIN-SUFFIX,deepseek.com,DIRECT',
  'DOMAIN-SUFFIX,volces.com,DIRECT',
  'DOMAIN-SUFFIX,portal101.cn,DIRECT',
  'DOMAIN-SUFFIX,ephone.ai,DIRECT',
  "RULE-SET,Telegram,Telegram",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,BiliBili,BiliBili",
  "RULE-SET,TikTok,TikTok",
  //"RULE-SET,Spotify,Spotify",
 // "RULE-SET,Netflix,Netflix",
 // "RULE-SET,Disney,Disney",
  "RULE-SET,Google,Google",
  "RULE-SET,OpenAI,OpenAI",
 // "RULE-SET,Microsoft,Microsoft",
  "RULE-SET,Twitter,Twitter",
  "RULE-SET,Steam,Steam",
 // "RULE-SET,OneDrive,OneDrive",
 // "RULE-SET,Gemini,Gemini",
 // "RULE-SET,Claude,Claude",
  "RULE-SET,Github,香港",
  "MATCH,Proxy"
];
