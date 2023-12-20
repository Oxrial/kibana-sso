import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		ElementPlus({
			// 引入的样式的类型，可以是css、sass、less等，
			useSource: true
		})
	],
	build: {
		outDir: './dist/kibana-ui',
		assetsDir: 'static'
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},
	server: {
		port: 7777,
		proxy: {
			'/api/oauth2': {
				target: 'https://SSOIP:PORT/api/oauth2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/oauth2/, '')
			}
		}
	}
})
