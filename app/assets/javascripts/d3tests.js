function deg_rad(ang) {
    return ang * (Math.PI/180.0)
}
function merc_x(lon) {
    var r_major = 6378137.000;
    return r_major * deg_rad(lon);
}
function merc_y(lat) {
    if (lat > 89.5)
        lat = 89.5;
    if (lat < -89.5)
        lat = -89.5;
    var r_major = 6378137.000;
    var r_minor = 6356752.3142;
    var temp = r_minor / r_major;
    var es = 1.0 - (temp * temp);
    var eccent = Math.sqrt(es);
    var phi = deg_rad(lat);
    var sinphi = Math.sin(phi);
    var con = eccent * sinphi;
    var com = .5 * eccent;
    con = Math.pow((1.0-con)/(1.0+con), com);
    var ts = Math.tan(.5 * (Math.PI*0.5 - phi))/con;
    var y = 0 - r_major * Math.log(ts);
    return y;
}
function merc(x,y) {
    return [merc_x(x),merc_y(y)];
}