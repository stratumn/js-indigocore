import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import mdColorPicker from 'imports?tinycolor=tinycolor2!md-color-picker';

import stMerklePathTree from './stMerklePathTree.directive';
import stMapExplorer from './stMapExplorer.directive';
import stMapValidator from './stMapValidator.directive';
import stPromiseLoader from './stPromiseLoader.directive';
import stTagColorPicker from './stTagColorPicker.directive';
import AceConfigurationService from './AceConfiguration.service';
import configureTemplates from './templates';

export default angular.module('stratumn.angular-mapexplorer',
  [ngSanitize, ngAnimate, ngMaterial, ngAria, mdColorPicker, 'ui.drop']
)
  .directive('stMapExplorer', stMapExplorer)
  .directive('stMerklePathTree', stMerklePathTree)
  .directive('stMapValidator', stMapValidator)
  .directive('stPromiseLoader', stPromiseLoader)
  .directive('stTagColorPicker', stTagColorPicker)
  .service('AceConfigurationService', AceConfigurationService)
  .run(['$templateCache', configureTemplates])
  .name;
