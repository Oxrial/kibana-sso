<script lang="ts">
export default {
	name: 'KibanaSSO',
	inheritAttrs: false,
	customOptions: {}
}
</script>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, ref, watch } from 'vue'

const loading = ref(false)
watch(
	() => loading.value,
	(n: boolean) => {
		const main: Element = document.querySelector('.kibana-sso')!
		if (n) {
			nextTick(() => {
				const mainChild = main?.lastChild
				const mainChildOuter = (mainChild as HTMLElement)?.outerHTML
				const spinner = `
        <icon class="kibana-logo"></icon>
        <div class="content">
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
          </svg>
          <span class="text">授权中...</span>
        </div>
      `
				const mask = `
        <div class="el-loading-mask">
          <div class="el-loading-spinner">${spinner}</div>
        </div>
      `
				main.innerHTML = mainChildOuter + mask
			})
		}
	}
)
onMounted(() => {
	loading.value = true
	const codeLocation = location.search
	if (codeLocation) {
		const searchParams = new URLSearchParams(codeLocation)
		const code = searchParams.get('code')
		code && catchToken(code)
	} else {
		catchCode()
	}
})
const PROXYSSO_URL = 'https://IP:PORT/kibana/sso'
const catchCode = () => {
	location.href = `https://SSOIP:PORT/api/oauth2/authorize?client_id=xxx
		&redirect_uri=${PROXYSSO_URL}&response_type=code`
}
const catchToken = (code: string) => {
	// re request SSOIP:PORT/xxx to get token
	fetch(
		`/api/xxx/token?code=${code}
		&client_id=xxx
		&client_secret=yyy
		&grant_type=authorization_code
		&redirect_uri=${PROXYSSO_URL}`,
		{ method: 'POST' }
	)
		.then((response) => {
			if (response.ok) return response.json()
			return ElMessage.error(response.status + ' ' + response.statusText)
		})
		.then((res) => {
			const { access_token } = res
			location.href = `https://KIBANAIP:PORT/kibana?code=${code}&token=${access_token}`
		})
		.catch((error) => ElMessage.error(error))
}
</script>

<template>
	<ElCard class="kibana-sso" />
</template>

<style scoped lang="scss">
.kibana-sso {
	width: 80vh;
	height: 50vh;
	margin: 0 auto;
	margin-top: 10%;
	:deep(.content) {
		display: flex;
		justify-content: center;
		align-items: center;
		.text {
			font-size: 14px;
			color: #409eff;
		}
		.circular {
			height: 21px;
		}
	}
}
</style>
<style>
.kibana-logo {
	background: url('@/assets/images/kibana-logo.png') center no-repeat;
	background-size: contain;
	width: 128px;
	height: 60px;
	display: inline-block;
}
</style>
