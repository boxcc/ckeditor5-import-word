import { Plugin, FileDialogButtonView } from 'ckeditor5';
import mammoth from 'mammoth';
import importWordIcon from '../theme/icons/import-word.svg';

export default class ImportWord extends Plugin {
	public static get pluginName() {
		return 'ImportWord' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		// const model = editor.model;
		// const command = editor.commands.get( 'uploadVideo' );

		// Add the "importWordButton" to feature components.
		editor.ui.componentFactory.add( 'importWordButton', locale => {
			const view = new FileDialogButtonView( locale );

			view.set( {
				acceptedType: '.docx',
				allowMultipleFiles: false,
				label: t( 'Import word' ),
				icon: importWordIcon,
				tooltip: true
			} );

			// view.bind( 'isEnabled' ).to( command );

			view.on( 'done', ( evt, files ) => {
				// const videosToUpload = Array.from( files ).filter( file =>
				// 	videoMediaTypesRegExp.test( file.type )
				// );

				if ( files.length ) {
					const file: File = files[ 0 ];
					// editor.execute( 'uploadVideo', { files } );
					file.arrayBuffer().then( buffer => {
						mammoth
							.convertToHtml( { arrayBuffer: buffer } )
							.then( result => {
								const html = result.value; // The generated HTML
								const messages = result.messages; // Any messages, such as warnings during

								console.log( 'messages', messages );
								this.insertHTML( html );
							} );

						editor.editing.view.focus();
					} );
				}
			} );

			return view;
		} );
	}

	private insertHTML( html: string ) {
		const viewFragment = this.editor.data.processor.toView( html );
		const modelFragment = this.editor.data.toModel( viewFragment );
		this.editor.model.insertContent( modelFragment );
	}
}
