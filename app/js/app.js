(function() {
    'use strict';

    var depedencies = ['sdx.elements','ngSanitize'];

    angular.module('app', depedencies)
        .controller('appCtrl', ['$scope', '$rootScope', appCtrl])
        .run(['$rootScope', '$templateCache', runFn])
        .config([configFn]);
        
    function appCtrl($scope, $rootScope) {
    	
    	$scope.table1= {
            datas: [
                {
                    "cb": "Mr",
                    "civ": '6',
                    "firstname": "Léon",
                    "name":"Loukine"
                
                }
            ],
            //Configuration générale du tableau rien n'est obligatoire configuration default dans sdxTableCtrl
            configTable:{ 
                currentSize:11,
                currentPage:1,
                widthSlideBtn:30,
                options : [
                    { value: 5, name: 'Affichage par  5' },
                    { value: 10, name: 'Affichage par 10' },
                    { value: 50, name: 'Affichage par 50' },
                    { value: 100, name: 'Affichage par 100' },
                    { value: 500, name: 'Affichage par 500 ' }
                ],
                select:true,
                search:true,
                combo:true,
                snapGridCheck:6,
                selectedOptionDefault:0,
                propertyName:'cb',
                reverse:false,
                paddingThTb:7,
                paddingCellLr:10,
                paddingCellTb:20,
                help:true, 
                helpContent:'<strong>votre aide  lorem epsum</strong> dolor sit amet !'

            },
            //Configuration des options de cellules
            optionsCells:[
			      {
			        key: "cb",
			        label: "action",
			        config: {
		                show:true,
		                type:'checkAll',
		                order:true,
		                width:100,
                        include:true,
                        default:false,
                        fixed:true

		            }
			      },
			      {
			        key: "civ",
			        label: "Civilités",
			        config: {
		                show:true,
		                type:'default',
		                order:true,
		                width:100,
                        include:true,
                        default:false,
                        fixed:false
		            }
			      },
			      {
			        key: "firstname",
			        label: "Prénom",
			        config: {
		                show:true,
		                type:'',
		                order:true,
		                width:150,
                        include:true,
                        default:false,
                        fixed:false

		            }
			      },
			      {
			        key: "name",
			        label: "Nom",
			        config: {
		                show:true,
		                type:'default',
		                order:true,
		                width:150,                        
                        include:true,
                        default:false,
                        fixed:false

		            }
			      }

            ]
        };
        
        $scope.table = {
            datas: [{
                "_id": "0",
                "index": "0",
                "guid": "3b3cfae1-4693-482c-b6a8-a11fcbbcc05c",
                "isActive": true,
                "balance": "$3,724.67",
                "picture": "./img/facelorem.jpg",
                "age": 30,
                "eyeColor": "blue",
                "address": "278 Schweikerts Walk, Westphalia, North Dakota, 8663 1 2 3 4 5 6 7 8 9 10 11 12 13 55 6+6 fs df565f+sd 48f545sdfds 456fsdfds 278 Schweikerts Walk, Westphalia, North Dakota, 8663 1 2 3 4 5 6 7 8 9 10 11 12 13 55 6+6 fs df565f+sd 48f545sdfds 456fsdfds 278 Schweikerts Walk, Westphalia, North Dakota, 8663 1 2 3 4 5 6 7 8 9 10 11 12 13 55 6+6 fs df565f+sd 48f545sdfds 456fsdfds"
            },
            {
                "_id": "2",
                "index": '<a href="#">links!</a> and other <em>stuff</em>',
                "guid": "275cfed7-258d-44ca-ab8c-fc52a7e65582",
                "isActive": false,
                "balance": "$3,416.39",
                "picture": "./img/facelorem.jpg",
                "age": 23,
                "eyeColor": "brown",
                "address": "847 Falmouth Street, Makena, District Of Columbia, 7953"
            }, {
                "_id": "3",
                "index": "<button>press on my face</button>",
                "guid": "3f596b68-8bc5-4601-9e3c-af723fb1d7bd",
                "isActive": false,
                "balance": "$1,133.08",
                "picture": "./img/facelorem.jpg",
                "age": 40,
                "eyeColor": "brown",
                "address": "606 Hanover Place, Gordon, Arizona, 1290"
            }, {
                "_id": "4",
                "index": '3',
                "guid": "0314f19b-0ee1-4354-9a56-902246394a25",
                "isActive": true,
                "balance": "$3,996.24",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "brown",
                "address": "563 Eaton Court, Drummond, Minnesota, 2516"
            }, {
                "_id": "5",
                "index":' 4',
                "guid": "5a7a650e-cbf6-4027-91f0-554a753e8579",
                "isActive": true,
                "balance": "$3,726.32",
                "picture": "./img/facelorem.jpg",
                "age": 29,
                "eyeColor": "green",
                "address": "397 Bristol Street, Jacksonburg, Virgin Islands, 3389"
            }, {
                "_id": "6",
                "index": '5',
                "guid": "1c14262f-98eb-4a04-8d82-fb33384f6555",
                "isActive": true,
                "balance": "$2,253.92",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "green",
                "address": "225 Debevoise Street, Frierson, Florida, 6712"
            },
            {
                "_id": "7",
                "index": '1',
                "guid": "275cfed7-258d-44ca-ab8c-fc52a7e65582",
                "isActive": false,
                "balance": "$3,416.39",
                "picture": "./img/facelorem.jpg",
                "age": 23,
                "eyeColor": "brown",
                "address": "847 Falmouth Street, Makena, District Of Columbia, 7953"
            }, {
                "_id": "8",
                "index": '2',
                "guid": "3f596b68-8bc5-4601-9e3c-af723fb1d7bd",
                "isActive": false,
                "balance": "$1,133.08",
                "picture": "./img/facelorem.jpg",
                "age": 40,
                "eyeColor": "brown",
                "address": "606 Hanover Place, Gordon, Arizona, 1290"
            }, {
                "_id": "27",
                "index": '3',
                "guid": "0314f19b-0ee1-4354-9a56-902246394a25",
                "isActive": true,
                "balance": "$3,996.24",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "brown",
                "address": "563 Eaton Court, Drummond, Minnesota, 2516"
            }, {
                "_id": "9",
                "index": '4',
                "guid": "5a7a650e-cbf6-4027-91f0-554a753e8579",
                "isActive": true,
                "balance": "$3,726.32",
                "picture": "./img/facelorem.jpg",
                "age": 29,
                "eyeColor": "green",
                "address": "397 Bristol Street, Jacksonburg, Virgin Islands, 3389"
            }, {
                "_id": "10",
                "index": '5',
                "guid": "1c14262f-98eb-4a04-8d82-fb33384f6555",
                "isActive": true,
                "balance": "$2,253.92",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "green",
                "address": "225 Debevoise Street, Frierson, Florida, 6712"
            },
            {
                "_id": "11",
                "index": '1',
                "guid": "275cfed7-258d-44ca-ab8c-fc52a7e65582",
                "isActive": false,
                "balance": "$3,416.39",
                "picture": "./img/facelorem.jpg",
                "age": 23,
                "eyeColor": "brown",
                "address": "847 Falmouth Street, Makena, District Of Columbia, 7953"
            }, {
                "_id": "12",
                "index": '2',
                "guid": "3f596b68-8bc5-4601-9e3c-af723fb1d7bd",
                "isActive": false,
                "balance": "$1,133.08",
                "picture": "./img/facelorem.jpg",
                "age": 40,
                "eyeColor": "brown",
                "address": "606 Hanover Place, Gordon, Arizona, 1290"
            }, {
                "_id": "13",
                "index": '3',
                "guid": "0314f19b-0ee1-4354-9a56-902246394a25",
                "isActive": true,
                "balance": "$3,996.24",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "brown",
                "address": "563 Eaton Court, Drummond, Minnesota, 2516"
            }, {
                "_id": "14",
                "index": '4',
                "guid": "5a7a650e-cbf6-4027-91f0-554a753e8579",
                "isActive": true,
                "balance": "$3,726.32",
                "picture": "./img/facelorem.jpg",
                "age": 29,
                "eyeColor": "green",
                "address": "397 Bristol Street, Jacksonburg, Virgin Islands, 3389"
            }, {
                "_id": "15",
                "index": '5',
                "guid": "1c14262f-98eb-4a04-8d82-fb33384f6555",
                "isActive": true,
                "balance": "$2,253.92",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "green",
                "address": "225 Debevoise Street, Frierson, Florida, 6712"
            },
            {
                "_id": "16",
                "index": '1',
                "guid": "275cfed7-258d-44ca-ab8c-fc52a7e65582",
                "isActive": false,
                "balance": "$3,416.39",
                "picture": "./img/facelorem.jpg",
                "age": 23,
                "eyeColor": "brown",
                "address": "847 Falmouth Street, Makena, District Of Columbia, 7953"
            }, {
                "_id": "17",
                "index": '2',
                "guid": "3f596b68-8bc5-4601-9e3c-af723fb1d7bd",
                "isActive": false,
                "balance": "$1,133.08",
                "picture": "./img/facelorem.jpg",
                "age": 40,
                "eyeColor": "brown",
                "address": "606 Hanover Place, Gordon, Arizona, 1290"
            }, {
                "_id": "18",
                "index": '3',
                "guid": "0314f19b-0ee1-4354-9a56-902246394a25",
                "isActive": true,
                "balance": "$3,996.24",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "brown",
                "address": "563 Eaton Court, Drummond, Minnesota, 2516"
            }, {
                "_id": "19",
                "index": '4',
                "guid": "5a7a650e-cbf6-4027-91f0-554a753e8579",
                "isActive": true,
                "balance": "$3,726.32",
                "picture": "./img/facelorem.jpg",
                "age": 29,
                "eyeColor": "green",
                "address": "397 Bristol Street, Jacksonburg, Virgin Islands, 3389"
            }, {
                "_id": "20",
                "index": '5',
                "guid": "1c14262f-98eb-4a04-8d82-fb33384f6555",
                "isActive": true,
                "balance": "$2,253.92",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "green",
                "address": "225 Debevoise Street, Frierson, Florida, 6712"
            }, 
            {
                "_id": "21",
                "index": '1',
                "guid": "275cfed7-258d-44ca-ab8c-fc52a7e65582",
                "isActive": false,
                "balance": "$3,416.39",
                "picture": "./img/facelorem.jpg",
                "age": 23,
                "eyeColor": "brown",
                "address": "847 Falmouth Street, Makena, District Of Columbia, 7953"
            }, {
                "_id": "22",
                "index": '2',
                "guid": "3f596b68-8bc5-4601-9e3c-af723fb1d7bd",
                "isActive": false,
                "balance": "$1,133.08",
                "picture": "./img/facelorem.jpg",
                "age": 40,
                "eyeColor": "brown",
                "address": "606 Hanover Place, Gordon, Arizona, 1290"
            }, {
                "_id": "23",
                "index": '3',
                "guid": "0314f19b-0ee1-4354-9a56-902246394a25",
                "isActive": true,
                "balance": "$3,996.24",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "brown",
                "address": "563 Eaton Court, Drummond, Minnesota, 2516"
            }, {
                "_id": "24",
                "index": '4',
                "guid": "5a7a650e-cbf6-4027-91f0-554a753e8579",
                "isActive": true,
                "balance": "$3,726.32",
                "picture": "./img/facelorem.jpg",
                "age": 29,
                "eyeColor": "green",
                "address": "397 Bristol Street, Jacksonburg, Virgin Islands, 3389"
            }, {
                "_id": "25",
                "index": '5',
                "guid": "1c14262f-98eb-4a04-8d82-fb33384f6555",
                "isActive": true,
                "balance": "$2,253.92",
                "picture": "./img/facelorem.jpg",
                "age": 37,
                "eyeColor": "green",
                "address": "225 Debevoise Street, Frierson, Florida, 6712"
            }, {
                "_id": "26",
                "index": '6',
                "guid": "2737ab14-5aa8-4e72-b7ec-6fce8b9aabbd",
                "isActive": true,
                "balance": "$1,517.50",
                "picture": "./img/facelorem.jpg",
                "age": 25,
                "eyeColor": "blue",
                "address": "627 Burnett Street, Waterview, Kansas, 4604"
            
            }],
            configTable:{ //Configuration générale du tableau rien n'est obligatoire configuration default dans sdxTableCtrl
                currentSize:10,
                currentPage:1,
                widthSlideBtn:30,
                options : [
                    { value: 5, name: 'Affichage par 5' },
                    { value: 10, name: 'Affichage par 10' },
                    { value: 50, name: 'Affichage par 50' },
                    { value: 100, name: 'Affichage par 100' },
                    { value: 500, name: 'Affichage par 500' }
                ],
                select:true,
                search:true,
                combo:true,
                snapGridCheck:6,
                selectedOptionDefault:0,
                propertyName:'_id',
                reverse:false,
                paddingThTb:7,
                paddingCellLr:10,
                paddingCellTb:5,
                help:true,
                helpContent:'Vous pouvez double cliquer sur les cellules, et selon la configuration de l\'écran le slide est possible...'

            },
            optionsCells:[
			      {
			        key: "_id",
			        label: "Id",
			        config: {
		                show:true,
		                type:'default',
		                order:true,
		                width:70,
                        include:true,
                        default:false,
                        fixed:true

		            }
			      },
			      {
			        key: "index",
			        label: "Index",
			        config: {
		                show:true,
		                type:'',
		                order:true,
		                width:95,
                        include:true,
                        default:false,
                        fixed:false
		            }
			      },
			      {
			        key: "guid",
			        label: "Guid",
			        config: {
		                show:true,
		                type:'input',
		                order:true,
		                width:250,
                        include:true,
                        default:false,
                        fixed:false

		            }
			      },
			      {
			        key: "isActive",
			        label: "IsActive",
			        config: {
		                show:true,
		                type:'checkAll',
		                order:true,
		                width:100,                        
                        include:true,
                        default:false,
                        fixed:false

		            }
			      },
			      {
			        key: "balance",
			        label: "Balance",
			        config: {
		                show:true,
		                type:'number',
		                order:true,
		                width:150,
                        include:true,
                        default:false,
                        fixed:false

		            }
			      },
			      {
			        key: "picture",
			        label: "Picture",
			        config: {
		                show:true,
		                type:'img',
		                order:false,
		                width:120,
                        include:true,
                        default:false,
                        fixed:true

		            }
			      },
			      {
			        key: "age",
			        label: "Age",
			        config: {
		                show:true,
		                type:'',
		                order:true,
		                width:100,
                        include:true,
                        default:false,
                        fixed:true

		            }
			      },
			      {
			        key: "eyeColor",
			        label: "Eye Color",
			        config: {
		                show:true,
		                type:'string',
		                order:true,
		                width:150,
                        include:true,
                        default:false,
                        fixed:false

		            }
			      },
			      {
			        key: "address",
			        label: "Adresse",
			        config: {
		                show:true,
		                type:'string',
		                order:true,
		                width:320,
                        include:true,
                        default:false,
                        fixed:false
		            }
			      }

            ]
        };
        
       $scope.currenttable=$scope.table; 

    };

    function runFn($rootScope, $templateCache) {

        $rootScope.$on('$viewContentLoaded', function() {
             $templateCache.removeAll();
             console.log('template cache removed !')
         });
        console.log('run main');
    };

    function configFn() {
        console.log('config app');
    };

})();
