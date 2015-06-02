d3.json("/data/world-110m.json", function(error, world) {
    if (error) return console.error(error);
    console.log(world);
});