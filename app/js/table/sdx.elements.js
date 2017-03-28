(function(){
	'use strict';

	var depedencies = ['sdx.elements.table','sdx.elements.pagination','sdxfullscreen'];

	angular.module('sdx.elements', depedencies)
	.run([runFn])
	.config([configFn]);

	function runFn() {
		console.log('run sdx.elements');
	};

	function configFn() {

	};


})();