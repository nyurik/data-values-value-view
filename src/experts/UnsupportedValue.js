/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */
( function( $, vv ) {
	'use strict';

	var PARENT = vv.Expert;

	/**
	 * Valueview expert for displaying (or rather not displaying) a data value not supported by the
	 * valueview UI because there is not specialised expert devoted to that data value type.
	 * @since 0.1
	 *
	 * @constructor
	 * @extends jQuery.valueview.Expert
	 */
	vv.experts.UnsupportedValue = vv.expert( 'UnsupportedValue', PARENT, {
		/**
		 * @type {Object}
		 */
		_options: {
			messages: {
				'valueview-expert-unsupportedvalue-unsupporteddatatype':
					'Handling of this value is not yet supported.',
				'valueview-expert-unsupportedvalue-unsupporteddatavalue':
					'Handling of values for this data type is not yet supported.'
			}
		},

		/**
		 * @see jQuery.valueview.Expert.rawValue
		 */
		rawValue: function() {
			return this.viewState().getTextValue();
		},

		/**
		 * @see jQuery.valueview.Expert._init
		 */
		_init: function() {
			// This expert just displays a message that whatever value currently set in the
			// valueview or whatever kind of value should be handled by the view is not supported.

			var value = this.viewState().value(),
				unsupportedIndicator,
				unsupportedMsg;

			if( !value && this.viewState().option( 'dataTypeId' ) ) {
				unsupportedIndicator = this.viewState().option( 'dataTypeId' );
				unsupportedMsg = this._messageProvider.getMessage(
					'valueview-expert-unsupportedvalue-unsupporteddatatype',
					[ unsupportedIndicator ]
				);
				// NOTE: Of course, this also implies that the data value type is unsupported but
				//  the message is actually more detailed than that.
			} else if( value || this.viewState().option( 'dataValueType' ) ) {
				var dataValueType = ( value )
					? value.getType()
					: this.viewState().option( 'dataValueType');
				unsupportedMsg = this._messageProvider.getMessage(
					'valueview-expert-unsupportedvalue-unsupporteddatavalue',
					[ dataValueType ]
				);
			} else {
				// Empty value set in view, but not even ability to display that as a value.
				// This case doesn't make much sense but defined against paranoia.
				unsupportedMsg = '';
			}

			this.$viewPort.text( unsupportedMsg );
		},

		/**
		 * @see jQuery.valueview.Expert.draw
		 */
		draw: function() {
			return $.Deferred().resolve().promise();
		}
	} );

}( jQuery, jQuery.valueview ) );
