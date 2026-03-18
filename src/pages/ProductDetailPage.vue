<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InquiryForm from '../components/InquiryForm.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { getProductBySlug, products } from '../data/products'

const route = useRoute()

const product = computed(() => getProductBySlug(route.params.slug))

const relatedProducts = computed(() =>
  products.filter((item) => item.slug !== route.params.slug).slice(0, 2)
)
</script>

<template>
  <div class="page-shell">
    <SiteHeader />

    <main v-if="product" class="detail-page">
      <section class="detail-hero">
        <div class="detail-copy">
          <p class="section-kicker">PRODUCT DETAIL</p>
          <span class="detail-badge">{{ product.badge }}</span>
          <h2>{{ product.title }}</h2>
          <p class="detail-lead">{{ product.description }}</p>

          <div class="cta-row">
            <a class="primary-btn" href="#inquiry">在线留言</a>
            <RouterLink class="secondary-btn" to="/">返回首页</RouterLink>
          </div>
        </div>

        <div class="detail-summary-card">
          <p class="card-subtitle">{{ product.subtitle }}</p>
          <h3>产品概览</h3>
          <p>{{ product.shortDescription }}</p>
          <div class="tag-row">
            <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </section>

      <section class="detail-grid">
        <article class="detail-panel">
          <p class="section-kicker">FEATURES</p>
          <h3>核心特点</h3>
          <ul class="detail-list">
            <li v-for="item in product.features" :key="item">{{ item }}</li>
          </ul>
        </article>

        <article class="detail-panel">
          <p class="section-kicker">FORMULAS</p>
          <h3>推荐配方</h3>
          <div class="formula-grid">
            <span v-for="item in product.formulas" :key="item">{{ item }}</span>
          </div>
        </article>
      </section>

      <section class="content-section alt-surface">
        <div class="section-heading">
          <p class="section-kicker">SPECIFICATIONS</p>
          <h3>产品参数与适配范围</h3>
        </div>

        <div class="spec-grid">
          <article v-for="item in product.specs" :key="item.label" class="spec-card">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </article>
        </div>
      </section>

      <section class="detail-grid">
        <article class="detail-panel">
          <p class="section-kicker">SCENARIOS</p>
          <h3>适用场景</h3>
          <div class="timeline">
            <article v-for="item in product.scenarios" :key="item" class="timeline-item">
              <strong>{{ item }}</strong>
              <p>可结合当地土壤条件和作物目标产量进一步细化施肥方案。</p>
            </article>
          </div>
        </article>

        <article class="detail-panel">
          <p class="section-kicker">PLANS</p>
          <h3>推荐应用方案</h3>
          <div class="plan-grid">
            <article v-for="item in product.plans" :key="item.title" class="plan-card">
              <h4>{{ item.title }}</h4>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </article>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <p class="section-kicker">GUIDE</p>
          <h3>使用建议</h3>
          <p>
            以下建议适合作为官网展示内容，实际使用时可根据作物品种、季节、天气和土壤检测结果灵活调整。
          </p>
        </div>

        <div class="usage-grid">
          <article v-for="item in product.usage" :key="item.stage" class="usage-card">
            <span>{{ item.stage }}</span>
            <strong>{{ item.method }}</strong>
            <p>{{ item.advice }}</p>
          </article>
        </div>
      </section>

      <section id="inquiry" class="content-section alt-surface">
        <InquiryForm
          :title="`${product.title} 咨询表单`"
          subtitle="填写需求后，我们会结合当前产品和作物场景给出建议。"
          :preset-product="product.title"
          :lock-product="true"
        />
      </section>

      <section class="content-section alt-surface">
        <div class="section-heading">
          <p class="section-kicker">RELATED</p>
          <h3>相关产品</h3>
        </div>

        <div class="series-grid compact-grid">
          <article v-for="item in relatedProducts" :key="item.slug" class="series-card">
            <p class="card-subtitle">{{ item.badge }}</p>
            <h4>{{ item.title }}</h4>
            <p>{{ item.shortDescription }}</p>
            <RouterLink class="secondary-btn inline-link" :to="`/products/${item.slug}`">
              查看详情
            </RouterLink>
          </article>
        </div>
      </section>
    </main>

    <main v-else class="detail-page">
      <section class="detail-empty">
        <p class="section-kicker">NOT FOUND</p>
        <h2>暂未找到该产品详情</h2>
        <p>当前链接可能已失效，你可以先返回首页查看现有产品系列。</p>
        <RouterLink class="primary-btn" to="/">返回首页</RouterLink>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
