// ==UserScript==
// @name         Mixlr Download Showreel
// @namespace    mixlr_download_showreel
// @description  Add links to download Showreel broadcasts on Mixlr.
// @homepageURL  https://github.com/daraeman/mixlr_download_showreel
// @author       daraeman
// @version      1.0
// @date         2016-01-15
// @include      /^https?:\/\/mixlr\.com\/\w+\/showreel\/*/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @downloadURL  https://github.com/daraeman/mixlr_download_showreel/raw/master/mixlr_download_showreel.user.js
// @updateURL    https://github.com/daraeman/mixlr_download_showreel/raw/master/mixlr_download_showreel.meta.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict( true );

function addStyles() {
	$( 'head' ).append(
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
	$( 'body' ).addClass( "mixlr_download_showreel" );
}

function addLinks() {
	for ( i = 0; i < broadcasts.length; i++ ) {
		var el = $( '.mixlr_player[data-broadcast_id="'+ broadcasts[i].id +'"]' );
		el.find( '.player_header .social_links' ).append( '<li><a class="mixlr_download_showreel_download" href="'+ broadcasts[i].streams.http.url +'" download="'+ broadcasts[i].user_slug +'_'+ broadcasts[i].title.replace( /[^\w]/g, '' ) +'.mp3"></a></li>' );
	}
}

var try_number = 0;
var max_tries = 1000;
var last_id = broadcasts[ broadcasts.length - 1 ].id;
var wait_for_mixlr_to_load_interval = setInterval(function(){
	if ( $( '.mixlr_player[data-broadcast_id="'+ last_id +'"]' ).length ) {
		addStyles();
		addLinks();
		clearInterval( wait_for_mixlr_to_load_interval );
	}
	if ( try_number++ > max_tries )
		clearInterval( mixlr_load_interval );
}, 250 );
