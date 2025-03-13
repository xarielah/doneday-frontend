import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	build: {
		outDir: '../public',
		emptyOutDir: true,
	},
	define: {
		global: {},
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true, // Silences warnings from sass dependencies
			}
		}
	},
	server: {
		historyApiFallback: true
	}
})
