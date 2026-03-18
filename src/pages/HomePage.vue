<script setup>
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { products } from '../data/products'

const highlights = [
  { value: '18 年', label: '作物营养研发经验' },
  { value: '32 省', label: '服务覆盖核心种植区域' },
  { value: '96%+', label: '养分综合利用效率' }
]

const aboutCards = [
  {
    title: '企业定位',
    text: '聚焦复合肥、水溶肥与土壤改良类产品，面向现代农业种植场景提供更贴合实际需求的营养支持。'
  },
  {
    title: '服务理念',
    text: '坚持以作物表现、种植投入与长期地力为关注重点，让产品方案更注重落地效果。'
  },
  {
    title: '应用方向',
    text: '覆盖大田作物、果蔬基地、果园与经济作物管理，兼顾稳产、提质与养地需求。'
  }
]

const advantages = [
  {
    title: '科学配方',
    text: '围绕作物生育周期与土壤条件配置养分，兼顾长势、产量与商品性。'
  },
  {
    title: '稳效吸收',
    text: '颗粒均匀、速溶性好，帮助提升养分利用效率，减少不必要浪费。'
  },
  {
    title: '场景适配',
    text: '覆盖大田、果园、蔬菜基地与经济作物等多类种植管理场景。'
  },
  {
    title: '服务支持',
    text: '结合作物、面积与施肥方式沟通应用建议，让选肥和用肥更清晰。'
  }
]

const stages = [
  {
    name: '需求沟通',
    detail: '了解作物类型、地块情况、施肥习惯与目标产量，明确当前需求。'
  },
  {
    name: '配方匹配',
    detail: '结合土壤条件与管理阶段，匹配更合适的产品组合和使用方向。'
  },
  {
    name: '标准生产',
    detail: '以稳定原料和规范工艺保证产品一致性，兼顾效果与使用体验。'
  },
  {
    name: '持续服务',
    detail: '围绕实际用肥情况保持沟通，帮助客户持续优化投入和效果。'
  }
]

const crops = [
  '大田作物稳产方案',
  '果蔬基地提质方案',
  '果园膨果转色方案',
  '改土养地修复方案'
]
</script>

<template>
  <div class="page-shell">
    <SiteHeader />

    <main>
      <section class="hero-section">
        <div class="hero-copy">
          <p class="section-kicker">GREEN NUTRITION SOLUTIONS</p>
          <h2>让作物吃得更准，让每一季产量更稳</h2>
          <p class="hero-text">
            湖北福欧泰化工有限公司聚焦复合肥、水溶肥与土壤改良类产品，为粮食作物、果蔬基地、果园与经济作物提供更贴合作物阶段、土壤条件和施肥方式的营养解决方案。
          </p>

          <div class="cta-row">
            <a class="primary-btn" href="#contact">咨询产品方案</a>
            <a class="secondary-btn" href="#products">了解产品矩阵</a>
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
            <span>科学配方</span>
            <strong>精准营养 · 稳效供肥</strong>
            <p>面向苗期、生长中期与膨果转色阶段，提供更贴合作物节奏的营养支持。</p>
          </div>
          <div class="visual-card visual-float top-card">
            <span>绿色种植</span>
            <strong>减量增效</strong>
          </div>
          <div class="visual-card visual-float bottom-card">
            <span>服务场景</span>
            <strong>粮食 / 果蔬 / 果园 / 改土</strong>
          </div>
        </div>
      </section>

      <section id="about" class="content-section about-section">
        <div class="about-grid">
          <div class="about-main">
            <p class="section-kicker">ABOUT US</p>
            <h3>关于湖北福欧泰</h3>
            <p>
              湖北福欧泰化工有限公司始终围绕现代农业种植中的真实需求，聚焦作物营养、稳效供肥与养地改土等方向，持续完善产品体系与应用场景。
            </p>
            <p>
              我们关注的不只是产品本身，更关注产品在不同地块、不同作物与不同管理阶段中的实际表现，希望帮助客户在稳产、提质和投入控制之间找到更合适的平衡。
            </p>

            <div class="about-badges">
              <span>复合肥</span>
              <span>水溶肥</span>
              <span>土壤改良</span>
              <span>作物营养支持</span>
            </div>
          </div>

          <div class="about-side">
            <article v-for="item in aboutCards" :key="item.title" class="about-card">
              <h4>{{ item.title }}</h4>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="products" class="content-section">
        <div class="section-heading">
          <p class="section-kicker">PRODUCTS</p>
          <h3>核心产品矩阵</h3>
          <p>
            围绕不同作物、不同施肥方式与不同管理目标构建产品体系，兼顾底肥、追肥、水肥一体化与养地改土需求。
          </p>
        </div>

        <div class="series-grid">
          <article v-for="item in products" :key="item.slug" class="series-card">
            <p class="card-subtitle">{{ item.subtitle }}</p>
            <h4>{{ item.title }}</h4>
            <p>{{ item.shortDescription }}</p>
            <div class="tag-row">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <RouterLink class="secondary-btn inline-link" :to="`/products/${item.slug}`">
              查看产品详情
            </RouterLink>
          </article>
        </div>
      </section>

      <section id="advantages" class="content-section alt-surface">
        <div class="section-heading">
          <p class="section-kicker">ADVANTAGES</p>
          <h3>为什么选择湖北福欧泰</h3>
          <p>
            从产品配方、工艺稳定性到场景沟通支持，湖北福欧泰更关注产品是否真正适合不同作物的实际管理需求。
          </p>
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
          <h3>服务多类种植场景</h3>
          <ul class="crop-list">
            <li v-for="item in crops" :key="item">{{ item }}</li>
          </ul>
          <p class="panel-note">
            无论是稳产增收、品质提升，还是改土养地，均可结合实际作物和管理阶段进行沟通匹配。
          </p>
        </div>

        <div id="process" class="process-panel">
          <p class="section-kicker">PROCESS</p>
          <h3>从需求沟通到持续服务</h3>
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
          <h3>欢迎咨询产品合作与用肥方案</h3>
          <p>
            无论是区域经销、基地采购，还是针对作物阶段性用肥进行沟通，欢迎直接联系湖北福欧泰化工有限公司，我们将结合实际需求提供更合适的产品建议。
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
