//Width and height
    var w = 500;
    var h = 300;

//Define default path generator
    var path = d3.geo.path();

//Create SVG element
    var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//Load in GeoJSON data
    d3.json("/data/us-states.json", function (json) {
        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
        console.log(json);
    });

    d3.select("#viz")
        .append("svg")
        .attr('width', 600)
        .attr('height', 300)
        .append('circle')
        .attr('cx', 300)
        .attr('cy', 150)
        .attr('r', 30)
        .attr('fill', '#26963c');