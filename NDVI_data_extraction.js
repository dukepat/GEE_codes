// AUTOMATICALLY GENERATED: imported vars from saved link.
// Code Link
// https://code.earthengine.google.co.in/e8e1629e71d6bd76fe3a65ff01ffe8bb
var CONVERT_TO_IMPORT = (
[{"type":"geometry","name":"Ibadan","record":{"geometries":[{"type":"Point","coordinates":[3.9131133456669875,7.393517655024728]}],"displayProperties":[],"properties":{},"color":"#0b4a8b","mode":"Geometry","shown":true,"locked":false}},{"type":"imageCollection","name":"L8","record":{"id":"LANDSAT/LC08/C01/T1_RT"}},{"type":"image","name":"Ndvi2","record":{"id":"users/dukepato2010/Downloads/NDVI"}},{"type":"imageVisParam","name":"imageVisParam","record":{"params":{"opacity":1,"bands":["nd"],"palette":["ffffff","008000"]}}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(82.75252934999997, 21.715551619331528, 2)

var filtered = L8.filterDate('2019-01-01', '2020-03-20').filterBounds(Ibadan);
print(filtered)
Map.addLayer(Ndvi2);
// Center the map
Map.setCenter(3.91,  7.39, 10);

print(filtered.size());

var filtcloud = filtered.filterMetadata('CLOUD_COVER', 'less_than', 10);

/*print(filtcloud.size());

var listimages = filtcloud.toList(filtcloud.size());
var img1 = listimages.get(0);*/

// print the items in the images list
/*
print(img1);
print(listimages.get(1));
print(listimages.get(2));
*/
// Sorting the image collection

var leastcloudy = filtcloud.sort('CLOUD_COVER').first();

/*print(leastcloudy);

// Finding band names
var bandnames = leastcloudy.bandNames();
print(bandnames);

//Selecting individual band and finding projection information

var L8prj = leastcloudy.select('B1').projection();
print(L8prj);

// Spatial information information
var spatial_res = L8prj.nominalScale();
print(spatial_res);

var b8spres = leastcloudy.select('B8').projection().nominalScale();
print(b8spres);

// printing properties propertyNames();
var properties = leastcloudy.propertyNames();
print('Metadata properties', properties);

// Getting information about amount of cloud cover

var cloudiness = leastcloudy.get('CLOUD_COVER');
print(cloudiness);

// Knowing info about the Datum
print(leastcloudy.get('DATUM'));

// Date aquired
print(leastcloudy.get('DATE_ACQUIRED'));
*/

// Display image on map
var truecolor = {
  bands: ['B4', 'B3', 'B2'],
  min: 6000,
  max: 12000
};
var falsecolor = {
  bands: ['B5', 'B4', 'B3'],
  min: 6000,
  max: 12000
};
Map.addLayer(leastcloudy, truecolor, 'True Color Composite');
Map.addLayer(leastcloudy, falsecolor, 'False Color Composite');


// Computing for NDVI 

var NDVI = leastcloudy.normalizedDifference(['B5', 'B4']);
Map.addLayer(NDVI, {min: 0, max: 1, palette:['white', 'green']}, 'NDVI');

// Export NDVI mage to Drive
Export.image.toDrive({
  image: NDVI,
  scale: 30
});

// Export NDVI image to Asset
Export.image.toAsset({
  image: NDVI,
  assetId: 'users/dukepato2010/Downloads/NDVI',
  scale: 30
});

