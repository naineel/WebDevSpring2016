/**
 * Created by naineel on 3/19/16.
 */
(function(){
    angular
        .module('nSortable', [])
        .directive("nSortable", nSortable);

    function nSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var nAxis = attributes.nAxis;
            $(element).sortable({
                axis: nAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                    console.log(ui.item);
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    console.log(ui.item);
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                    scope.updateModel();
                }
            });
        }

        return {
            link: link
        }
    }
})();