'use strict';

angular.module('colorwatchApp')
    .directive('dashboardSunburst', ['d3Service', function(d3Service) {
        return {
            templateUrl: 'app/directives/dashboardSunburst/dashboardSunburst.html',
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function(scope) {

                d3Service.d3().then(function(d3) {

                  // Dimensions of sunburst.
                  var width = 750;
                  var height = 600;
                  var radius = Math.min(width, height) / 2;
                  // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
                  var b = {
                    w: 75, h: 30, s: 3, t: 10
                  };

                  // Total size of all segments; we set this later, after loading the data.
                  var totalSize = 0;

                  var vis = d3.select("#chart").append("svg:svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("svg:g")
                    .attr("id", "container")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    // on window resize, re-render d3 canvas
                    window.onresize = function() {
                        return scope.$apply();
                    };
                    scope.$watch(function() {
                        return angular.element(window)[0].innerWidth;
                    }, function() {
                        return scope.render(scope.data);
                    }
                    );

                    // watch for data changes and re-render
                    scope.$watch('data', function(newVals, oldVals) {
                        if (newVals !== oldVals) {
                            return scope.render(newVals);
                        }
                        else {
                            return;
                        }
                    }, true);

                    scope.render = function(data) {
                        vis.selectAll('*').remove();  //Clear svg on reload
                        console.log(data);
                     /* var partition = d3.layout.partition()
                        .size([2 * Math.PI, radius * radius])
                        .value(function(d) { return d.size; });

                      var arc = d3.svg.arc()
                        .startAngle(function(d) { return d.x; })
                        .endAngle(function(d) { return d.x + d.dx; })
                        .innerRadius(function(d) { return Math.sqrt(d.y); })
                        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

                      // Bounding circle underneath the sunburst, to make it easier to detect
                      // when the mouse leaves the parent g.
                      vis.append("svg:circle")
                        .attr("r", radius)
                        .style("opacity", 0);

                      // For efficiency, filter nodes to keep only those large enough to see.
                      var nodes = partition.nodes(data)
                        .filter(function(d) {
                          return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                        });

                      var path = vis.data([data]).selectAll("path")
                        .data(nodes)
                        .enter().append("svg:path")
                        .attr("display", function(d) { return d.depth ? null : "none"; })
                        .attr("d", arc)
                        .attr("fill-rule", "evenodd")
                        .style("fill", function(d) { return colors[d.name]; })
                        .style("opacity", 1);*/
                       // .on("mouseover", mouseover);

                      // Add the mouseleave handler to the bounding circle.
                      //d3.select("#container").on("mouseleave", mouseleave);

                      // Get total size of the tree = value of root node from partition.
                      //totalSize = path.node().__data__.value;

                    };
                });
            }
        };
    }]);
