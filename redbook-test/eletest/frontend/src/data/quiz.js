// =============================================================
//  社交电量测试 · 数据层
//  零 emoji；仅供娱乐和轻量自我观察，不作诊断。
// =============================================================

export const DIM_LABELS = {
  "socialDrive": "社交驱动",
  "recoveryNeed": "回血需求",
  "stimulusSensitivity": "刺激敏感",
  "boundary": "边界管理",
  "deepConnection": "深连接"
}

export const questions = [
  {
    "id": 1,
    "spec": "聚会邀请",
    "prompt": "朋友临时约你出门，你会？",
    "options": [
      {
        "text": "有空就去，见人会充电",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "电量上扬，外放模式启动"
      },
      {
        "text": "看体力和关系亲近度",
        "score": 1,
        "dims": {
          "boundary": 2
        },
        "read": "智能省电判断中"
      },
      {
        "text": "更想待在家恢复",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "充电底座优先"
      },
      {
        "text": "想去但怕现场太累",
        "score": 1,
        "dims": {
          "stimulusSensitivity": 2,
          "deepConnection": 1
        },
        "read": "预计耗电偏高"
      }
    ]
  },
  {
    "id": 2,
    "spec": "多人聊天",
    "prompt": "一群人聊天时你通常？",
    "options": [
      {
        "text": "自然接话，气氛越热越来劲",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "群聊功率稳定输出"
      },
      {
        "text": "熟了会说很多，不熟先观察",
        "score": 2,
        "dims": {
          "boundary": 2,
          "deepConnection": 1
        },
        "read": "选择性供电"
      },
      {
        "text": "容易被声音和信息量耗空",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3,
          "recoveryNeed": 1
        },
        "read": "屏幕亮度自动降低"
      },
      {
        "text": "更喜欢和一两个人深聊",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "深连接端口开启"
      }
    ]
  },
  {
    "id": 3,
    "spec": "独处一天",
    "prompt": "连续独处一天后？",
    "options": [
      {
        "text": "会想找人说话",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "需要外接信号"
      },
      {
        "text": "挺舒服，也不排斥见人",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "巡航稳定"
      },
      {
        "text": "明显回血",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "电池恢复中"
      },
      {
        "text": "只有高质量聊天才想出门",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "深聊快充优先"
      }
    ]
  },
  {
    "id": 4,
    "spec": "社交通知",
    "prompt": "消息同时弹很多条时？",
    "options": [
      {
        "text": "马上回，顺手处理",
        "score": 3,
        "dims": {
          "socialDrive": 2
        },
        "read": "通知处理流畅"
      },
      {
        "text": "挑重要的先回",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "电量调度正常"
      },
      {
        "text": "会有点烦，想晚点统一回",
        "score": 1,
        "dims": {
          "recoveryNeed": 2,
          "stimulusSensitivity": 1
        },
        "read": "进入勿扰缓冲"
      },
      {
        "text": "脑子被打断，直接静音",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3
        },
        "read": "通知过载保护"
      }
    ]
  },
  {
    "id": 5,
    "spec": "认识新人",
    "prompt": "见陌生人时你更像？",
    "options": [
      {
        "text": "主动破冰，不太尴尬",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "新连接扫描积极"
      },
      {
        "text": "礼貌交流，慢慢判断",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "握手协议正常"
      },
      {
        "text": "先保持距离，熟了再说",
        "score": 1,
        "dims": {
          "recoveryNeed": 1,
          "boundary": 2
        },
        "read": "低功耗接入"
      },
      {
        "text": "怕浅聊消耗，更想跳过寒暄",
        "score": 1,
        "dims": {
          "deepConnection": 2,
          "stimulusSensitivity": 1
        },
        "read": "浅层协议耗电"
      }
    ]
  },
  {
    "id": 6,
    "spec": "朋友倾诉",
    "prompt": "朋友深夜找你倾诉？",
    "options": [
      {
        "text": "愿意陪，聊完也不太累",
        "score": 3,
        "dims": {
          "deepConnection": 2,
          "socialDrive": 1
        },
        "read": "情感端口稳定"
      },
      {
        "text": "会陪，但要看自己状态",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "边界电闸正常"
      },
      {
        "text": "很在乎对方，但听久了会透支",
        "score": 1,
        "dims": {
          "stimulusSensitivity": 2,
          "deepConnection": 1
        },
        "read": "共情耗电明显"
      },
      {
        "text": "可能先说明天再认真聊",
        "score": 0,
        "dims": {
          "recoveryNeed": 2,
          "boundary": 1
        },
        "read": "夜间省电保护"
      }
    ]
  },
  {
    "id": 7,
    "spec": "活动结束",
    "prompt": "热闹活动结束后你会？",
    "options": [
      {
        "text": "还想续摊",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "电量仍高"
      },
      {
        "text": "满足，回家刚好",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "巡航结束"
      },
      {
        "text": "只想安静，不想再说话",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "省电模式开启"
      },
      {
        "text": "脑子很满，需要很久消化",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3
        },
        "read": "感官缓存过载"
      }
    ]
  },
  {
    "id": 8,
    "spec": "线上互动",
    "prompt": "朋友圈互动对你来说？",
    "options": [
      {
        "text": "很自然，顺手就回",
        "score": 3,
        "dims": {
          "socialDrive": 2
        },
        "read": "轻量输出"
      },
      {
        "text": "关系近的会认真回",
        "score": 2,
        "dims": {
          "deepConnection": 2,
          "boundary": 1
        },
        "read": "定向供电"
      },
      {
        "text": "经常不知道回什么",
        "score": 1,
        "dims": {
          "stimulusSensitivity": 1,
          "recoveryNeed": 1
        },
        "read": "输入法待机"
      },
      {
        "text": "不太想被所有人看见",
        "score": 0,
        "dims": {
          "boundary": 3
        },
        "read": "隐私护盾升起"
      }
    ]
  },
  {
    "id": 9,
    "spec": "工作学习后",
    "prompt": "忙完一天还要社交？",
    "options": [
      {
        "text": "可以，换个频道反而放松",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "外接充电成功"
      },
      {
        "text": "轻松局可以，复杂局不行",
        "score": 2,
        "dims": {
          "boundary": 2,
          "stimulusSensitivity": 1
        },
        "read": "按场景供电"
      },
      {
        "text": "很难，脑子没电了",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "主电池见底"
      },
      {
        "text": "只想见最熟的人",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "亲密快充限定"
      }
    ]
  },
  {
    "id": 10,
    "spec": "被临时打扰",
    "prompt": "独处时被打断？",
    "options": [
      {
        "text": "没关系，可以切换",
        "score": 2,
        "dims": {
          "socialDrive": 1,
          "boundary": 1
        },
        "read": "切换损耗低"
      },
      {
        "text": "看事情重不重要",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "权限判断中"
      },
      {
        "text": "会烦，恢复节奏很难",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3
        },
        "read": "恢复成本过高"
      },
      {
        "text": "熟人可以，泛社交不行",
        "score": 1,
        "dims": {
          "deepConnection": 2,
          "boundary": 1
        },
        "read": "白名单供电"
      }
    ]
  },
  {
    "id": 11,
    "spec": "朋友数量",
    "prompt": "你理想的朋友状态？",
    "options": [
      {
        "text": "朋友多一点很热闹",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "多端口在线"
      },
      {
        "text": "不用很多，但保持联系",
        "score": 2,
        "dims": {
          "boundary": 2,
          "deepConnection": 1
        },
        "read": "稳定巡航"
      },
      {
        "text": "少数几个就够",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "深连接优先"
      },
      {
        "text": "希望大家懂我会消失一阵",
        "score": 0,
        "dims": {
          "recoveryNeed": 3,
          "boundary": 1
        },
        "read": "低电量说明牌"
      }
    ]
  },
  {
    "id": 12,
    "spec": "聊天深度",
    "prompt": "你更喜欢哪种聊天？",
    "options": [
      {
        "text": "轻松闲聊也开心",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "浅层电路顺畅"
      },
      {
        "text": "有来有回就好",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "交流电稳定"
      },
      {
        "text": "有意义的深聊才回血",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "深充通道开启"
      },
      {
        "text": "聊太久会想关机",
        "score": 0,
        "dims": {
          "recoveryNeed": 2,
          "stimulusSensitivity": 1
        },
        "read": "通话时长告警"
      }
    ]
  },
  {
    "id": 13,
    "spec": "被关注",
    "prompt": "成为人群焦点时？",
    "options": [
      {
        "text": "挺享受，越热越稳",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "舞台模式点亮"
      },
      {
        "text": "短时间可以",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "亮度中档"
      },
      {
        "text": "会紧张，想快点结束",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3
        },
        "read": "聚光灯耗电"
      },
      {
        "text": "除非是熟悉的小圈子",
        "score": 1,
        "dims": {
          "deepConnection": 2,
          "boundary": 1
        },
        "read": "限定场域供电"
      }
    ]
  },
  {
    "id": 14,
    "spec": "拒绝邀约",
    "prompt": "不想赴约时你会？",
    "options": [
      {
        "text": "直接说明，关系不会因此坏掉",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "拒绝按钮清晰"
      },
      {
        "text": "找个温和理由",
        "score": 1,
        "dims": {
          "boundary": 1
        },
        "read": "低冲突退出"
      },
      {
        "text": "不好意思拒绝，去了又累",
        "score": 0,
        "dims": {
          "socialDrive": 1,
          "recoveryNeed": 2
        },
        "read": "电量被动消耗"
      },
      {
        "text": "拖到最后才回复",
        "score": 0,
        "dims": {
          "recoveryNeed": 2,
          "stimulusSensitivity": 1
        },
        "read": "响应延迟"
      }
    ]
  },
  {
    "id": 15,
    "spec": "旅行搭子",
    "prompt": "和人一起旅行你看重？",
    "options": [
      {
        "text": "热闹好玩，行程满点",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "高功率行程"
      },
      {
        "text": "节奏合适，能商量",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "双向调度"
      },
      {
        "text": "必须留独处和休息时间",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "充电站必备"
      },
      {
        "text": "能不能安静相处不尴尬",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "静默连接质量"
      }
    ]
  },
  {
    "id": 16,
    "spec": "群消息",
    "prompt": "群聊 99+ 时你会？",
    "options": [
      {
        "text": "爬楼也有乐趣",
        "score": 3,
        "dims": {
          "socialDrive": 2
        },
        "read": "群聊续航强"
      },
      {
        "text": "扫重点，不全看",
        "score": 2,
        "dims": {
          "boundary": 2
        },
        "read": "摘要模式"
      },
      {
        "text": "直接清掉红点",
        "score": 0,
        "dims": {
          "recoveryNeed": 2
        },
        "read": "省电清理"
      },
      {
        "text": "信息太碎会很累",
        "score": 0,
        "dims": {
          "stimulusSensitivity": 3
        },
        "read": "碎片噪声过高"
      }
    ]
  },
  {
    "id": 17,
    "spec": "建立亲密",
    "prompt": "你和人变熟的方式？",
    "options": [
      {
        "text": "多见面多互动，自然升温",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "高频连接"
      },
      {
        "text": "慢慢积累信任",
        "score": 2,
        "dims": {
          "boundary": 2,
          "deepConnection": 1
        },
        "read": "稳定充电"
      },
      {
        "text": "聊到真正重要的事才会靠近",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "深层握手"
      },
      {
        "text": "需要很长观察期",
        "score": 0,
        "dims": {
          "boundary": 2,
          "recoveryNeed": 1
        },
        "read": "低速接入"
      }
    ]
  },
  {
    "id": 18,
    "spec": "电量见底",
    "prompt": "社交电量低时你会？",
    "options": [
      {
        "text": "说一声需要休息",
        "score": 1,
        "dims": {
          "boundary": 3
        },
        "read": "低电量提示清楚"
      },
      {
        "text": "努力撑完场面",
        "score": 0,
        "dims": {
          "socialDrive": 1,
          "recoveryNeed": 2
        },
        "read": "强制输出"
      },
      {
        "text": "突然变安静",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "自动省电"
      },
      {
        "text": "只想找一个安全的人待着",
        "score": 1,
        "dims": {
          "deepConnection": 2,
          "recoveryNeed": 1
        },
        "read": "单人快充"
      }
    ]
  },
  {
    "id": 19,
    "spec": "理想周末",
    "prompt": "最理想的周末是？",
    "options": [
      {
        "text": "朋友局、展览、饭局排起来",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "满格外放"
      },
      {
        "text": "一天见人，一天休息",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "均衡巡航"
      },
      {
        "text": "窝着恢复，不被打扰",
        "score": 0,
        "dims": {
          "recoveryNeed": 3
        },
        "read": "底座快充"
      },
      {
        "text": "和熟人安静待着",
        "score": 1,
        "dims": {
          "deepConnection": 3
        },
        "read": "低噪深充"
      }
    ]
  },
  {
    "id": 20,
    "spec": "一句总结",
    "prompt": "你的社交电池更像？",
    "options": [
      {
        "text": "越用越有电",
        "score": 3,
        "dims": {
          "socialDrive": 3
        },
        "read": "外放续航型"
      },
      {
        "text": "会管理电量，不轻易透支",
        "score": 2,
        "dims": {
          "boundary": 3
        },
        "read": "稳定巡航型"
      },
      {
        "text": "电不多，但给重要的人留着",
        "score": 1,
        "dims": {
          "deepConnection": 3,
          "recoveryNeed": 1
        },
        "read": "选择性供电型"
      },
      {
        "text": "需要大量独处才能满格",
        "score": 0,
        "dims": {
          "recoveryNeed": 3,
          "stimulusSensitivity": 1
        },
        "read": "低电量省电型"
      }
    ]
  }
]

export const RESULT_BANDS = [
  {
    "max": 25,
    "code": "SAVE-22",
    "name": "低电量省电型",
    "aka": "不是冷漠，是电池容量要省着用",
    "accent": "#7DAEC9",
    "tags": [
      "独处回血",
      "低刺激偏好",
      "慢热"
    ],
    "verdict": "你的社交电量珍贵，最怕被碎片消息和高密度场面连续抽走。"
  },
  {
    "max": 45,
    "code": "SEL-39",
    "name": "选择性供电型",
    "aka": "电不乱给，但重要的人有专线",
    "accent": "#5F8E6A",
    "tags": [
      "深聊回血",
      "熟人优先",
      "边界清楚"
    ],
    "verdict": "你不是不爱社交，只是不想把电浪费在没有真实连接的场合。"
  },
  {
    "max": 70,
    "code": "CRU-64",
    "name": "稳定巡航型",
    "aka": "会见人，也会给自己留充电口",
    "accent": "#A4C95A",
    "tags": [
      "节奏稳定",
      "能进能退",
      "会管理"
    ],
    "verdict": "你的社交电量管理得不错，知道什么时候外放，也知道什么时候回到底座。"
  },
  {
    "max": 100,
    "code": "OUT-88",
    "name": "高续航外放型",
    "aka": "人群不是耗电，是你的移动充电宝",
    "accent": "#E7A968",
    "tags": [
      "主动破冰",
      "热场续航",
      "越聊越亮"
    ],
    "verdict": "你从互动里获得能量，热闹场合常常会把你点亮，而不是把你耗空。"
  }
]
export const RADAR_DIMS = [
  "socialDrive",
  "recoveryNeed",
  "stimulusSensitivity",
  "boundary",
  "deepConnection"
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
  const positive = raw.socialDrive * 0.7 + raw.boundary * 0.45 + raw.deepConnection * 0.35
  const drain = raw.recoveryNeed * 0.45 + raw.stimulusSensitivity * 0.35
  const index = Math.round(Math.max(0, Math.min(100, 28 + positive * 3.2 - drain * 1.25)))
  const max = Math.max(1, ...Object.values(raw))
  const dims = Object.fromEntries(RADAR_DIMS.map((key) => [key, norm(raw[key], max)]))
  const topKey = Object.entries(raw).sort((a, b) => b[1] - a[1])[0]?.[0] || RADAR_DIMS[0]
  const topLabel = DIM_LABELS[topKey] || topKey
  const band = {
    ...pickBand(index),
    deep: {
      summary: `你的社交电池最明显的参数是「${topLabel}」。这决定了你更适合怎样见人、聊天和恢复。`,
      forecast: '当社交场景和你的电量模式匹配时，你会很舒服；不匹配时，再喜欢的人也可能让你耗电。',
      warnings: ['不要把低电量伪装成冷漠，直接说明比突然消失更友好。', '高续航也需要充电，别把热场能力当成无限电源。', '深连接偏好的人，不必强迫自己适应所有热闹。'],
      advice: ['给邀约分级：快充、正常耗电、高耗电。', '提前告诉朋友你的回血方式，关系会更省电。', '把重要社交安排在电量高的时段。']
    },
  }
  return { index, dims, raw, band, topKey }
}

