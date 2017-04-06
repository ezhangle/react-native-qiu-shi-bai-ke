
// System
let Platform = require('Platform');
// Dimensions
const dimensions = require('Dimensions');

export default {
    screenWidth: dimensions.get('window').width,
    screenHeight: dimensions.get('window').height,
    isIOS: Platform.OS === 'ios',

}