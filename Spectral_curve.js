// AUTOMATICALLY GENERATED: imported vars from saved link.

// Code link
// https://code.earthengine.google.co.in/74666859dba6e7d87d522bc712f83355

var CONVERT_TO_IMPORT = (
[{"type":"imageCollection","name":"L8","record":{"id":"LANDSAT/LC08/C01/T1_TOA"}},{"type":"geometry","name":"geometry","record":{"geometries":[{"type":"Point","coordinates":[77.20734704469011,28.66033879400142]}],"displayProperties":[],"properties":{},"color":"#d63000","mode":"Geometry","shown":true,"locked":false}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(82.75252934999997, 21.715551619331528, 2)

var filtered = L8.filterDate("2020-02-01", "2020-03-15").filterBounds(geometry);
print(filtered);

var leastcloudy = filtered.sort("CLOUD_COVER").first();
print(leastcloudy);

var image = leastcloudy.select(["B[2-7]"]);
print(image);

Map.addLayer(image, {
  bands:['B5', 'B4', 'B3']
});

var features = [
  ee.Feature(ee.Geometry.Point(77.13078, 28.64774), {'label': 'urban'}),
  ee.Feature(ee.Geometry.Point(77.23281, 28.67647), {'label': 'water'}),
  ee.Feature(ee.Geometry.Point(76.0419, 28.6428), {'label': 'vegetation'})
  ];
var points = ee.FeatureCollection(features);

print(points);
Map.addLayer(points)

var options = {
    title : 'Landsat 8 TOA Spectral at 3 parts of Delhi city',
    hAxis: {title: 'Wavelength(micrometer)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 4,
    
    series: {
      0: {color: 'FF0000'},
      1: {color: '0000FF'},
      2: {color: '00FF00'}
    }
};

// printing a dictionary value
print("This is dictionary value", options.series[0]);

var wavelengths = [0.48, 0.56, 0.65, 0.86, 1.61, 2.2];

//create the chart using function ui.SpectraChart

var spectraChart = ui.Chart.image.regions(image, points, ee.Reducer.mean(), 30, 'label', wavelengths)
    .setChartType('ScatterChart').setOptions(options);
    
print(spectraChart);
