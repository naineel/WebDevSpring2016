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
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                    scope.model.updateModel();
                }
            });
        }

        return {
            link: link
        }
    }
})();