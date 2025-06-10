// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  "p1": {
    "type": "http",
    // 订阅 链接
    "url": "https",
    // 自动更新时间 86400(秒) / 3600 = 24小时
    "interval": 86400,
    "override": {
      // 额外节点名称前缀，用于区别机场节点
      "additional-prefix": ""
    }
  }
}

// 程序入口
function main(config) {
  //提取代理节点数量
  const proxyCount = config?.proxies?.length ?? 0;
  //提取代理提供商数量
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = typeof originalProviders === "object" ? Object.keys(originalProviders).length : 0;
  //代理存在性校验
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
    "+.lan",
    "+.local",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com"
  ],
  "use-hosts": false,
  "use-system-hosts": false,
  "nameserver": ["https://1.1.1.1/dns-query", "https://dns.google/dns-query"],
  "default-nameserver": ["tls://223.5.5.5", "tls://119.29.29.29"],
  "proxy-server-nameserver": ["https://doh.pub/dns-query"],
  "direct-nameserver": ["https://doh.pub/dns-query","https://dns.alidns.com/dns-query"]
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
    "proxies": ["香港", "台湾", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
  },
  {
    ...groupBaseOption,
    "name": "Telegram",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
  },
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
  },
  {
    ...groupBaseOption,
    "name": "OpenAI",
    "type": "select",
    "proxies": ["Proxy", "美国", "台湾", "日本", "韩国", "香港", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
  },
  {
    ...groupBaseOption,
    "name": "TikTok",
    "type": "select",
    "proxies": ["Proxy", "台湾", "香港", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png"
  },
  {
    ...groupBaseOption,
    "name": "Google",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google.png"
  },
  {
    ...groupBaseOption,
    "name": "Twitter",
    "type": "select",
    "proxies": ["Proxy", "香港", "台湾", "日本", "韩国", "美国", "新加坡", "DIRECT"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png"
  },
  {
    ...groupBaseOption,
    "name": "Steam",
    "type": "select",
    "proxies": ["Proxy", "香港", "DIRECT", "台湾", "日本", "韩国", "美国", "新加坡"],
    "include-all": true,
    "exclude-filter": "(?i)频道|订阅|ISP|流量|到期|重置|扣费",
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
    "name": "新加坡",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": "(?i)X5",
    "filter": "新加坡|SG|🇸🇬",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
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
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/TikTok.yaml"
  },
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
  "Github": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub_No_Resolve.yaml",
    "path": "./ruleset/Github.yaml"
  }
};

// 自定义规则
const rules = [
  "GEOIP,private,DIRECT,no-resolve",
  "RULE-SET,Telegram,Telegram",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,TikTok,TikTok",
  "RULE-SET,Google,Google",
  "RULE-SET,OpenAI,OpenAI",
  "RULE-SET,Twitter,Twitter",
  "RULE-SET,Steam,Steam",
  "RULE-SET,Github,香港",
  "GEOIP,CN,DIRECT",
  "MATCH,Proxy"
];
