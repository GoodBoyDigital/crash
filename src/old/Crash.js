define(function (require, exports, module)
{
    module.exports = {
    	//AABB:require('./shapes/AABB'),
       // Circle:require('./shapes/Circle'),
       // Rectangle:require('./shapes/Rectangle'),
      //  Line:require('./shapes/Line'),
      //  Point:require('./Vector'),
        Vector:require('./Vector'),
        CrashData:require('./CrashData'),
        CrashBody:require('./CrashBody'),
        CrashWorld:require('./CrashWorld'),
        CrashTests:require('./CrashTests')
    }

});