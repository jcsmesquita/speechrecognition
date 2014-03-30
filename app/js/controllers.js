'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {



	$scope.word = ""; 		// Initialize our word
	$scope.transcript = "";
	$scope.init = false;	// No answers given yet.

	$scope.recognition = new webkitSpeechRecognition();
	$scope.recognition.continuous = true;
	$scope.recognition.interimResults = true;
	
	$scope.correctSound = new Audio("audio/correct.wav");
	$scope.wrongSound = new Audio("audio/error.wav"); 
	

	$scope.recognition.onend = function(event) {
		console.log("speech ended");
		$scope.mic = false;
		$scope.resetAnswer();
		$scope.$apply();
	}

	$scope.recognition.onresult = function(event) {
		$scope.init = true;
		console.log(event);
		if(event.results[event.resultIndex].isFinal){
			$scope.transcript = event.results[event.resultIndex][0].transcript;

			if($scope.word != ""){
				if($scope.word.trim().toLowerCase() == $scope.transcript.trim().toLowerCase()){
					$scope.answer = true;
					$scope.correctSound.play();
				} else {
					$scope.answer = false;
					$scope.wrongSound.play();
				}

			}
			$scope.$apply();
		}
	}

	$scope.startRec = function(){
		$scope.transcript;
		$scope.recognition.start();
		$scope.mic = true;
	}
	$scope.stopRec = function(){
		$scope.recognition.stop();
	}
	$scope.resetAnswer = function() {
		$scope.answer = null;
		$scope.init = false;
	}
	$scope.toggleMic = function() {
		if(!$scope.mic)
			$scope.startRec();
		else
			$scope.stopRec();
	}
	$scope.populateDialects = function() {
		// Deep copy
		var cDial;
		$scope.currentDialects = angular.copy($scope.langs[$scope.language]);
		$scope.currentDialects.shift();
		// if($scope.currentDialects.length == 1)
		$scope.dialect = $scope.currentDialects[0][0];
	}

	$scope.setDialect = function(){
		$scope.dialect = $scope.currentDialects[$scope._dia][0];
	}

	$scope.$watch("dialect", function(newValue, oldValue){
		$scope.recognition.lang = $scope.dialect;
	})

	$scope.langs =
		[['Afrikaans',       ['af-ZA']],
		 ['Bahasa Indonesia',['id-ID']],
		 ['Bahasa Melayu',   ['ms-MY']],
		 ['Català',          ['ca-ES']],
		 ['Čeština',         ['cs-CZ']],
		 ['Deutsch',         ['de-DE']],
		 ['English',         ['en-AU', 'Australia'],
		                     ['en-CA', 'Canada'],
		                     ['en-IN', 'India'],
		                     ['en-NZ', 'New Zealand'],
		                     ['en-ZA', 'South Africa'],
		                     ['en-GB', 'United Kingdom'],
		                     ['en-US', 'United States']],
		 ['Español',         ['es-AR', 'Argentina'],
		                     ['es-BO', 'Bolivia'],
		                     ['es-CL', 'Chile'],
		                     ['es-CO', 'Colombia'],
		                     ['es-CR', 'Costa Rica'],
		                     ['es-EC', 'Ecuador'],
		                     ['es-SV', 'El Salvador'],
		                     ['es-ES', 'España'],
		                     ['es-US', 'Estados Unidos'],
		                     ['es-GT', 'Guatemala'],
		                     ['es-HN', 'Honduras'],
		                     ['es-MX', 'México'],
		                     ['es-NI', 'Nicaragua'],
		                     ['es-PA', 'Panamá'],
		                     ['es-PY', 'Paraguay'],
		                     ['es-PE', 'Perú'],
		                     ['es-PR', 'Puerto Rico'],
		                     ['es-DO', 'República Dominicana'],
		                     ['es-UY', 'Uruguay'],
		                     ['es-VE', 'Venezuela']],
		 ['Euskara',         ['eu-ES']],
		 ['Français',        ['fr-FR']],
		 ['Galego',          ['gl-ES']],
		 ['Hrvatski',        ['hr_HR']],
		 ['IsiZulu',         ['zu-ZA']],
		 ['Íslenska',        ['is-IS']],
		 ['Italiano',        ['it-IT', 'Italia'],
		                     ['it-CH', 'Svizzera']],
		 ['Magyar',          ['hu-HU']],
		 ['Nederlands',      ['nl-NL']],
		 ['Norsk bokmål',    ['nb-NO']],
		 ['Polski',          ['pl-PL']],
		 ['Português',       ['pt-BR', 'Brasil'],
		                     ['pt-PT', 'Portugal']],
		 ['Română',          ['ro-RO']],
		 ['Slovenčina',      ['sk-SK']],
		 ['Suomi',           ['fi-FI']],
		 ['Svenska',         ['sv-SE']],
		 ['Türkçe',          ['tr-TR']],
		 ['български',       ['bg-BG']],
		 ['Pусский',         ['ru-RU']],
		 ['Српски',          ['sr-RS']],
		 ['한국어',            ['ko-KR']],
		 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
		                     ['cmn-Hans-HK', '普通话 (香港)'],
		                     ['cmn-Hant-TW', '中文 (台灣)'],
		                     ['yue-Hant-HK', '粵語 (香港)']],
		 ['日本語',           ['ja-JP']],
		 ['Lingua latīna',   ['la']]];

  }])
  .controller('MyCtrl2', [function() {

  }]);
