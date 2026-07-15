export const MAX_SELECTIONS = 3

export const TRUST_OPTIONS = [
  { id: 'A', type: 'verify', text: '能说出一件只有你们知道、且可以核实的小事', evidence: '你先抓住了可以交叉核实的共同细节' },
  { id: 'B', type: 'verify', text: '带着一段有完整时间线的共同记录', evidence: '你把完整记录当作恢复关系坐标的入口' },
  { id: 'C', type: 'care', text: '记得你最细小的生活习惯', evidence: '你注意到被长期看见的生活细节' },
  { id: 'D', type: 'care', text: '已经默默准备好你常用的东西', evidence: '你会从具体照料判断对方是否真的了解你' },
  { id: 'E', type: 'agency', text: '不催你相信，愿意等你慢慢核实', evidence: '你把不催促视为值得继续了解的信号' },
  { id: 'F', type: 'agency', text: '把手机、信息和选择权交还给你', evidence: '你先确认自己仍保有信息与决定权' },
  { id: 'G', type: 'rebuild', text: '坦白你们也曾经闹翻过', evidence: '你更相信包含裂痕的诚实叙述' },
  { id: 'H', type: 'rebuild', text: '说“忘了也没关系，我们重新认识”', evidence: '你愿意让关系通过新的相处重新成立' },
]

export const TRUST_TYPES = {
  verify: {
    name: '核验优先型',
    short: '先核实',
    principle: '你建立信任的起点是可验证的信息。先把事实对齐，再决定关系应该走到哪里。',
  },
  care: {
    name: '照料优先型',
    short: '看行动',
    principle: '你会从持续的细节与行动里判断关系。被记得、被照顾，比一句保证更有分量。',
  },
  agency: {
    name: '自主优先型',
    short: '留选择',
    principle: '你需要在不受催促的状态里确认信任。空间、信息和选择权会让你更愿意靠近。',
  },
  rebuild: {
    name: '重建优先型',
    short: '重新认识',
    principle: '你允许关系带着不完美重新开始。坦白裂痕和创造新经验，对你比维持完美故事更可信。',
  },
}

const PAIR_REPORTS = {
  'verify>care': {
    title: '证据落地型信任',
    verdict: '你先确认故事是否站得住，再看对方是否真的把你放进日常。事实给你入口，行动决定你会不会留下。',
    tags: ['先对齐事实', '再观察行动', '不被单次感动带走'],
    trustMethod: '先核对一条可验证信息，再观察对方接下来是否持续做到与叙述一致。',
    overlooked: '你可能过度重视完整证据，却忽略照料也会有表达差异。一次没记住，不等于长期不在意。',
    scripts: ['“这件事我想先核实清楚，再慢慢认识现在的你。”', '“比起解释，我更想看看接下来你会怎么做。”'],
  },
  'verify>agency': {
    title: '清醒校准型信任',
    verdict: '你需要事实，也需要不被推着接受事实的空间。可信的信息和完整选择权，缺少任何一项都不够。',
    tags: ['事实可核验', '选择权在手', '拒绝催促'],
    trustMethod: '把已知、待核实和暂不判断分开，同时保留退出、暂停与继续了解的权利。',
    overlooked: '你可能把谨慎维持得太久，让对方不知道怎样才算通过核验。可以说明你的确认标准。',
    scripts: ['“你可以给我信息，但请让我自己决定验证的顺序。”', '“我暂时不下结论，等我核实完会明确告诉你。”'],
  },
  'verify>rebuild': {
    title: '诚实复盘型信任',
    verdict: '你不要求关系毫无裂痕，但要求旧故事经得起核对。承认发生过什么，是重新开始的前提。',
    tags: ['拒绝改写过去', '允许重新开始', '先复盘再靠近'],
    trustMethod: '把双方记得的关键节点列出来，确认分歧在哪里，再用新的共同经历补充证据。',
    overlooked: '你可能一直验证过去，却迟迟没有给现在留下新的观察窗口。修复也需要新样本。',
    scripts: ['“我们可以重新认识，但过去的分歧需要先说清楚。”', '“我不要求你证明完美，只需要你对发生过的事诚实。”'],
  },
  'care>verify': {
    title: '细节取证型信任',
    verdict: '你先被具体照料触动，随后会确认这些细节是否来自真实相处。温度让你靠近，证据帮你站稳。',
    tags: ['先感受细节', '再确认来源', '温度也要一致'],
    trustMethod: '记录让你感到被看见的动作，同时核对这些动作是否与对方的叙述和时间线一致。',
    overlooked: '贴心动作可能很有说服力，但它不能替代边界确认，也不能抵消明显的信息矛盾。',
    scripts: ['“你记得这些让我很触动，我也想知道我们经历过的具体故事。”', '“我会看行动，也希望信息能彼此对得上。”'],
  },
  'care>agency': {
    title: '低压照料型信任',
    verdict: '你喜欢被认真照顾，但更在意这种照顾有没有给你留下呼吸空间。真正的体贴不会索取即时回应。',
    tags: ['被看见', '不被接管', '照料有边界'],
    trustMethod: '观察对方能否先询问需求，再提供帮助，并接受你说“不需要”或“等一等”。',
    overlooked: '你可能为了不辜负好意而过早配合。接受照料不等于交出决定权。',
    scripts: ['“谢谢你准备这些，我想按自己的节奏决定接下来怎么做。”', '“你可以先问我需要什么，这会让我更安心。”'],
  },
  'care>rebuild': {
    title: '行动修复型信任',
    verdict: '你相信关系可以重来，但重来不能只靠一句道歉。新的照料与稳定行动，才是你认可的修复语言。',
    tags: ['行动比承诺重', '允许修复', '观察持续性'],
    trustMethod: '把修复落在几个可重复的小动作上，观察对方是否稳定完成，而不是只看一次高光。',
    overlooked: '你可能把照顾当成补偿是否到位的唯一标准，却没问双方是否真正理解旧问题。',
    scripts: ['“我愿意重新认识，但希望改变能落在日常行动里。”', '“这次你做得很用心，我们也需要谈谈之前为什么会闹翻。”'],
  },
  'agency>verify': {
    title: '自主审证型信任',
    verdict: '你先守住自己的判断空间，再决定哪些信息值得核实。你要的不是别人替你下结论，而是完整知情。',
    tags: ['先保留判断', '再核实信息', '不接受代答'],
    trustMethod: '先明确可接受的沟通边界，再自行选择证据来源，避免只在对方提供的材料里循环。',
    overlooked: '强调独立时，你可能没有告诉对方哪些信息能真正帮助你。边界也可以包含清晰请求。',
    scripts: ['“请把你知道的告诉我，判断由我自己完成。”', '“我需要一点时间，也需要一条能独立核实的信息。”'],
  },
  'agency>care': {
    title: '有界靠近型信任',
    verdict: '你先确认对方尊重你的节奏，才会接住那些细小照料。对你而言，最好的关心是靠近但不越界。',
    tags: ['先问再帮', '保留节奏', '关心不越界'],
    trustMethod: '用一次小请求测试互动：对方既能提供具体支持，也能在你拒绝时自然停下。',
    overlooked: '你可能太习惯独自处理，以至于真正可靠的照料也进不来。可以从低风险的小事开始接受帮助。',
    scripts: ['“我想自己决定节奏，但这件小事你可以帮我。”', '“你愿意先问我的感受，这比直接替我安排更有用。”'],
  },
  'agency>rebuild': {
    title: '自愿重启型信任',
    verdict: '你接受重新认识，但前提是双方都能自由决定是否继续。重启不是回到从前，而是建立新的规则。',
    tags: ['自愿继续', '重设规则', '不给过去绑架'],
    trustMethod: '先约定暂停和退出机制，再共同选择一个低风险的新体验，观察新的互动是否更安全。',
    overlooked: '你可能把随时退出当作唯一安全感，反而难以投入足够时间形成新的证据。',
    scripts: ['“我们可以重新开始，但要按现在的边界来认识彼此。”', '“如果不舒服我会暂停，也希望你能直接说出你的选择。”'],
  },
  'rebuild>verify': {
    title: '重启核验型信任',
    verdict: '你愿意给关系新的版本，但不会删掉旧记录。新的开始需要坦白，也需要事实能够彼此印证。',
    tags: ['接受不完美', '保留事实', '用新经历验证'],
    trustMethod: '承认旧关系里的矛盾，再核对关键事实，并为新阶段设置一个可观察的时间窗口。',
    overlooked: '愿意重启不代表必须快速原谅。尚未核清的部分可以保留，不必为了气氛跳过。',
    scripts: ['“我愿意重新认识你，但有几个事实需要先对齐。”', '“新的相处可以开始，旧问题不需要假装没发生。”'],
  },
  'rebuild>care': {
    title: '温和重建型信任',
    verdict: '你相信一段关系可以通过新的日常重新长出来。你看重诚实承认裂痕，也看重之后怎样照顾彼此。',
    tags: ['承认裂痕', '用日常重建', '温和但不失忆'],
    trustMethod: '从稳定、具体的小照料重新积累共同经验，并定期确认这些动作是否真的符合彼此需要。',
    overlooked: '温柔的修复氛围可能让你暂时放下问题，但真正的重建仍需要说清冲突模式。',
    scripts: ['“我愿意从新的日常开始，也希望我们不回避之前的问题。”', '“这份照顾我收到了，我们可以一起确认怎样做更适合彼此。”'],
  },
  'rebuild>agency': {
    title: '边界重建型信任',
    verdict: '你允许故事重新开始，但不会让旧关系自动恢复全部权限。新的信任要从双方自愿和清晰边界里生长。',
    tags: ['权限重新确认', '双方都可暂停', '从现在开始'],
    trustMethod: '把过去默认的权限全部归零，重新确认信息、联系频率和靠近方式，逐项建立新的共识。',
    overlooked: '你可能擅长重设边界，却不容易表达仍然在意。清晰和温度可以同时存在。',
    scripts: ['“重新认识不等于恢复从前，我们需要重新确认彼此的边界。”', '“我愿意继续了解，也会在不舒服时直接告诉你。”'],
  },
}

export function getOption(id) {
  return TRUST_OPTIONS.find((option) => option.id === id) || null
}

export function validateSelection(ids) {
  return Array.isArray(ids)
    && ids.length === MAX_SELECTIONS
    && new Set(ids).size === MAX_SELECTIONS
    && ids.every((id) => Boolean(getOption(id)))
}

export function deriveTrustResult(ids) {
  if (!validateSelection(ids)) return null
  const selections = ids.map(getOption)
  const primary = selections[0].type
  const secondary = selections.slice(1).find((option) => option.type !== primary)?.type
  if (!secondary) return null
  const key = `${primary}>${secondary}`
  const report = PAIR_REPORTS[key]
  if (!report) return null

  return {
    key,
    primary,
    secondary,
    primaryType: TRUST_TYPES[primary],
    secondaryType: TRUST_TYPES[secondary],
    selections,
    evidence: selections.map((option, index) => ({
      order: index + 1,
      id: option.id,
      text: option.text,
      read: option.evidence,
    })),
    ...report,
  }
}

export const TRUST_REPORT_KEYS = Object.freeze(Object.keys(PAIR_REPORTS))
