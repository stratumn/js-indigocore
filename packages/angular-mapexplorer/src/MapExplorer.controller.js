export default class MapExplorer {

  constructor($scope, AceConfigurationService) {
    this.$scope = $scope;
    this.displayed = 'state';

    $scope.$watch(() => this.segment, () => {
      if (this.segment) {
        this.state = JSON.stringify(this.segment.link.state, undefined, 2);
        this.segmentJSON = JSON.stringify(this.segment, undefined, 2);
      }
    });

    this.aceLoaded = _editor => {
      AceConfigurationService.configure(_editor);
    };
  }

  show(segment, onHide) {
    this.segment = segment;
    this.onHide = onHide;
    this.$scope.$parent.onSegmentShow(this.$scope.name);
  }

  display(tab) {
    this.displayed = tab;
  }

  close() {
    this.segment = null;
    this.$scope.$parent.onSegmentHide(this.$scope.name);
    this.onHide();
  }
}

MapExplorer.$inject = ['$scope', 'AceConfigurationService'];