<template>
  <section class="deep-report" aria-labelledby="deep-title">
    <div class="section-heading">
      <p>完整档案</p>
      <h2 id="deep-title">你的信任证据链</h2>
    </div>

    <ol class="evidence-chain">
      <li v-for="item in result.evidence" :key="item.order">
        <span class="evidence-order">{{ String(item.order).padStart(2, '0') }}</span>
        <div>
          <strong>{{ item.id }}. {{ item.text }}</strong>
          <p>{{ item.read }}</p>
        </div>
      </li>
    </ol>

    <div class="report-block report-block--accent">
      <h3>更适合你的建立方式</h3>
      <p>{{ result.trustMethod }}</p>
    </div>

    <div class="report-block">
      <h3>你容易忽略的信号</h3>
      <p>{{ result.overlooked }}</p>
    </div>

    <div class="report-block">
      <h3>核实与表达话术</h3>
      <ul class="script-list">
        <li v-for="script in result.scripts" :key="script">{{ script }}</li>
      </ul>
    </div>

    <p class="report-disclaimer">本测试由选择顺序生成，仅供娱乐与自我观察，不构成专业心理咨询或现实关系判断。</p>
  </section>
</template>

<script setup>
defineProps({
  result: { type: Object, required: true },
})
</script>
