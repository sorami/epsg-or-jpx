import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import { presetIcons, presetWebFonts } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				orbitron: [
					{
						name: 'Orbitron',
						weights: ['900']
					}
				],
				base: [{ name: 'Noto Sans Japanese', weights: ['400', '900'] }]
			}
		})
	],
	transformers: [transformerDirectives()]
});
