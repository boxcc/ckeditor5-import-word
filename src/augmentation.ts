import type { ImportWord } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ ImportWord.pluginName ]: ImportWord;
	}
}
