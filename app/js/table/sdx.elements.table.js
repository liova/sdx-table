(function() {
    'use strict';

    var depedencies = ['hmTouchEvents'];

    angular.module('sdx.elements.table', depedencies)
        .controller('sdxTableCtrl', ['$scope', '$rootScope', '$timeout', '$document', '$filter', sdxTableCtrl])
        .controller('sdxFixThTableCtrl', ['$scope', '$rootScope', '$timeout', '$document', '$filter', sdxFixThTableCtrl])
        .directive('sdxTable', [sdxTable])
        .directive('sdxFixThTable', [sdxFixThTable])
        .run([runFn])
        .config([configFn])
        .filter('unsafe', ['$sce', unsafe]);

    function unsafe($sce) {
        return $sce.trustAsHtml;
    }

    function sdxTableCtrl($scope, $rootScope, $timeout, $document, $filter) {

        var vm = this;
        vm.data.configTable.combo = angular.isDefined(vm.data.configTable.combo) ? vm.data.configTable.combo : true;
        vm.data.configTable.widthSlideBtn = angular.isDefined(vm.data.configTable.widthSlideBtn) ? vm.data.configTable.widthSlideBtn : true;
        vm.data.configTable.search = angular.isDefined(vm.data.configTable.search) ? vm.data.configTable.search : true;
        vm.data.configTable.select = angular.isDefined(vm.data.configTable.select) ? vm.data.configTable.select : true;
        vm.data.configTable.combo = angular.isDefined(vm.data.configTable.combo) ? vm.data.configTable.combo : true;
        vm.currentSize = angular.isDefined(vm.data.configTable.currentSize) ? vm.data.configTable.currentSize : 2;
        vm.currentPage = angular.isDefined(vm.data.configTable.currentPage) ? vm.data.configTable.currentPage : 1;
        vm.optionsDefault = [
            { value: 5, name: 'Afficher 5' },
            { value: 10, name: 'Afficher 10' },
            { value: 50, name: 'Afficher 50' },
            { value: 100, name: 'Afficher 100' }
        ];
        vm.selectedOptionDefault = angular.isDefined(vm.data.configTable.options) ? vm.optionsDefault : 0;
        if (angular.isDefined(vm.data.configTable.options)) {
            vm.options = vm.data.configTable.options;
        } else {
            vm.options = vm.optionsDefault;
        }
        vm.selectedOption = vm.options[0];
        vm.propertyName = angular.isDefined(vm.data.configTable.propertyName) ? vm.data.configTable.propertyName : '';
        vm.reverse = angular.isDefined(vm.data.configTable.reverse) ? vm.data.configTable.reverse : true;
        vm.pref = true;
        vm.inner = 0;
        vm.outer = 0;
        vm.lastindex = 0;
        vm.activpos = 0;
        vm.firstpos = 0;
        vm.lastpos = 0;
        vm.optionsslide = [];
        vm.dsbLeft = false;
        vm.dsbRight = false;
        vm.positionOuter = 0;
        vm.positionInner = 0;
        vm.paddingCellLr = vm.data.configTable.paddingCellLr;
        vm.xPos = 0;
        vm.diff = 0;
        vm.lastactive;
        vm.respondActive = false;
        vm.fixed = '';
        vm.decalFixed = 0;
        vm.datath = [];
        vm.datakey = [];
        vm.scrollTable = false;
        vm.ficheKey='';

        vm.makeUniqId = function() {
            for (var i = 0; i < vm.data.datas.length; i++) {
                vm.data.datas[i].uniqueId = i;
            }
        };
        vm.makeUniqId();

        vm.sortBy = function(value) {
            vm.reverse = (vm.propertyName == value) ? !vm.reverse : false;
            vm.propertyName = value;
            vm.currentPage = 1;
        };

        vm.fixedCategory = function(item, width, classFix, padh, padv, th, key) {
            vm.decalFixed = 0;
            if (item != vm.fixed) {
                vm.fixed = item;
                var widthFix, heightFix, padH = padh,
                    padV = padv;
                widthFix = $(classFix).outerWidth(true);
                heightFix = $(classFix).outerHeight(true);
                vm.decalFixed = widthFix;
                $('#' + vm.sdxTableId + ' .fixthis').css({ display: 'block', width: widthFix })
                $('#' + vm.sdxTableId + ' .slideContent').css({ paddingLeft: vm.decalFixed })
                vm.sizeTable('resize');
                vm.dataFixed = vm.fixed;
                vm.datath = th;
                vm.datathheight = heightFix;
                vm.thisth = classFix;
                vm.datakey = key;

            } else {
                vm.decalFixed = 0;
                $('#' + vm.sdxTableId + ' .fixthis').css({ display: 'none' });
                $('#' + vm.sdxTableId + ' .fixthis').html();
                $('#' + vm.sdxTableId + ' .slideContent').css({ paddingLeft: vm.decalFixed })
                vm.dataFixed = '';
                vm.fixed = '';
                vm.sizeTable('resize');
            }

        }
        vm.zoom=false;
        vm.toggleFullScreen = function() {
            vm.zoom= !vm.zoom;
        }
        vm.setCheckValue = function(arg, arg1,arg2) {
            console.log(arg, arg1,arg2, ' in table')
            var tr = vm.data.datas;
            if(!arg1){
                console.log(vm.data.optionsCells)
            }
            for (var i = 0; i < tr.length; i++) {
                if (tr[i]['uniqueId'] === arg) {
                    tr[i][arg2] = arg1;
                    $('#' + vm.sdxTableId + ' #'+vm.sdxTableId +'table'+arg2 + vm.data.datas[i]['uniqueId']).attr('checked', arg1);
                    $('#' + vm.sdxTableId + ' #'+vm.sdxTableId +'table' +arg2 + vm.data.datas[i]['uniqueId']).prop('checked', arg1);
                
                    break;
                }
            }   
        }

        vm.checkAllWatch = function(arg, val,model) {
            console.log(arg, val,model ,' in table all ')
            vm.data.datas;
            for (var i = 0; i < vm.data.datas.length; i++) {
                vm.data.datas[i][arg] = val;
                $('#' + vm.sdxTableId + ' #'+vm.sdxTableId +'table'+arg + vm.data.datas[i]['uniqueId']).attr('checked', val);
                $('#' + vm.sdxTableId + ' #'+vm.sdxTableId +'table' +arg + vm.data.datas[i]['uniqueId']).prop('checked', val);
            };
        };

        vm.sizeTable = function(direction) {
            vm.inner = 0;
            vm.lastindex = vm.data.optionsCells.length;
            vm.optionsslide = [];
            var width = [],
                left = [];
            for (var i = 0; i < vm.lastindex; i++) {
                if (vm.data.optionsCells[i].config.show == true && vm.data.optionsCells[i].config.include == true && vm.data.optionsCells[i].key != vm.fixed) {
                    vm.data.optionsCells[i].config.left = vm.inner;
                    vm.inner += vm.data.optionsCells[i].config.width;
                    vm.data.optionsCells[i].config.next = vm.inner;
                    width.push(vm.data.optionsCells[i].config.width);
                    left.push(vm.data.optionsCells[i].config.next);
                    vm.lastactive = i;
                }
            }
            vm.optionsslide.push(width, left);
            vm.outer = $('#' + vm.sdxTableId).outerWidth(true);

            if (direction == 'resize') {
                vm.difference = vm.outer - vm.inner;
                vm.dsbRight = false;
                vm.xPos = 0;
                vm.dsbLeft = false;
                vm.activpos = 0;
                vm.currentX=0;
                angular.element(document.querySelector('#' + vm.sdxTableId + ' .slideContent')).animate({ left: -vm.xPos });
                var heightThead = $('.thead').height();
                $('#' + vm.sdxTableId + ' .table-arrow').css({ height: '100%' });
                $('#' + vm.sdxTableId + ' .table-arrow-right i,.table-arrow-left i').css({ top: heightThead * 2 });
                if (vm.outer < vm.inner) {
                    $('#' + vm.sdxTableId + ' .fixthis').animate({ left: 0 });
                    $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: 0 });
                    $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: -30 });
                } else {
                    $('#' + vm.sdxTableId + ' .fixthis').animate({ left: 0 });
                    $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: -30 });
                    $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: -30 });
                }
            }
            if (vm.outer < vm.inner) {
                vm.lastpos = vm.optionsslide[0].length;
                if (direction == 'left' && vm.activpos > vm.firstpos) {
                    vm.dsbRight = false;
                    vm.diff = vm.outer + vm.xPos - vm.data.configTable.widthSlideBtn;
                    vm.activpos--;
                    $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: 0 });
                    if (vm.diff >= vm.inner) {
                        vm.xPos = vm.optionsslide[1][vm.activpos - 1] - vm.data.configTable.widthSlideBtn;
                    } else {
                        vm.xPos = vm.optionsslide[1][vm.activpos - 1] - vm.data.configTable.widthSlideBtn;
                        if (vm.activpos == 0) {
                            vm.xPos = 0;
                            vm.dsbLeft = true;
                            $('#' + vm.sdxTableId + ' .fixthis').animate({ left: 0 });
                            $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: -30 });
                        }
                    }
                    angular.element(document.querySelector('#' + vm.sdxTableId + ' .slideContent')).animate({ left: -vm.xPos });

                } else if (direction == 'right' && vm.activpos < vm.lastpos) {
                    vm.dsbLeft = false;
                    vm.disabledslide = true;
                    vm.xPos = vm.optionsslide[1][vm.activpos] - vm.data.configTable.widthSlideBtn;
                    $('#' + vm.sdxTableId + ' .fixthis').animate({ left: vm.data.configTable.widthSlideBtn });
                    $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: 0 });

                    vm.diff = vm.outer - vm.decalFixed + vm.xPos;

                    if (vm.diff < vm.inner) {
                        $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: 0 });
                        vm.activpos++;

                    } else if (vm.diff >= vm.inner) {
                        vm.activpos++;
                        vm.xPos = (vm.inner - vm.outer) + vm.decalFixed;
                        vm.dsbRight = true;
                        $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: -30 });
                    }
                    angular.element(document.querySelector('#' + vm.sdxTableId + ' .slideContent')).animate({ left: -vm.xPos });

                } else if (direction == 'leftPlus' && vm.activpos > vm.firstpos) {
                    vm.dsbRight = false;
                    vm.xPos = 0;
                    vm.currentX = 0;
                    vm.dsbLeft = true;
                    vm.activpos = 0;
                    $('#' + vm.sdxTableId + ' .fixthis').animate({ left: 0 });
                    $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: -30 });
                    $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: 0 });
                    angular.element(document.querySelector('#' + vm.sdxTableId + ' .slideContent')).css({ left: -vm.xPos });
                } else if (direction == 'rightPlus' && vm.activpos < vm.lastpos) {

                    vm.dsbRight = true;
                    vm.xPos = 0;
                    vm.dsbLeft = false;


                    vm.xPos = (vm.inner - vm.outer) + vm.decalFixed;
                    vm.currentX = vm.xPos;
                    $('#' + vm.sdxTableId + ' .fixthis').animate({ left: vm.data.configTable.widthSlideBtn });
                    $('#' + vm.sdxTableId + ' .table-arrow-right').animate({ right: -30 });
                    $('#' + vm.sdxTableId + ' .table-arrow-left').animate({ left: 0 });
                    for (var i = 0; i < vm.optionsslide[1].length; i++) {
                        if (vm.optionsslide[1][i] <= vm.xPos) {
                            vm.activpos = i;
                        }
                    }
                    angular.element(document.querySelector('#' + vm.sdxTableId + ' .slideContent')).css({ left: -vm.xPos });
                }
            }
            vm.currentX = $('#' + vm.sdxTableId + ' .slideContent').position().left;
        }
        vm.eventType = "No events yet";
        vm.eventDeltaX = 0;
        vm.currentX = 0;
        /*vm.onHammer = function onHammer(event) {
            switch (event.type) {

                // au touch (quel que soit l'événement), on initialise les variables
                case "touch":
                    lastScale = scale;
                    lastPositionX = positionX;
                    lastPositionY = positionY;
                    break;

                case "tap":
                    txt = "Tap : changement de couleur";
                    // couleur au hasard
                    $ball.css("background", '#' + Math.floor(Math.random() * 16777215).toString(16));
                    break;

                case "doubletap":
                    txt = "DoubleTap : changement de forme";
                    if (square)
                        $ball.css("border-radius", "50%");
                    else
                        $ball.css("border-radius", "10px");
                    square = !square;
                    break;

                case "transformstart":
                    txt = "Transform : zoom sur la forme";
                    break;

                case "transform":
                    scale = Math.min(2, Math.max(0.2, lastScale * event.gesture.scale));
                    break;

                case "dragstart":
                    txt = "Drag : déplacement de la forme";
                    break;

                case "drag":
                    positionX = lastPositionX + event.gesture.deltaX;
                    positionY = lastPositionY + event.gesture.deltaY;
                    break;

                case "hold":
                    txt = "Hold : on enfonce la forme";
                    if (pushed)
                        boxShadow = "";
                    else
                        boxShadow = "inset 0px 0px 53px 1px rgba(0,0,0,0.75)";
                    pushed = !pushed;

                    $ball.css("-webkit-box-shadow", boxShadow);
                    $ball.css("-moz-box-shadow", boxShadow);
                    $ball.css("box-shadow", boxShadow);
                    break;
            }

            transform = "translate3d(" + positionX + "px, " + positionY + "px, 0)" +
                "scale(" + scale + ")";

            $ball.css("transform", transform);
            $ball.css("-ms-transform", transform);
            $ball.css("-webkit-transform", transform);
        }*/
        vm.ficheOpen = function(){

        }
        vm.ficheClose = function(){

        }
        vm.onHammer = function onHammer(event) {
            vm.eventType = event.type;
            console.log(vm.eventType)
            if (vm.difference < 0) {
                if (vm.eventType == "panleft") {
                    vm.currentType='left';
                } else if (vm.eventType == "panright") {
                    vm.currentType='right';
                } else if (vm.eventType == "panend") {
                    if(vm.currentType=='left'  && vm.dsbRight==false){
                        vm.sizeTable('right');                       
                    }else if(vm.currentType=='right'  && vm.dsbLeft==false){
                        vm.sizeTable('left');
                    }
                }else if(vm.eventType == "doubletap"){
                    console.log('tap tap !!!',vm.ficheKey);
                }
            }
        };

        $timeout(function() {
            vm.sizeTable('resize');
        });

        $(window).resize(function() {
            $scope.$apply(function() {
                vm.sizeTable('resize');
            });
        });

        //header table fixed
        $document.scroll( function() {
             if ($document.scrollTop() >= $('#' + vm.sdxTableId).offset().top) {
                vm.scrollTable = true;
                $('#' + vm.sdxTableId + ' .thead,#' + vm.sdxTableId + ' .table-arrow, .fixth').addClass('fixed');
                $('#' + vm.sdxTableId + ' .thead,#' + vm.sdxTableId + ' .table-arrow, .fixth').css({ top: 0+'px' });
            } else {
                vm.scrollTable = false;
                $('#' + vm.sdxTableId + ' .thead,#' + vm.sdxTableId + ' .table-arrow, .fixth').removeClass('fixed');
                $('#' + vm.sdxTableId + ' .thead,#' + vm.sdxTableId + ' .table-arrow, .fixth').css({ top: 'auto' });;
            };

        });
    };

    function sdxFixThTableCtrl($scope, $rootScope, $timeout, $document, $filter) {
        var vm = this;
        vm.sortBy = function(value) {
            vm.datareverse = (vm.datasortby == value) ? !vm.datareverse : false;
            vm.datasortby = value;
            vm.datacurrentpage = 1;
        };
        vm.checkHeight = function($index) {
            $timeout(function() {
                var tr, fix;
                tr = $('#' + vm.tableid + ' #tr' + $index).outerHeight();
                fix = $('#' + vm.tableid + ' #fixTh' + $index).outerHeight();
                if (tr > fix) {
                    $('#' + vm.tableid + ' #fixTh' + $index).css({ height: tr + 'px' });
                    $('#' + vm.tableid + ' #tr' + $index).css({ height: tr + 'px' });
                } else {
                    $('#' + vm.tableid + ' #fixTh' + $index).css({ height: fix + 'px' });
                    $('#' + vm.tableid + ' #tr' + $index).css({ height: fix + 'px' });
                }
                if ($document.scrollTop() >= $('#' + vm.tableid).offset().top) {
                    $('#' + vm.tableid + ' #' + vm.tableid + ' .fixth').addClass('fixed');
                    $('#' + vm.tableid + ' #' + vm.tableid + ' .fixth').css({ top: 0+'px' });
                } else {
                    $('#' + vm.tableid + ' #' + vm.tableid + ' .fixth').removeClass('fixed');
                    $('#' + vm.tableid + ' .fixth').css({ top: 'auto' });;
                };
            }, 200);
        };
        vm.setCheckValue = function(arg, arg1,arg2) {
            console.log(arg, arg1,arg2 ,' in fix')
            var tr = vm.datatable;

            for (var i = 0; i < tr.length; i++) {
                if (tr[i]['uniqueId'] === arg) {
                    tr[i][arg1] = arg1;
                    $('#' + vm.tableid + ' #'+vm.tableid +'table'+arg2 + vm.data.datas[i]['uniqueId']).attr('checked', arg1);
                    $('#' + vm.tableid + ' #'+vm.tableid +'table' +arg2 + vm.data.datas[i]['uniqueId']).prop('checked', arg1);
                    break;
                }
            }
        }
        vm.checkAllWatch = function(arg, val,model) {
            console.log(arg, val,model ,' in fix all ')
           // console.log('arg & val & model ',arg, val, model,'#' + vm.sdxTableId + ' #'+vm.sdxTableId +'table'+arg + vm.data.datas[i]['uniqueId'])
            for (var i = 0; i < vm.datatable.datas.length; i++) {
                vm.datatable.datas[i][arg] = val;
                $('#' + vm.tableid + ' #'+vm.tableid +'table'+arg + vm.datatable.datas[i]['uniqueId']).attr('checked', val);
                $('#' + vm.tableid + ' #'+vm.tableid +'table' +arg +vm.datatable.datas[i]['uniqueId']).prop('checked', val);
            };

        };
    }

    function sdxTable() {
        var directive = {
            restrict: 'EA',
            require: ['^?sdxTable'],
            templateUrl: './views/table/table.tpl.html',
            scope: {
                sdxTableId: '=sdxTableId',
                data: '=data'
            },
            controller: sdxTableCtrl,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
    }

    function sdxFixThTable() {
        var directive = {
            restrict: 'EA',
            transclude: true,
            require: ['^?sdxTable'],
            scope: {
                datath: '=',
                datakey: '=',
                dataperpage: '=',
                datareverse: '=',
                datasortby: '=',
                dataviewby: '=',
                datasearch: '=',
                datathheight: '=',
                thisth: '=',
                optiontable: '=',
                datatable: '=',
                datacurrentpage: '=',
                datafixed: '=',
                tableid: '=',
                decal: '=',
                onsortby: '&?',
                idtable: '@'
            },
            templateUrl: './views/table/table.fix.tpl.html',
            controller: sdxFixThTableCtrl,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
    }

    function runFn() {
        console.log('run sdx.elements.table');
    };

    function configFn() {

    };

})();
