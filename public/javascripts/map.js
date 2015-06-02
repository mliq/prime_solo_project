var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .scale(100);
    //.translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


d3.json("/data/world-110m.json", function(error, world) {
    if (error) return console.error(error);
    console.log(world);
    svg.append("path")
        .datum(topojson.feature(world, world.objects.countries))
        .attr("d", path);
});
