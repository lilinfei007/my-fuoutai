import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config({ quiet: true })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(express.json())

function isValidPhone(value) {
  const normalized = String(value || '').replace(/\s+/g, '')
  return /^1\d{10}$/.test(normalized) || /^0\d{2,3}-?\d{7,8}$/.test(normalized)
}

function validateInquiry(body) {
  const errors = []

  if (!String(body?.name || '').trim()) errors.push('联系人不能为空')
  if (!String(body?.phone || '').trim()) {
    errors.push('联系电话不能为空')
  } else if (!isValidPhone(body.phone)) {
    errors.push('联系电话格式不正确')
  }
  if (!String(body?.crop || '').trim()) errors.push('作物类型不能为空')
  if (!String(body?.product || '').trim()) errors.push('意向产品不能为空')

  return errors
}

function buildDingTalkUrl(webhook, secret) {
  const target = new URL(webhook)

  if (secret) {
    const timestamp = Date.now().toString()
    const stringToSign = `${timestamp}\n${secret}`
    const sign = crypto
      .createHmac('sha256', secret)
      .update(stringToSign)
      .digest('base64')

    target.searchParams.set('timestamp', timestamp)
    target.searchParams.set('sign', sign)
  }

  return target.toString()
}

function buildMarkdown(body) {
  const lines = [
    '### 官网新留言通知',
    '',
    `- 联系人：${body.name}`,
    `- 电话：${body.phone}`,
    `- 地区：${body.region || '未填写'}`,
    `- 作物：${body.crop}`,
    `- 意向产品：${body.product}`,
    `- 来源页面：${body.sourcePage || '未提供'}`,
    `- 提交时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`,
    '',
    `> 需求说明：${body.message || '未填写'}`
  ]

  return lines.join('\n')
}

async function sendDingTalkNotification(body) {
  const webhook = process.env.DINGTALK_WEBHOOK
  const secret = process.env.DINGTALK_SECRET

  if (!webhook) {
    throw new Error('未配置 DINGTALK_WEBHOOK')
  }

  const response = await fetch(buildDingTalkUrl(webhook, secret), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: {
        title: '官网新留言通知',
        text: buildMarkdown(body)
      }
    })
  })

  if (!response.ok) {
    throw new Error(`钉钉请求失败：HTTP ${response.status}`)
  }

  const data = await response.json()

  if (data.errcode !== 0) {
    throw new Error(`钉钉通知失败：${data.errmsg || '未知错误'}`)
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/inquiries', async (req, res) => {
  const errors = validateInquiry(req.body)

  if (errors.length > 0) {
    return res.status(400).json({
      ok: false,
      message: errors[0]
    })
  }

  try {
    await sendDingTalkNotification(req.body)
    return res.json({
      ok: true,
      message: '提交成功，钉钉通知已发送'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : '服务异常'
    })
  }
})

app.use(express.static(distDir))

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next()
  }

  return res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
