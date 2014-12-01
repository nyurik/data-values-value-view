( function( $, ExpertExtender ) {
	'use strict';

	/**
	 * An `ExpertExtender` module which toggles DOM elements.
	 * @class jQuery.valueview.ExpertExtender.Toggler
	 * @since 0.6
	 * @licence GNU GPL v2+
	 * @author Adrian Lang <adrian.lang@wikimedia.de>
	 *
	 * @constructor
	 *
	 * @param {util.MessageProvider} messageProvider
	 * @param {jQuery} $subject
	 */
	ExpertExtender.Toggler = function( messageProvider, $subject ) {
		this._messageProvider = messageProvider;
		this.$subject = $subject;
		this.$toggler = $( '<a/>' );
	};

	$.extend( ExpertExtender.Toggler.prototype, {
		/**
		 * @property {util.MessageProvider}
		 * @private
		 */
		_messageProvider: null,

		/**
		 * @property {jQuery}
		 * @private
		 * @readonly
		 */
		$toggler: null,

		/**
		 * @property {jQuery}
		 * @private
		 * @readonly
		 */
		$subject: null,

		/**
		 * Callback for the `init` `ExpertExtender` event.
		 *
		 * @param {jQuery} $extender
		 */
		init: function( $extender ) {
			this.$toggler
				.addClass( 'valueview-expertextender-advancedtoggler' )
				.text( this._messageProvider.getMessage( 'valueview-expert-advancedadjustments' ) || 'more' );
			$extender.append( this.$toggler );
		},

		/**
		 * Callback for the `onInitialShow` `ExpertExtender` event.
		 */
		onInitialShow: function() {
			this.$toggler.toggler( { $subject: this.$subject } );
			this.$subject.hide();
		},

		/**
		 * Callback for the `destroy` `ExpertExtender` event.
		 */
		destroy: function() {
			var toggler = this.$toggler.data( 'toggler' );
			if( toggler ) {
				toggler.destroy();
			}
			this.$toggler = null;
			this.$subject = null;
			this._messageProvider = null;
		}
	} );
} ( jQuery, jQuery.valueview.ExpertExtender ) );
