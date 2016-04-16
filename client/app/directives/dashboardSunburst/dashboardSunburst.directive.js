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
                        var json = buildHierarchy(scope.data);
                        return scope.render(json);
                    }
                    );

                    // watch for data changes and re-render
                    scope.$watch('data', function(newVals, oldVals) {
                        if (newVals !== oldVals) {
                          var json = buildHierarchy(newVals);
                          return scope.render(json);
                        }
                        else {
                            return;
                        }
                    }, true);
                    function buildHierarchy(data){
                      var root = {"name": "root", "children": []};
                      if(!data)
                        return root;
                     // console.log('data', data);
                      for (var i = 0; i < data.length; i++) {
                        var sequence = data[i].backcolor + '-' + data[i].textcolor;
                        var size = +data[i].totalRating;
                        var parts = sequence.split("-");
                        var currentNode = root;
                        for (var j = 0; j < parts.length; j++) {
                          var children = currentNode["children"];
                          var nodeName = parts[j];
                          var childNode;
                          if (j + 1 < parts.length) {
                            // Not yet at the end of the sequence; move down the tree.
                            var foundChild = false;
                            for (var k = 0; k < children.length; k++) {
                              if (children[k]["name"] == nodeName) {
                                childNode = children[k];
                                foundChild = true;
                                break;
                              }
                            }
                            // If we don't already have a child node for this branch, create it.
                            if (!foundChild) {
                              childNode = {"name": nodeName, "children": []};
                              children.push(childNode);
                            }
                            currentNode = childNode;
                          } else {
                            // Reached the end of the sequence; create a leaf node.
                            childNode = {"name": nodeName, "size": size};
                            children.push(childNode);
                          }
                        }
                      }
                      return root;
                    }
                    scope.render = function(data) {
                        vis.selectAll('*').remove();  //Clear svg on reload
                     //   console.log(data);
                      var partition = d3.layout.partition()
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
                        .style("stroke", "#777")
                        .style("fill", function(d) { return d.name; })
                        .style("opacity", 1)
                        .on("mouseover", mouseover);

                      // Add the mouseleave handler to the bounding circle.
                      d3.select("#container").on("mouseleave", mouseleave);

                      // Get total size of the tree = value of root node from partition.
                      totalSize = path.node().__data__.value;

                      // Fade all but the current sequence, and show it in the breadcrumb trail.
                      function mouseover(d) {
                        var rating = d.value.toPrecision(4);
                        var ratingString = rating + " points";

                        d3.select("#valueInfo")
                          .text(ratingString);

                        d3.select("#explanation")
                          .style("visibility", "");

                        var sequenceArray = getAncestors(d);
                        //updateBreadcrumbs(sequenceArray, percentageString);

                        // Fade all the segments.
                        d3.selectAll("path")
                          .style("opacity", 0.3);

                        // Then highlight only those that are an ancestor of the current segment.
                        vis.selectAll("path")
                          .filter(function(node) {
                            return (sequenceArray.indexOf(node) >= 0);
                          })
                          .style("opacity", 1);
                      }
                      // Restore everything to full opacity when moving off the visualization.
                      function mouseleave(d) {

                        // Hide the breadcrumb trail
                        d3.select("#trail")
                          .style("visibility", "hidden");

                        // Deactivate all segments during transition.
                        d3.selectAll("path").on("mouseover", null);

                        // Transition each segment to full opacity and then reactivate it.
                        d3.selectAll("path")
                          .transition()
                          .duration(1000)
                          .style("opacity", 1)
                          .each("end", function() {
                            d3.select(this).on("mouseover", mouseover);
                          });

                        d3.select("#explanation")
                          .style("visibility", "hidden");
                      }
                      // Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
                      function getAncestors(node) {
                        var path = [];
                        var current = node;
                        while (current.parent) {
                          path.unshift(current);
                          current = current.parent;
                        }
                        return path;
                      }
                    };
                });
            }
        };
    }]);
