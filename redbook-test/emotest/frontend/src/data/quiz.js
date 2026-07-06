// =============================================================
//  情绪内耗指数 · 数据层
//  零 emoji；仅供娱乐和轻量自我观察，不作诊断。
// =============================================================

export const DIM_LABELS = {
  "rumination": "反复咀嚼",
  "selfBlame": "自我责备",
  "anticipation": "预演焦虑",
  "suppression": "情绪压抑",
  "recovery": "恢复能力"
}

export const questions = [
  {
    "id": 1,
    "spec": "睡前复盘",
    "prompt": "睡前最容易发生什么？",
    "options": [
      {
        "text": "困了就睡，明天再说",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "后台干净，准备休眠"
      },
      {
        "text": "偶尔想几件事，但能停下",
        "score": 1,
        "dims": {
          "recovery": 1
        },
        "read": "轻量任务仍在运行"
      },
      {
        "text": "反复复盘白天说错的话",
        "score": 2,
        "dims": {
          "rumination": 3
        },
        "read": "复盘进程占用上升"
      },
      {
        "text": "把未来坏情况都预演一遍",
        "score": 3,
        "dims": {
          "anticipation": 3,
          "rumination": 1
        },
        "read": "预演任务阻止休眠"
      }
    ]
  },
  {
    "id": 2,
    "spec": "别人语气",
    "prompt": "别人语气稍冷，你会？",
    "options": [
      {
        "text": "先不急着下结论",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "解释缓存稳定"
      },
      {
        "text": "有点在意，但会观察后续",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "后台轻微唤醒"
      },
      {
        "text": "马上想是不是自己惹人烦",
        "score": 2,
        "dims": {
          "selfBlame": 3
        },
        "read": "自责进程启动"
      },
      {
        "text": "开始回看所有聊天细节",
        "score": 3,
        "dims": {
          "rumination": 3,
          "selfBlame": 1
        },
        "read": "日志检索过载"
      }
    ]
  },
  {
    "id": 3,
    "spec": "任务拖延",
    "prompt": "明明有事要做却动不了时，你觉得？",
    "options": [
      {
        "text": "先拆小步，做一点算一点",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "降载策略生效"
      },
      {
        "text": "会焦虑，但还能开始",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "启动稍慢"
      },
      {
        "text": "骂自己怎么这么差劲",
        "score": 2,
        "dims": {
          "selfBlame": 3
        },
        "read": "自责占用 CPU"
      },
      {
        "text": "越想做好越不敢开始",
        "score": 3,
        "dims": {
          "anticipation": 3,
          "suppression": 1
        },
        "read": "启动器卡死"
      }
    ]
  },
  {
    "id": 4,
    "spec": "情绪表达",
    "prompt": "不开心时你通常？",
    "options": [
      {
        "text": "说出来或写下来",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "缓存及时清理"
      },
      {
        "text": "先缓一缓再说",
        "score": 1,
        "dims": {
          "recovery": 1
        },
        "read": "延迟写入"
      },
      {
        "text": "装没事，怕麻烦别人",
        "score": 2,
        "dims": {
          "suppression": 3
        },
        "read": "压缩包持续增大"
      },
      {
        "text": "憋着憋着突然崩溃",
        "score": 3,
        "dims": {
          "suppression": 3,
          "rumination": 1
        },
        "read": "后台堆栈溢出"
      }
    ]
  },
  {
    "id": 5,
    "spec": "做决定",
    "prompt": "需要做选择时，你会？",
    "options": [
      {
        "text": "按重要标准选，然后接受代价",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "决策线程清晰"
      },
      {
        "text": "会纠结一会儿",
        "score": 1,
        "dims": {
          "rumination": 1
        },
        "read": "比较任务运行中"
      },
      {
        "text": "不停想另一个选择会不会更好",
        "score": 2,
        "dims": {
          "rumination": 3
        },
        "read": "分支模拟循环"
      },
      {
        "text": "还没选就开始怕选错",
        "score": 3,
        "dims": {
          "anticipation": 3
        },
        "read": "错误预警提前弹窗"
      }
    ]
  },
  {
    "id": 6,
    "spec": "别人评价",
    "prompt": "听到一句负面评价后？",
    "options": [
      {
        "text": "有用就改，没用就放下",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "过滤器正常"
      },
      {
        "text": "会记一阵子",
        "score": 1,
        "dims": {
          "rumination": 1
        },
        "read": "短期缓存"
      },
      {
        "text": "反复想自己是不是很糟",
        "score": 2,
        "dims": {
          "selfBlame": 3
        },
        "read": "自我否定进程升温"
      },
      {
        "text": "表面没事，心里存很久",
        "score": 3,
        "dims": {
          "suppression": 2,
          "rumination": 2
        },
        "read": "冷存储占满"
      }
    ]
  },
  {
    "id": 7,
    "spec": "休息内疚",
    "prompt": "休息时你会内疚吗？",
    "options": [
      {
        "text": "不会，休息也是正事",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "电源管理健康"
      },
      {
        "text": "偶尔觉得该更努力",
        "score": 1,
        "dims": {
          "selfBlame": 1
        },
        "read": "轻微弹窗"
      },
      {
        "text": "一停下来就觉得自己落后",
        "score": 2,
        "dims": {
          "selfBlame": 2,
          "anticipation": 1
        },
        "read": "内疚提醒常驻"
      },
      {
        "text": "休息也休不好，脑子还在跑",
        "score": 3,
        "dims": {
          "rumination": 2,
          "anticipation": 2
        },
        "read": "休眠失败"
      }
    ]
  },
  {
    "id": 8,
    "spec": "关系冲突",
    "prompt": "和人闹不愉快后，你会？",
    "options": [
      {
        "text": "找机会沟通或让它过去",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "连接恢复"
      },
      {
        "text": "心里会有点卡",
        "score": 1,
        "dims": {
          "rumination": 1
        },
        "read": "端口半开"
      },
      {
        "text": "脑内重演很多遍",
        "score": 2,
        "dims": {
          "rumination": 3
        },
        "read": "回放进程循环"
      },
      {
        "text": "把责任都揽到自己身上",
        "score": 3,
        "dims": {
          "selfBlame": 3
        },
        "read": "责任分配异常"
      }
    ]
  },
  {
    "id": 9,
    "spec": "未来担心",
    "prompt": "面对还没发生的事？",
    "options": [
      {
        "text": "准备能准备的，其余交给现场",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "预案数量合理"
      },
      {
        "text": "会提前想几种情况",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "预演轻量运行"
      },
      {
        "text": "总担心最坏结果",
        "score": 2,
        "dims": {
          "anticipation": 3
        },
        "read": "灾难模拟开启"
      },
      {
        "text": "越想越累，最后什么都不想碰",
        "score": 3,
        "dims": {
          "anticipation": 3,
          "suppression": 1
        },
        "read": "预演导致宕机"
      }
    ]
  },
  {
    "id": 10,
    "spec": "求助",
    "prompt": "撑不住时你会求助吗？",
    "options": [
      {
        "text": "会，找合适的人说",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "外部支持接入"
      },
      {
        "text": "看情况，不想太打扰",
        "score": 1,
        "dims": {
          "suppression": 1
        },
        "read": "请求延迟"
      },
      {
        "text": "一般自己扛",
        "score": 2,
        "dims": {
          "suppression": 3
        },
        "read": "单机模式运行"
      },
      {
        "text": "很想求助，但又觉得自己不配麻烦别人",
        "score": 3,
        "dims": {
          "suppression": 2,
          "selfBlame": 2
        },
        "read": "权限被自责拦截"
      }
    ]
  },
  {
    "id": 11,
    "spec": "完美要求",
    "prompt": "做事没达到预期时？",
    "options": [
      {
        "text": "复盘问题，不上升到否定自己",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "错误日志可读"
      },
      {
        "text": "会失落，但能调整",
        "score": 1,
        "dims": {
          "recovery": 1
        },
        "read": "轻微降频"
      },
      {
        "text": "觉得自己怎么总是不够好",
        "score": 2,
        "dims": {
          "selfBlame": 3
        },
        "read": "自责循环"
      },
      {
        "text": "干脆不想再碰类似事情",
        "score": 3,
        "dims": {
          "suppression": 2,
          "selfBlame": 2
        },
        "read": "应用被强制退出"
      }
    ]
  },
  {
    "id": 12,
    "spec": "聊天已读",
    "prompt": "消息已读未回时？",
    "options": [
      {
        "text": "可能对方忙，不急",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "网络延迟正常"
      },
      {
        "text": "有点在意",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "等待线程开启"
      },
      {
        "text": "开始猜对方是不是不满",
        "score": 2,
        "dims": {
          "anticipation": 2,
          "selfBlame": 1
        },
        "read": "误读检测过敏"
      },
      {
        "text": "翻聊天记录找证据",
        "score": 3,
        "dims": {
          "rumination": 3
        },
        "read": "日志检索满载"
      }
    ]
  },
  {
    "id": 13,
    "spec": "忙碌状态",
    "prompt": "事情很多时，你的脑内像？",
    "options": [
      {
        "text": "排优先级，一件件来",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "任务队列有序"
      },
      {
        "text": "有点乱，但能推进",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "队列轻微拥堵"
      },
      {
        "text": "同时想着所有事，哪件都做不好",
        "score": 3,
        "dims": {
          "rumination": 2,
          "anticipation": 2
        },
        "read": "并发过高"
      },
      {
        "text": "假装没事，其实心里很慌",
        "score": 3,
        "dims": {
          "suppression": 2,
          "anticipation": 2
        },
        "read": "前台静默，后台过热"
      }
    ]
  },
  {
    "id": 14,
    "spec": "被夸奖",
    "prompt": "别人夸你时，你会？",
    "options": [
      {
        "text": "收下，谢谢对方",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "正向输入接收"
      },
      {
        "text": "开心但有点不好意思",
        "score": 1,
        "dims": {
          "suppression": 1
        },
        "read": "接收略延迟"
      },
      {
        "text": "觉得对方只是客气",
        "score": 2,
        "dims": {
          "selfBlame": 2
        },
        "read": "正向信号被过滤"
      },
      {
        "text": "立刻想到自己哪里还不够好",
        "score": 3,
        "dims": {
          "selfBlame": 3,
          "rumination": 1
        },
        "read": "夸奖被转成压力"
      }
    ]
  },
  {
    "id": 15,
    "spec": "情绪命名",
    "prompt": "你能说清自己怎么了吗？",
    "options": [
      {
        "text": "大多能分辨是什么情绪",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "情绪标签清晰"
      },
      {
        "text": "需要一点时间",
        "score": 1,
        "dims": {
          "recovery": 1
        },
        "read": "识别稍慢"
      },
      {
        "text": "常常只觉得烦或累",
        "score": 2,
        "dims": {
          "suppression": 2
        },
        "read": "标签库缺失"
      },
      {
        "text": "说不清，只能一直忍",
        "score": 3,
        "dims": {
          "suppression": 3
        },
        "read": "情绪文件未命名"
      }
    ]
  },
  {
    "id": 16,
    "spec": "社交后",
    "prompt": "和人见完面后你会？",
    "options": [
      {
        "text": "该开心开心，该休息休息",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "回收顺畅"
      },
      {
        "text": "偶尔想自己表现如何",
        "score": 1,
        "dims": {
          "rumination": 1
        },
        "read": "短时复盘"
      },
      {
        "text": "反复想自己有没有说错话",
        "score": 2,
        "dims": {
          "rumination": 3
        },
        "read": "社交日志回放"
      },
      {
        "text": "表面正常，回家突然很累",
        "score": 2,
        "dims": {
          "suppression": 2,
          "rumination": 1
        },
        "read": "延迟疲劳释放"
      }
    ]
  },
  {
    "id": 17,
    "spec": "坏消息",
    "prompt": "收到坏消息第一反应？",
    "options": [
      {
        "text": "先确认事实和下一步",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "故障定位开始"
      },
      {
        "text": "心里一沉，但还能处理",
        "score": 1,
        "dims": {
          "anticipation": 1
        },
        "read": "短暂降频"
      },
      {
        "text": "立刻想完所有连锁后果",
        "score": 3,
        "dims": {
          "anticipation": 3
        },
        "read": "故障树爆炸"
      },
      {
        "text": "装镇定，身体却很紧",
        "score": 2,
        "dims": {
          "suppression": 3
        },
        "read": "前台伪装正常"
      }
    ]
  },
  {
    "id": 18,
    "spec": "自我要求",
    "prompt": "你对自己的默认要求是？",
    "options": [
      {
        "text": "尽力就好，允许波动",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "阈值合理"
      },
      {
        "text": "希望稳定做好",
        "score": 1,
        "dims": {
          "selfBlame": 1
        },
        "read": "标准略高"
      },
      {
        "text": "不能出错，不然就很难受",
        "score": 3,
        "dims": {
          "selfBlame": 2,
          "anticipation": 2
        },
        "read": "容错率过低"
      },
      {
        "text": "总觉得还不够，停不下来",
        "score": 3,
        "dims": {
          "rumination": 2,
          "selfBlame": 2
        },
        "read": "升级提示常驻"
      }
    ]
  },
  {
    "id": 19,
    "spec": "消化情绪",
    "prompt": "你通常怎么让情绪过去？",
    "options": [
      {
        "text": "运动、写下、找人聊，能流动",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "排水系统通畅"
      },
      {
        "text": "睡一觉大多会好",
        "score": 0,
        "dims": {
          "recovery": 2
        },
        "read": "夜间维护可用"
      },
      {
        "text": "靠刷手机压过去",
        "score": 2,
        "dims": {
          "suppression": 2
        },
        "read": "临时静音"
      },
      {
        "text": "不处理，堆到某天爆发",
        "score": 3,
        "dims": {
          "suppression": 3,
          "rumination": 1
        },
        "read": "未处理队列积压"
      }
    ]
  },
  {
    "id": 20,
    "spec": "一句总结",
    "prompt": "最近的你更像？",
    "options": [
      {
        "text": "系统有波动，但能自我维护",
        "score": 0,
        "dims": {
          "recovery": 3
        },
        "read": "维护进程在线"
      },
      {
        "text": "有点忙，但还能转得动",
        "score": 1,
        "dims": {
          "rumination": 1,
          "anticipation": 1
        },
        "read": "后台占用偏高"
      },
      {
        "text": "很多小事都会在脑内循环",
        "score": 2,
        "dims": {
          "rumination": 3
        },
        "read": "循环任务常驻"
      },
      {
        "text": "看起来没事，其实一直在耗",
        "score": 3,
        "dims": {
          "suppression": 2,
          "selfBlame": 2,
          "anticipation": 1
        },
        "read": "静默高负载"
      }
    ]
  }
]

export const RESULT_BANDS = [
  {
    "max": 24,
    "code": "LOW-18",
    "name": "低噪运行",
    "aka": "后台干净，偶尔弹窗",
    "accent": "#92A47C",
    "tags": [
      "恢复快",
      "低占用",
      "能放下"
    ],
    "verdict": "你的情绪系统大多能自己完成清理，不太会让小事长期占住内存。"
  },
  {
    "max": 49,
    "code": "MID-42",
    "name": "轻度后台占用",
    "aka": "能正常运转，但有些进程没关",
    "accent": "#DDB95B",
    "tags": [
      "偶尔复盘",
      "标准偏高",
      "还能降载"
    ],
    "verdict": "你不是一直在内耗，只是某些场景会偷偷打开几个常驻进程。"
  },
  {
    "max": 74,
    "code": "HOT-68",
    "name": "高负载循环",
    "aka": "表面在生活，脑内在跑批处理",
    "accent": "#D99058",
    "tags": [
      "反复咀嚼",
      "预演过多",
      "容易自责"
    ],
    "verdict": "很多消耗不是来自事情本身，而是你一直在脑内追加解释、预案和责任。"
  },
  {
    "max": 100,
    "code": "OVR-91",
    "name": "过热待机",
    "aka": "看起来没事，其实一直在耗",
    "accent": "#C66B5F",
    "tags": [
      "静默高负载",
      "压着不说",
      "恢复变慢"
    ],
    "verdict": "你很会撑住场面，但后台已经开了太多任务，休息也不一定真的休到。"
  }
]
export const RADAR_DIMS = [
  "rumination",
  "selfBlame",
  "anticipation",
  "suppression",
  "recovery"
]

function emptyDims() {
  return Object.fromEntries(RADAR_DIMS.map((k) => [k, 0]))
}

function pickBand(index) {
  return RESULT_BANDS.find((band) => index <= band.max) || RESULT_BANDS[RESULT_BANDS.length - 1]
}

function norm(value, max) {
  return Math.round(Math.max(0, Math.min(100, (value / max) * 100)))
}

export function computeReport(answers) {
  const raw = emptyDims()
  for (const ans of answers) {
    for (const [key, value] of Object.entries(ans?.dims || {})) {
      if (key in raw) raw[key] += value
    }
  }
  const load = raw.rumination * 0.27 + raw.selfBlame * 0.24 + raw.anticipation * 0.24 + raw.suppression * 0.2
  const relief = raw.recovery * 0.18
  const index = Math.round(Math.max(0, Math.min(100, 18 + load * 3.25 - relief * 2.2)))
  const max = Math.max(1, ...Object.values(raw))
  const dims = Object.fromEntries(RADAR_DIMS.map((key) => [key, norm(raw[key], max)]))
  const topKey = Object.entries(raw).sort((a, b) => b[1] - a[1])[0]?.[0] || RADAR_DIMS[0]
  const topLabel = DIM_LABELS[topKey] || topKey
  const band = {
    ...pickBand(index),
    deep: {
      summary: `你的主要后台进程是「${topLabel}」。它不一定最吵，但最容易在你没注意时占住资源。`,
      forecast: '当任务、关系和自我要求同时堆上来时，后台占用会明显升高。先降载，再处理问题，会比硬撑更有效。',
      warnings: ['不要把休息误判成偷懒，系统需要维护窗口。', '如果反复复盘已经影响睡眠，先停止追求“想明白”。', '持续强烈痛苦时，建议向可信任的人或专业人士求助。'],
      advice: ['把脑内循环写成三列：事实、猜测、下一步。', '每天留一个不解决问题的空档，只做恢复。', '先完成一个 5 分钟动作，不要等状态完美。']
    },
  }
  return { index, dims, raw, band, topKey }
}

