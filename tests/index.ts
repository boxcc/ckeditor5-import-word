import { describe, expect, it } from 'vitest';
import { ImportWord as ImportWordDll, icons } from '../src/index.js';
import ImportWord from '../src/importword.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 ImportWord DLL', () => {
	it( 'exports ImportWord', () => {
		expect( ImportWordDll ).to.equal( ImportWord );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
