<script setup>
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { products } from '../data/products'

const highlights = [
  { value: '18 年', label: '作物营养研发经验' },
  { value: '32 省', label: '服务覆盖核心种植区' },
  { value: '96%+', label: '有效养分吸收利用率' }
]

const advantages = [
  {
    title: '绿色配方',
    text: '以减量增效为核心，控制养分释放节奏，减少流失与烧苗风险。'
  },
  {
    title: '作物定制',
    text: '结合不同作物、土壤与季节，输出更贴合种植场景的营养方案。'
  },
  {
    title: '全程服务',
    text: '从测土、选肥到用肥指导，配套提供落地化农技支持。'
  },
  {
    title: '品质追溯',
    text: '原料、生产、质检多环节把控，确保每一批产品稳定可靠。'
  }
]

const stages = [
  { name: '土壤检测', detail: '采集区域土样，分析酸碱度、有机质和氮磷钾基础数据。' },
  { name: '营养建模', detail: '基于作物目标产量与生育周期，制定更精细的配方建议。' },
  { name: '智能生产', detail: '高标准混配和造粒工艺，保障颗粒均匀度与肥效释放曲线。' },
  { name: '田间跟踪', detail: '通过示范田与农技回访，持续优化施肥方案。' }
]

const crops = [
  '大田粮作稳产增收',
  '设施蔬菜高效提质',
  '果树膨果转色强化',
  '经济作物土壤修复'
]
</script>

<template>
  <div class="page-shell">
    <SiteHeader />

    <main>
      <section class="hero-section">
        <div class="hero-copy">
          <p class="section-kicker">绿色系化肥官网</p>
          <h2>让每一寸土地，长出更稳定的产量与品质</h2>
          <p class="hero-text">
            湖北福欧泰化工有限公司专注复合肥、水溶肥与有机营养产品研发，以绿色、稳效、适配不同作物场景为目标，为现代农业提供更安心的营养解决方案。
          </p>

          <div class="cta-row">
            <a class="primary-btn" href="#contact">获取产品方案</a>
            <a class="secondary-btn" href="#products">查看产品系列</a>
          </div>

          <div class="stats-grid">
            <article v-for="item in highlights" :key="item.label" class="stat-card">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </article>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="visual-card visual-main">
            <span>平衡营养</span>
            <strong>N · P · K · TE</strong>
            <p>多元配比，稳释吸收，兼顾作物长势与品质提升。</p>
          </div>
          <div class="visual-card visual-float top-card">
            <span>减量增效</span>
            <strong>绿色农业</strong>
          </div>
          <div class="visual-card visual-float bottom-card">
            <span>应用场景</span>
            <strong>粮食作物 / 果蔬 / 果园</strong>
          </div>
        </div>
      </section>

      <section id="products" class="content-section">
        <div class="section-heading">
          <p class="section-kicker">PRODUCTS</p>
          <h3>主打产品系列</h3>
          <p>
            围绕“作物需求、土壤条件、施肥方式”构建产品矩阵，适配从大田到高附加值作物的多样化营养需求。
          </p>
        </div>

        <div class="series-grid">
          <article v-for="item in products" :key="item.slug" class="series-card">
            <p class="card-subtitle">{{ item.subtitle }}</p>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <div class="tag-row">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <RouterLink class="secondary-btn inline-link" :to="`/products/${item.slug}`">
              查看详情
            </RouterLink>
          </article>
        </div>
      </section>

      <section id="advantages" class="content-section alt-surface">
        <div class="section-heading">
          <p class="section-kicker">ADVANTAGES</p>
          <h3>为什么选择湖北福欧泰</h3>
        </div>

        <div class="advantage-grid">
          <article v-for="item in advantages" :key="item.title" class="advantage-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section class="split-section">
        <div class="solution-panel">
          <p class="section-kicker">SCENARIOS</p>
          <h3>覆盖多类种植场景</h3>
          <ul class="crop-list">
            <li v-for="item in crops" :key="item">{{ item }}</li>
          </ul>
          <p class="panel-note">
            可根据基地规模、作物种类与灌溉条件，输出定制施肥组合建议。
          </p>
        </div>

        <div id="process" class="process-panel">
          <p class="section-kicker">PROCESS</p>
          <h3>从研发到田间的闭环服务</h3>
          <div class="timeline">
            <article v-for="stage in stages" :key="stage.name" class="timeline-item">
              <strong>{{ stage.name }}</strong>
              <p>{{ stage.detail }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section contact-single">
        <div class="contact-copy">
          <p class="section-kicker">CONTACT</p>
          <h3>为你的作物定制一套更合适的营养方案</h3>
          <p>
            当前页面先仅保留企业联系信息展示。如果你后续需要重新开放在线留言、钉钉通知或表单收集功能，可以在现有基础上快速恢复。
          </p>

          <div class="contact-card">
            <p><span>联系电话</span>400-816-0061</p>
            <p><span>QQ</span>450505620</p>
            <p><span>企业地址</span>湖北省武汉市黄陂区蔡家榨镇兴崛大道27号附9号</p>
            <a class="primary-btn full-width" href="tel:4008160061">立即电话咨询</a>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
