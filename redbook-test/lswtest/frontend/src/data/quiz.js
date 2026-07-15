// =============================================================
//  关系靠近方式测试 · 数据层
//  零 emoji；仅供娱乐和轻量自我观察，不作诊断。
// =============================================================

export const DIM_LABELS = {
  "secure": "稳定表达",
  "anxious": "信号敏感",
  "avoidant": "空间需要",
  "mixed": "靠近切换"
}

export const questions = [
  {
    "id": 1,
    "spec": "消息慢回",
    "prompt": "对方半天没回你，你通常会？",
    "options": [
      {
        "text": "先忙自己的事，晚点自然会说",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "气压平稳，云层很薄"
      },
      {
        "text": "心里有点晃，但能把注意力拉回来",
        "score": 1,
        "dims": {
          "secure": 1,
          "anxious": 1
        },
        "read": "轻微起风，仍可见天光"
      },
      {
        "text": "反复打开聊天框，想是不是自己说错了",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "雷达开始连续扫频"
      },
      {
        "text": "干脆冷下来，告诉自己别太需要谁",
        "score": 2,
        "dims": {
          "avoidant": 3,
          "mixed": 1
        },
        "read": "海面降温，风向外撤"
      }
    ]
  },
  {
    "id": 2,
    "spec": "主动靠近",
    "prompt": "很想见对方时，你会？",
    "options": [
      {
        "text": "直接表达，约不上也不内耗",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "晴稳表达，边界完整"
      },
      {
        "text": "试探着问，怕显得太黏",
        "score": 1,
        "dims": {
          "anxious": 2
        },
        "read": "云层变厚，气压略降"
      },
      {
        "text": "等对方先开口，自己不想暴露需求",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "风向转离岸"
      },
      {
        "text": "一边想靠近，一边又想撤退",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "冷暖气流交汇"
      }
    ]
  },
  {
    "id": 3,
    "spec": "争执复位",
    "prompt": "你们有分歧时，你更像？",
    "options": [
      {
        "text": "把事说清楚，不把人否定掉",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "复位机制稳定"
      },
      {
        "text": "急着确认对方还在不在乎你",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "雷暴云正在聚集"
      },
      {
        "text": "先消失一会儿，等情绪退潮再说",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "临时离岸避风"
      },
      {
        "text": "先爆发，再后悔，再不知道怎么靠近",
        "score": 3,
        "dims": {
          "mixed": 3,
          "anxious": 1
        },
        "read": "天气快速切换"
      }
    ]
  },
  {
    "id": 4,
    "spec": "被需要",
    "prompt": "对方依赖你时，你会？",
    "options": [
      {
        "text": "愿意回应，也知道自己有边界",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "降雨适中，土壤能吸收"
      },
      {
        "text": "很容易把对方需求放在自己前面",
        "score": 2,
        "dims": {
          "anxious": 2,
          "mixed": 1
        },
        "read": "湿度升高，衣角发沉"
      },
      {
        "text": "压力变大，想保留更多个人空间",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "低温带扩大"
      },
      {
        "text": "一会儿很想照顾，一会儿又觉得窒息",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "气团拉扯明显"
      }
    ]
  },
  {
    "id": 5,
    "spec": "关系确认",
    "prompt": "暧昧到什么程度你会安心？",
    "options": [
      {
        "text": "双方节奏清楚，没必要靠猜",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "能见度高"
      },
      {
        "text": "需要很多明确信号才踏实",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "雷达灵敏度上调"
      },
      {
        "text": "不太喜欢太快定义关系",
        "score": 1,
        "dims": {
          "avoidant": 3
        },
        "read": "边界线后移"
      },
      {
        "text": "想要答案，但答案来了又想躲",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "气压忽高忽低"
      }
    ]
  },
  {
    "id": 6,
    "spec": "独处时间",
    "prompt": "恋爱后你的独处时间会？",
    "options": [
      {
        "text": "保留，它是我的充电区",
        "score": 0,
        "dims": {
          "secure": 2,
          "avoidant": 1
        },
        "read": "个人气象站正常运行"
      },
      {
        "text": "会减少，但不至于失衡",
        "score": 0,
        "dims": {
          "secure": 2
        },
        "read": "日照稳定"
      },
      {
        "text": "容易都留给对方",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "对象云团覆盖变大"
      },
      {
        "text": "一旦太近就想独自断网",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "进入离岸冷流"
      }
    ]
  },
  {
    "id": 7,
    "spec": "表达不满",
    "prompt": "对方让你不舒服，你会？",
    "options": [
      {
        "text": "找合适时机讲清楚",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "边界风向标清晰"
      },
      {
        "text": "忍着，怕讲了关系变差",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "低压区停留"
      },
      {
        "text": "觉得麻烦，干脆少说少接触",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "降温处理"
      },
      {
        "text": "先忍很久，最后突然爆掉",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "积雨云破裂"
      }
    ]
  },
  {
    "id": 8,
    "spec": "亲密速度",
    "prompt": "关系升温很快时，你的身体反应是？",
    "options": [
      {
        "text": "开心，但会慢慢确认",
        "score": 0,
        "dims": {
          "secure": 2
        },
        "read": "升温曲线平缓"
      },
      {
        "text": "兴奋又紧张，开始想很多",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "热浪叠加雷声"
      },
      {
        "text": "会本能后退一点",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "冷空气南下"
      },
      {
        "text": "既上头又害怕失控",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "冷暖锋相遇"
      }
    ]
  },
  {
    "id": 9,
    "spec": "对方情绪",
    "prompt": "对方心情不好，你会？",
    "options": [
      {
        "text": "关心，但不把自己也卷进去",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "情绪湿度可控"
      },
      {
        "text": "马上怀疑是不是自己造成的",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "自责雨带生成"
      },
      {
        "text": "不知道怎么接，想保持距离",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "云层后撤"
      },
      {
        "text": "想靠近安慰，又怕被推开",
        "score": 2,
        "dims": {
          "mixed": 3
        },
        "read": "风向反复"
      }
    ]
  },
  {
    "id": 10,
    "spec": "承诺话题",
    "prompt": "谈到未来承诺，你更接近？",
    "options": [
      {
        "text": "期待，但看双方行动",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "长期预报稳定"
      },
      {
        "text": "很需要承诺来安定自己",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "气压依赖外部读数"
      },
      {
        "text": "承诺让我有点压力",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "高压脊阻隔"
      },
      {
        "text": "想听，又怕听完失去自由",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "多云转阵雨"
      }
    ]
  },
  {
    "id": 11,
    "spec": "朋友提醒",
    "prompt": "朋友说你在关系里不太像自己，你会？",
    "options": [
      {
        "text": "听进去，再自己判断",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "外部观测站接入"
      },
      {
        "text": "立刻替对方解释",
        "score": 1,
        "dims": {
          "anxious": 2
        },
        "read": "警报被降噪"
      },
      {
        "text": "觉得别人管太多",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "关闭共享天气"
      },
      {
        "text": "表面不信，回家又反复想",
        "score": 2,
        "dims": {
          "mixed": 3,
          "anxious": 1
        },
        "read": "夜间气压波动"
      }
    ]
  },
  {
    "id": 12,
    "spec": "失联想象",
    "prompt": "如果短暂联系不上对方，你会？",
    "options": [
      {
        "text": "先确认客观情况，不急着脑补",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "雷达扫描正常"
      },
      {
        "text": "想很多坏结果",
        "score": 3,
        "dims": {
          "anxious": 3
        },
        "read": "雷暴预警拉满"
      },
      {
        "text": "告诉自己无所谓，别太在意",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "情绪进入低温箱"
      },
      {
        "text": "又担心又生气，想联系又不想显得输",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "锋面剧烈碰撞"
      }
    ]
  },
  {
    "id": 13,
    "spec": "被靠近",
    "prompt": "对方很黏你时，你会？",
    "options": [
      {
        "text": "觉得甜，也会说明自己的节奏",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "亲密湿度合适"
      },
      {
        "text": "很有安全感，希望一直这样",
        "score": 1,
        "dims": {
          "anxious": 2
        },
        "read": "依赖云层增厚"
      },
      {
        "text": "有点想逃，空间被挤压",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "气压闷热"
      },
      {
        "text": "先享受，随后突然烦躁",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "晴雨切换快"
      }
    ]
  },
  {
    "id": 14,
    "spec": "冷淡时刻",
    "prompt": "你想退开的时候，通常原因是？",
    "options": [
      {
        "text": "需要休息，说明一下就好",
        "score": 0,
        "dims": {
          "secure": 2,
          "avoidant": 1
        },
        "read": "短时阴天"
      },
      {
        "text": "怕自己太需要对方",
        "score": 2,
        "dims": {
          "mixed": 2,
          "avoidant": 1
        },
        "read": "防御云层升起"
      },
      {
        "text": "对方一靠近我就压力大",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "离岸风增强"
      },
      {
        "text": "觉得会被丢下，所以先撤",
        "score": 3,
        "dims": {
          "mixed": 3,
          "anxious": 1
        },
        "read": "预防性降温"
      }
    ]
  },
  {
    "id": 15,
    "spec": "确认爱意",
    "prompt": "你最容易从哪里确认被爱？",
    "options": [
      {
        "text": "稳定行动和舒服沟通",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "长期气候稳定"
      },
      {
        "text": "高频回复和明确偏爱",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "需要连续读数"
      },
      {
        "text": "尊重空间和不强迫",
        "score": 1,
        "dims": {
          "avoidant": 3
        },
        "read": "边界气候友好"
      },
      {
        "text": "既要靠近，也要允许我躲一躲",
        "score": 2,
        "dims": {
          "mixed": 3
        },
        "read": "需要缓冲带"
      }
    ]
  },
  {
    "id": 16,
    "spec": "分手假设",
    "prompt": "想到关系可能结束，你会？",
    "options": [
      {
        "text": "难过，但知道自己能恢复",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "恢复曲线清楚"
      },
      {
        "text": "很怕，像生活被抽空",
        "score": 3,
        "dims": {
          "anxious": 3
        },
        "read": "中心低压形成"
      },
      {
        "text": "反而先想切断，别拖泥带水",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "冷锋过境"
      },
      {
        "text": "舍不得又想逃离痛感",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "暴雨和低温并存"
      }
    ]
  },
  {
    "id": 17,
    "spec": "道歉方式",
    "prompt": "你犯错后会？",
    "options": [
      {
        "text": "承认具体问题，也不把自己全盘否定",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "修复窗口打开"
      },
      {
        "text": "一直道歉，直到对方完全缓和",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "过度降压"
      },
      {
        "text": "不太会说软话，用行动带过",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "语言湿度偏低"
      },
      {
        "text": "想道歉但卡住，最后变别扭",
        "score": 2,
        "dims": {
          "mixed": 3
        },
        "read": "风口堵塞"
      }
    ]
  },
  {
    "id": 18,
    "spec": "被误解",
    "prompt": "对方误解你时，你会？",
    "options": [
      {
        "text": "解释事实，也表达感受",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "能见度修复"
      },
      {
        "text": "急到快哭，怕解释不清",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "雾区扩大"
      },
      {
        "text": "懒得解释，懂的人自然懂",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "关闭观测"
      },
      {
        "text": "越想解释越说反话",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "气流打结"
      }
    ]
  },
  {
    "id": 19,
    "spec": "日常分享",
    "prompt": "你会怎么分享生活？",
    "options": [
      {
        "text": "自然分享，也接受对方有自己的节奏",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "日照规律"
      },
      {
        "text": "希望对方对每件小事都有回应",
        "score": 2,
        "dims": {
          "anxious": 3
        },
        "read": "回声需求偏高"
      },
      {
        "text": "很多事自己消化，不一定要说",
        "score": 1,
        "dims": {
          "avoidant": 2
        },
        "read": "局部多云"
      },
      {
        "text": "想分享，又怕对方觉得烦",
        "score": 2,
        "dims": {
          "mixed": 3
        },
        "read": "信号忽明忽暗"
      }
    ]
  },
  {
    "id": 20,
    "spec": "关系里的你",
    "prompt": "一句话形容亲密关系里的你？",
    "options": [
      {
        "text": "靠近时舒服，分开时也安稳",
        "score": 0,
        "dims": {
          "secure": 3
        },
        "read": "晴稳气候"
      },
      {
        "text": "很会爱，但也很怕不被选",
        "score": 3,
        "dims": {
          "anxious": 3
        },
        "read": "雷达敏感"
      },
      {
        "text": "需要爱，也需要很大的自由",
        "score": 2,
        "dims": {
          "avoidant": 3
        },
        "read": "离岸低温"
      },
      {
        "text": "一半想拥抱，一半想逃跑",
        "score": 3,
        "dims": {
          "mixed": 3
        },
        "read": "多云切换"
      }
    ]
  }
]

export const RESULT_TYPES = {
  "secure": {
    "code": "SUN-01",
    "name": "稳定表达型",
    "aka": "靠近舒服，分开也安稳",
    "verdict": "你在亲密关系里最稀缺的能力，是能表达需要，也能保留自己。",
    "tags": [
      "稳定表达",
      "边界清楚",
      "恢复力强"
    ],
    "accent": "#758A68",
    "deep": {
      "summary": "你的关系天气整体偏晴稳。你不太依赖猜测来确认爱意，更看重持续行动和舒服沟通。",
      "forecast": "遇到关系波动时，你通常能把“这件事”和“这个人”分开看，修复窗口比较容易打开。",
      "warnings": [
        "别因为自己能消化，就总是替关系做情绪维护。",
        "稳定不是没有需求，想被照顾时也可以说出来。",
        "不要把所有不稳定的人都当成需要你教育的天气。"
      ],
      "advice": [
        "继续保留自己的生活节奏，这是你的关系底盘。",
        "表达不舒服时，尽量具体到事件和感受。",
        "如果对方长期回避沟通，别只靠你的稳定去兜底。"
      ]
    }
  },
  "anxious": {
    "code": "RAD-07",
    "name": "信号敏感型",
    "aka": "一点风吹草动都会被你捕捉",
    "verdict": "你不是太黏人，你只是太早把安全感交给了对方的反应。",
    "tags": [
      "信号敏感",
      "容易脑补",
      "需要确认"
    ],
    "accent": "#B96F61",
    "deep": {
      "summary": "你的关系雷达很灵敏，能捕捉微小变化，也容易把延迟、冷淡、语气变化解读成危险。",
      "forecast": "当关系进入不确定区间，你的脑内会自动补全剧情，越想确认越难真正安心。",
      "warnings": [
        "不要把“回复速度”直接等同于“爱不爱”。",
        "反复试探会让你更累，也会让对方更难读懂你。",
        "先稳住自己，再讨论关系，比带着恐慌追问更有效。"
      ],
      "advice": [
        "把想问的问题写成一句具体请求，少用反话和试探。",
        "给自己设一个“延迟解释区”，先等客观信息出现。",
        "把安全感拆成多个来源，不只放在一个人的回应里。"
      ]
    }
  },
  "avoidant": {
    "code": "OFF-04",
    "name": "空间优先型",
    "aka": "需要爱，也需要安全距离",
    "verdict": "你不是没有感情，只是太近的时候，身体会先替你按下后退键。",
    "tags": [
      "空间优先",
      "慢热防御",
      "不爱被逼问"
    ],
    "accent": "#6F8EA2",
    "deep": {
      "summary": "你的亲密模式更像离岸风。你能在关系里投入，但需要足够空间来确认自己没有被吞没。",
      "forecast": "当对方要求高频确认或快速承诺时，你容易降温、沉默或用忙碌保护边界。",
      "warnings": [
        "沉默会被对方理解成不在乎，尤其在冲突后。",
        "别把所有需求都看成控制，有些只是正常靠近。",
        "长期只撤退不解释，会让关系进入误读循环。"
      ],
      "advice": [
        "提前说明你的恢复方式，比突然消失更安全。",
        "练习表达“我需要一点空间，但不是要离开”。",
        "把边界说清楚，不必用冷淡来保护自己。"
      ]
    }
  },
  "mixed": {
    "code": "MIX-12",
    "name": "靠近切换型",
    "aka": "一半想拥抱，一半想逃跑",
    "verdict": "你对亲密很有感觉，但靠近和自保常常同时启动。",
    "tags": [
      "冷热切换",
      "怕失去也怕被困",
      "反应复杂"
    ],
    "accent": "#C98B47",
    "deep": {
      "summary": "你的关系天气变化快。你可能很渴望被坚定选择，但真的被靠近时，又会担心失控或失去自由。",
      "forecast": "越重要的人，越容易触发你的双向反应：想确认、想撤退、想被懂，又怕被看穿。",
      "warnings": [
        "别用突然冷掉来测试对方是否会追上来。",
        "强烈情绪过后，最好补一句真实说明。",
        "不要把复杂反应等同于“不适合恋爱”。"
      ],
      "advice": [
        "把“我想靠近”和“我需要缓冲”同时说出来。",
        "冲突后先做身体降温，再讨论关系。",
        "选择能稳定回应、也尊重空间的人，会更适配你的天气。"
      ]
    }
  }
}
export const RADAR_DIMS = ['secure', 'anxious', 'avoidant', 'mixed']

function emptyDims() {
  return Object.fromEntries(RADAR_DIMS.map((k) => [k, 0]))
}

function norm(value, max) {
  return Math.round(Math.max(0, Math.min(100, (value / max) * 100)))
}

// 每个维度按题库中可获得的理论最高分归一化，避免用“本次最高维度=100”
// 制造虚假的满分感，也避免可得分较多的维度天然更容易成为主结果。
const DIM_MAX = Object.fromEntries(RADAR_DIMS.map((key) => [
  key,
  questions.reduce((sum, question) => (
    sum + Math.max(...question.options.map((option) => option.dims?.[key] || 0))
  ), 0),
]))

export function computeReport(answers) {
  const raw = emptyDims()
  for (const ans of answers) {
    for (const [key, value] of Object.entries(ans?.dims || {})) {
      if (key in raw) raw[key] += value
    }
  }
  const dims = Object.fromEntries(RADAR_DIMS.map((key) => [key, norm(raw[key], DIM_MAX[key])]))
  const ordered = Object.entries(dims).sort((a, b) => b[1] - a[1])
  const primary = ordered[0]?.[0] || 'secure'
  const secondary = ordered[1]?.[0] || 'secure'
  const evidence = answers
    .filter((answer) => (answer?.dims?.[primary] || 0) > 0)
    .sort((a, b) => (b.dims?.[primary] || 0) - (a.dims?.[primary] || 0))
    .slice(0, 3)
    .map((answer) => ({ text: answer.text, read: answer.read }))
  const sourceBand = RESULT_TYPES[primary]
  const band = {
    ...sourceBand,
    deep: {
      ...sourceBand.deep,
      evidence,
      blend: `你的次高倾向是「${DIM_LABELS[secondary]}」。同一种主倾向，在不同场景下也可能出现另一套反应。`,
    },
  }
  const index = Math.round(Math.max(8, Math.min(96, dims.anxious * 0.34 + dims.avoidant * 0.26 + dims.mixed * 0.32 + (100 - dims.secure) * 0.16)))
  return { index, dims, raw, band, primary, secondary }
}
