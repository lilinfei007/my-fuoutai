<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '在线留言'
  },
  subtitle: {
    type: String,
    default: '填写基础信息后，我们会尽快与你联系并推送到钉钉通知。'
  },
  presetProduct: {
    type: String,
    default: ''
  },
  lockProduct: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'light'
  }
})

const form = reactive({
  name: '',
  phone: '',
  region: '',
  crop: '',
  product: props.presetProduct,
  message: ''
})

const errors = reactive({
  name: '',
  phone: '',
  crop: '',
  product: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')

watch(
  () => props.presetProduct,
  (value) => {
    if (props.lockProduct || !form.product) {
      form.product = value
    }
  }
)

function validatePhone(value) {
  const normalized = value.replace(/\s+/g, '')
  return /^1\d{10}$/.test(normalized) || /^0\d{2,3}-?\d{7,8}$/.test(normalized)
}

function resetErrors() {
  errors.name = ''
  errors.phone = ''
  errors.crop = ''
  errors.product = ''
}

function validateForm() {
  resetErrors()

  if (!form.name.trim()) {
    errors.name = '请填写联系人姓名'
  }

  if (!form.phone.trim()) {
    errors.phone = '请填写联系电话'
  } else if (!validatePhone(form.phone.trim())) {
    errors.phone = '请输入有效的手机号或座机号'
  }

  if (!form.crop.trim()) {
    errors.crop = '请填写作物类型'
  }

  if (!form.product.trim()) {
    errors.product = '请填写意向产品'
  }

  return !errors.name && !errors.phone && !errors.crop && !errors.product
}

function saveLead(payload) {
  if (typeof window === 'undefined') return

  const key = 'fuoutai_inquiries'
  const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
  existing.unshift(payload)
  window.localStorage.setItem(key, JSON.stringify(existing))
}

async function submitForm() {
  submitMessage.value = ''

  if (!validateForm()) return

  isSubmitting.value = true

  const payload = {
    ...form,
    sourcePage: typeof window !== 'undefined' ? window.location.href : '',
    createdAt: new Date().toISOString()
  }

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok || !result.ok) {
      throw new Error(result.message || '提交失败，请稍后重试')
    }

    saveLead(payload)
    submitMessage.value = result.message || '提交成功，我们会尽快与你联系。'

    form.name = ''
    form.phone = ''
    form.region = ''
    form.crop = ''
    form.product = props.presetProduct
    form.message = ''
  } catch (error) {
    submitMessage.value = error instanceof Error ? error.message : '提交失败，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="inquiry-form" :class="`theme-${theme}`">
    <div class="form-heading">
      <p class="section-kicker">INQUIRY</p>
      <h3>{{ title }}</h3>
      <p>{{ subtitle }}</p>
    </div>

    <form class="form-grid" @submit.prevent="submitForm">
      <label class="form-field">
        <span>联系人</span>
        <input v-model.trim="form.name" type="text" placeholder="请输入姓名" />
        <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
      </label>

      <label class="form-field">
        <span>联系电话</span>
        <input
          v-model.trim="form.phone"
          type="tel"
          placeholder="手机号 / 座机号"
        />
        <small v-if="errors.phone" class="field-error">{{ errors.phone }}</small>
      </label>

      <label class="form-field">
        <span>所在地区</span>
        <input v-model.trim="form.region" type="text" placeholder="如：山东寿光" />
      </label>

      <label class="form-field">
        <span>作物类型</span>
        <input v-model.trim="form.crop" type="text" placeholder="如：番茄 / 玉米 / 葡萄" />
        <small v-if="errors.crop" class="field-error">{{ errors.crop }}</small>
      </label>

      <label class="form-field form-field-wide">
        <span>意向产品</span>
        <input
          v-model.trim="form.product"
          type="text"
          :readonly="lockProduct"
          :placeholder="lockProduct ? '当前产品' : '如：高塔复合肥 / 水溶肥'"
        />
        <small v-if="errors.product" class="field-error">{{ errors.product }}</small>
      </label>

      <label class="form-field form-field-wide">
        <span>需求说明</span>
        <textarea
          v-model.trim="form.message"
          rows="4"
          placeholder="可填写种植面积、作物阶段、当前问题或采购需求"
        />
      </label>

      <div class="form-actions">
        <button class="primary-btn form-submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '提交留言' }}
        </button>
        <p
          v-if="submitMessage"
          class="form-success"
          :class="{ 'form-error-text': submitMessage.includes('失败') || submitMessage.includes('未配置') }"
        >
          {{ submitMessage }}
        </p>
      </div>
    </form>
  </section>
</template>
