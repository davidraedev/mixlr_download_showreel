// ==UserScript==
// @name         Mixlr Download Showreel
// @namespace    mixlr_download_showreel
// @version      0.1
// @description  Add links to download Showreel broadcasts on Mixlr.
// @author       daraeman
// @include      /^https?:\/\/mixlr\.com\/bird_rock\/showreel\/*/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @grant        none
// ==/UserScript==

function addLinks() {
	for ( i = 0; i < broadcasts.length; i++ ) {
		var el = jQuery( '.mixlr_player[data-broadcast_id="'+ broadcasts[i].id +'"]' );
		el.find( '.player_header .social_links' ).append( '<li><a class="mixlr_download_showreel_download" href="'+ broadcasts[i].mp3 +'"></a></li>' );
	}
}

function displayMessage( msg, error ) {
	if ( error )
		console.error( msg );
	else
		console.log( msg );
}

function addStyles() {
	jQuery( 'head' ).append(
		'<style type="text/css">' +
		'	.mixlr_download_showreel .mixlr_player .social_links .mixlr_download_showreel_download {' +
		'		width: 1.500em;' +
		'		height: 0.500em;' +
		'		border: 0.250em solid rgb( 200,200,200 );' +
		'		border-top: none;' +
		'		position: absolute;' +
		'		bottom: 0.2em;' +
		'		position: relative;' +
		'		margin-top: 1em;' +
		'		background: transparent;' +
		'		top: -0.05em;' +
		'	}' +
		'	.mixlr_download_showreel .mixlr_player .social_links .mixlr_download_showreel_download:before {' +
		'		content: "";' +
		'		position: absolute;' +
		'		width: 0.438em;' +
		'		height: 0.625em;' +
		'		background: rgb( 200,200,200 );' +
		'		top: -0.875em;' +
		'		left: 0.4em;' +
		'	}' +
		'	.mixlr_download_showreel .mixlr_player .social_links .mixlr_download_showreel_download:after {' +
		'		width: 0em;' +
		'		height: 0em;' +
		'		content: "";' +
		'		position: absolute;' +
		'		border-style: solid;' +
		'		border-color: rgb( 200,200,200 ) transparent transparent transparent;' +
		'		border-width: 0.500em;' +
		'		left: 0.10em;' +
		'		top: -0.250em;' +
		'	}' +
		'</style>'
	);
	jQuery( 'body' ).addClass( "mixlr_download_showreel" );
}

/* script logic */

if ( broadcasts ) {
	addStyles();
	addLinks();
}
else
	displayMessage( "Mixlr Download Showreel Error: broadcasts empty" );
