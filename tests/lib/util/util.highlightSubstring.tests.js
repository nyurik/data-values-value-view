/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( util, QUnit ) {
	'use strict';

QUnit.module( 'util.highlightSubstring' );

QUnit.test( 'Highlight with default options', function( assert ) {
	var testCases = [
		['', '', ''],
		['abc', 'abc', '<span class="highlight">abc</span>'],
		['abcdef', 'abc', '<span class="highlight">abc</span>def'],
		['abcdef', 'def', 'abcdef'],
		['abcdef', 'Abc', 'abcdef'],
		['Abcdef', 'abc', 'Abcdef'],
		['ABCDEF', 'abc', 'ABCDEF']
	];

	for( var i = 0; i < testCases.length; i++ ) {
		var string = testCases[i][0],
			substring = testCases[i][1],
			expected = testCases[i][2];

		assert.equal(
			util.highlightSubstring( substring, string ),
			expected,
			'Highlighting "' + substring + '" in "' + string + '" results in "' + expected + '".'
		);
	}
} );

QUnit.test( 'Highlight (caseInsensitive === true)', function( assert ) {
	var testCases = [
		['abcdef', 'abc', '<span class="highlight">abc</span>def'],
		['Abcdef', 'abc', '<span class="highlight">Abc</span>def'],
		['abcdef', 'Abc', '<span class="highlight">abc</span>def'],
		['ABCDEF', 'ABC', '<span class="highlight">ABC</span>DEF']
	];

	for( var i = 0; i < testCases.length; i++ ) {
		var string = testCases[i][0],
			substring = testCases[i][1],
			expected = testCases[i][2];

		assert.equal(
			util.highlightSubstring( substring, string, { caseInsensitive: true } ),
			expected,
			'Test set #' + i + ': Highlighting "' + substring + '" in "' + string + '" '
			+ 'results in "' + expected + '".'
		);
	}
} );

QUnit.test( 'Highlight (withinString === true)', function( assert ) {
	var testCases = [
		['abc', 'abc', '<span class="highlight">abc</span>'],
		['abcdef', 'abc', '<span class="highlight">abc</span>def']
	];

	for( var i = 0; i < testCases.length; i++ ) {
		var string = testCases[i][0],
			substring = testCases[i][1],
			expected = testCases[i][2];

		assert.equal(
			util.highlightSubstring( substring, string, { withinString: true } ),
			expected,
			'Test set #' + i + ': Highlighting "' + substring + '" in "' + string + '" '
			+ 'results in "' + expected + '".'
		);
	}
} );

QUnit.test( 'Highlight (wrapperNodeName, wrapperNodeClass)', function( assert ) {
	var testCases = [
		['abcdef', 'a', '<div class="highlight">a</div>bcdef', {
			wrapperNodeName: 'div'
		}],
		['abcdef', 'a', '<span class="another-class">a</span>bcdef', {
			wrapperNodeClass: 'another-class'
		}],
		['abcdef', 'a', '<div class="another-class">a</div>bcdef', {
			wrapperNodeName: 'div',
			wrapperNodeClass: 'another-class'
		}]
	];

	for( var i = 0; i < testCases.length; i++ ) {
		var string = testCases[i][0],
			substring = testCases[i][1],
			expected = testCases[i][2];

		assert.equal(
			util.highlightSubstring( substring, string, testCases[i][3] ),
			expected,
			'Test set #' + i + ': Highlighting "' + substring + '" in "' + string + '" '
			+ 'results in "' + expected + '".'
		);
	}
} );

}( util, QUnit ) );
