import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import { presetWebFonts } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				sans: 'Roboto',
				mono: ['Fira Code', 'Fira Mono:400,700'],
				lobster: 'Lobster',
				lato: [
					{
						name: 'Lato',
						weights: ['400', '700'],
						italic: true
					},
					{
						name: 'sans-serif',
						provider: 'none'
					}
				]
			}
		})
	],
	transformers: [transformerDirectives()]
});
